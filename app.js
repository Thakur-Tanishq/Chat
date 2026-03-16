const firebaseConfig = {

apiKey:"AIzaSyDykC9suuhhL8Krhui2t6npS-LJy_k_YFc",
authDomain:"chat-e7b28.firebaseapp.com",
databaseURL:"https://chat-e7b28-default-rtdb.firebaseio.com",
projectId:"chat-e7b28"

};

firebase.initializeApp(firebaseConfig);

const db=firebase.database();

let username=""
let deviceId=localStorage.getItem("deviceId")

if(!deviceId){

deviceId=Math.random().toString(36)
localStorage.setItem("deviceId",deviceId)

}

function login(){

username=document.getElementById("username").value
const pass=document.getElementById("password").value

if(pass!=="aditi777" && pass!=="admin777"){

document.getElementById("error").innerText="Wrong password"
return

}

document.getElementById("login").style.display="none"
document.getElementById("chatPage").style.display="flex"

db.ref("online/"+deviceId).set(username)

window.onbeforeunload=()=>{

db.ref("online/"+deviceId).remove()

}

loadMessages()

}


db.ref("online").on("value",(snap)=>{

document.getElementById("online").innerText="Online: "+snap.numChildren()

})


function sendMessage(){

const text=document.getElementById("message").value

if(text==="") return

const time=new Date().toLocaleTimeString()

db.ref("messages").push({

user:username,
text:text,
time:time

})

document.getElementById("message").value=""

}


function loadMessages(){

db.ref("messages").on("child_added",(snap)=>{

const data=snap.val()

const div=document.createElement("div")

div.className="message"

if(data.user===username){

div.classList.add("me")

}else{

div.classList.add("other")

}

div.innerHTML=data.user+": "+data.text+" <span class='time'>"+data.time+"</span>"

document.getElementById("chat").appendChild(div)

})

}