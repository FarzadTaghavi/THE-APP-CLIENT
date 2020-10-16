import React from "react";
import { Text, View, StyleSheet, Button, TouchableOpacity } from "react-native";

export default function IntroScreen({ navigation }) {
  return (
    <View style={styles.container}>
      <View>
        <Text style={styles.introMessage}>
          Order from any store in your city
        </Text>
      </View>

      <Button
        title="Next"
        color="#5cb85c"
        onPress={() => navigation.navigate("EndIntroScreen")}
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
