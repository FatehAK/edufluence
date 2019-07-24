io = io.connect();

let myName = '';
let theirName = '';
let myUserType = '';
const configuration = {
    iceServers: [
        {
            urls: 'stun:stun.l.google.com:19302',
        },
        {
            urls: 'turn:numb.viagenie.ca',
            username: 'nyt3fyre@gmail.com',
            credential: 'fyrexfyre'
        },
        {
            urls: 'turn:13.250.13.83:3478?transport=udp',
            username: 'YzYNCouZM1mhqhmseWk6',
            credential: 'YzYNCouZM1mhqhmseWk6'
        }
    ]
};
let rtcPeerConn;
const mainVideoArea = document.querySelector('#mainVideoTag');
const smallVideoArea = document.querySelector('#smallVideoTag');
let dataChannel;

io.on('signal', async (data) => {
    if (data.user_type === 'expert' && data.command === 'joinroom') {
        if (myUserType === 'student') {
            theirName = data.user_name;
            document.querySelector('#messageOutName').innerHTML = '<i class="fas fa-chalkboard-teacher"></i>' + theirName;
            document.querySelector('#messageInName').innerHTML = '<i class="fas fa-user-graduate"></i>' + myName;
        }
        document.querySelector('#requestExpertForm').style.display = 'none';
        document.querySelector('#waitingForExpert').style.display = 'none';
        document.querySelector('#expertListing').style.display = 'block';
    }
    else if (data.user_type === 'student' && data.command === 'callexpert') {
        if (!rtcPeerConn) {
            startSignaling();
        }
        if (myUserType === 'expert') {
            theirName = data.user_name;
            document.querySelector('#messageOutName').innerHTML = '<i class="fas fa-user-graduate"></i>' + theirName;
            document.querySelector('#messageInName').innerHTML = '<i class="fas fa-chalkboard-teacher"></i>' + myName;
        }
        document.querySelector('#expertSignup').style.display = 'none';
        document.querySelector('.head-wrapper').style.display = 'none';
        document.querySelector('#videoPage').style.display = 'block';
    }
    else if (data.user_type == 'signaling') {
        let message = JSON.parse(data.user_data);
        try {
            if (message.sdp) {
                if (message.sdp.type === 'offer' && myUserType === 'expert') {
                    console.log('offering');
                    await rtcPeerConn.setRemoteDescription(new RTCSessionDescription(message.sdp)).catch((err) => console.log(err));
                    await rtcPeerConn.setLocalDescription(await rtcPeerConn.createAnswer());
                    io.emit('signal', {
                        user_type: 'signaling',
                        command: 'SDP',
                        user_data: JSON.stringify({ sdp: rtcPeerConn.localDescription })
                    });
                } else if (message.sdp.type === 'answer' && myUserType === 'student') {
                    console.log('answering');
                    await rtcPeerConn.setRemoteDescription(new RTCSessionDescription(message.sdp)).catch((err) => console.log(err));
                }
            } else if (message.candidate) {
                await setTimeout(() => {
                    rtcPeerConn.addIceCandidate(new RTCIceCandidate(message.candidate)).catch((err) => console.log(err))
                }, 2000);
            }
        } catch (err) {
            console.log('SDP error :' + err);
        }
    }
});

//on negotiation called
function startSignaling() {
    console.log('Starting signaling..');
    if (RTCPeerConnection) {
        //firefox
        rtcPeerConn = new RTCPeerConnection(configuration);
    } else {
        if (webkitRTCPeerConnection) {
            //chrome
            rtcPeerConn = new webkitRTCPeerConnection(configuration);
        }
    }

    //our data channel
    dataChannel = rtcPeerConn.createDataChannel('mychannel');
    dataChannel.binaryType = 'arraybuffer';

    dataChannel.onopen = () => {
        if (dataChannel.readyState === 'open') {
            console.log('Data Channel open');
            dataChannel.onmessage = receiveDataChannelMessage;
        }
    };
    rtcPeerConn.ondatachannel = (evt) => {
        console.log('Receiving a data channel');
        dataChannel = evt.channel;
        dataChannel.onmessage = receiveDataChannelMessage;
    };
    rtcPeerConn.onicecandidate = (evt) => {
        called = true;
        if (evt.candidate) {
            io.emit('signal', {
                user_type: 'signaling',
                command: 'icecandidate',
                user_data: JSON.stringify({ candidate: evt.candidate })
            });
        }
    };

    let negotiating;
    rtcPeerConn.onnegotiationneeded = async () => {
        console.log('on negotiation called');
        if (myUserType === 'student') {
            try {
                if (negotiating || rtcPeerConn.signalingState != 'stable') return;
                negotiating = true;
                await rtcPeerConn.setLocalDescription(await rtcPeerConn.createOffer());
                io.emit('signal', {
                    user_type: 'signaling',
                    command: 'SDP',
                    user_data: JSON.stringify({ sdp: rtcPeerConn.localDescription })
                });
            } catch (err) {
                console.error(err);
            } finally {
                negotiating = false;
            }
        }
    };

    rtcPeerConn.ontrack = (evt) => {
        mainVideoArea.srcObject = evt.streams[0];
    };

    let constraints = {
        audio: true,
        video: true
    };
    navigator.mediaDevices.getUserMedia(constraints)
        .then((stream) => {
            smallVideoArea.srcObject = stream;
            stream.getTracks().forEach((track) => {
                rtcPeerConn.addTrack(track, stream);
            });
        })
        .catch((err) => {
            console.log(err);
        });
}

/* messaging and file transfer */
const messageHolder = document.querySelector('.message-box');
const myMessage = document.querySelector('#myMessage');
const sendMessage = document.querySelector('#sendMessage');
const fileProgress = document.querySelector('#fileProgress');
let receivedFileName;
let receivedFileSize;
let fileBuffer = [];
let fileSize = 0;
let fileTransferring = false;

function receiveDataChannelMessage(evt) {
    if (fileTransferring) {
        fileBuffer.push(evt.data);
        fileSize += evt.data.byteLength;
        fileProgress.value = fileSize;

        if (fileSize === receivedFileSize) {
            fileProgress.style.display = 'none';
            document.querySelector('.sidenav').style.width = '300px';
            document.querySelector('body').style.marginRight = '300px';
            opened = true;
            let received = new window.Blob(fileBuffer);
            fileBuffer = [];
            fileSize = 0;
            fileTransferring = false;
            let linkTag = document.createElement('a');
            linkTag.className = 'file-url';
            linkTag.href = URL.createObjectURL(received);
            linkTag.download = receivedFileName;
            linkTag.innerHTML = `<i class="fas fa-download"></i><span>${receivedFileName}</span>`;
            let div = document.createElement('div');
            div.className = 'message-out';
            div.appendChild(linkTag);
            messageHolder.appendChild(div);
        }
    }
    else {
        //messaging
        appendChatMessage(evt.data, 'message-out');
    }
}

sendMessage.addEventListener('click', function(evt) {
    if (myMessage.value) {
        dataChannel.send(myMessage.value);
        appendChatMessage(myMessage.value, 'message-in');
        myMessage.value = '';
    }
    evt.preventDefault();
});

function appendChatMessage(msg, className) {
    document.querySelector('.sidenav').style.width = '300px';
    document.querySelector('body').style.marginRight = '300px';
    opened = true;
    let div = document.createElement('div');
    div.className = className;
    div.innerHTML = '<span>' + msg + '</span>';
    messageHolder.appendChild(div);
}

io.on('files', (data) => {
    receivedFileName = data.filename;
    receivedFileSize = data.filesize;
    console.log('File on the way is ' + receivedFileName + ' (' + receivedFileSize + ')');
    fileTransferring = true;
});

//send file dialog and chunking
const sendFile = document.querySelector('#sendFile');
sendFile.addEventListener('change', function() {
    let file = sendFile.files[0];
    console.log('sending file ' + file.name + ' (' + file.size + ') ...');
    io.emit('files', {
        filename: file.name,
        filesize: file.size
    });
    fileProgress.style.display = 'block';
    appendChatMessage('<i class="fas fa-share share"></i> Sending ' + file.name, 'message-in');
    fileTransferring = true;
    fileProgress.max = file.size;
    let chunkSize = 16384;
    let sliceFile = (offset) => {
        let reader = new FileReader();
        reader.onload = (function() {
            return function(e) {
                //delay sending by 1 sec
                setTimeout(() => dataChannel.send(e.target.result), 1000);
                if (file.size > offset + e.target.result.byteLength) {
                    setTimeout(sliceFile, 0, offset + chunkSize);
                }
                fileProgress.value = offset + e.target.result.byteLength;
            };
        })(file);
        let slice = file.slice(offset, offset + chunkSize);
        reader.readAsArrayBuffer(slice);
    };
    sliceFile(0);
    fileTransferring = false;
});

/* muting and pausing video */
const muteMyself = document.querySelector('#muteMyself');
const pauseMyVideo = document.querySelector('#pauseMyVideo');

muteMyself.addEventListener('click', function() {
    let streams = rtcPeerConn.getLocalStreams();
    for (let stream of streams) {
        for (let audioTrack of stream.getAudioTracks()) {
            if (audioTrack.enabled) {
                muteMyself.innerHTML = '<i class="fas fa-microphone"></i>';
                muteMyself.style.padding = '11px 18.4px 11px 18.4px';
            } else {
                muteMyself.innerHTML = '<i class="fas fa-microphone-slash"></i>';
                muteMyself.style.padding = '11px 13px 11px 13px';
            }
            audioTrack.enabled = !audioTrack.enabled;
        }
    }
});

pauseMyVideo.addEventListener('click', function() {
    let streams = rtcPeerConn.getLocalStreams();
    for (let stream of streams) {
        for (let videoTrack of stream.getVideoTracks()) {
            if (videoTrack.enabled) {
                pauseMyVideo.innerHTML = '<i class="fas fa-play"></i>';
            } else {
                pauseMyVideo.innerHTML = '<i class="fas fa-pause"></i>';
            }
            videoTrack.enabled = !videoTrack.enabled;
        }
    }
});

/* screen sharing */
const shareMyScreen = document.querySelector('#shareMyScreen');
shareMyScreen.addEventListener('click', function() {
    let shareScreenText = '<i class="fas fa-desktop"></i>';
    let stopShareScreenText = '<i class="fas fa-stop"></i>';

    if (shareMyScreen.innerHTML === shareScreenText) {
        let msg = 'Sharing my screen..';
        appendChatMessage(msg, 'message-in');
        //share the application window
        if (navigator.mediaDevices.getDisplayMedia) {
            //for chrome/firefox
            navigator.mediaDevices.getDisplayMedia({ video: true })
                .then((stream) => {
                smallVideoArea.srcObject = stream;
                stream.getTracks().forEach((track) => {
                    rtcPeerConn.addTrack(track, stream);
                });
            });
            shareMyScreen.innerHTML = stopShareScreenText;
            shareMyScreen.style.padding = '11px 17px 11px 17px';
        }
    } else {
        //reset the stream to user video
        let constraints = {
            audio: true,
            video: true
        };
        navigator.mediaDevices.getUserMedia(constraints)
            .then((stream) => {
                smallVideoArea.srcObject = stream;
                stream.getTracks().forEach((track) => {
                    rtcPeerConn.addTrack(track, stream);
                });
            })
            .catch((err) => {
                console.log(err);
            });
        shareMyScreen.innerHTML = shareScreenText;
        shareMyScreen.style.padding = '11px 15px 11px 15px';
    }
});
