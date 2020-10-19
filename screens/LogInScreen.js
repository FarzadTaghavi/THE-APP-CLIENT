import { useQuery } from "@apollo/client";
import React, { useState } from "react";
import { Text, View, StyleSheet, Button, Alert } from "react-native";
import { TextInput } from "react-native-paper";
import { LOGIN } from "../graphql/queries";
import AsyncStorage from "@react-native-community/async-storage";

export default function LogIn({ navigation }) {
  const [password, setPassword] = useState("");
  const [email, setEmail] = useState("");
  const { loading, error, data } = useQuery(LOGIN, {
    variables: {
      email: email,
      password: password,
    },
  });

  function getData() {
    LOGIN;
    storeData(data);
    /*console.log("GET USER:", data);
    console.log("FULLNAME: ", data.login.user.fullName);
    const { fullName } = data.login.user;
    console.log("userName: ", fullName); */
    navigation.navigate("Categories");
  }

  const storeData = async (data) => {
    try {
      const jsonValue = JSON.stringify(data);
      console.log("user: ", jsonValue);
      await AsyncStorage.setItem("user", jsonValue);
    } catch (e) {
      console.log(e);
    }
  };

  return (
    <View /* style={styles.container} */>
      <View>
        <Text style={styles.introMessage}>LOGIN</Text>
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
        <View style={styles.button}>
          <Button title="Login" onPress={() => getData()}></Button>
        </View>
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
