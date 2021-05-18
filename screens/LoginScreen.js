import React, { useState, useEffect } from "react";
import { StyleSheet, Text, View } from "react-native";
import { Button, Input, Image } from "react-native-elements";
import { StatusBar } from "expo-status-bar";
import { KeyboardAvoidingView } from "react-native";
import { auth } from "../firebase";

const LoginScreen = ({ navigation }) => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const signIn = () => {
    auth
      .signInWithEmailAndPassword(email, password)
      .then(user => navigation.replace("Home"))
      .catch(err => console.log(err));
  };

  useEffect(() => {
    const unsubscribe = auth.onAuthStateChanged(authUser => {
      if (authUser) {
        console.log(authUser);
        navigation.replace("Home");
      }
    });
    return unsubscribe;
  }, []);

  return (
    <KeyboardAvoidingView behavior='padding' style={styles.container}>
      <StatusBar style='light' />
      <Image
        source={{
          uri: "https://freepngimg.com/thumb/android/72964-euclidean-vector-robot-png-free-photo.png",
        }}
        style={{ width: 200, height: 200 }}
      />

      <View style={styles.inputContainer}>
        <Input
          placeholder='Email'
          autoFocus
          onChangeText={text => setEmail(text)}
          value={email}
          type='email'
        />

        <Input
          placeholder='Password'
          autoFocus
          onChangeText={text => setPassword(text)}
          value={password}
          type='password'
          onSubmitEditing={signIn}
        />

        <Button containerStyle={styles.button} onPress={signIn} title='Login' />

        <Button
          containerStyle={styles.button}
          onPress={() => navigation.navigate("Register")}
          type='outline'
          title='Register'
        />
      </View>

      <View style={{ height: 20 }} />
    </KeyboardAvoidingView>
  );
};

export default LoginScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
    padding: 10,
    backgroundColor: "white",
  },
  inputContainer: {
    width: 300,
  },
  button: {
    width: 250,
    marginLeft: 30,
    marginTop: 10,
  },
});
