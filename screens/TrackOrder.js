import React, { useState, useEffect } from "react";
import MapView, { Marker } from "react-native-maps";
import { StyleSheet, Text, View } from "react-native";

import Icon from "react-native-vector-icons/Ionicons";

import storefront from "../assets/storefront.png";
import car from "../assets/car.png";
import marker from "../assets/marker.png";
import * as Location from "expo-location";

export default function TrackOrder({ navigation }) {
  const [userLocation, setUserLocation] = useState(null);
  const [userLat, setUserLat] = useState(52.336319);
  const [userLong, setUserLong] = useState(4.913255);
  const [driverLat, setDriverLat] = useState(52.340463);
  const [driverLong, setDriverLong] = useState(4.903646);
  const [timeleft, setTimeleft] = useState(10);

  useEffect(() => {
    (async () => {
      let { status } = await Location.requestPermissionsAsync();
      if (status !== "granted") {
        setErrorMsg("Permission to access location was denied");
      }

      let location = await Location.getCurrentPositionAsync({});
      setUserLocation(location);
      const latUser = location.coords.latitude;
      setUserLat(parseFloat(latUser.toFixed(6)));
      const longUser = location.coords.longitude;
      setUserLong(parseFloat(location.coords.longitude.toFixed(6)));
    })();
  }, []);

  let driLat = 52.340463;
  let driLon = 4.903646;
  let newTimeleft = timeleft;

  useEffect(() => {
    move();
  }, []);

  function move() {
    let interval = setInterval(howMuchLonger, 1000);
    function howMuchLonger() {
      if (
        driLat.toFixed(3) == userLat.toFixed(3) &&
        driLon.toFixed(3) == userLong.toFixed(3)
      ) {
        clearInterval(interval);
      } else {
        const newdDriverLat = (driLat -= 0.0004144);
        const newDriverLong = (driLon += 0.0009609);

        driLat = newdDriverLat;
        driLon = newDriverLong;

        setDriverLat(driLat);
        setDriverLong(driLon);
        setTimeleft((newTimeleft -= 1));
      }
    }
  }

  return (
    <View style={{ flex: 1 }}>
      <View style={{ flex: 1, backgroundColor: "white" }}>
        <Icon
          onPress={() => navigation.navigate("ProfilePage")}
          style={{
            top: 43,
            left: 30,
          }}
          name="md-person"
          size={38}
          color={"grey"}
        />
      </View>
      <View
        style={{
          flex: 5,
          alignItems: "center",
          justifyContent: "flex-start",
        }}
      >
        <MapView
          region={{
            latitude: 52.336319,
            longitude: 4.913255,
            latitudeDelta: 0.03,
            longitudeDelta: 0.03,
          }}
          style={{ ...StyleSheet.absoluteFillObject }}
        >
          <Marker
            coordinate={{
              latitude: userLat,
              longitude: userLong,
            }}
            image={marker}
          />
          <Marker
            coordinate={{
              latitude: 52.343541,
              longitude: 4.906605,
            }}
            image={storefront}
          />
          <Marker
            coordinate={{
              latitude: driverLat,
              longitude: driverLong,
            }}
            image={car}
          />
        </MapView>
      </View>
      <View
        style={{ flex: 4, backgroundColor: "white", flexDirection: "column" }}
      >
        <View
          style={{
            flex: 4,
            backgroundColor: "transparant",
            justifyContent: "space-evenly",
          }}
        >
          {timeleft == 0 ? (
            <Text style={{ textAlign: "center", marginTop: 30, fontSize: 18 }}>
              Order arrived!
            </Text>
          ) : (
            <View
              style={{
                width: 120,
                height: 120,
                marginTop: 50,
                fontSize: 22,
                paddingTop: 15,
                paddingBottom: 15,
                borderWidth: 4,
                shadowColor: "black",
                alignSelf: "center",
                borderColor: "#000",
                borderRadius: "70",
              }}
            >
              <Text
                style={{ textAlign: "center", marginTop: 30, fontSize: 18 }}
              >
                {timeleft} sec
              </Text>
            </View>
          )}
        </View>

        <View
          style={{
            flex: 1,
            backgroundColor: "white",
            alignItems: "center",
            marginTop: 50,
          }}
        >
          {timeleft == 0 ? (
            <Text style={{ fontSize: 18 }}>Enjoy your meal</Text>
          ) : (
            <Text style={{ fontSize: 18 }}>Your order is on its way</Text>
          )}
        </View>
        <View
          style={{
            flex: 4,
            flexDirection: "row",
            backgroundColor: "white",
            borderTopColor: "grey",
            borderTopWidth: 2,
            shadowColor: "black",
            alignItems: "center",
            marginTop: 50,
          }}
        >
          <View
            style={{
              backgroundColor: "white",
              width: 60,
              height: 60,
              marginTop: 2,
              marginLeft: 20,
              fontSize: 22,
              paddingTop: 15,
              paddingBottom: 15,
              borderWidth: 1,
              shadowColor: "black",
              alignSelf: "center",
              borderColor: "#000",
              borderRadius: "50",
            }}
          >
            <Text style={{ textAlign: "center", fontSize: 16, marginTop: 5 }}>
              {" "}
              IMG
            </Text>
          </View>
          <View>
            <Text
              style={{
                marginLeft: 20,
                marginBottom: 2,
                fontSize: 24,
                fontWeight: "600",
              }}
            >
              Driver's Name
            </Text>
            <Text
              style={{
                marginLeft: 20,
                marginBottom: 1,
                fontSize: 22,
                fontWeight: "600",
              }}
            >
              <Icon
                style={{
                  top: 43,
                  left: 30,
                }}
                name="ios-star"
                size={38}
                color={"black"}
              />
              <Icon
                style={{
                  top: 43,
                  left: 30,
                }}
                name="ios-star"
                size={38}
                color={"black"}
              />
              <Icon
                style={{
                  top: 43,
                  left: 30,
                }}
                name="ios-star"
                size={38}
                color={"black"}
              />
              <Icon
                style={{
                  top: 43,
                  left: 30,
                }}
                name="ios-star"
                size={38}
                color={"black"}
              />
              <Icon
                style={{
                  top: 43,
                  left: 30,
                }}
                name="ios-star-outline"
                size={38}
                color={"black"}
              />
            </Text>
          </View>

          <View
            style={{
              backgroundColor: "white",
              width: 60,
              height: 60,
              marginTop: 2,
              marginLeft: 60,
              fontSize: 22,
              paddingTop: 15,
              paddingBottom: 15,
              borderWidth: 1,
              shadowColor: "black",
              alignSelf: "center",
              borderColor: "#000",
              borderRadius: "50",
            }}
          >
            <Icon
              style={{
                top: 0,
                left: 18,
              }}
              name="md-call"
              size={30}
              color={"black"}
            />
          </View>
        </View>
      </View>
    </View>
  );
}
