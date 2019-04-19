import firebase from "firebase/app";

// Initialize Firebase
const config = {
  apiKey: "AIzaSyCGJhTkW7NxJLGE-ElhEKW-k42iwm3l8B4",
  authDomain: "spititout-effd1.firebaseapp.com",
  databaseURL: "https://spititout-effd1.firebaseio.com",
  projectId: "spititout-effd1",
  storageBucket: "spititout-effd1.appspot.com",
  messagingSenderId: "692119336142"
};

firebase.initializeApp(config);

export default firebase;
