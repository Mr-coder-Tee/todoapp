import  firebase from 'firebase'

const firebaseConfig = {
  apiKey: "AIzaSyC69HlC0wk7940P_RL4YEVvm3r4mGQEGvE",
  authDomain: "todo-47f75.firebaseapp.com",
  databaseURL: "https://todo-47f75-default-rtdb.firebaseio.com",
  projectId: "todo-47f75",
  storageBucket: "todo-47f75.appspot.com",
  messagingSenderId: "1062867377325",
  appId: "1:1062867377325:web:4696a9c3c01207f27e3a24",
  measurementId: "G-CS60C1K7KC"
};
  
  firebase.initializeApp(firebaseConfig);
  export default firebase;

