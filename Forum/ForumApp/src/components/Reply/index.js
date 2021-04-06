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

function Reply(props) {
  // check that the object has a parent "value" containing the object information:
  let currentUser = auth.currentUser;

  let replyInfo = props.reply;
  let firestoreReplies = props.firestoreReplies;
  let [userUpvoted, setUserUpvoted] = useState(false);
  let [userDownvoted, setUserDownvoted] = useState(false);

  let [userVote, setVote] = useState(0);

  return (
    <View style={styles.container}>
      <View style={{ flexDirection: "row" }}>
        <View style={styles.replyContainer}>
          <Text style={{ color: "white" }}>Text: {props.reply.text}</Text>
          <Text style={{ color: "white" }}>
            Time: {props.reply.datetime.toDate().toLocaleDateString()},{" "}
            {props.reply.datetime.toDate().toLocaleTimeString()}
          </Text>
        </View>
        <View style={styles.voteArrows}>
          <TouchableOpacity
            onPress={() => {
              if (userVote <= 0 || userUpvoted === false) {
                setUserUpvoted(true);
                setVote(userVote + 1);

                let upvoters = replyInfo.upvoters.concat(currentUser.uid);
                let index = replyInfo.downvoters.indexOf(currentUser.uid);
                let downvoters = replyInfo.downvoters.splice(index, 1);

                let voteCount;
                if ((replyInfo.votes = 0)) {
                  let voteCount = 0;
                }

                setVote(userVote + 1);

                firestoreReplies
                  .doc(replyInfo.replyID)
                  .update({
                    votes: replyInfo.votes + 1,
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
              } else if (replyInfo.downvoters.includes(currentUser.uid)) {
                console.log("Error. User has already upvoted this reply");
              } else {
                console.log("nO");
                return;
              }
            }}
          >
            <View>{upvoteIcon()}</View>
          </TouchableOpacity>
          <Text style={{ color: "#fff" }}>{replyInfo.votes + userVote}</Text>
          <TouchableOpacity
            onPress={() => {
              // downvoting user reply
              if (userVote >= 0 || userDownvoted === false) {
                setUserDownvoted(true);
                setVote(userVote - 1);

                let downvoters = replyInfo.downvoters.concat(currentUser.uid);
                let index = replyInfo.upvoters.indexOf(currentUser.uid);
                let upvoters = replyInfo.upvoters.splice(index, 1);

                firestoreReplies
                  .doc(replyInfo.replyID)
                  .update({
                    votes: replyInfo.votes + userVote,
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
              } else if (replyInfo.downvoters.includes(currentUser.uid)) {
                console.log("Error. User has already downvoted this reply");
              } else {
                console.log("nO");
                return;
              }
            }}
          >
            <View>{downvoteIcon()}</View>
          </TouchableOpacity>
        </View>
      </View>
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
  replyContainer: {
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

export default Reply;
