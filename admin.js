function adminTools(){

const panel=document.getElementById("adminPanel")

panel.innerHTML=`

<button onclick="clearChat()">Clear Chat</button>

`

}


function clearChat(){

if(confirm("Delete all messages?")){

firebase.database().ref("messages").remove()

document.getElementById("chat").innerHTML=""

}

}