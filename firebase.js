import * as firebase from "firebase";
import "firebase/firestore";
import "firebase/auth";
import "firebase/storage";


const firebaseConfig = {
    apiKey: "AIzaSyB27D8N8faDjCG3wp2MMkROOAG_xfmNfbo",
    authDomain: "metering-app.firebaseapp.com",
    projectId: "metering-app",
    storageBucket: "metering-app.appspot.com",
    messagingSenderId: "390734720929",
    appId: "1:390734720929:web:ab07173e61890620e1e5e0"
};

let app;

if (firebase.apps.length === 0) {
    app = firebase.initializeApp(firebaseConfig);
} else {
    app = firebase.app();
}

const db = app.firestore();
const auth = firebase.auth();
const storage = app.storage();

export { db, auth, storage }


