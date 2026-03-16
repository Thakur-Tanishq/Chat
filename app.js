const firebaseConfig = {
  apiKey: "AIzaSyDykC9suuhhL8Krhui2t6npS-LJy_k_YFc",
  authDomain: "chat-e7b28.firebaseapp.com",
  databaseURL: "https://chat-e7b28-default-rtdb.firebaseio.com",
  projectId: "chat-e7b28"
};

firebase.initializeApp(firebaseConfig);

const db = firebase.database();

/* TEST CONNECTION */

db.ref("testConnection").set({
  message: "Website connected successfully"
});