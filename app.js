const firebaseConfig = {
  apiKey: "AIzaSyDykC9suuhhL8Krhui2t6npS-LJy_k_YFc",
  authDomain: "chat-e7b28.firebaseapp.com",
  databaseURL: "https://chat-e7b28-default-rtdb.firebaseio.com",
  projectId: "chat-e7b28",
  storageBucket: "chat-e7b28.firebasestorage.app",
  messagingSenderId: "276902406806",
  appId: "1:276902406806:web:1b7bab41defb69e3a770b7"
};

firebase.initializeApp(firebaseConfig);
const db = firebase.database();

let username="";

const chat=document.getElementById("chat");
const typingDiv=document.getElementById("typing");


/* LOGIN */

function login(){

const pass=document.getElementById("password").value;
username=document.getElementById("username").value;

if(pass==="aditi777" && username!=""){

document.getElementById("lockPage").style.display="none";
document.getElementById("chatPage").style.display="flex";

db.ref("online/"+username).set(true);

startChat();

}else{

document.getElementById("error").innerText="Wrong password or username";

}

}


/* ONLINE USERS */

db.ref("online").on("value",(snap)=>{

document.getElementById("online").innerText="Online: "+snap.numChildren();

});


/* CHAT */

function startChat(){

db.ref("messages").on("child_added",(snap)=>{

const data=snap.val();

const div=document.createElement("div");

div.classList.add("message");

if(data.user===username){

div.classList.add("me");

}else{

div.classList.add("other");

db.ref("messages/"+snap.key+"/seen").set(true);

}

let tick="";

if(data.user===username){

tick=data.seen ? "✓✓" : "✓";

}

div.innerHTML=data.user+": "+data.text+" <span class='tick'>"+tick+"</span>";

chat.appendChild(div);

chat.scrollTop=chat.scrollHeight;

});

}


/* SEND */

function sendMessage(){

const text=document.getElementById("message").value;

if(text==="") return;

const id=Date.now();

db.ref("messages/"+id).set({

user:username,
text:text,
seen:false

});

document.getElementById("message").value="";

}


/* TYPING */

function typing(){

db.ref("typing").set(username+" typing...");

setTimeout(()=>{

db.ref("typing").set("");

},1000);

}

db.ref("typing").on("value",(snap)=>{

typingDiv.innerText=snap.val();

});


/* CLEAR */

function clearChat(){

if(confirm("Delete all messages?")){

db.ref("messages").remove();
chat.innerHTML="";

}

}