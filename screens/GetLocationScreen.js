import React, { useState, useEffect } from "react";
import {
  Alert,
  Text,
  View,
  StyleSheet,
  Button,
  TouchableOpacity,
  Dimensions,
} from "react-native";
var { width } = Dimensions.get("window");
import * as Location from "expo-location";
import Geocoder from "react-native-geocoding";

export default function GetLocationScreen({ navigation }) {
  const [location, setLocation] = useState({});
  const [getLong, setLong] = useState("");
  const [getLat, setLat] = useState("");
  const [errorMsg, setErrorMsg] = useState(null);
  console.log("location: => ", location);

  function shareLocation() {
    (async () => {
      let { status } = await Location.requestPermissionsAsync();
      if (status !== "granted") {
        setErrorMsg("Permission to access location was denied");
      }

      let location = await Location.getCurrentPositionAsync({});
      console.log("location", location);
      setLocation(location);
      setLong(location.coords.longitude);
      setLat(location.coords.latitude);

      navigation.navigate("IntroScreen");
    })();
  }

  return (
    <View style={styles.container}>
      <Text style={styles.headerText}>Explore local stores</Text>
      <View>
        <Text style={styles.locationMessage}>
          Help us display your local delivery options by granting location
          permissions
        </Text>
      </View>
      <TouchableOpacity
        onPress={() => shareLocation()}
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
          Share location
        </Text>
      </TouchableOpacity>

      <View style={styles.button}>
        <Button
          title="Not now"
          onPress={() => navigation.navigate("IntroScreen")}
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
