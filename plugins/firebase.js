import * as firebase from 'firebase';
import "firebase/database"
var firebaseConfig = {
apiKey: "AIzaSyB7QPTH_3jMBfomyrrXTxvR6jaK-ZbTebA",
authDomain: "maps-81d0d.firebaseapp.com",
databaseURL: "https://maps-81d0d.firebaseio.com",
projectId: "maps-81d0d",
storageBucket: "maps-81d0d.appspot.com",
messagingSenderId: "847130352877",
appId: "1:847130352877:web:86504a978045c35054c0e4",
measurementId: "G-RGRE6KFCC6"
};

if (!firebase.apps.length) {
    firebase.initializeApp(firebaseConfig);
}


export const db=firebase.database();