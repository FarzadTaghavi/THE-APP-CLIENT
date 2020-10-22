import React from "react";
import MapView, { Marker, PROVIDER_GOOGLE } from "react-native-maps";
import { StyleSheet, Text, View, Dimensions } from "react-native";
var { width } = Dimensions.get("window");
import Icon from "react-native-vector-icons/Ionicons";

export default function TrackOrder({ navigation }) {
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
          provider={PROVIDER_GOOGLE}
          style={{ ...StyleSheet.absoluteFillObject }}
          region={{
            latitude: 52.336319,
            longitude: 4.913255,
            latitudeDelta: 0.009,
            longitudeDelta: 0.009,
          }}
        >
          <MapView.Marker
            coordinate={{
              latitude: 52.336319,
              longitude: 4.913255,
            }}
          />
          <MapView.Marker
            coordinate={{
              latitude: 52.336319,
              longitude: 4.913255,
            }}
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
            <Text style={{ textAlign: "center", marginTop: 30, fontSize: 18 }}>
              {" "}
              8 min
            </Text>
          </View>
        </View>
        <View
          style={{
            flex: 1,
            backgroundColor: "white",
            alignItems: "center",
            marginTop: 50,
          }}
        >
          <Text style={{ fontSize: 18 }}>Your order is on its way</Text>
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
