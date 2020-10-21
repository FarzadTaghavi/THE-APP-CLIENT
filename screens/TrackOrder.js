TrackOrder.js;

import React from "react";
import MapView, { Marker, PROVIDER_GOOGLE } from "react-native-maps";
import { StyleSheet, Text, View, Dimensions } from "react-native";

export default function TrackOrder({ navigation }) {
  return (
    <MapView
      provider={PROVIDER_GOOGLE}
      style={styles.map}
      region={{
        latitude: 52.336319,
        longitude: 4.913255,
        latitudeDelta: 0.015,
        longitudeDelta: 0.0121,
      }}
    >
      <Marker
        coordinate={{
          latitude: 52.336319,
          longitude: 4.913255,
        }}
      />
    </MapView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
    flexDirection: "row-reverse",
    alignItems: "center",
    justifyContent: "center",
    marginTop: 300,
  },
  map: {
    height: "80%",
  },
});
