import logger from '../logger.js';
import { getIceServers } from './iceServers.js';
import { isStreamIdValid, getStreamId, getHostSocket } from './stream.js';

const SOCKET_TIMEOUT = 5000;

export default function (io, socket) {

    // [STREAM:JOIN] ========================================================================================================

    const streamJoin = async (payload, callback) => {
        const event = '[STREAM:JOIN]';

        if (!socket.connected) {
            console.log('Socket not connected. Ignoring.');
            return;
        }

        logger.debug(JSON.stringify({ socket_event: event, socket: socket.id, clientId: socket.data.clientId, streamId: payload.streamId, payload, message: 'New stream join request' }));

        if (!payload || isStreamIdValid(payload.streamId) !== true || !payload.passwordHash) {
            console.log('Bad stream join request. Ignoring.');

            socket.data.errorCounter += 1;
            callback({ status: 'ERROR:EMPTY_OR_BAD_DATA' });
            return;
        }

        const streamId = getStreamId(socket)
        if (streamId && streamId != payload.streamId) {
            console.log('Stream id already set. Ignoring.');

            socket.data.errorCounter += 1;
            callback({ status: 'ERROR:STREAM_ID_ALREADY_SET' });
            return;
        }

        const hostSocket = await getHostSocket(io, payload.streamId);

        if (!socket.connected) {
            console.log('Socket not connected. Ignoring.');
            return;
        }

        if (!hostSocket) {
            console.log('No host for stream found. Ignoring.');

            socket.data.errorCounter += 1;
            callback({ status: 'ERROR:NO_STREAM_HOST_FOUND' });
            return;
        }

        // if (!hostSocket.connected) {
        //     console.log('Host socket not connected. Ignoring.');
        //     callback({ status: 'ERROR:HOST_SOCKET_DISCONNECTED' });
        //     return;
        // }

        // Disconnect all other sockets for this clientId
        const allSockets = await io.fetchSockets();
        allSockets
            .filter(item => item.id !== socket.id && item.data && item.data.isClient === true && item.data.clientId === socket.data.clientId)
            .forEach(oldClientSocket => {
                if (oldClientSocket.connected) {
                    logger.debug(JSON.stringify({ socket_event: event, socket: oldClientSocket.id, streamId: payload.streamId, clientId: oldClientSocket.data.clientId, host_socket: hostSocket.id, message: 'Got new client. Disconnecting old socket' }));
                    oldClientSocket.rooms.forEach(room => { if (room != oldClientSocket.id) oldClientSocket.leave(room); });
                    oldClientSocket.disconnect()
                }
            });

        console.log('Got new client. Sending to host');

        socket.removeAllListeners('CLIENT:ANSWER');
        socket.on('CLIENT:ANSWER', clientAnswer);

        socket.removeAllListeners('CLIENT:CANDIDATE');
        socket.on('CLIENT:CANDIDATE', clientCandidate);

        socket.removeAllListeners('STREAM:LEAVE');
        socket.on('STREAM:LEAVE', streamLeave);

        socket.removeAllListeners('CLIENT:CLICK');
        socket.on('CLIENT:CLICK', clientClick);

        socket.removeAllListeners('CLIENT:SWIPE');
        socket.on('CLIENT:SWIPE', clientSwipe);

        const iceServers = getIceServers(socket.data.clientId);

        hostSocket.timeout(SOCKET_TIMEOUT).emit('STREAM:JOIN', { clientId: socket.data.clientId, passwordHash: payload.passwordHash, iceServers }, (err, response) => {
            if (err) {
                console.log('Host error for STREAM:JOIN => TIMEOUT_OR_NO_RESPONSE');
                callback({ status: 'ERROR:TIMEOUT_OR_NO_RESPONSE' });
                return;
            }

            if (!socket.connected) {
                console.log('Client socket disconnected. Ignoring.');
                return;
            }

            console.log('Host response for STREAM:JOIN =>', response.status);

            if (response.status !== 'OK') { // ERROR:EMPTY_OR_BAD_DATA, ERROR:WRONG_STREAM_PASSWORD
                console.log('Host error for STREAM:JOIN =>', response.status);

                socket.data.errorCounter += 1;
                callback({ status: response.status });
            } else {
                callback({ status: 'OK', iceServers });

                socket.join(payload.streamId);
            }
        });
    }

    socket.removeAllListeners('STREAM:JOIN');
    socket.on('STREAM:JOIN', streamJoin);

    // [CLIENT:ANSWER] ========================================================================================================

    const clientAnswer = async (payload, callback) => {
        const event = '[CLIENT:ANSWER]';

        if (!socket.connected) {
            logger.warn(JSON.stringify({ socket_event: event, socket: socket.id, message: 'Socket not connected. Ignoring.' }));
            return;
        }

        const streamId = getStreamId(socket)
        if (!streamId) {
            logger.warn(JSON.stringify({ socket_event: event, socket: socket.id, clientId: socket.data.clientId, message: 'No stream joined. Ignoring.' }));
            callback({ status: 'ERROR:NO_STREAM_JOINED' });
            return;
        }

        if (!payload || !payload.answer) {
            console.log('Bad client answer request. Ignoring.');

            socket.data.errorCounter += 1;
            callback({ status: 'ERROR:EMPTY_OR_BAD_DATA' });
            return;
        }

        const hostSocket = await getHostSocket(io, streamId);

        if (!socket.connected) {
            logger.warn(JSON.stringify({ socket_event: event, socket: socket.id, message: 'Socket not connected. Ignoring...' }));
            return;
        }

        if (!hostSocket) {
            logger.warn(JSON.stringify({ socket_event: event, socket: socket.id, streamId: streamId, clientId: socket.data.clientId, error: 'NO_STREAM_HOST_FOUND', message: 'No host for stream found' }));
            callback({ status: 'ERROR:NO_STREAM_HOST_FOUND' });
            return;
        }

        if (!hostSocket.connected) {
            logger.warn(JSON.stringify({ socket_event: event, socket: socket.id, message: 'Host socket not connected. Ignoring.' }));
            callback({ status: 'ERROR:HOST_SOCKET_DISCONNECTED' });
            return;
        }

        logger.debug(JSON.stringify({ socket_event: event, socket: socket.id, streamId, clientId: socket.data.clientId, host_socket: hostSocket.id, message: 'Relaying to host' }));

        hostSocket.timeout(SOCKET_TIMEOUT).emit('CLIENT:ANSWER', { clientId: socket.data.clientId, answer: payload.answer }, (err, response) => {
            if (err) {
                logger.warn(JSON.stringify({ socket_event: event, socket: socket.id, error: 'TIMEOUT_OR_NO_RESPONSE', message: 'Host error for CLIENT:ANSWER => TIMEOUT_OR_NO_RESPONSE' }));
                callback({ status: 'ERROR:TIMEOUT_OR_NO_RESPONSE' });
                return;
            }

            if (!socket.connected) {
                logger.debug(JSON.stringify({ socket_event: event, socket: socket.id, streamId, host_socket: hostSocket.id, message: 'CLIENT:ANSWER: Client socket disconnected. Ignoring' }));
                return;
            }

            logger.debug(JSON.stringify({ socket_event: event, socket: socket.id, streamId, clientId: socket.data.clientId, host_socket: hostSocket.id, message: `CLIENT:ANSWER Host response: ${response.status}` }));

            if (response.status !== 'OK') {
                logger.warn(JSON.stringify({ socket_event: event, socket: socket.id, streamId, clientId: socket.data.clientId, host_socket: hostSocket.id, error: response.status, message: `Host error for CLIENT:ANSWER => ${response.status}` }));

                socket.data.errorCounter += 1;
                callback({ status: response.status });
            } else {
                callback({ status: 'OK' });
            }
        });
    }

    // [CLIENT:CANDIDATE] ========================================================================================================

    const clientCandidate = async (payload, callback) => {
        const event = '[CLIENT:CANDIDATE]';

        if (!socket.connected) {
            logger.warn(JSON.stringify({ socket_event: event, socket: socket.id, message: 'Socket not connected. Ignoring.' }));
            return;
        }

        const streamId = getStreamId(socket)
        if (!streamId) {
            logger.warn(JSON.stringify({ socket_event: event, socket: socket.id, clientId: socket.data.clientId, message: 'No stream joined. Ignoring.' }));
            callback({ status: 'ERROR:NO_STREAM_JOINED' });
            return;
        }

        if (!payload || !payload.candidate) {
            console.log('Bad client candidate request. Ignoring.');

            socket.data.errorCounter += 1;
            callback({ status: 'ERROR:EMPTY_OR_BAD_DATA' });
            return;
        }

        const hostSocket = await getHostSocket(io, streamId);

        if (!socket.connected) {
            logger.warn(JSON.stringify({ socket_event: event, socket: socket.id, message: 'Socket not connected. Ignoring...' }));
            return;
        }

        if (!hostSocket) {
            logger.warn(JSON.stringify({ socket_event: event, socket: socket.id, streamId, clientId: socket.data.clientId, error: 'NO_STREAM_HOST_FOUND', message: 'No host for stream found' }));
            callback({ status: 'ERROR:NO_STREAM_HOST_FOUND' });
            return;
        }

        if (!hostSocket.connected) {
            logger.warn(JSON.stringify({ socket_event: event, socket: socket.id, message: 'Host socket not connected. Ignoring.' }));
            callback({ status: 'ERROR:HOST_SOCKET_DISCONNECTED' });
            return;
        }

        logger.debug(JSON.stringify({ socket_event: event, socket: socket.id, streamId, clientId: socket.data.clientId, host_socket: hostSocket.id, message: 'Relaying to host' }));

        hostSocket.timeout(SOCKET_TIMEOUT).emit('CLIENT:CANDIDATE', { clientId: socket.data.clientId, candidate: payload.candidate }, (err, response) => {
            if (err) {
                logger.warn(JSON.stringify({ socket_event: event, socket: socket.id, error: 'TIMEOUT_OR_NO_RESPONSE', message: 'Host error for CLIENT:CANDIDATE => TIMEOUT_OR_NO_RESPONSE' }));
                callback({ status: 'ERROR:TIMEOUT_OR_NO_RESPONSE' });
                return;
            }

            if (!socket.connected) {
                logger.debug(JSON.stringify({ socket_event: event, socket: socket.id, streamId, host_socket: hostSocket.id, message: 'CLIENT:CANDIDATE: Client socket disconnected. Ignoring' }));
                return;
            }

            logger.debug(JSON.stringify({ socket_event: event, socket: socket.id, streamId, clientId: socket.data.clientId, host_socket: hostSocket.id, message: `CLIENT:CANDIDATE Host response: ${response.status}` }));

            if (response.status !== 'OK') {
                logger.warn(JSON.stringify({ socket_event: event, socket: socket.id, streamId, clientId: socket.data.clientId, host_socket: hostSocket.id, error: response.status, message: `Host error for CLIENT:CANDIDATE => ${response.status}` }));

                socket.data.errorCounter += 1;
                callback({ status: response.status });
            } else {
                callback({ status: 'OK' });
            }
        });
    }

    // [STREAM:LEAVE] ========================================================================================================

    const streamLeave = async (callback) => {
        const event = '[STREAM:LEAVE]';

        if (!socket.connected) {
            logger.warn(JSON.stringify({ socket_event: event, socket: socket.id, message: 'Socket not connected. Ignoring.' }));
            return;
        }

        socket.removeAllListeners('CLIENT:ANSWER');
        socket.removeAllListeners('CLIENT:CANDIDATE');
        socket.removeAllListeners('STREAM:LEAVE');

        const socketId = socket.id;
        const clientId = socket.data.clientId;

        const streamId = getStreamId(socket)
        if (!streamId) {
            logger.debug(JSON.stringify({ socket_event: event, socket: socket.id, clientId: socket.data.clientId, message: 'No stream joined. Ignoring.' }));
            callback({ status: 'ERROR:NO_STREAM_JOINED' });
            return;
        }

        socket.leave(streamId);

        const hostSocket = await getHostSocket(io, streamId);

        if (!socket.connected) {
            logger.warn(JSON.stringify({ socket_event: event, socket: socket.id, message: 'Socket not connected. Ignoring...' }));
            return;
        }

        if (!hostSocket) {
            logger.warn(JSON.stringify({ socket_event: event, socket: socketId, streamId, clientId, error: 'NO_STREAM_HOST_FOUND', message: 'No host for stream found' }));
            callback({ status: 'ERROR:NO_STREAM_HOST_FOUND' });
            return;
        }

        if (!hostSocket.connected) {
            logger.warn(JSON.stringify({ socket_event: event, socket: socket.id, message: 'Host socket not connected. Ignoring.' }));
            callback({ status: 'ERROR:HOST_SOCKET_DISCONNECTED' });
            return;
        }

        logger.debug(JSON.stringify({ socket_event: event, socket: socketId, streamId, clientId, host_socket: hostSocket.id, message: 'Relaying to host' }));

        hostSocket.timeout(SOCKET_TIMEOUT).emit('STREAM:LEAVE', { clientId }, (err, response) => {
            if (err) {
                logger.warn(JSON.stringify({ socket_event: event, socket: socket.id, error: 'TIMEOUT_OR_NO_RESPONSE', message: 'Host error for STREAM:LEAVE => TIMEOUT_OR_NO_RESPONSE' }));
                callback({ status: 'ERROR:TIMEOUT_OR_NO_RESPONSE' });
                return;
            }

            if (!socket.connected) {
                logger.debug(JSON.stringify({ socket_event: event, socket: socketId, streamId, clientId, host_socket: hostSocket.id, message: 'STREAM:LEAVE: Client socket disconnected. Ignoring' }));
                return;
            }

            logger.debug(JSON.stringify({ socket_event: event, socket: socketId, streamId, clientId, host_socket: hostSocket.id, message: `STREAM:LEAVE Host response: ${response.status}` }));

            if (response.status !== 'OK') {
                logger.warn(JSON.stringify({ socket_event: event, socket: socketId, streamId, clientId, host_socket: hostSocket.id, error: response.status, message: `Host error for STREAM:LEAVE => ${response.status}` }));

                socket.data.errorCounter += 1;
                callback({ status: response.status });
            } else {
                callback({ status: 'OK' });
            }
        });
    }

    // [CLIENT:CLICK] ========================================================================================================
    const clientClick = async (payload, callback) => {
        const event = '[CLIENT:CLICK]';

        if (!socket.connected) {
            logger.warn(JSON.stringify({ socket_event: event, socket: socket.id, message: 'Socket not connected. Ignoring.' }));
            return;
        }

        const streamId = getStreamId(socket)
        if (!streamId) {
            logger.warn(JSON.stringify({ socket_event: event, socket: socket.id, clientId: socket.data.clientId, message: 'No stream joined. Ignoring.' }));
            callback({ status: 'ERROR:NO_STREAM_JOINED' });
            return;
        }

        if (!payload || !payload.x || !payload.y) {
            console.log('Bad client click request. Ignoring.');

            socket.data.errorCounter += 1;
            callback({ status: 'ERROR:EMPTY_OR_BAD_DATA' });
            return;
        }

        const hostSocket = await getHostSocket(io, streamId);

        hostSocket.timeout(SOCKET_TIMEOUT).emit('CLIENT:CLICK', { clientId: socket.data.clientId, clickX: payload.x, clickY: payload.y }, (err, response) => {
            
        });
    }
    
    // [CLIENT:SWIPE] ========================================================================================================
    const clientSwipe = async (payload, callback) => {
        const event = '[CLIENT:SWIPE]';

        if (!socket.connected) {
            logger.warn(JSON.stringify({ socket_event: event, socket: socket.id, message: 'Socket not connected. Ignoring.' }));
            return;
        }

        const streamId = getStreamId(socket)
        if (!streamId) {
            logger.warn(JSON.stringify({ socket_event: event, socket: socket.id, clientId: socket.data.clientId, message: 'No stream joined. Ignoring.' }));
            callback({ status: 'ERROR:NO_STREAM_JOINED' });
            return;
        }

        if (!payload || !payload.startX || !payload.startY || !payload.endX || !payload.endY) {
            console.log('Bad client swipe request. Ignoring.');

            socket.data.errorCounter += 1;
            callback({ status: 'ERROR:EMPTY_OR_BAD_DATA' });
            return;
        }

        const hostSocket = await getHostSocket(io, streamId);

        hostSocket.timeout(SOCKET_TIMEOUT).emit('CLIENT:SWIPE', {
            clientId: socket.data.clientId,
            touchStartX: payload.touchStartX,
            touchStartY: payload.touchStartY,
            touchEndX: payload.touchEndX,
            touchEndY: payload.touchEndY,
            duration: payload.duration,
        }, (err, response) => {

        });
    }
}