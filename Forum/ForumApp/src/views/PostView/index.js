import React from "react";
import { useCollectionData } from "react-firebase-hooks/firestore";
import {
  Alert,
  Platform,
  Image,
  View,
  Text,
  StyleSheet,
  Button,
  Dimensions,
  TouchableOpacity,
  ScrollView,
} from "react-native";
import { SafeAreaView } from "react-navigation";
import { auth, firestoreReplies } from "../../../environment/config";
import ReplyCreator from "../../components/ReplyCreator";
import Reply from "../../components/Reply";
import Header from "../../components/Header";

const { width, height } = Dimensions.get("window");

//console.log("firestore replies: ", firestoreReplies);

console.log("POSTVIEW");

export default class PostView extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      currentUser: auth.currentUser,
      errorMessage: null,
      replies: [],
      didUserPost: false,
      firestoreReplies: firestoreReplies,
      hideReplyCreator: false,
    };
  }

  // Function updating the Feed with new user post (not currently working)

  userReplied = (newReplyObj) => {
    console.log("User replied:");

    console.log("newpostObj: ", newReplyObj);

    let replies = this.state.replies;

    replies.unshift(newReplyObj); // returns length

    let joined = replies;
    this.setState({ replies: joined });
  };

  componentDidMount() {
    const { route } = this.props;
    const { postInfo } = route.params;
    firestoreReplies
      .where("sourcePostID", "==", postInfo.postID)
      .get()
      .then((snapshot) => {
        let allReplies = [];
        snapshot.forEach((doc) => {
          if (doc.exists) {
            let Reply = doc.data();
            allReplies.push(Reply);
          } else {
            console.log("Replies not loaded");
          }
        });

        function byDate(a, b) {
          return (
            new Date(a.datetime.toDate()).valueOf() -
            new Date(b.datetime.toDate()).valueOf()
          );
        }

        allReplies.sort(byDate).reverse();
        console.log(allReplies);
        this.setState({ replies: allReplies });
      });
  }

  render() {
    const { replies } = this.state;
    const { currentUser } = this.state;
    const { navigation, route } = this.props;
    const { postInfo } = route.params;

    console.log("postInfo: ", postInfo);
    return (
      <View>
        <Header
          headerOnPress={this.state.headerOnPress}
          onPressLogOut={this.state.onPressLogOut}
        />
        <SafeAreaView style={styles.postViewContainer}>
          <ScrollView
            style={{
              width: Dimensions.get("window").width,
              maxHeight: Dimensions.get("window").height - 250,
              marginTop: -100,
            }}
          >
            <Button
              title="Go back"
              onPress={() => navigation.navigate("Home")}
              style={{ maxHeight: 50 }}
            />
            <View style={{ backgroundColor: "#181818" }}>
              <Text style={{ color: "white", height: 30, padding: 5 }}>
                Post: {postInfo.title}
              </Text>
              <Text style={{ color: "white", height: 30, padding: 5 }}>
                Content: {postInfo.text}
              </Text>
            </View>

            <View>
              {replies.map((reply, index) => (
                <Reply
                  key={index}
                  reply={reply}
                  firestoreReplies={firestoreReplies}
                />
              ))}
            </View>
          </ScrollView>
          <View
            style={
              this.state.hideReplyCreator
                ? styles.replyCreatorHidden
                : styles.replyCreatorVisible
            }
          >
            <ReplyCreator
              currentUser={currentUser}
              posts={this.state.posts}
              postID={postInfo.postID}
              firestoreReplies={this.state.firestoreReplies}
              userReplied={this.userReplied}
              key={this.state.hideReplyCreator}
            />
          </View>
        </SafeAreaView>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  postViewContainer: {
    flex: 0,
    flexDirection: "column",
    justifyContent: "center",
    alignItems: "center",
    height: Dimensions.get("window").height,
    width: Dimensions.get("window").width,
    backgroundColor: "black",
  },
  replyCreatorVisible: {
    backgroundColor: "black",
    display: "flex",
    width: Dimensions.get("window").width,
  },
  replyCreatorHidden: {
    display: "none",
    backgroundColor: "blue",
  },
});
