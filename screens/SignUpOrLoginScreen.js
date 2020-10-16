import React from "react";
import { Text, View, StyleSheet, Button, TouchableOpacity } from "react-native";

export default function SignUpOrLoginScreen({ navigation }) {
  return (
    <View style={styles.container}>
      <Text style={styles.headerText}>APP NAME</Text>
      <View style={styles.locationMessage}>
        <Button
          title="Sign Up"
          color="#5cb85c"
          onPress={() => navigation.navigate("SignUpScreen")}
        />
        <Button
          title="Log in"
          onPress={() => navigation.navigate("LogInScreen")}
        />
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
  locationMessage: {
    justifyContent: "center",
    textAlign: "center",
    fontSize: 20,
    width: 170,
    marginBottom: 200,
  },
  headerText: {
    fontSize: 30,
    marginBottom: 100,
  },
  notNow: {
    marginTop: 10,
    color: "#5cb85c",
    fontWeight: "bold",
  },
});
