import React from "react";
import {
  Text,
  View,
  StyleSheet,
  Button,
  TouchableOpacity,
  Dimensions,
} from "react-native";
var { width } = Dimensions.get("window");

export default function SignUpOrLoginScreen({ navigation }) {
  return (
    <View style={styles.container}>
      <Text style={styles.headerText}>THE APP</Text>

      <TouchableOpacity
        onPress={() => navigation.navigate("SignUpScreen")}
        style={{
          backgroundColor: "#33c37d",
          flexDirection: "row",
          width: width - 40,
          alignItems: "center",
          justifyContent: "center",
          padding: 10,
          borderRadius: 10,
          margin: 20,
          height: 70,
        }}
      >
        <Text
          style={{
            fontSize: 24,
            fontWeight: "bold",
            color: "white",
          }}
        >
          Sign up
        </Text>
      </TouchableOpacity>

      <TouchableOpacity
        onPress={() => navigation.navigate("LogInScreen")}
        style={{
          backgroundColor: "#33c37d",
          flexDirection: "row",
          width: width - 40,
          alignItems: "center",
          justifyContent: "center",
          padding: 10,
          borderRadius: 10,
          margin: 20,
          height: 70,
        }}
      >
        <Text
          style={{
            fontSize: 24,
            fontWeight: "bold",
            color: "white",
          }}
        >
          Login
        </Text>
      </TouchableOpacity>
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
  locationMessage: {
    justifyContent: "center",
    textAlign: "center",
    fontSize: 20,
    width: 170,
    marginBottom: 200,
  },
  headerText: {
    fontSize: 30,
    marginBottom: 50,
  },
  notNow: {
    marginTop: 10,
    color: "#5cb85c",
    fontWeight: "bold",
  },
  button: {
    marginBottom: 20,
    marginTop: 20,
  },
});
