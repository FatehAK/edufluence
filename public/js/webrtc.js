io = io.connect();

var myName = '';
var theirName = '';
var myUserType = '';
var configuration = {
    iceServers: [{
        url: 'stun:stun.l.google.com:19302'
    }]
};
var rtcPeerConn;
var mainVideoArea = document.querySelector('#mainVideoTag');
var smallVideoArea = document.querySelector('#smallVideoTag');
var dataChannelOptions = {
    ordered: false,
    maxPacketLifeTime: 1000,
};
var dataChannel;

io.on('signal', function(data) {
    if (data.user_type === 'expert' && data.command === 'joinroom') {
        console.log('The expert is here!');
        if (myUserType === 'student') {
            theirName = data.user_name;
            document.querySelector('#messageOutName').textContent = theirName;
            document.querySelector('#messageInName').textContent = myName;
        }
        document.querySelector('#requestExpertForm').style.display = 'none';
        document.querySelector('#waitingForExpert').style.display = 'none';
        document.querySelector('#expertListing').style.display = 'block';
    }
    else if (data.user_type === 'student' && data.command === 'callexpert') {
        console.log('Student is calling');
        if (!rtcPeerConn) startSignaling();
        if (myUserType === 'expert') {
            theirName = data.user_name;
            document.querySelector('#messageOutName').textContent = theirName;
            document.querySelector('#messageInName').textContent = myName;
        }
        document.querySelector('#expertSignup').style.display = 'none';
        document.querySelector('#videoPage').style.display = 'block';
    }
    else if (data.user_type == 'signaling') {
        if (!rtcPeerConn) startSignaling();
        var message = JSON.parse(data.user_data);
        if (message.sdp) {
            rtcPeerConn.setRemoteDescription(new RTCSessionDescription(message.sdp), function() {
                if (rtcPeerConn.remoteDescription.type === 'offer' && myUserType === 'expert') {
                    rtcPeerConn.createAnswer(sendLocalDesc, logError);
                }
            }, logError);
        }
        else {
            rtcPeerConn.addIceCandidate(new RTCIceCandidate(message.candidate));
        }
    }
});

function startSignaling() {
    console.log('starting signaling...');
    rtcPeerConn = new webkitRTCPeerConnection(configuration);
    dataChannel = rtcPeerConn.createDataChannel('textMessages', dataChannelOptions);
    dataChannel.onopen = dataChannelStateChanged;
    rtcPeerConn.ondatachannel = receiveDataChannel;

    rtcPeerConn.onicecandidate = function(evt) {
        if (evt.candidate)
            io.emit('signal', {
                user_type: 'signaling',
                command: 'icecandidate',
                user_data: JSON.stringify({ candidate: evt.candidate })
            });
        console.log('completed sending an ice candidate...');
    };
    rtcPeerConn.onnegotiationneeded = function() {
        console.log('on negotiation called');
        if (myUserType === 'student') {
            rtcPeerConn.createOffer(sendLocalDesc, logError);
        }
    };
    rtcPeerConn.onaddstream = function(evt) {
        console.log('going to add their stream...');
        mainVideoArea.srcObject = evt.stream;
    };

    navigator.getUserMedia = navigator.getUserMedia || navigator.webkitGetUserMedia || navigator.mozGetUserMedia;
    navigator.getUserMedia({
        audio: true,
        video: true
    }, function(stream) {
        console.log('going to display my stream...');
        smallVideoArea.srcObject = stream;
        rtcPeerConn.addStream(stream);
    }, logError);
}
function sendLocalDesc(desc) {
    rtcPeerConn.setLocalDescription(desc, function() {
        console.log('sending local description');
        io.emit('signal', { 'user_type': 'signaling', 'command': 'SDP', 'user_data': JSON.stringify({ 'sdp': rtcPeerConn.localDescription }) });
    }, logError);
}

function logError(error) {
    console.log('error occured: ' + error);
}

var muteMyself = document.querySelector('#muteMyself');
var pauseMyVideo = document.querySelector('#pauseMyVideo');

muteMyself.addEventListener('click', function(evt) {
    console.log('muting/unmuting myself');
    var streams = rtcPeerConn.getLocalStreams();
    for (var stream of streams) {
        for (var audioTrack of stream.getAudioTracks()) {
            if (audioTrack.enabled) {
                muteMyself.innerHTML = 'Unmute'
            } else {
                muteMyself.innerHTML = 'Mute Myself'
            }
            audioTrack.enabled = !audioTrack.enabled;
        }
        console.log('Local stream: ' + stream.id);
    }
    evt.preventDefault();
});

pauseMyVideo.addEventListener('click', function(evt) {
    console.log('pausing/unpausing my video');
    var streams = rtcPeerConn.getLocalStreams();
    for (var stream of streams) {
        for (var videoTrack of stream.getVideoTracks()) {
            if (videoTrack.enabled) {
                pauseMyVideo.innerHTML = 'Start Video'
            } else {
                pauseMyVideo.innerHTML = 'Pause Video'
            }
            videoTrack.enabled = !videoTrack.enabled;
        }
        console.log('Local stream: ' + stream.id);
    }
    evt.preventDefault();
});

var messageHolder = document.querySelector('#messageHolder');
var myMessage = document.querySelector('#myMessage');
var sendMessage = document.querySelector('#sendMessage');
var receivedFileName;
var receivedFileSize;
var fileBuffer = [];
var fileSize = 0;
var fileTransferring = false;

function dataChannelStateChanged() {
    if (dataChannel.readyState === 'open') {
        console.log('Data Channel open');
        dataChannel.onmessage = receiveDataChannelMessage;
    }
}

function receiveDataChannel(evt) {
    console.log('Receiving a data channel');
    dataChannel = evt.channel;
    dataChannel.onmessage = receiveDataChannelMessage;
}

function receiveDataChannelMessage(evt) {
    console.log('From DataChannel: ' + evt.data);
    if (fileTransferring) {
        fileBuffer.push(evt.data);
        fileSize += evt.data.byteLength;
        fileProgress.value = fileSize;
        if (fileSize === receivedFileSize) {
            var received = new window.Blob(fileBuffer);
            fileBuffer = [];
            downloadLink.href = URL.createObjectURL(received);
            downloadLink.download = receivedFileName;
            downloadLink.appendChild(document.createTextNode(receivedFileName + '(' + fileSize + ') bytes'));
            fileTransferring = false;
            var linkTag = document.createElement('a');
            linkTag.href = URL.createObjectURL(received);
            linkTag.download = receivedFileName;
            linkTag.appendChild(document.createTextNode(receivedFileName));
            var div = document.createElement('div');
            div.className = 'message-out';
            div.appendChild(linkTag);
            messageHolder.appendChild(div);
        }
    }
    else {
        appendChatMessage(evt.data, 'message-out');
    }
}

sendMessage.addEventListener('click', function(evt) {
    dataChannel.send(myMessage.value);
    appendChatMessage(myMessage.value, 'message-in');
    myMessage.value = '';
    evt.preventDefault();
});

function appendChatMessage(msg, className) {
    var div = document.createElement('div');
    div.className = className;
    div.innerHTML = '<span>' + msg + '</span>';
    messageHolder.appendChild(div);
}

var sendFile = document.querySelector('#sendFile');
var fileProgress = document.querySelector('#fileProgress');
var downloadLink = document.querySelector('#receivedFileLink');

io.on('files', function(data) {
    receivedFileName = data.filename;
    receivedFileSize = data.filesize;
    console.log('File on the way is ' + receivedFileName + ' (' + receivedFileSize + ')');
    fileTransferring = true;
});

sendFile.addEventListener('change', function() {
    var file = sendFile.files[0];
    console.log('sending file ' + file.name + ' (' + file.size + ') ...');
    io.emit('files', {
        filename: file.name,
        filesize: file.size
    });
    appendChatMessage("sending " + file.name, 'message-in');
    fileTransferring = true;

    fileProgress.max = file.size;
    var chunkSize = 16384;
    var sliceFile = function(offset) {
        var reader = new window.FileReader();
        reader.onload = (function() {
            return function(e) {
                dataChannel.send(e.target.result);
                if (file.size > offset + e.target.result.byteLength) {
                    window.setTimeout(sliceFile, 0, offset + chunkSize);
                }
                fileProgress.value = offset + e.target.result.byteLength;
            };
        })(file);
        var slice = file.slice(offset, offset + chunkSize);
        reader.readAsArrayBuffer(slice);
    };
    sliceFile(0);
    fileTransferring = false;
});

var shareMyScreen = document.querySelector('#shareMyScreen');
shareMyScreen.addEventListener('click', function(evt) {
    shareScreenText = 'Share Screen';
    stopShareScreenText = 'Stop Sharing';
    console.log('Screen share button text: ' + shareMyScreen.innerHTML)
    if (shareMyScreen.innerHTML == shareScreenText) {
        var msg = 'Sharing my screen...';
        appendChatMessage(msg, 'message-in');
        getScreenMedia(function(err, stream) {
            if (err) {
                console.log('failed: ' + err);
            } else {
                console.log('got a stream', stream);
                smallVideoArea.srcObject = stream;
                rtcPeerConn.addStream(stream);
            }
        });

        shareMyScreen.innerHTML = stopShareScreenText;
    }
    else {
        console.log('Resetting my stream to video...');
        navigator.getUserMedia = navigator.getUserMedia || navigator.webkitGetUserMedia || navigator.mozGetUserMedia;
        navigator.getUserMedia({
            audio: true,
            video: true
        }, function(stream) {
            console.log('going to display my stream...');
            smallVideoArea.srcObject = stream;
            rtcPeerConn.addStream(stream);
        }, logError);
        shareMyScreen.innerHTML = shareScreenText;
    }
    evt.preventDefault();
});
