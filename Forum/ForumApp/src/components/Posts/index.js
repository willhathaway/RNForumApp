import React from "react";
import { useCollection, useCollectionData } from "react-firebase-hooks/firestore";

import {
    StyleSheet,
    Text,
    View,
    SafeAreaView,
    Platform,
    Button,
    TouchableOpacity,
  } from "react-native";

  import UserPost from "../UserPost";
  import firebase from "firebase/app";


  const firestore = firebase.firestore();

  import { firebase } from "../../../environment/config";



