// React Native imports:
import React, { Fragment } from "react";
import { createSwitchNavigator, createAppContainer } from "react-navigation";

import { NavigationContainer } from "@react-navigation/native";
import { createStackNavigator } from "@react-navigation/stack";

// Original project components:

import Login from "./src/views/Login/index.js";
import Home from "./src/views/Home/index.js";
import Loading from "./src/views/Loading/index.js";
import SignUp from "./src/views/SignUp/index.js";
import Feed from "./src/views/Feed/index.js";
import PostView from "./src/views/PostView/index.js";

// SwitchNavigator creates the login flow:

const Stack = createStackNavigator();

export default function App() {
  return (
    <NavigationContainer>
      <Stack.Navigator
        initialRouteName="Home"
        screenOptions={{ animationEnabled: false, headerShown: false }}
      >
        <Stack.Screen name="Loading" component={Loading} />
        <Stack.Screen name="SignUp" component={SignUp} />
        <Stack.Screen name="Login" component={Login} />
        <Stack.Screen name="Home" component={Home} />
        <Stack.Screen name="Feed" component={Feed} />
        <Stack.Screen name="PostView" component={PostView} />
      </Stack.Navigator>
    </NavigationContainer>
  );
}
