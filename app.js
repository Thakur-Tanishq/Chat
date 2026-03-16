const firebaseConfig = {
  apiKey:"AIzaSyDykC9suuhhL8Krhui2t6npS-LJy_k_YFc",
  authDomain:"chat-e7b28.firebaseapp.com",
  databaseURL:"https://chat-e7b28-default-rtdb.firebaseio.com",
  projectId:"chat-e7b28"
};

firebase.initializeApp(firebaseConfig);

const db = firebase.database();

let username = "";

/* DEVICE ID */

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

document.getElementById("lockPage").style.display="none";
document.getElementById("chatPage").style.display="flex";

/* ONLINE SYSTEM */

const onlineRef = db.ref("online/" + deviceId);

onlineRef.set(username);

onlineRef.onDisconnect().remove();

/* LOAD CHAT */

loadMessages();

}

/* ONLINE COUNT */

db.ref("online").on("value", (snap)=>{

document.getElementById("online").innerText = "Online: " + snap.numChildren();

});

/* SEND MESSAGE */

function sendMessage(){

const input = document.getElementById("message");
const text = input.value.trim();

if(text === "") return;

db.ref("messages").push({
user: username,
text: text
})
.then(()=>{
input.value="";
})
.catch((error)=>{
console.error("Message failed:", error);
alert("Message failed to send");
});

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

const chat = document.getElementById("chat");
chat.scrollTop = chat.scrollHeight;

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