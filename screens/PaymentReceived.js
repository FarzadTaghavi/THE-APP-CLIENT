import React from "react";
import {
  Text,
  View,
  StyleSheet,
  Image,
  TouchableOpacity,
  Dimensions,
  ScrollView,
} from "react-native";
var { width } = Dimensions.get("window");

export default function PaymentReceived({ navigation }) {
  return (
    <View style={styles.container}>
      <Text style={styles.headerText}>Payment Received!</Text>
      <View>
        <Text style={styles.description}>
          Sit back and relax. Your order will be delivered soon.
        </Text>
      </View>
      <TouchableOpacity
        onPress={() => navigation.navigate("TrackOrder")}
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
          TRACK ORDER
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
  description: {
    justifyContent: "center",
    textAlign: "center",
    fontSize: 28,
    width: 170,
    marginBottom: 150,
  },
  headerText: {
    fontSize: 40,
    marginBottom: 100,
  },
});
