import { useQuery, ApolloError } from "@apollo/client";
import React, { useState } from "react";
import { Text, View, StyleSheet, Button, Alert } from "react-native";
import { TextInput } from "react-native-paper";
import { LOGIN } from "../graphql/queries";
import AsyncStorage from "@react-native-community/async-storage";
import { parseValue } from "graphql";
import { clockRunning } from "react-native-reanimated";

export default function LogIn({ navigation }) {
  const [password, setPassword] = useState("");
  const [email, setEmail] = useState("");
  const { loading, error, data } = useQuery(LOGIN, {
    variables: {
      email: email,
      password: password,
    },
  });

  // working code for login with validation

  function getData() {
    LOGIN;
    if (data) {
      const fullName = data.login.user.fullName;
      //console.log("fullName fetched", fullName);
      storeData(fullName);

      const id = data.login.user.id;
      //console.log("userId fetched", id);
      storeUserId(id);
      navigation.navigate("Categories");
    } else {
      Alert.alert("User not found :(");
    }
  }

  // working code for storing data in asyncstorage
  const storeData = async (data) => {
    try {
      const jsonValue = JSON.stringify(data);
      await AsyncStorage.setItem("fullName", jsonValue);
    } catch (e) {
      console.log(e);
    }
  };

  // working code for storing data in asyncstorage
  const storeUserId = async (data) => {
    try {
      const jsonValue = data.toString();
      await AsyncStorage.setItem("userId", jsonValue);
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
