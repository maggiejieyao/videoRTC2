window.addEventListener('load', () => {

    const formEl = $('.form');
    let displayName;
    let roomExist = false;

    // Local Video
    const localVideoEl = $('#me');

    const remoteVideosEl = $('#remote');
    let extUsrCount = 0;

    // create our WebRTC connection
    const webrtc = new SimpleWebRTC({
        // the id/element dom element that will hold "our" video
        localVideoEl: 'me',
        // the id/element dom element that will hold remote videos
        remoteVideosEl: 'remote',
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
        if (event.target.id === 'createBtn') {
            if (roomKey != "" && displayName != "") {
                createRoom(roomKey);
                roomExist = true;
            } else if (roomKey == "") {
                alert("Please enter the room number");
            } else if (displayName == "") {
                alert("Please enter a name");
            }

        } else if (event.target.id === 'joinBtn') {
            if (roomExist) {
                joinRoom(roomKey);
            } else {
                alert("Please create a room first");
            }

        };
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

    
    // Add remote video
    webrtc.on('videoAdded', (video, peer) => {
        console.log("here");
        const id = webrtc.getDomId(peer);
        if (extUsrCount === 0) {
            console.log("user 1");
            remoteVideosEl.append('<video id=' + id + '></video>');
        } else {
            console.log("user 2");
            remoteVideosEl.append('<video id=' + id + '></video>');
        }
        extUsrCount++;
    });
});