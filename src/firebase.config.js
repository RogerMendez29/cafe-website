import {getApp, getApps, initializeApp} from "firebase/app"
import {getFirestore} from "firebase/firestore"
import {getStorage} from "firebase/storage"



const firebaseConfig = {
    apiKey: "AIzaSyAg_D568f_-DFHc7dUvjskVbpOtueigTvM",
    authDomain: "cafe-masaryktown.firebaseapp.com",
    databaseURL: "https://cafe-masaryktown-default-rtdb.firebaseio.com",
    projectId: "cafe-masaryktown",
    storageBucket: "cafe-masaryktown.appspot.com",
    messagingSenderId: "610084304340",
    appId: "1:610084304340:web:77a09f661b7cfaec1cd241",
    measurementId: "G-QMRQ8BFWXW"
  };

  const app= getApps.Length  > 0? getApp():initializeApp(firebaseConfig)
  const firestore = getFirestore(app)
  const storage = getStorage(app)

  export {app,firestore,storage}; 