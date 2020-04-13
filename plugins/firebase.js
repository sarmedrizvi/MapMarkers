import * as firebase from "firebase";
import "firebase/database";
var firebaseConfig = {
  apiKey: "AIzaSyAyGe1aYA8PS08SZ6At1uyAoXhVORtplqA",
  authDomain: "map-nuxtjs.firebaseapp.com",
  databaseURL: "https://map-nuxtjs.firebaseio.com",
  projectId: "map-nuxtjs",
  storageBucket: "map-nuxtjs.appspot.com",
  messagingSenderId: "326348824160",
  appId: "1:326348824160:web:8b14886daa2ea9dd286d05",
  measurementId: "G-KYG2GLKGN8"
};

if (!firebase.apps.length) {
  firebase.initializeApp(firebaseConfig);
}

export const db = firebase.database();
