// import * as firebase from 'firebase';
import firebase from 'firebase';
import "firebase/auth";
import "firebase/firestore";


const firebaseConfig = {
    apiKey: "AIzaSyBiGeoNSc1Wfz-3RH96JUmJbNL1qiLeD4s",
    authDomain: "react-native-4a59f.firebaseapp.com",
    projectId: "react-native-4a59f",
    storageBucket: "react-native-4a59f.appspot.com",
    messagingSenderId: "1021164128606",
    appId: "1:1021164128606:web:79ac721917155ce6e8a7cf"
  };

let app;

if(firebase.apps.length === 0) {
 app = firebase.initializeApp(firebaseConfig);
  
} else {
  app = firebase.app();
}


const db = app.firestore();
const auth = firebase.auth();

export {db, auth}