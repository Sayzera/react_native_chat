import React, { useState, useEffect } from "react";
import { StyleSheet, Text, View } from "react-native";
import { ListItem, Avatar } from "react-native-elements";
import { db } from "../firebase";

const CustomListItem = ({ id, chatName, enterChat }) => {
  const [chatMessages, setChatMessages] = useState([]);

  useEffect(() => {
    const unsubscribe = db
      .collection("chats")
      .doc(id)
      .collection("messages")
      .orderBy("timestamp", "desc")
      .onSnapshot(snapshot =>
        setChatMessages(snapshot.docs.map(doc => doc.data())),
      );

      

      return unsubscribe;
  }, []);
  return (
    <View>
      <ListItem key={id} bottomDivider onPress={() => enterChat(id, chatName)}>
        <Avatar
          rounded
          source={{
            uri: "https://lh3.googleusercontent.com/proxy/IjyIoIZjTpbfuIxeocBbPX6oBuH3YJxJu_95yv8z4MO9GPOvdqbpgcTJ-yhzVawuQBHn5BWenNqxSfPi-ku8UQ_N0TydvB897bKTtJo0Me0qmcgk-vpk",
          }}
        />

        <ListItem.Content>
          <ListItem.Title style={{ fontWeight: "700" }}>
            {chatName}
          </ListItem.Title>
          <ListItem.Subtitle numberLines={1} ellipsizeMode='tail'>
            {chatMessages[0] ? chatMessages[0].message: <Text>Loading...</Text>}
          </ListItem.Subtitle>
        </ListItem.Content>
      </ListItem>
    </View>
  );
};

export default CustomListItem;

const styles = StyleSheet.create({});
