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

export default function IntroScreen({ navigation }) {
  return (
    <View style={styles.container}>
      <View>
        <Text style={styles.introMessage}>
          Order from any store in your city
        </Text>
      </View>
      <TouchableOpacity
        onPress={() => navigation.navigate("EndIntroScreen")}
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
          Next
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
  introMessage: {
    justifyContent: "center",
    textAlign: "center",
    fontSize: 20,
    width: 170,
    marginBottom: 300,
    marginTop: 250,
  },
  button: {
    marginBottom: 20,
    marginTop: 10,
    width: 150,
  },
});
