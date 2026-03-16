function adminTools(){

const panel=document.getElementById("adminPanel")

panel.innerHTML=`

<button onclick="clearChat()">Clear Chat</button>
<button onclick="banUser()">Ban User</button>
<button onclick="changeTitle()">Rename Site</button>

`

}


function clearChat(){

if(confirm("Delete all chat?")){

firebase.database().ref("messages").remove()

}

}


function changeTitle(){

const name=prompt("New website name")

if(name){

document.title=name

}

}


function banUser(){

const name=prompt("Username to ban")

if(name){

firebase.database().ref("banned/"+name).set(true)

}

}