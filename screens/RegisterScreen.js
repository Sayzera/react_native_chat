import React, { useState, useLayoutEffect } from "react";
import { KeyboardAvoidingView } from "react-native";
import { StyleSheet, View } from "react-native";
import { StatusBar } from "expo-status-bar";
import { Input, Button, Text } from "react-native-elements";
import { auth } from "../firebase";

const RegisterScreen = ({ navigation }) => {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [imageUrl, setImageUrl] = useState("");

  useLayoutEffect(() => {
    navigation.setOptions({
      headerBackTitle: "Login",
    });
  }, [navigation]);

  const register = () => {
    auth
      .createUserWithEmailAndPassword(email, password)
      .then(authUser => {
        authUser.user.updateProfile({
          displayName: name,
          photoURL: imageUrl,
        });
      })
      .catch(error => alert(error.message));
  };

  return (
    <KeyboardAvoidingView behavior='padding' style={styles.container}>
      <StatusBar style='light' />
      <Text h3 style={{ marginBottom: 50 }}>
        Create a Signal account
      </Text>

      <View style={styles.inputContainer}>
        <Input
          placeholder='Full Name'
          autoFocus
          type='text'
          value={name}
          onChangeText={text => setName(text)}
        />

        <Input
          placeholder='Email'
          type='text'
          value={email}
          onChangeText={text => setEmail(text)}
        />

        <Input
          placeholder='Password'
          type='password'
          value={password}
          onChangeText={text => setPassword(text)}
        />

        <Input
          placeholder='Profile Picture URL (optional)'
          type='text'
          value={imageUrl}
          onChangeText={text => setImageUrl(text)}
          onSubmitEditing={register}
        />
      </View>

      <Button
        containerStyle={styles.button}
        onPress={register}
        title='Register'
        raised
      />
      <View stlye={{ height: 100 }} />
    </KeyboardAvoidingView>
  );
};

export default RegisterScreen;

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
    width: 200,
  },
});
