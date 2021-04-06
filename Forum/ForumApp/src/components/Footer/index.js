import React from "react";
import {
  Text,
  View,
  Button,
  Dimensions,
  StyleSheet,
  TouchableOpacity,
  SafeAreaView,
} from "react-native";
const { width, height } = Dimensions.get("window");

export default function Footer(props) {
  return (
    <SafeAreaView
      style={{
        width: width,
        height: height / 6,
        marginBottom: 0,
        backgroundColor: "black",
      }}
    >
      <View>{props.comp}</View>
    </SafeAreaView>
  );
}
