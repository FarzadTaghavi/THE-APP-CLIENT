import React from "react";
import { Text, View, StyleSheet, Button, TouchableOpacity } from "react-native";

export default function PaymentReceived({ navigation }) {
  return (
    <View style={styles.container}>
      <Text style={styles.headerText}>Payment Received!</Text>
      <View>
        <Text style={styles.locationMessage}>
          Sit back and relax. Your order will be delivered soon.
        </Text>
      </View>
      <View style={styles.buttonLocation}>
        <Button
          title="Track Order"
          color="#5cb85c"
          onPress={() => navigation.navigate("TrackOrder")}
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
  buttonLocation: {
    marginBottom: 10,
    width: 150,
  },
  button: {
    marginBottom: 20,
    marginTop: 10,
    width: 150,
  },
});
