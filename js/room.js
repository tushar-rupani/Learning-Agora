let messagesContainer = document.getElementById('messages');
messagesContainer.scrollTop = messagesContainer.scrollHeight;

const memberContainer = document.getElementById('members__container');
const memberButton = document.getElementById('members__button');

const chatContainer = document.getElementById('messages__container');
const chatButton = document.getElementById('chat__button');

let activeMemberContainer = false;

memberButton.addEventListener('click', () => {
  if (activeMemberContainer) {
    memberContainer.style.display = 'none';
  } else {
    memberContainer.style.display = 'block';
  }

  activeMemberContainer = !activeMemberContainer;
});

let activeChatContainer = false;

chatButton.addEventListener('click', () => {
  if (activeChatContainer) {
    chatContainer.style.display = 'none';
  } else {
    chatContainer.style.display = 'block';
  }
  activeChatContainer = !activeChatContainer;
});

let displayFrame = document.getElementById("stream_box");
let videoFrames = document.getElementsByClassName('video__container');
let userIdInDisplayFrame = null;

const expandVideoFrame = (e) => {
  let child = displayFrame.children[0];

  if(child){
    document.getElementById("streams__container").appendChild(child);
  }
  displayFrame.style.display = "block";
  displayFrame.appendChild(e.currentTarget);
  userIdInDisplayFrame = e.currentTarget.id;
  for(var i=0; i<videoFrames.length; i++){
    if(userIdInDisplayFrame != videoFrames[i].id){
      videoFrames[i].style.height = "100px";
      videoFrames[i].style.width = "100px";
    }
  }

}
for(var i=0; i<videoFrames.length; i++){
  console.log(videoFrames[i]);
  videoFrames[i].addEventListener("click", expandVideoFrame);
}