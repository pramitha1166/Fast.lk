import firebase from "firebase/app";
import "firebase/storage";

const firebaseConfig = {
    apiKey: "AIzaSyBpOZLgIfMadE2MOSxyWD_nBSAUXgmBT-Q",
    authDomain: "fastlk.firebaseapp.com",
    projectId: "fastlk",
    storageBucket: "fastlk.appspot.com",
    messagingSenderId: "1049857635546",
    appId: "1:1049857635546:web:ce6b96b7ff222a3f0721e3",
    measurementId: "G-86S83TYFP2"
};

firebase.initializeApp(firebaseConfig);

const storageRef = firebase.storage().ref();
const storageRef2 = firebase.storage();


export {storageRef, storageRef2, firebase as default};
