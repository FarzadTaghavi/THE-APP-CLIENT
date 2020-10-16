import React from "react";
import { Text, View, StyleSheet, Button } from "react-native";

export default function LogIn() {
  return (
    <View style={styles.container}>
      <View>
        <Text style={styles.introMessage}>LOGIN</Text>
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
    width: 170,
    marginBottom: 300,
    marginTop: 250,
  },
});
