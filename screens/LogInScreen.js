import { useQuery, ApolloError } from "@apollo/client";
import React, { useState } from "react";
import {
  Text,
  View,
  Dimensions,
  StyleSheet,
  TouchableOpacity,
  Button,
  Alert,
} from "react-native";
import { TextInput } from "react-native-paper";
var { width } = Dimensions.get("window");
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

  function getData() {
    LOGIN;
    if (data) {
      const fullName = data.login.user.fullName;

      storeData(fullName);

      const id = data.login.user.id;

      storeUserId(id);
      navigation.navigate("Categories");
    } else {
      Alert.alert("User not found :(");
    }
  }

  const storeData = async (data) => {
    try {
      const jsonValue = JSON.stringify(data);
      await AsyncStorage.setItem("fullName", jsonValue);
    } catch (e) {
      console.log(e);
    }
  };

  const storeUserId = async (data) => {
    try {
      const jsonValue = data.toString();
      await AsyncStorage.setItem("userId", jsonValue);
    } catch (e) {
      console.log(e);
    }
  };

  return (
    <View>
      <View>
        <Text style={styles.introMessage}>LOGIN</Text>
        <TextInput
          placeholder="email"
          onChangeText={(text) => {
            setEmail(text);
          }}
        />
        <TextInput
          placeholder="password"
          secureTextEntry={true}
          onChangeText={(text) => {
            setPassword(text);
          }}
        />
        <TouchableOpacity
          onPress={() => getData()}
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
            Login
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
