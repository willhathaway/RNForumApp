// React Native imports:

import { StatusBar } from "expo-status-bar";
import React from "react";
import {
  StyleSheet,
  Text,
  View,
  SafeAreaView,
  Platform,
  Button,
  TouchableOpacity,
} from "react-native";

// Original project components:

import Login from "./src/views/Login/index.js";
import Header from "./src/components/Header";

// External package imports:

// firebase:
import firebase from "firebase/app";
import "firebase/firestore";
import "firebase/auth";
import { useAuthState } from "react-firebase-hooks/auth";
import { useCollectionData } from "react-firebase-hooks/firestore";

// Functions and variables:

if (!firebase.apps.length) {
  firebase.initializeApp({
    // config:
    apiKey: "AIzaSyApfP6Rgc1lq3DqdZBaDmjf3y9HMbUIkJM",
    authDomain: "hedera-413.firebaseapp.com",
    projectId: "hedera-413",
    storageBucket: "hedera-413.appspot.com",
    messagingSenderId: "439037947824",
    appId: "1:439037947824:web:fe80c35ffa90c89c2bf075",
    measurementId: "G-J2WZ5CD9ZW",
  });
}

const auth = firebase.auth();
const firestore = firebase.firestore();

const [user] = useAuthState(auth);

// SignIn component:

function SignIn() {
  const signInWithGoogle = () => {
    const provider = new firebase.auth().GoogleAuthProvider();
    auth.signInWithPopup(provider);
  };
  return (
    <TouchableOpacity onPress={signInWithGoogle}>Sign in</TouchableOpacity>
  );
}

// SignOut component:

function SignOut() {
  return (
    auth.currentUser && <Button onPress={() => auth.signOut()}>Sign out</Button>
  );
}


export default function App() {
  return (
    <SafeAreaView style={styles.container}>
      <Header />
      <View>{user ? <Feed /> : <SignIn />}</View>

      <StatusBar style="auto" />
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
    alignItems: "center",
    justifyContent: "center",
    paddingTop: Platform.OS === "android" ? StatusBar.currentHeight : 0,
  },
});
