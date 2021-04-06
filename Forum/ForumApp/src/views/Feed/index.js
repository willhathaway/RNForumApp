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
  ScrollView,
} from "react-native";
import { TouchableOpacity } from "react-native-gesture-handler";
import { SafeAreaView } from "react-navigation";
import { auth, firestorePosts } from "../../../environment/config";
import Header from "../../components/Header";
import PostCreator from "../../components/PostCreator";
import UserPost from "../../components/UserPost";

console.log("feed comp loaded");
export default class Feed extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      currentUser: auth.currentUser,
      errorMessage: null,
      posts: [],
      didUserPost: false,
      hidePostCreator: false,
      headerOnPress: props.headerOnPress,
      onPressLogOut: props.onPressLogOut,
      refreshCount: 0,
      onPressLoadPostView: props.onPressLoadPostView,
    };
  }
  // Loading firestore posts on component mount:

  componentDidMount() {
    firestorePosts.get().then((snapshot) => {
      let allPosts = [];
      snapshot.forEach((doc) => {
        if (doc.exists) {
          let Post = doc.data();
          allPosts.push(Post);
        } else {
          console.log("Posts not loaded");
        }
      });

      function byDate(a, b) {
        return (
          new Date(a.datetime.toDate()).valueOf() -
          new Date(b.datetime.toDate()).valueOf()
        );
      }

      allPosts.sort(byDate).reverse();

      this.setState({ posts: allPosts });
    });
  }

  replyPageOpened() {
    this.setState({ hidePostCreator: true });
  }

  // Function updating the Feed with new user post (not currently working)

  userPosted = (newPostObj) => {
    console.log("User posted:");

    console.log("newpostObj: ", newPostObj);

    let posts = this.state.posts;

    posts.unshift(newPostObj); // returns length

    let joined = posts;
    this.setState({ posts: joined });
  };

  //   backFromReplyPage = () => {
  //     this.setState({ hidePostCreator: true });
  //   };

  // ComponentDidUpdate() for debugging/testing:

  componentDidUpdate() {
    console.log("Feed component updated");
  }

  render() {
    const { currentUser } = this.state;
    const { posts } = this.state;

    return (
      <View>
        <Header
          headerOnPress={this.state.headerOnPress}
          onPressLogOut={this.state.onPressLogOut}
        />
        <SafeAreaView style={styles.feedContainer}>
          <View style={{ flexDirection: "row" }}>
            <TouchableOpacity>
              <Text
                style={{
                  color: "white",
                  paddingHorizontal: 30,
                  paddingVertical: 10,
                }}
              >
                Hot
              </Text>
            </TouchableOpacity>
            <TouchableOpacity>
              <Text
                style={{
                  color: "white",
                  paddingHorizontal: 30,
                  paddingVertical: 10,
                }}
              >
                New
              </Text>
            </TouchableOpacity>
          </View>
          <ScrollView style={styles.innerContainer}>
            <View>
              {posts.map((post, index) => (
                <UserPost
                  key={index}
                  post={post}
                  posts={this.state.posts}
                  currentUser={currentUser}
                  firestorePosts={firestorePosts}
                  onPress={this.props.onPressLoadPostView.bind(this)}
                ></UserPost>
              ))}
            </View>
          </ScrollView>
          <View
            style={
              this.state.hidePostCreator
                ? styles.postCreatorHidden
                : styles.postCreatorVisible
            }
          >
            <PostCreator
              currentUser={this.state.currentUser}
              posts={this.state.posts}
              postID={this.state.postID}
              firestorePosts={firestorePosts}
              userPosted={this.userPosted}
              key={this.state.hidePostCreator}
            />
          </View>
        </SafeAreaView>
      </View>
    );
  }
}
const styles = StyleSheet.create({
  feedContainer: {
    flexDirection: "column",
    justifyContent: "center",
    alignItems: "center",
    height: Dimensions.get("window").height - 100,
    width: Dimensions.get("window").width,
    backgroundColor: "black",
  },
  innerContainer: {
    overflow: "visible",
    backgroundColor: "black",
  },
  postCreatorVisible: {
    backgroundColor: "black",
    display: "flex",
    width: Dimensions.get("window").width,
  },
  postCreatorHidden: {
    display: "none",
    backgroundColor: "blue",
  },
});
