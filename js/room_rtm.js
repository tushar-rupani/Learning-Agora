let handleMemberJoined = async(memberId) => {
    let members = await channel.getMembers();
    handleCount(members);
    addMemberToDom(memberId)
}

let addMemberToDom = async(memberId) => {
    console.warn("rtm", memberId);
    let {name} = await rtmClient.getUserAttributesByKeys(memberId, ['name'])
    let memberItem = `<div class="member__wrapper" id="member__${memberId}__wrapper">
                        <span class="green__icon"></span>
                        <p class="member_name">${name}</p>
                    </div>`;
    let listItem = document.getElementById("member__list");
    listItem.insertAdjacentHTML("beforeend", memberItem);

    // let members = await client.getMembers();
    // handleCount(members)
}

let handleMemberLeft = async (memberId) => {
    removeMemberFromRoom(memberId);
}

let getMember = async () => {
    let members = await channel.getMembers();
    handleCount(members)
    for(let i=0; i<members.length; i++){
        addMemberToDom(members[i])
    }
}

let handleCount = async(members) => {
    let count_tag = document.getElementById("members__count");
    count_tag.innerText = members.length;

}

let handleChatMessage = async(memberData, memberId) => {
    let messageData = JSON.parse(memberData.text);
   if(messageData.type == "chat"){
    addMessageToDOM(messageData.displayName, messageData.message)
   }
}

let removeMemberFromRoom = async (memberID) => {
    let members = await channel.getMembers();
    handleCount(members);
    let getMemberDetails = document.getElementById(`member__${memberID}__wrapper`);
    getMemberDetails.remove();
}

let leaveChannel = async () => {
    await channel.leave();
    await rtmClient.logout();
}


let sendMessage = async (e) => {
    e.preventDefault();
    let message = e.target.message.value;
    addMessageToDOM(displayName, message);
    channel.sendMessage({text: JSON.stringify({'type': 'chat', 'message': message, 'displayName': displayName})});
    // console.log("send message");
    e.target.reset()
}

let addMessageToDOM = async (userName, msg) => {

    let messageDiv = document.getElementById("messages");
    let newMessage = `<div class="message__wrapper">
                        <div class="message__body">
                            <strong class="message__author">${userName}</strong>
                            <p class="message__text">${msg}</p>
                        </div>
                    </div>`;
    messageDiv.insertAdjacentHTML("beforeend", newMessage);

    let lastMessage = document.querySelector("#messages .message__wrapper:last-child");
    if(lastMessage){
        lastMessage.scrollIntoView();
    }

}

document.getElementById('message__form').addEventListener("submit", sendMessage)
window.addEventListener("beforeunload", leaveChannel)