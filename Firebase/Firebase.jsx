import  firebase from 'firebase'
const firebaseConfig = {
    apiKey: process.env.REACT_APP_FIREBASE_APIKEY,
    authDomain: "todo-47f75.firebaseapp.com",
    projectId: "todo-47f75",
    storageBucket: "todo-47f75.appspot.com",
    messagingSenderId: "1062867377325",
    appId: "1:1062867377325:web:5f8109a78d3e108d7e3a24",
    measurementId: "G-Y641ZMCWJL"
  };
  
  firebase.initializeApp(firebaseConfig);
  export default firebase;

