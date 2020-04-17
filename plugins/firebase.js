import * as firebase from "firebase/app";
import "firebase/database";
import "firebase/auth";

var firebaseConfig = {
  apiKey: "AIzaSyAvHA6cyIVTlcJsiJuwhrtq94kD0joZwfQ",
  authDomain: "map-nuxt.firebaseapp.com",
  databaseURL: "https://map-nuxt.firebaseio.com",
  projectId: "map-nuxt",
  storageBucket: "map-nuxt.appspot.com",
  messagingSenderId: "452009137175",
  appId: "1:452009137175:web:0864428e9166078f4c7852",
  measurementId: "G-2F8E3FP42Q"
};

if (!firebase.apps.length) {
  firebase.initializeApp(firebaseConfig);
}

export const db = firebase.database();
export const auth = firebase.auth();

export const provider = new firebase.auth.FacebookAuthProvider();
