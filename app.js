// FIREBASE CONFIG
<script src="https://www.gstatic.com/firebasejs/8.10.1/firebase-app.js"></script>
<script src="https://www.gstatic.com/firebasejs/8.10.1/firebase-database.js"></script>

<script src="app.js"></script>

let username = "";

/* DEVICE ID (prevent duplicate online count) */
let deviceId = localStorage.getItem("deviceId");

if(!deviceId){
deviceId = Math.random().toString(36).substring(2);
localStorage.setItem("deviceId", deviceId);
}

/* LOGIN */
function login(){

username = document.getElementById("username").value.trim();
const pass = document.getElementById("password").value;

if(username === ""){
document.getElementById("error").innerText = "Enter username";
return;
}

if(pass !== "aditi777"){
document.getElementById("error").innerText = "Wrong password";
return;
}

document.getElementById("lockPage").style.display = "none";
document.getElementById("chatPage").style.display = "flex";

/* ONLINE SYSTEM */
const onlineRef = db.ref("online/" + deviceId);

onlineRef.set(username);
onlineRef.onDisconnect().remove();

/* LOAD CHAT */
loadMessages();

}

/* ONLINE COUNT */
db.ref("online").on("value",(snap)=>{
document.getElementById("online").innerText = "Online: " + snap.numChildren();
});

/* SEND MESSAGE */
function sendMessage(){

const input = document.getElementById("message");
const text = input.value.trim();

if(text === "") return;

db.ref("messages").push({
user: username,
text: text,
time: Date.now()
});

input.value = "";

}

/* LOAD MESSAGES */
function loadMessages(){

db.ref("messages").on("child_added",(snap)=>{

const data = snap.val();

const div = document.createElement("div");
div.classList.add("message");

if(data.user === username){
div.classList.add("me");
}else{
div.classList.add("other");
}

div.innerText = data.user + ": " + data.text;

document.getElementById("chat").appendChild(div);

/* AUTO SCROLL */
document.getElementById("chat").scrollTop =
document.getElementById("chat").scrollHeight;

});

}

/* CLEAR CHAT */
function clearChat(){
db.ref("messages").remove();
document.getElementById("chat").innerHTML = "";
}

/* ENTER KEY SEND */
document.addEventListener("keypress",(e)=>{
if(e.key === "Enter"){
sendMessage();
}
});
db.ref("connectionTest").set({
status:"connected"
});