import React from "react";
import {
  Text,
  View,
  Dimensions,
  TouchableOpacity,
  StyleSheet,
  ImageBackground,
  SafeAreaView,
} from "react-native";
const { width, height } = Dimensions.get("window");

const Login = (props) => {


  return (
    <SafeAreaView style={styles.container}>
      <ImageBackground
        source={{
          uri:
            "https://i.pinimg.com/originals/a1/a8/f6/a1a8f6f20ccae29e4672862e6c930848.jpg",
        }}
        style={styles.backgroundImage}
      >
        <View
          style={{
            flex: 1,
            justifyContent: "center",
            alignItems: "center",
            width: Dimensions.get("window").width,
            height: Dimensions.get("window").height + 10,
            paddingBottom: 160,
          }}
        >
          <TouchableOpacity
            style={styles.button}
            onPress={props.onPressLogin}
            title="Login"
          >
            <Text style={styles.textWhite}>Log in</Text>
          </TouchableOpacity>

          <TouchableOpacity
            style={styles.button}
            onPress={props.onPressLogin}
            title="SignUp"
          >
            <Text style={styles.textWhite}>Sign up</Text>
          </TouchableOpacity>
        </View>
      </ImageBackground>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  textWhite: {
    color: "white",
    textTransform: "uppercase",
    fontWeight: "bold",
    fontSize: 11,
  },
  button: {
    alignItems: "center",
    backgroundColor: "darkgreen",
    padding: 10,
    borderRadius: 5,
    margin: 10,
    minWidth: 100,
  },
  backgroundImage: {
    flex: 1,
    resizeMode: "cover",
    justifyContent: "center",
  },
});

export default Login;
