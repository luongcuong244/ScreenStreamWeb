import { isStreamIdValid, isStreamPasswordValid, WebRTC } from './webrtc.js';

function log(level, message, context = {}) {
    console.log(`[${level}] ${message}`, context);
}

const clientId = generateRandomString(24);
const crc = ('00000000' + CRC32(clientId).toString(16).toUpperCase()).slice(-8);
const publicId = crc.substring(0, 4) + "-" + crc.substring(4);

const UIElements = {
    startContainer: document.getElementById('start-container'),
    streamIdInput: document.getElementById('stream-id'),
    passwordInput: document.getElementById('stream-password'),
    streamJoinButton: document.getElementById('streamJoinButton'),
    joinButtonLoader: document.getElementById('joinButtonLoader'),
    streamJoinCell: document.getElementById('stream-join'),
    streamErrorCell: document.getElementById('stream-error'),
    streamWaitContainer: document.getElementById('stream-wait-container'),
    streamWaitStreamId: document.getElementById('stream-wait-stream-id'),
    streamingHeader: document.getElementById('streaming-header'),
    streamingContainerText: document.getElementById('streaming-container-text'),
    videoContainer: document.getElementById('video-container'),
    videoElement: document.getElementById('video-element'),
};

window.streamState = new Proxy({
    isServerAvailable: false,
    isTokenAvailable: false,
    isSocketConnected: false,
    isJoiningStream: false,
    streamId: null,
    isStreamJoined: false,
    isStreamRunning: false,
    error: null,
}, {
    set(target, key, value) {
        const oldValue = target[key];
        target[key] = value;
        onNewState(key, oldValue, value, target);
        return true;
    }
});

const setDataFromUrlParams = () => {
    const urlParams = new URLSearchParams(window.location.search);
    const streamId = urlParams.get('id');
    if (isStreamIdValid(streamId)) {
        UIElements.streamIdInput.value = streamId;

        const streamPassword = urlParams.get('p');
        if (isStreamPasswordValid(streamPassword)) {
            UIElements.passwordInput.value = streamPassword;
        }
    }
};

const checkWebRTCSupport = () => {
    const RTCPeerConnection = window.RTCPeerConnection || window.mozRTCPeerConnection || window.webkitRTCPeerConnection;
    if (typeof RTCPeerConnection === 'undefined') {
        window.streamState.error = "ERROR:WEBRTC_NOT_SUPPORTED";
    }
};

const initialize = () => {
    setDataFromUrlParams();
    checkWebRTCSupport();
};

if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', initialize);
} else {
    initialize();
}

try {
    document.getElementById('client-id').innerText = publicId;
    const s = 'Client id: ' + publicId;
    document.getElementById('streaming-client-id').innerText = s;
    document.getElementById('stream-wait-client-id').innerText = s;
} catch (error) {
    log('warn', `client-id.error: ${error.message}`, { error });
}

let hideTimeout = null;

const streamingContainerOnMouseMove = () => {
    UIElements.streamingHeader.className = 'visible';
    clearTimeout(hideTimeout);
    hideTimeout = setTimeout(() => {
        UIElements.streamingHeader.className = 'hidden';
    }, 2500);
};

const streamingContainerOnMouseOut = () => {
    clearTimeout(hideTimeout);
    UIElements.streamingHeader.className = 'hidden';
};

const onNewState = (key, oldValue, newValue, state) => {
    if (newValue === oldValue) return;
    log('debug', `onNewState: [${key}] ${oldValue} => ${newValue}\n${JSON.stringify(state)}`);

    if (key === 'error' && state.error) {
        log('warn', `onNewState.error: ${state.error}`, { error: state.error });
    }

    UIElements.startContainer.style.display = (!state.isStreamJoined) ? 'block' : 'none';
    UIElements.streamWaitContainer.style.display = (state.isStreamJoined && !state.isStreamRunning) ? 'block' : 'none';
    UIElements.streamingHeader.style.display = (state.isStreamRunning) ? 'block' : 'none';
    UIElements.videoContainer.style.display = (state.isStreamRunning) ? 'block' : 'none';

    UIElements.joinButtonLoader.style.display = (!state.isServerAvailable || (state.isServerAvailable && state.isTokenAvailable) || state.isJoiningStream) ? 'block' : 'none';

    UIElements.streamJoinButton.style.display = (state.isSocketConnected && !state.isJoiningStream) ? 'table-cell' : 'none';

    UIElements.streamErrorCell.style.display = (state.error) ? 'block' : 'none';

    if (state.error) {
        switch (state.error) {
            case 'ERROR:TURNSTILE:200100':
                UIElements.streamErrorCell.innerText = 'Incorrect device clock time. Please adjust and reload the page.';
                UIElements.streamJoinCell.style.display = 'none';
                UIElements.streamJoinButton.style.display = 'none';
                UIElements.joinButtonLoader.style.display = 'none';
                break;
            case 'ERROR:WRONG_STREAM_ID':
                UIElements.streamErrorCell.innerText = 'Wrong stream id';
                break;
            case 'ERROR:NO_STREAM_HOST_FOUND':
                UIElements.streamErrorCell.innerText = 'Stream not found';
                break;
            case 'ERROR:WRONG_STREAM_PASSWORD':
                UIElements.streamErrorCell.innerText = 'Wrong stream password';
                break;
            default:
                UIElements.streamErrorCell.innerText = 'Something went wrong. Reload this page and try again.' + `\n[${state.error}]\n\n`;
                UIElements.streamJoinCell.style.display = 'none';
                UIElements.streamJoinButton.style.display = 'none';
                UIElements.joinButtonLoader.style.display = 'none';
                break;
        }
    }

    if (key === 'isStreamJoined' && state.isStreamJoined) {
        UIElements.streamWaitStreamId.innerText = 'Stream Id: {streamId}'.replace('{streamId}', state.streamId);

        UIElements.streamingContainerText.innerText = 'Stream Id: {streamId}'.replace('{streamId}', state.streamId);
    }

    if (key === 'isStreamRunning') {
        if (state.isStreamRunning) {
            window.addEventListener('mousemove', streamingContainerOnMouseMove);
            window.addEventListener('touchstart', streamingContainerOnMouseMove);
            window.addEventListener('mouseout', streamingContainerOnMouseOut);
            streamingContainerOnMouseMove();
        } else {
            if (UIElements.videoElement && UIElements.videoElement.srcObject) {
                UIElements.videoElement.srcObject.getTracks().forEach(track => track.stop());
                UIElements.videoElement.srcObject = null;
            }

            clearTimeout(hideTimeout);
            window.removeEventListener('mousemove', streamingContainerOnMouseMove);
            window.removeEventListener('touchstart', streamingContainerOnMouseMove);
            window.removeEventListener('mouseout', streamingContainerOnMouseOut);
        }
    }
};

const onNewTrack = (track) => {
    log('debug', `onNewTrack: ${track.id}`, { track_id: track.id });

    if (!UIElements.videoElement.srcObject) {
        UIElements.videoElement.srcObject = new MediaStream();
    }

    UIElements.videoElement.srcObject.addTrack(track);
};

const webRTC = new WebRTC(clientId, window.streamState, window.getTurnstileTokenAsync, onNewTrack);

document.getElementById('streamLeaveButton').addEventListener('click', (e) => {
    e.preventDefault();
    webRTC.leaveStream(true);
});

document.getElementById('streamWaitLeaveButton').addEventListener('click', (e) => {
    e.preventDefault();
    webRTC.leaveStream(true);
});

UIElements.streamJoinButton.addEventListener('click', (e) => {
    e.preventDefault();
    webRTC.joinStream(UIElements.streamIdInput.value, UIElements.passwordInput.value);
});

webRTC.waitForServerOnlineAndConnect();

window.addEventListener('beforeunload', () => {
    webRTC.leaveStream(false);
});

UIElements.videoContainer.addEventListener('click', function (e) {
    // show cords
    var x = e.clientX;
    var y = e.clientY;
    console.log('x: ', x, ';y: ', y);
    var videoWidth = UIElements.videoElement.offsetWidth;
    var videoHeight = UIElements.videoElement.offsetHeight;
    console.log('videoWidth: ', videoWidth, ';videoHeight: ', videoHeight);

    var fullScreenDeviceWidth = 1080;
    var fullScreenDeviceHeight = 2340;

    var displayDeviceWidth = fullScreenDeviceWidth / fullScreenDeviceHeight * videoHeight;
    var displayDeviceHeight = videoHeight;

    var xOnDisplayDevice = x - (videoWidth - displayDeviceWidth) / 2;
    var yOnDisplayDevice = y;

    var xOnDevice = xOnDisplayDevice / displayDeviceWidth * fullScreenDeviceWidth;
    var yOnDevice = yOnDisplayDevice / displayDeviceHeight * fullScreenDeviceHeight;
    console.log('xOnDevice: ', xOnDevice, ';yOnDevice: ', yOnDevice);  

    webRTC.sendClickEvent(Math.round(xOnDevice), Math.round(yOnDevice));
});

function generateRandomString(length) {
    const characters = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
    const charactersLength = characters.length;
    let result = '';
    const array = new Uint8Array(length);
    window.crypto.getRandomValues(array);

    for (let i = 0; i < length; i++) {
        result += characters.charAt(array[i] % charactersLength);
    }

    return result;
}

function CRC32(r) { for (var a, o = [], c = 0; c < 256; c++) { a = c; for (var f = 0; f < 8; f++)a = 1 & a ? 3988292384 ^ a >>> 1 : a >>> 1; o[c] = a } for (var n = -1, t = 0; t < r.length; t++)n = n >>> 8 ^ o[255 & (n ^ r.charCodeAt(t))]; return (-1 ^ n) >>> 0 };