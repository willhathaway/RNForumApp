import React from "react";
import { ActivityIndicator, View, Text, StyleSheet } from "react-native";
import { SafeAreaView } from "react-navigation";
import { auth } from "../../../environment/config.js";

export default class Loading extends React.Component {
  componentDidMount() {
    auth.onAuthStateChanged((user) => {
      this.props.navigation.navigate(user ? "Home" : "SignUp");
    });
  }

  render() {
    return (
      <SafeAreaView>
        <View style={styles.container}>
          <Text>Loading</Text>
          <ActivityIndicator size="large" />
        </View>
      </SafeAreaView>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
});
