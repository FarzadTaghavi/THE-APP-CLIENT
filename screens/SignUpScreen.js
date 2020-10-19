import { useMutation, useQuery } from "@apollo/client";
import React, { useState, useEffect } from "react";
import { Text, View, StyleSheet, Button } from "react-native";
import { TextInput } from "react-native-paper";
import { CREATE_USER } from "../graphql/queries";
import AsyncStorage from "@react-native-community/async-storage";

export default function LogIn({ navigation }) {
  const [password, setPassword] = useState("");
  const [email, setEmail] = useState("");
  const [fullName, setFullName] = useState("");

  const [createUser, { error }] = useMutation(CREATE_USER);

  function submitForm() {
    const user = createUser({
      variables: {
        email: email,
        password: password,
        fullName: fullName,
      },
    });
    console.log("NEW USER: ", user);
    setEmail("");
    setPassword("");
    setFullName("");
    navigation.navigate("LogInScreen");
  }

  return (
    <View /* style={styles.container} */>
      <Text style={styles.introMessage}>Sign Up</Text>
      <TextInput
        placeholder="email"
        value={email}
        onChangeText={(text) => {
          setEmail(text);
        }}
      />
      <TextInput
        placeholder="password"
        value={password}
        onChangeText={(text) => {
          setPassword(text);
        }}
      />
      <TextInput
        placeholder="full name"
        value={fullName}
        onChangeText={(text) => {
          setFullName(text);
        }}
      />
      <Button type="submit" title="Sign Up" onPress={submitForm}></Button>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    flexDirection: "column",
    alignItems: "center",
    justifyContent: "center",
    marginBottom: 10,
  },
  introMessage: {
    justifyContent: "center",
    textAlign: "center",
    fontSize: 20,

    marginBottom: 300,
    marginTop: 250,
  },
});
