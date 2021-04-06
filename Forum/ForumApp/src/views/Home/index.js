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
import navigation from "react-navigation";
import Icon from "react-native-vector-icons/Ionicons";

import Feed from "../../views/Feed";
import Header from "../../components/Header";
// import Header from "../../components/Header";

const { width, height } = Dimensions.get("window");

class Home extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      currentUser: auth.currentUser,
      errorMessage: null,
    };
    console.log("USER: ", this.state.currentUser);
    //console.log(Object.getOwnPropertyNames(props.navigation.actions));
  }
  // Logout function passed as prop to Header component:

  onPressLogOut = () => {
    auth
      .signOut()
      .then(() => this.props.navigation.navigate("Login"))
      .catch((error) => this.setState({ errorMessage: error.message }));
  };

  // Icon functions:

  menuIcon() {
    return (
      <Icon name="md-settings" color="#fff" style={styles.headerButtons} />
    );
  }
  userIcon() {
    return <Icon name="md-person" color="#fff" style={styles.headerButtons} />;
  }

  onPressLoadFeed = () => {
    this.props.navigation.push("Home");
  };

  onPressLoadPostView = (currentUser, postInfo) => {
    this.props.navigation.navigate("PostView", {
      currentUser: currentUser,
      postInfo: postInfo,
    });
  };

  render() {
    return (
      <View>
        <Feed
          headerOnPress={this.onPressLoadFeed}
          onPressLoadPostView={this.onPressLoadPostView}
          onPressLogOut={this.onPressLogOut}
        ></Feed>
      </View>
    );
  }
}

export default Home;
