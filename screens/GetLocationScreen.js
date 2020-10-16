import React, { useState, useEffect } from "react";
import { Alert, Text, View, StyleSheet, Button } from "react-native";
import * as Location from "expo-location";

export default function GetLocationScreen({ navigation }) {
  const [location, setLocation] = useState({});
  const [getLong, setLong] = useState("");
  const [getLat, setLat] = useState("");
  const [errorMsg, setErrorMsg] = useState(null);

  function shareLocation() {
    (async () => {
      let { status } = await Location.requestPermissionsAsync();
      if (status !== "granted") {
        setErrorMsg("Permission to access location was denied");
      }

      let location = await Location.getCurrentPositionAsync({});
      setLocation(location);
      setLong(location.coords.longitude);
      setLat(location.coords.latitude);
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
      <Button
        title="Share location"
        color="#5cb85c"
        onPress={() => shareLocation()}
      />

      <Button
        title="Not now"
        onPress={() => navigation.navigate("IntroScreen")}
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
