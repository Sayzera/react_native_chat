import React, { useLayoutEffect, useState } from "react";
import { StyleSheet, Text, View } from "react-native";
import { Button, Input } from "react-native-elements";
import Icon from "react-native-vector-icons/FontAwesome";
import { db } from "../firebase";

const AddChatScreen = ({ navigation }) => {
  const [input, setInput] = useState("");

  useLayoutEffect(() => {
    navigation.setOptions({
      title: "Yeni bir konu ekleyin",
      headerBackTitle: "Chats",
    });
  }, [navigation]);

  /**
   * Neden async
   * async işlemlerde gonderilen datanın cevabı beklenir
   * ve cevap geldikten sonra bir sonraki işleme geçer
   */
  const createChat = async () => {
    await db
      .collection("chats")
      .add({
        chatName: input,
      })
      .then(() => {
        navigation.goBack();
      })
      .catch(error => alert(error));
  };

  return (
    <View style={styles.container}>
      <Input
        placeholder='Sohbet Başlığı Giriniz'
        onChangeText={text => setInput(text)}
        value={input}
        leftIcon={
          <Icon name='wechat' type='antdesign' size={24} color='black' />
        }
      />

      <Button onPress={createChat} title='Create new Chat' />
    </View>
  );
};

export default AddChatScreen;

const styles = StyleSheet.create({
  container: {
    backgroundColor: "white",
    padding: 30,
    height: "100%",
  },
});
