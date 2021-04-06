import { invalid } from "moment";
import React, { useState } from "react";
import { render } from "react-dom";
import {
  View,
  Text,
  StyleSheet,
  Dimensions,
  TouchableOpacity,
} from "react-native";

import Icon from "react-native-vector-icons/Ionicons";
import { firestorePosts } from "../../../environment/config";
import PostView from "../../views/PostView";
import { auth } from "../../../environment/config";

function upvoteIcon() {
  return (
    <Icon
      style={{ marginTop: 30, marginBottom: 10 }}
      name="md-arrow-up"
      color="#fff"
    />
  );
}
function downvoteIcon() {
  return (
    <Icon
      style={{ marginTop: 10, marginBottom: 10 }}
      name="md-arrow-down"
      color="#fff"
    />
  );
}

function UserPost(props) {
  console.log("POST: ", props.post);
  console.log("UID: ", auth.currentUser.uid);

  let currentUser = auth.currentUser;
  let postInfo = props.post;
  let firestorePosts = props.firestorePosts;
  let [userUpvoted, setUserUpvoted] = useState(false);
  let [userDownvoted, setUserDownvoted] = useState(false);

  let [userVote, setVote] = useState(0);

  return (
    <View style={styles.container}>
      <TouchableOpacity
        onPress={() => {
          props.onPress(currentUser, postInfo);
          //this.setState({ replying: true });
        }}
        title="PostBtn"
        style={{ flexDirection: "row" }}
      >
        <View style={styles.postContainer}>
          <Text style={{ color: "white" }}>Title: {postInfo.title}</Text>
          <Text style={{ color: "white" }}>Text: {postInfo.text}</Text>
          <Text style={{ color: "white" }}>
            Time: {postInfo.datetime.toDate().toLocaleDateString()},{" "}
            {postInfo.datetime.toDate().toLocaleTimeString()}
          </Text>
        </View>
        <View style={styles.voteArrows}>
          <TouchableOpacity
            onPress={() => {
              // upvoting user post:
              if (userVote <= 0 || userUpvoted === false) {
                setUserUpvoted(true);

                setVote(userVote + 1);

                let upvoters = postInfo.upvoters.concat(currentUser.uid);
                let index = postInfo.downvoters.indexOf(currentUser.uid);
                let downvoters = postInfo.downvoters.splice(index, 1);

                let voteCount;
                if ((postInfo.votes = 0)) {
                  let voteCount = 0;
                }

                firestorePosts
                  .doc(postInfo.postID)
                  .update({
                    votes: postInfo.votes + 1,
                    upvoters: upvoters,
                    downvoters: downvoters,
                  })
                  .then(() => {
                    console.log("Document successfully updated!");
                  })
                  .catch((error) => {
                    // The document probably doesn't exist.
                    console.error("Error updating document: ", error);
                  });
              } else if (postInfo.upvoters.includes(currentUser.uid)) {
                console.log("Error. User has already upvoted this post");
              } else {
                console.log("nO");
                return;
              }
            }}
          >
            <View>{upvoteIcon()}</View>
          </TouchableOpacity>
          <Text style={{ color: "#fff" }}>{postInfo.votes + userVote}</Text>
          <TouchableOpacity
            onPress={() => {
              // downvoting user post:
              if (userVote >= 0 || userDownvoted === false) {
                setUserDownvoted(true);
                setVote(userVote - 1);

                let downvoters = postInfo.downvoters.concat(currentUser.uid);
                let index = postInfo.upvoters.indexOf(currentUser.uid);
                let upvoters = postInfo.upvoters.splice(index, 1);

                firestorePosts
                  .doc(postInfo.postID)
                  .update({
                    votes: postInfo.votes - 1,
                    downvoters: downvoters,
                    upvoters: upvoters,
                  })
                  .then(() => {
                    console.log("Document successfully updated!");
                  })
                  .catch((error) => {
                    // The document probably doesn't exist.
                    console.error("Error updating document: ", error);
                  });
              } else if (postInfo.downvoters.includes(currentUser.uid)) {
                console.log("Error. User has already downvoted this post");
              } else {
                console.log("nO");
                return;
              }
            }}
          >
            <View>{downvoteIcon()}</View>
          </TouchableOpacity>
        </View>
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    backgroundColor: "#181818",
    borderRightWidth: 0,
    borderLeftWidth: 0,
    borderTopWidth: 5,
    borderBottomWidth: 5,
    borderColor: "black",
    paddingVertical: 10,
    paddingHorizontal: 5,
    height: 90,
    width: Dimensions.get("window").width,
    flexDirection: "row",
  },
  postContainer: {
    flexDirection: "column",
    width: Dimensions.get("window").width * 0.8,
  },
  voteArrows: {
    flexDirection: "column",
    width: Dimensions.get("window").width / 5,
    paddingLeft: Dimensions.get("window").width / 10,
    alignSelf: "center",
    justifyContent: "center",
  },
});

export default UserPost;
