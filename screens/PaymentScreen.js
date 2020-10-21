import React, { useState } from "react";
import {
  Text,
  View,
  StyleSheet,
  Button,
  TextInput,
  Dimensions,
  TouchableOpacity,
} from "react-native";
var { width } = Dimensions.get("window");
//import { TextInput } from "react-native-paper";

export default function PaymentScreen({ navigation }) {
  const [email, setEmail] = useState("");
  const [cardNumber, setcardNumber] = useState("");
  const [MMYY, setMMYY] = useState("");
  const [CVC, setCVC] = useState("");
  const [name, setName] = useState("");

  return (
    <View /* style={styles.container} */>
      <Text style={styles.introMessage}>Pay with card</Text>
      <View>
        <TextInput
          style={{
            marginBottom: 15,
            width: width - 150,
            margin: 10,
            alignSelf: "center",
            flexDirection: "row",
          }}
          placeholder="email"
          value={email}
          onChangeText={(text) => {
            setEmail(text);
          }}
        />
        <TextInput
          style={{
            marginBottom: 15,
            width: width - 150,
            margin: 10,
            alignSelf: "center",
            flexDirection: "row",
          }}
          placeholder="1234 1234 1234 1234"
          value={cardNumber}
          onChangeText={(text) => {
            setcardNumber(text);
          }}
        />
        <TextInput
          style={{
            marginBottom: 15,
            width: width - 150,
            margin: 10,
            alignSelf: "center",
            flexDirection: "column",
          }}
          placeholder="MM / YY"
          value={MMYY}
          onChangeText={(text) => {
            setMMYY(text);
          }}
        />
        <TextInput
          style={{
            marginBottom: 15,
            width: width - 150,
            margin: 10,
            alignSelf: "center",
            flexDirection: "column",
          }}
          placeholder="CVC"
          value={CVC}
          onChangeText={(text) => {
            setCVC(text);
          }}
        />
        <TextInput
          style={{
            marginBottom: 15,
            width: width - 150,
            margin: 10,
            alignSelf: "center",
            flexDirection: "column",
          }}
          placeholder="Name on card"
          value={name}
          onChangeText={(text) => {
            setName(text);
          }}
        />
        <TouchableOpacity
          onPress={() => navigation.navigate("PaymentReceived")}
          style={{
            backgroundColor: "#33c37d",
            width: width - 200,
            alignSelf: "center",
            flexDirection: "column",
            padding: 5,
            borderRadius: 5,
            margin: 20,
          }}
        >
          <Text
            style={{
              fontSize: 22,
              fontWeight: "bold",
              color: "white",
              textAlign: "center",
              height: 50,
              paddingTop: 10,
            }}
          >
            PAY NOW
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
    marginTop: 50,
  },
  button: {
    marginBottom: 20,
    marginTop: 20,
  },
});
