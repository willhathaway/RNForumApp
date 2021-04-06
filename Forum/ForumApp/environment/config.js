//import * as firebase from 'firebase';

import firebase from "firebase/app";
import "firebase/firestore";
import "firebase/auth";
// import auth from '@react-native-firebase/auth';

import { useAuthState } from "react-firebase-hooks/auth";
import { useCollectionData } from "react-firebase-hooks/firestore";

// Initialize Firebase
const firebaseConfig = {
  apiKey: "AIzaSyApfP6Rgc1lq3DqdZBaDmjf3y9HMbUIkJM",
  authDomain: "hedera-413.firebaseapp.com",
  projectId: "hedera-413",
  storageBucket: "hedera-413.appspot.com",
  messagingSenderId: "439037947824",
  appId: "1:439037947824:web:fe80c35ffa90c89c2bf075",
  measurementId: "G-J2WZ5CD9ZW",
};

const firebaseApp = firebase.initializeApp(firebaseConfig);

const auth = firebaseApp.auth();

const firestore = firebaseApp.firestore();

let firestorePosts = firestore.collection("posts");
let firestoreReplies = firestore.collection("replies");

export { auth, firestorePosts, firestoreReplies };
