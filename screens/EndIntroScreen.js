import React from "react";
import { Text, View, StyleSheet, Button, TouchableOpacity } from "react-native";

export default function EndIntroScreen({ navigation }) {
  return (
    <View style={styles.container}>
      <View>
        <Text style={styles.introMessage}>
          Couriers pick up your order and bring it to you in minutes!
        </Text>
      </View>

      <Button
        title="Next"
        color="#5cb85c"
        onPress={() => navigation.navigate("SignUpOrLoginScreen")}
      />
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
