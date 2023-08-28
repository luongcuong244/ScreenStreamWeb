import logger from '../logger.js';
import * as jose from 'jose';
import { isStreamIdValid, createNewStreamId } from './stream.js';

const SERVER_ORIGIN = process.env.SERVER_ORIGIN;
const ANDROID_APP_PACKAGE = process.env.ANDROID_APP_PACKAGE;

export default function (io, socket) {

    // [STREAM:CREATE] ========================================================================================================

    const createStream = async (payload, callback) => {
        const event = '[STREAM:CREATE]';

        logger.debug(JSON.stringify({ socket_event: event, socket: socket.id, payload, message: 'New stream create request' }));

        if (!payload || !payload.jwt) {
            logger.warn(JSON.stringify({ socket_event: event, socket: socket.id, error: 'NO_JWT_SET', message: 'Bad stream create request' }));
            callback({ status: 'ERROR:NO_JWT_SET' });
            return;
        }

        if (socket.data.streamId) {
            logger.warn(JSON.stringify({ socket_event: event, socket: socket.id, error: 'STREAM_ID_ALREADY_SET', message: 'Bad stream state' }));
            callback({ status: 'ERROR:STREAM_ID_ALREADY_SET' });
            return;
        }

        let pubKey;
        let requestedStreamId;
        try {
            const claims = jose.decodeJwt(payload.jwt);
            const ecPublicKey = await jose.importSPKI(claims.pubKey, 'ES256');
            const verifyResult = await jose.jwtVerify(payload.jwt, ecPublicKey, { audience: SERVER_ORIGIN, issuer: ANDROID_APP_PACKAGE });

            if (verifyResult.payload.streamId) {
                if (typeof verifyResult.payload.streamId !== 'string') throw Error('BAD_STREAM_ID1');
                requestedStreamId = verifyResult.payload.streamId.trim();
                if (isStreamIdValid(requestedStreamId) !== true) throw Error('BAD_STREAM_ID2');
            }

            if (!verifyResult.payload.pubKey || typeof verifyResult.payload.pubKey !== 'string' || verifyResult.payload.pubKey.trim().length === 0) throw Error('BAD_PUB_KEY');
            pubKey = verifyResult.payload.pubKey;
        } catch (cause) {
            logger.warn(JSON.stringify({ socket_event: event, socket: socket.id, error: 'JWT_VERIFICATION_FILED', message: cause.message, cause }));
            callback({ status: 'ERROR:JWT_VERIFICATION_FILED' });
            return;
        }

        let streamId;
        if (requestedStreamId) {
            const socketsInRequestedStream = await io.in(requestedStreamId).fetchSockets();
            const existingHostSockets = socketsInRequestedStream.filter(item => item.data && item.data.isHost === true);

            if (existingHostSockets.length > 1) { // This is very bad
                logger.warn(JSON.stringify({ socket_event: event, socket: socket.id, error: 'TOO_MANY_HOSTS', message: `TOO_MANY_HOSTS: ${existingHostSockets.map(s => s.id)}` }));
                streamId = createNewStreamId(io);
            } else if (existingHostSockets.length === 1) {
                if (existingHostSockets[0].data.pubKey === pubKey) {
                    streamId = requestedStreamId;
                    logger.warn(JSON.stringify({ socket_event: event, socket: socket.id, streamId, message: `Disconnecting previous host socket: ${existingHostSockets[0].id}` }));
                    existingHostSockets[0].disconnect();
                } else {
                    streamId = createNewStreamId(io);
                }
            } else if (existingHostSockets.length === 0) {
                streamId = requestedStreamId;
            }
        } else {
            streamId = createNewStreamId(io);
        }

        if (!socket.connected) {
            logger.warn(JSON.stringify({ socket_event: event, socket: socket.id, message: 'Socket not connected. Ignoring.' }));
            return;
        }

        logger.debug(JSON.stringify({ socket_event: event, socket: socket.id, streamId, message: `Set as host for stream: ${streamId}` }));

        socket.removeAllListeners('STREAM:REMOVE');
        socket.on('STREAM:REMOVE', removeStream);

        socket.removeAllListeners('STREAM:START');
        socket.on('STREAM:START', startStream);

        socket.removeAllListeners('STREAM:STOP');
        socket.on('STREAM:STOP', stopStream);

        socket.removeAllListeners('HOST:OFFER');
        socket.on('HOST:OFFER', hostOffer);

        socket.removeAllListeners('HOST:CANDIDATE');
        socket.on('HOST:CANDIDATE', hostCandidate);

        socket.removeAllListeners('REMOVE:CLIENT');
        socket.on('REMOVE:CLIENT', removeClient);

        socket.data.streamId = streamId;
        socket.data.pubKey = pubKey;
        socket.join(streamId);

        callback({ status: 'OK', streamId });
    }

    socket.removeAllListeners('STREAM:CREATE');
    socket.on('STREAM:CREATE', createStream);

    // [STREAM:REMOVE] ========================================================================================================

    const removeStream = (callback) => {
        const event = '[STREAM:REMOVE]';

        logger.debug(JSON.stringify({ socket_event: event, socket: socket.id, message: 'New stream remove request' }));

        if (!socket.data.streamId) { //its ok, just ignore and notify host
            logger.warn(JSON.stringify({ socket_event: event, socket: socket.id, error: 'STREAM_ID_NOT_SET', message: 'Bad stream state' }));
            callback({ status: 'ERROR:STREAM_ID_NOT_SET' });
            return;
        }

        logger.debug(JSON.stringify({ socket_event: event, socket: socket.id, streamId: socket.data.streamId, message: `Removing stream Id: ${socket.data.streamId}` }));

        socket.to(socket.data.streamId).emit('REMOVE:STREAM'); //This is client only event, don't mix it with 'STREAM:REMOVE' from host
        io.socketsLeave(socket.data.streamId);

        socket.data.streamId = undefined;
        socket.data.pubKey = undefined;

        socket.removeAllListeners('STREAM:REMOVE');
        socket.removeAllListeners('STREAM:START');
        socket.removeAllListeners('STREAM:STOP');
        socket.removeAllListeners('HOST:OFFER');
        socket.removeAllListeners('HOST:CANDIDATES');
        socket.removeAllListeners('REMOVE:CLIENT');

        callback({ status: 'OK' });
    }

    // [STREAM:START] ========================================================================================================

    const startStream = async (payload, callback) => {
        const event = '[STREAM:START]';

        logger.debug(JSON.stringify({ socket_event: event, socket: socket.id, streamId: socket.data.streamId, payload, message: 'Stream start request' }));

        if (!payload || !payload.clientId) {
            logger.warn(JSON.stringify({ socket_event: event, socket: socket.id, error: 'NO_CLIENT_ID_SET', message: 'Bad stream start request' }));
            callback({ status: 'ERROR:NO_CLIENT_ID_SET' });
            return;
        }

        if (!socket.data.streamId) {
            logger.warn(JSON.stringify({ socket_event: event, socket: socket.id, error: 'NO_STREAM_ID_SET', message: 'Bad stream state' }));
            callback({ status: 'ERROR:NO_STREAM_ID_SET' });
            return;
        }

        if (payload.clientId === 'ALL') {
            socket.to(socket.data.streamId).emit('STREAM:START');
            callback({ status: 'OK' });
        } else {
            const socketsInStream = await io.in(socket.data.streamId).fetchSockets();
            const clientSocket = socketsInStream.find(item => item.data && item.data.clientId === payload.clientId);

            if (!clientSocket) {
                logger.warn(JSON.stringify({ socket_event: event, socket: socket.id, streamId: socket.data.streamId, clientId: payload.clientId, error: 'NO_CLIENT_FOUND', message: 'No client found' }));

                callback({ status: 'ERROR:NO_CLIENT_FOUND' });
                return;
            }

            callback({ status: 'OK' });

            if (!clientSocket.connected) {
                logger.warn(JSON.stringify({ socket_event: event, socket: socket.id, message: 'Client socket not connected. Ignoring.' }));
                return;
            }

            logger.debug(JSON.stringify({ socket_event: event, socket: socket.id, streamId: socket.data.streamId, clientId: payload.clientId, client_socket: clientSocket.id, message: 'Relaying to client' }));

            clientSocket.emit('STREAM:START');
        }
    }

    // [STREAM:STOP] ========================================================================================================

    const stopStream = (callback) => {
        const event = '[STREAM:STOP]';

        if (!socket.data.streamId) {
            logger.warn(JSON.stringify({ socket_event: event, socket: socket.id, error: 'NO_STREAM_ID_SET', message: 'Bad stream state' }));
            callback({ status: 'ERROR:NO_STREAM_ID_SET' });
            return;
        }

        logger.debug(JSON.stringify({ socket_event: event, socket: socket.id, streamId: socket.data.streamId, message: 'Stream stop request' }));

        socket.to(socket.data.streamId).emit('STREAM:STOP');

        callback({ status: 'OK' });
    }

    // [HOST:OFFER] ========================================================================================================

    const hostOffer = async (payload, callback) => {
        const event = '[HOST:OFFER]';

        if (!payload || !payload.clientId || !payload.offer) {
            logger.warn(JSON.stringify({ socket_event: event, socket: socket.id, streamId: socket.data.streamId, payload, error: 'EMPTY_OR_BAD_DATA', message: 'Bad host offer request' }));
            callback({ status: 'ERROR:EMPTY_OR_BAD_DATA' });
            return;
        }

        if (!socket.data.streamId) {
            logger.warn(JSON.stringify({ socket_event: event, socket: socket.id, error: 'NO_STREAM_ID_SET', message: 'Bad stream state' }));
            callback({ status: 'ERROR:NO_STREAM_ID_SET' });
            return;
        }

        const socketsInStream = await io.in(socket.data.streamId).fetchSockets();
        const clientSocket = socketsInStream.find(item => item.data && item.data.clientId === payload.clientId);

        if (!clientSocket) {
            logger.warn(JSON.stringify({ socket_event: event, socket: socket.id, streamId: socket.data.streamId, clientId: payload.clientId, error: 'NO_CLIENT_FOUND', message: 'No client found' }));
            callback({ status: 'ERROR:NO_CLIENT_FOUND' });
            return;
        }


        if (!clientSocket.connected) {
            logger.warn(JSON.stringify({ socket_event: event, socket: socket.id, message: 'Client socket not connected. Ignoring.' }));
            callback({ status: 'ERROR:NO_CLIENT_FOUND' });
            return;
        }

        logger.debug(JSON.stringify({ socket_event: event, socket: socket.id, streamId: socket.data.streamId, clientId: payload.clientId, client_socket: clientSocket.id, message: 'Relaying to client' }));

        clientSocket.emit('HOST:OFFER', { offer: payload.offer }, response => {
            if (!socket.connected) {
                logger.debug(JSON.stringify({ socket_event: event, socket: socket.id, clientId: payload.clientId, client_socket: clientSocket.id, message: 'HOST:OFFER Host socket disconnected. Ignoring' }));
                return;
            }

            logger.debug(JSON.stringify({ socket_event: event, socket: socket.id, streamId: socket.data.streamId, clientId: payload.clientId, client_socket: clientSocket.id, message: `HOST:OFFER Client response: ${response.status}` }));

            callback({ status: response.status });

            if (response.status !== 'OK') {
                logger.warn(JSON.stringify({ socket_event: event, socket: socket.id, streamId: socket.data.streamId, clientId: payload.clientId, client_socket: clientSocket.id, error: response.status, message: `Client error for HOST:OFFER => ${response.status}` }));
            }
        });
    }

    // [HOST:CANDIDATE] ========================================================================================================

    const hostCandidate = async (payload, callback) => {
        const event = '[HOST:CANDIDATE]';

        if (!payload || !payload.clientId || (!payload.candidate && !payload.candidates)) {
            logger.warn(JSON.stringify({ socket_event: event, socket: socket.id, streamId: socket.data.streamId, payload, error: 'EMPTY_OR_BAD_DATA', message: 'Bad host candidates request' }));
            callback({ status: 'ERROR:EMPTY_OR_BAD_DATA' });
            return;
        }

        if (!socket.data.streamId) {
            logger.warn(JSON.stringify({ socket_event: event, socket: socket.id, error: 'NO_STREAM_ID_SET', message: 'Bad stream state' }));
            callback({ status: 'ERROR:NO_STREAM_ID_SET' });
            return;
        }

        const socketsInStream = await io.in(socket.data.streamId).fetchSockets();
        const clientSocket = socketsInStream.find(item => item.data && item.data.clientId === payload.clientId);

        if (!clientSocket) {
            logger.warn(JSON.stringify({ socket_event: event, socket: socket.id, streamId: socket.data.streamId, clientId: payload.clientId, error: 'NO_CLIENT_FOUND', message: 'No client found' }));
            callback({ status: 'ERROR:NO_CLIENT_FOUND' });
            return;
        }

        if (!clientSocket.connected) {
            logger.warn(JSON.stringify({ socket_event: event, socket: socket.id, message: 'Client socket not connected. Ignoring.' }));
            callback({ status: 'ERROR:NO_CLIENT_FOUND' });
            return;
        }

        logger.debug(JSON.stringify({ socket_event: event, socket: socket.id, streamId: socket.data.streamId, clientId: payload.clientId, client_socket: clientSocket.id, message: 'Relaying to client' }));

        const candidates = payload.candidates ? payload.candidates : [payload.candidate];

        clientSocket.emit('HOST:CANDIDATE', { candidates: candidates }, response => {
            if (!socket.connected) {
                logger.debug(JSON.stringify({ socket_event: event, socket: socket.id, clientId: payload.clientId, client_socket: clientSocket.id, message: 'HOST:CANDIDATE Host socket disconnected. Ignoring' }));
                return;
            }

            logger.debug(JSON.stringify({ socket_event: event, socket: socket.id, streamId: socket.data.streamId, clientId: payload.clientId, client_socket: clientSocket.id, message: `HOST:CANDIDATE Client response: ${response.status}` }));

            callback({ status: response.status });

            if (response.status !== 'OK') {
                logger.warn(JSON.stringify({ socket_event: event, socket: socket.id, streamId: socket.data.streamId, clientId: payload.clientId, client_socket: clientSocket.id, error: response.status, message: `Client error for HOST:CANDIDATE => ${response.status}` }));
            }
        });
    }

    // [REMOVE:CLIENT] ========================================================================================================

    const removeClient = async (payload, callback) => {
        const event = '[REMOVE:CLIENT]';

        if (!payload || !payload.clientId || !Array.isArray(payload.clientId)) {
            logger.warn(JSON.stringify({ socket_event: event, socket: socket.id, streamId: socket.data.streamId, payload, error: 'EMPTY_OR_BAD_DATA', message: 'Bad remove client request' }));
            callback({ status: 'ERROR:EMPTY_OR_BAD_DATA' });
            return;
        }

        const streamId = socket.data.streamId;
        const allSockets = await io.fetchSockets();
        const clientSockets = allSockets.filter(item => item.data && item.data.isClient === true && payload.clientId.includes(item.data.clientId));

        if (clientSockets.length === 0) {
            logger.debug(JSON.stringify({ socket_event: event, socket: socket.id, streamId, message: 'No client found' }));
            callback({ status: 'OK' });
            return;
        }

        logger.warn(JSON.stringify({ socket_event: event, socket: socket.id, streamId, message: `Disconnecting clients [${payload.reason}]: ${clientSockets.length}` }));

        clientSockets.forEach(clientSocket => {
            if (clientSocket.connected) {
                clientSocket.rooms.forEach(room => { if (room != clientSocket.id) clientSocket.leave(room); });

                clientSocket.emit('REMOVE:CLIENT', response => {
                    logger.debug(JSON.stringify({ socket_event: event, socket: socket.id, streamId, clientId: clientSocket.data.clientId, client_socket: clientSocket.id, message: `REMOVE:CLIENT Client response: ${response.status}` }));
                });
            }
        });

        callback({ status: 'OK' });
    }
}