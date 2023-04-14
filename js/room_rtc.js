const APP_ID = "c3a2a675fb39475bbaa105d673975727";

let uid = sessionStorage.getItem("uid");
if(!uid){
    uid = String(Math.floor(Math.random() * 10000));
    sessionStorage.setItem("uid", uid)
}

let token = null;
let client;


const queryString = window.location.search;
const urlParams = new URLSearchParams(queryString);
let roomId = urlParams.get('room');

if(!roomId){
    roomId = "main";
}

let localTracks = [];
let remoteUsers = {};


let joinRoomInit = async() => {
    client = AgoraRTC.createClient({mode: "rtc", codec: "vp8"});
    try{
        await client.join(APP_ID, roomId, token, uid);
        client.on("user-published", handleUserPublished);
        client.on("user-left", handleUserLeft);
        joinStream();
    }catch(e){
        console.log(e)
    }
}


let joinStream = async() => {
    localTracks = await AgoraRTC.createMicrophoneAndCameraTracks();
    let player = ` <div class="video__container" id="user-container-${uid}">
                        <div class="video-player" id="user-${uid}";
                    </div>`;
    document.getElementById("streams__container").insertAdjacentHTML("beforeend", player);
    document.getElementById(`user-container-${uid}`).addEventListener("click", expandVideoFrame)
    localTracks[1].player(`user-${uid}`);
    await client.publish([localTracks[0], localTracks[1]]);

}

let handleUserPublished = async(user, mediaType) => {
    remoteUsers[user.uid] = user; //Storing remote user's data into the Array.
    await client.subscribe(user, mediaType) // Subscribing the remote user to client.
    let player = document.getElementById(`user-container-${user.uid}`);
    if(player == null){
        player = ` <div class="video__container" id="user-container-${uid}">
                        <div class="video-player" id="user-${uid}";
                    </div>`;
    document.getElementById("streams__container").insertAdjacentHTML("beforeend", player);
    document.getElementById(`user-container-${user.uid}`).addEventListener("click", expandVideoFrame)

    }

    if(displayFrame.style.display){
        player.style.height = "100px"
        player.style.width = "100px"
    }

    if(mediaType == "video"){
        user.videoTrack.play(`user-${user.id}`)
    }else{user.audioTrack.play();
    }

}


let handleUserLeft = async(user) => {
    delete remoteUsers[user.uid];
    document.getElementById(`user-container-${user.uid}`).remove();
}

joinRoomInit();