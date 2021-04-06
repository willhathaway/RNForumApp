import React from "react";
import {
  View,
  Text,
  TextInput,
  Button,
  StyleSheet,
  ImageBackground,
  Image,
  Dimensions,
  TouchableOpacity,
} from "react-native";
import { SafeAreaView } from "react-navigation";
import { auth } from "../../../environment/config";
import Header from "../../components/Header";

export default class Login extends React.Component {
  state = { email: "", password: "", errorMessage: null };
  handleLogin = () => {
    // TODO: Firebase stuff...
    console.log("handleLogin");
    auth
      .signInWithEmailAndPassword(this.state.email, this.state.password)
      .then(() => this.props.navigation.navigate("Home"))
      .catch((error) => this.setState({ errorMessage: error.message }));
  };
  render() {
    return (
      <SafeAreaView style={{ color: "black" }}>
        <Header />

        <ImageBackground
          source={require("../../../assets/tempLoginBackground.jpg")}
          style={{ width: "100%", height: "100%" }}
        >
          <View style={styles.container}>
            <View style={styles.headingSection}>
              <Image
                source={require("../../../assets/icon.png")}
                style={{ width: 100, height: 100, backgroundColor: "black" }}
              />
            </View>
            <Text style={styles.heading}>Login</Text>
            {this.state.errorMessage && (
              <Text style={{ color: "red" }}>{this.state.errorMessage}</Text>
            )}
            <TextInput
              placeholder="Email"
              autoCapitalize="none"
              style={styles.textInput}
              onChangeText={(email) => this.setState({ email })}
              value={this.state.email}
            />
            <TextInput
              secureTextEntry
              placeholder="Password"
              autoCapitalize="none"
              style={styles.textInput}
              onChangeText={(password) => this.setState({ password })}
              value={this.state.password}
            />
            <TouchableOpacity onPress={this.handleLogin}>
              <View style={styles.signupBtn}>
                <Text style={styles.buttonText}>Log In</Text>
              </View>
            </TouchableOpacity>
            <Button
              title="Don't have an account? Sign Up"
              color="white"
              onPress={() => this.props.navigation.navigate("SignUp")}
            />
          </View>
        </ImageBackground>
      </SafeAreaView>
    );
  }
}
const heightConst = Dimensions.get("screen").height;
const styles = StyleSheet.create({
  container: {
    height: heightConst - 50,
    justifyContent: "center",
    alignItems: "center",
  },
  headingSection: {
    borderColor: 1,
    textAlign: "center",
    alignItems: "center",
    marginBottom: 35,
  },
  heading: {
    color: "#fff",
    fontSize: 26,
    marginBottom: 10,
  },
  textInput: {
    height: 40,
    width: "90%",
    borderColor: "#fff",
    borderWidth: 1,
    marginTop: 8,
    backgroundColor: "white",
  },
  signupBtn: {
    borderRadius: 5,
    marginBottom: 5,
    backgroundColor: "black",
    borderWidth: 1,
    borderColor: "white",
    width: 100,
    height: 35,
    overflow: "hidden",
    alignItems: "center",
    justifyContent: "center",
    marginTop: 10,
  },
  buttonText: {
    color: "white",
    fontWeight: "bold",
    textAlign: "center",
  },
});
