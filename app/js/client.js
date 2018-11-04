window.addEventListener('load', () => {

    const formEl = $('.form');
    let displayName;

    // Local Video
    const localVideoEl = $('#localVid');

    const remoteVideosEl = $('#remoteVids');
    let extUsrCount = 0;

    // create our WebRTC connection
    const webrtc = new SimpleWebRTC({
        // the id/element dom element that will hold "our" video
        localVideoEl: 'localVid',
        // the id/element dom element that will hold remote videos
        remoteVideosEl: 'remoteVids',
        // immediately ask for camera access
        autoRequestMedia: true,
    });

    // We got access to local camera
    webrtc.on('localStream', () => {
        localVideoEl.show();
    });


    $('.submit').on('click', (event) => {
        displayName = $('#displayName').val();
        const roomKey = $('#roomKey').val().toLowerCase();
        if (event.target.id === 'create-btn') {
            createRoom(roomKey);
        } else {
            joinRoom(roomKey);
        }
        return false;
    });

    // Register new Chat Room
    const createRoom = (roomKey) => {
        console.info(`Creating new room: ${roomKey}`);
        webrtc.createRoom(roomKey, (err, name) => {

        });
    };

    // Join existing Chat Room
    const joinRoom = (roomKey) => {
        console.log(`Joining Room: ${roomKey}`);
        webrtc.joinRoom(roomKey);
    };

    // Remote video was added
    webrtc.on('videoAdded', (video, peer) => {
        console.log("here");
        const id = webrtc.getDomId(peer);
        if (extUsrCount === 0) {
            console.log("test1");
            remoteVideosEl.append('<video id=' + id + '></video>');
        } else {
            console.log("test2");
            remoteVideosEl.append('<video id=' + id + '></video>');
        }
        extUsrCount++;
    });
});