import { useMutation, useQuery } from "@apollo/client";
import React, { useState, useEffect } from "react";
import {
  Text,
  View,
  StyleSheet,
  TouchableOpacity,
  Dimensions,
} from "react-native";
import { TextInput } from "react-native-paper";
import { CREATE_USER } from "../graphql/queries";
import AsyncStorage from "@react-native-community/async-storage";
var { width } = Dimensions.get("window");
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
      <View>
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
        <TouchableOpacity
          onPress={submitForm}
          style={{
            backgroundColor: "#33c37d",
            width: 180,
            flexDirection: "row",
            alignSelf: "center",
            alignItems: "center",
            justifyContent: "space-evenly",
            borderRadius: 10,
            textAlign: "center",
            paddingLeft: 20,
            margin: 20,
            marginLeft: 30,
            height: 60,
          }}
        >
          <Text
            style={{
              fontSize: 18,
              fontWeight: "bold",
              color: "white",
              paddingRight: 20,
            }}
          >
            Create Account
          </Text>
        </TouchableOpacity>
      </View>
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
    marginBottom: 20,
    marginTop: 250,
  },
  button: {
    marginBottom: 20,
    marginTop: 20,
  },
});
