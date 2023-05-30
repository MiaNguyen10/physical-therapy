// v8
// import firebase from 'firebase/compat/app';
// import 'firebase/compat/storage';
// v9
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
import { getStorage, connectStorageEmulator } from "firebase/storage";

// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
    apiKey: "AIzaSyDNb_V8JJfAAmqhmOro-X3vd87VdQ8nxXs",
    authDomain: "healthcaresystem-98b8d.firebaseapp.com",
    projectId: "healthcaresystem-98b8d",
    storageBucket: "healthcaresystem-98b8d.appspot.com",
    messagingSenderId: "326310710211",
    appId: "1:326310710211:web:66f620a8761893a7c18b76",
    measurementId: "G-JYE9K0SJMB"
};

const firebase = initializeApp(firebaseConfig);
const analytics = getAnalytics(firebase);

const storage = getStorage(firebase);
// if (location.hostname === "localhost") {
//     // Point to the Storage emulator running on localhost.
//     connectStorageEmulator(storage, "localhost", 9199);
// }

export { analytics as fanalytics, storage as fstorage, firebase };