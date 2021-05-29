import * as firebase from "firebase";
import "firebase/firestore";
import "firebase/auth";
import "firebase/storage";


const firebaseConfig = {
  apiKey: "AIzaSyAu5TTjQQ_wEtDa6RKxwfSPn12Z2p3OlXI",
  authDomain: "metering-2.firebaseapp.com",
  projectId: "metering-2",
  storageBucket: "metering-2.appspot.com",
  messagingSenderId: "210246229344",
  appId: "1:210246229344:web:12e5a2c1d7d4358ea65205"
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


