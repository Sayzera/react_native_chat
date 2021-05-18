import React, { useLayoutEffect, useState } from "react";
import {
  StyleSheet,
  Text,
  View,
  TouchableOpacity,
  SafeAreaView,
  KeyboardAvoidingView,
  Platform,
  ScrollView,
  TextInput,
  Keyboard,
  TouchableWithoutFeedback,
} from "react-native";
import { Avatar } from "react-native-elements";
import { AntDesign, FontAwesome, Ionicons } from "@expo/vector-icons";
import { StatusBar } from "expo-status-bar";
import firebase from "firebase";
import { auth, db } from "../firebase";

const ChatScreen = ({ route, navigation }) => {
  const { id, chatName } = route.params;
  const [input, setInput] = useState("");
  const [messages, setMessages] = useState([]);

  useLayoutEffect(() => {
    navigation.setOptions({
      title: "Chat",
      headerBackTitleVisible: false,
      headerTitleAlign: "left",
      headerTitleStyle: { color: "black" },
      headerTitle: () => (
        <View
          style={{
            flexDirection: "row",
            alignItems: "center",
          }}>
          <Avatar
            rounded
            source={{
              
              uri: 
              messages[0]?.data.photoURL || "https://lh3.googleusercontent.com/proxy/IjyIoIZjTpbfuIxeocBbPX6oBuH3YJxJu_95yv8z4MO9GPOvdqbpgcTJ-yhzVawuQBHn5BWenNqxSfPi-ku8UQ_N0TydvB897bKTtJo0Me0qmcgk-vpk",
            }}
          />
          <Text style={{ color: "white", marginLeft: 10, fontWeight: "700" }}>
            {chatName}
          </Text>
        </View>
      ),
      headerLeft: () => (
        <TouchableOpacity
          style={{ marginLeft: 10 }}
          onPress={() => navigation.goBack()}>
          <AntDesign name='arrowleft' size={24} color='white' />
        </TouchableOpacity>
      ),
      headerRight: () => (
        <View
          style={{
            flexDirection: "row",
            justifyContent: "space-between",
            width: 80,
            marginRight: 20,
          }}>
          <TouchableOpacity>
            <FontAwesome name='video-camera' size={24} color='white' />
          </TouchableOpacity>

          <TouchableOpacity>
            <Ionicons name='call' size={24} color='white' />
          </TouchableOpacity>
        </View>
      ),
    });
  }, [navigation,messages]);

  const sendMessage = async () => {
    Keyboard.dismiss();
    await db.collection("chats").doc(id).collection("messages").add({
      timestamp: firebase.firestore.FieldValue.serverTimestamp(),
      message: input,
      displayName: auth.currentUser.displayName,
      email: auth.currentUser.email,
      photoURL: auth.currentUser.photoURL,
    });
    setInput("");
  };

  useLayoutEffect(() => {
    const unsubscribe = db
      .collection("chats")
      .doc(id)
      .collection("messages")
      .orderBy("timestamp", "asc")
      .onSnapshot(snapshot =>
        setMessages(
          snapshot.docs.map(doc => ({
            id: doc.id,
            data: doc.data(),
          })),
        ),
      );

    return unsubscribe;
  }, [route]);

  return (
    <SafeAreaView
      style={{
        flex: 1,
        backgroundColor: "white",
      }}>
      <StatusBar style='light' />
      <KeyboardAvoidingView
        behavior={Platform.OS === "ios" ? "padding" : "height"}
        style={styles.container}
        keyboardVerticalOffset={90}>
        <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
          <>
            <ScrollView contentContainerStyle={{padding:15}}>
              {messages ? (
                messages.map(({ id, data }) =>
                  data.email === auth.currentUser.email ? (
                    <View key={id} style={styles.reciever}>
                      <Avatar
                        rounded
                        // WEB 
                        containerStyle={
                         {
                          position:"absolute",
                          bottom:-15,
                          right:-5
                         }

                        }
                        position="absolute"
                        bottom={-15}
                        right={-5}
                          size={30}
                          source={{
                            uri:data.photoURL
                          }}
                       />
                      <Text style={styles.recieverText}>{data.message}</Text>
                    </View>
                  ) : (
                    <View style={styles.sender}>
                     <Avatar
                        rounded
                        // WEB 
                        containerStyle={
                         {
                          position:"absolute",
                          bottom:-15,
                          right:-5
                         }

                        }
                        position="absolute"
                        bottom={-15}
                        right={-5}
                          size={30}
                          source={{
                            uri:data.photoURL
                          }}
                       />
                      <Text style={styles.senderText}>{data.message}</Text>
                      <Text style={styles.senderName}>{data.displayName}</Text>
                    </View>
                  ),
                )
              ) : (
                <Text>Loading...</Text>
              )}
            </ScrollView>
            <View style={styles.footer}>
              <TextInput
                value={input}
                onChangeText={text => setInput(text)}
                onSubmitEditing={sendMessage}
                placeholder='Signal Message'
                style={styles.textInput}
              />
              <TouchableOpacity onPress={sendMessage} activeOpacity={0.5}>
                <Ionicons name='send' size={24} color='#2B68E6'></Ionicons>
              </TouchableOpacity>
            </View>
          </>
        </TouchableWithoutFeedback>
      </KeyboardAvoidingView>
    </SafeAreaView>
  );
};

export default ChatScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  footer: {
    flexDirection: "row",
    alignItems: "center",
    width: "100%",
    padding: 15,
  },
  reciever: {
    padding:15,
    backgroundColor:'#ECECEC',
    alignSelf:'flex-end',
    borderRadius:20,
    marginRight:15,
    marginBottom:20,
    maxWidth:"80%",
    position:'relative'
  },
  senderText: {
    color:'white'
  },  
  sender: {
    padding:15,
    backgroundColor:'blue',
  
    alignSelf:'flex-start',
    borderRadius:20,
    marginRight:15,
    marginBottom:20,
    maxWidth:"80%",
    position:'relative'
  },
  senderName: {
    left:10,
    paddingRight:10,
    fontSize:10,
    color:'white'
  },
  textInput: {
    bottom: 0,
    height: 40,
    flex: 1,
    marginRight: 15,
    borderColor: "green",
    borderWidth: 1,
    padding: 10,
    color: "grey",
    borderRadius: 30,
  },
});
