import React from "react";
import {
  View,
  Text,
  TouchableOpacity,
  Dimensions,
  StyleSheet,
  SafeAreaView,
} from "react-native";
import { TextInput } from "react-native-gesture-handler";
import Icon from "react-native-vector-icons/Ionicons";
import moment from "moment";
import firebase from "firebase/app";
import { auth } from "../../../environment/config";

export default class ReplyCreator extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      replyText: "",
      votes: 0,
      firestoreReplies: props.firestoreReplies,
      replied: false,
      userReplied: props.userReplied,
      creatingReply: false,
      postID: props.postID,
      hideReplyCreator: props.hideReplyCreator,
    };
  }

  // Function adding new user reply to Firestore:

  onSendReply(bool) {
    console.log("Reply button pressed");
    console.log("currentUser: ", this.state.currentUser);

    if (!this.state.replyText) {
      alert("Invalid form entry");
      return;
    }

    this.setState({
      creatingReply: false,
    });

    let currentTime = moment(new Date()).format("YYYY-MM-DD, h:mm:ss a");
    let replyID = "UID:" + auth.currentUser.uid + "TIME:" + currentTime;

    this.setState({ replyText: "" });
    this.setState({ replied: true });

    let newReplyObj = {
      datetime: moment(),
      text: this.state.replyText,
      user: auth.currentUser.uid,
      votes: this.state.votes,
      replyID: replyID,
      OP: "will",
      sourcePostID: this.props.postID,
      upvoters: [],
      downvoters: [],
    };

    this.state.firestoreReplies
      .doc(replyID)
      .set({
        datetime: firebase.firestore.FieldValue.serverTimestamp(),
        text: this.state.replyText,
        user: auth.currentUser.uid,
        votes: this.state.votes,
        replyID: replyID,
        OP: "will",
        sourcePostID: this.state.postID,
        upvoters: [],
        downvoters: [],
      })
      .then((doc) => {
        this.state.userReplied(newReplyObj);
      })
      .catch(function (error) {
        console.error("Error writing document: ", error);
      });
  }

  onCreateReply = (bool) => {
    console.log("Reply creation started");
    this.setState({
      creatingReply: bool,
    });
  };

  onCancel() {
    this.setState({
      creatingReply: false,
    });
  }

  render() {
    return (
      <View
        key={this.state.hideReplyCreator}
        style={{
          backgroundColor: "white",
          marginBottom: 50,
        }}
      >
        <View>
          {this.state.creatingReply ? (
            <View style={{ flexDirection: "row" }}>
              <TouchableOpacity
                onPress={this.onSendReply.bind(this)}
                title="ReplyBtn"
                style={{
                  justifyContent: "center",
                  alignItems: "center",
                  margin: 10,
                  width: Dimensions.get("window").width * 0.5 - 20,
                  height: 40,
                  backgroundColor: "red",
                }}
              >
                <Text
                  style={{ justifyContent: "center", alignItems: "center" }}
                >
                  Send reply!
                </Text>
              </TouchableOpacity>
              <View style={{ marginTop: 40 }} />
              <TouchableOpacity
                onPress={this.onCancel.bind(this)}
                style={{
                  justifyContent: "center",
                  alignItems: "center",
                  margin: 10,
                  width: Dimensions.get("window").width * 0.5 - 20,
                  height: 40,
                  backgroundColor: "red",
                }}
              >
                <Text>Cancel</Text>
              </TouchableOpacity>
            </View>
          ) : (
            <TouchableOpacity
              onPress={this.onCreateReply.bind(this)}
              title="CreateBtn"
              style={styles.createReplyBtn}
            >
              <Text style={{ justifyContent: "center", alignItems: "center" }}>
                Create reply!
              </Text>
            </TouchableOpacity>
          )}

          {this.state.creatingReply && (
            <TextInput
              style={styles.contentField}
              placeholder="Reply content"
              onChangeText={(replyText) => this.setState({ replyText })}
              value={this.state.replyText}
            />
          )}
        </View>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  contentField: {
    margin: 10,
    height: 300,
    width: Dimensions.get("window").width - 20,
    borderColor: "gray",
    borderWidth: 1,
    backgroundColor: "white",
    marginBottom: Dimensions.get("window").height / 2,
  },
  createReplyBtn: {
    justifyContent: "center",
    alignItems: "center",
    margin: 10,
    width: Dimensions.get("window").width - 20,
    height: 40,
    backgroundColor: "red",
  },
});
