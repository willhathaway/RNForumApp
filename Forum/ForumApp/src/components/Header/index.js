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
import Icon from "react-native-vector-icons/Ionicons";

export default class Header extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      headerOnPress: props.headerOnPress,
    };
  }

  menuIcon() {
    return (
      <Icon name="md-settings" color="#fff" style={styles.headerButtons} />
    );
  }
  userIcon() {
    return <Icon name="md-person" color="#fff" style={styles.headerButtons} />;
  }

  render() {
    return (
      <SafeAreaView style={styles.header}>
        <TouchableOpacity onPress={this.props.onPressLogOut} title="SignOut">
          <SafeAreaView style={styles.headerViews}>
            {this.menuIcon()}
          </SafeAreaView>
        </TouchableOpacity>
        <SafeAreaView style={styles.headerViews}>
          <TouchableOpacity onPress={this.state.headerOnPress}>
            <Text style={styles.headerText}>HEDERA</Text>
          </TouchableOpacity>
        </SafeAreaView>
        <TouchableOpacity>
          <SafeAreaView style={styles.headerViews}>
            {this.userIcon()}
          </SafeAreaView>
        </TouchableOpacity>
      </SafeAreaView>
    );
  }
}

const styles = StyleSheet.create({
  header: {
    height: 100,
    width: Dimensions.get("window").width,
    backgroundColor: "black",
    flexDirection: "row",
    zIndex: 1,
  },
  headerViews: {
    marginTop: 21,
    width: Dimensions.get("window").width / 3,
    backgroundColor: "black",
  },
  headerText: {
    fontWeight: "bold",
    fontStyle: "italic",
    color: "white",
    alignSelf: "center",
    justifyContent: "center",
  },
  headerButtons: {
    alignSelf: "center",
    justifyContent: "center",
  },
});
