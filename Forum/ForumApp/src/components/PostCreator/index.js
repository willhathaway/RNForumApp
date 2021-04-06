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

export default class PostCreator extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      postTitle: "",
      postText: "",
      votes: 0,
      firestorePosts: props.firestorePosts,
      posted: false,
      userPosted: props.userPosted,
      creatingPost: false,
      hidePostCreator: props.hidePostCreator,
    };
  }

  // Function adding new user post to Firestore:

  onPressPost(bool) {
    console.log("Post button pressed");

    if (!this.state.postTitle || !this.state.postText) {
      alert("Invalid form entry");
      return;
    }

    this.setState({
      creatingPost: false,
    });

    let currentTime = moment(new Date()).format("YYYY-MM-DD, h:mm:ss a");
    let postID = "UID:" + auth.currentUser.uid + "TIME:" + currentTime;

    this.setState({ postText: "" });
    this.setState({ postTitle: "" });
    this.setState({ posted: true });

    let newPostObj = {
      datetime: moment(),
      title: this.state.postTitle,
      text: this.state.postText,
      user: auth.currentUser.uid,
      votes: this.state.votes,
      postID: postID,
      upvoters: [],
      downvoters: [],
    };

    this.state.firestorePosts
      .doc(postID)
      .set({
        datetime: firebase.firestore.FieldValue.serverTimestamp(),
        title: this.state.postTitle,
        text: this.state.postText,
        user: auth.currentUser.uid,
        votes: this.state.votes,
        postID: postID,
        upvoters: [],
        downvoters: [],
      })
      .then((doc) => {
        this.state.userPosted(newPostObj);
      })
      .catch(function (error) {
        console.error("Error writing document: ", error);
      });
  }

  onCreatePost = (bool) => {
    console.log("Post creation started");
    this.setState({
      creatingPost: bool,
    });
  };

  onCancel() {
    this.setState({
      creatingPost: false,
    });
  }

  componentDidUpdate() {
    console.log("PostCreator component updated");
  }

  render() {
    return (
      <View
        key={this.state.hidePostCreator}
        style={{
          backgroundColor: "white",
          marginBottom: 50,
        }}
      >
        <View>
          {this.state.creatingPost ? (
            <View style={{ flexDirection: "row" }}>
              <TouchableOpacity
                onPress={this.onPressPost.bind(this)}
                title="PostBtn"
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
                  Send post!
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
              onPress={this.onCreatePost.bind(this)}
              title="CreateBtn"
              style={styles.createPostBtn}
            >
              <Text style={{ justifyContent: "center", alignItems: "center" }}>
                Create post!
              </Text>
            </TouchableOpacity>
          )}
          {this.state.creatingPost && (
            <TextInput
              style={styles.titleField}
              placeholder="Title"
              onChangeText={(postTitle) => this.setState({ postTitle })}
              value={this.state.postTitle}
            />
          )}
          {this.state.creatingPost && (
            <TextInput
              style={styles.contentField}
              placeholder="Post content"
              onChangeText={(postText) => this.setState({ postText })}
              value={this.state.postText}
            />
          )}
        </View>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  titleField: {
    margin: 10,
    height: 40,
    width: Dimensions.get("window").width - 20,
    borderColor: "gray",
    borderWidth: 1,
    backgroundColor: "white",
  },
  contentField: {
    margin: 10,
    height: 300,
    width: Dimensions.get("window").width - 20,
    borderColor: "gray",
    borderWidth: 1,
    backgroundColor: "white",
    marginBottom: Dimensions.get("window").height / 3,
  },
  postButton: {
    width: Dimensions.get("window").width * 0.3,
    height: 20,
    paddingLeft: 20,
  },
  createPostBtn: {
    justifyContent: "center",
    alignItems: "center",
    margin: 10,
    width: Dimensions.get("window").width - 20,
    height: 40,
    backgroundColor: "red",
  },
});
