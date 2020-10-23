import React, { useEffect, useState } from "react";
import { View, Text, TouchableOpacity } from "react-native";
import Icon from "react-native-vector-icons/Ionicons";
import AsyncStorage from "@react-native-community/async-storage";

export default function ProfilePage({ navigation }) {
  const [getUser, setUser] = useState("");

  useEffect(() => {
    async function retrieveData() {
      try {
        const user = await AsyncStorage.getItem("fullName");
        setUser(JSON.parse(user));
      } catch (error) {
        console.log("error: ", error.message);
      }
    }
    retrieveData();
  }, []);

  function clearStorage() {
    AsyncStorage.clear();
    navigation.navigate("LogInScreen");
  }

  return (
    <View style={{ flex: 1, backgroundColor: "white" }}>
      <View style={{ flex: 1 }}>
        <Icon
          onPress={() => navigation.navigate("Categories")}
          style={{
            top: 43,
            left: 30,
          }}
          name="ios-arrow-round-back"
          size={38}
          color={"grey"}
        />
      </View>
      <View
        style={{
          flex: 6,
          backgroundColor: "white",
          alignItems: "flex-start",
          paddingLeft: 30,
          paddingRight: 30,
        }}
      >
        <View
          style={{
            flexDirection: "column",
            width: "100%",
            height: 50,
            marginTop: 10,
            marginBottom: 20,
          }}
        >
          <Text
            style={{
              fontSize: 32,
              fontWeight: "700",
              padding: 15,
            }}
          >
            Hello, {getUser}!
          </Text>
        </View>
        <View
          style={{
            flexDirection: "column",
            width: "100%",
            height: 55,
            marginTop: 20,
          }}
        >
          <Text
            style={{
              fontSize: 32,
              fontWeight: "700",
              padding: 15,
            }}
          >
            Account
          </Text>
        </View>

        <TouchableOpacity
          onPress={() => navigation.navigate("MyOrders")}
          style={{
            flexDirection: "column",
            width: "100%",
            height: 45,
            marginTop: 20,
          }}
        >
          <Text
            style={{
              fontSize: 18,
              paddingLeft: 20,
            }}
          >
            <Text
              style={{
                marginTop: 10,
              }}
            >
              <Icon name="md-cash" size={28} color={"grey"} />
            </Text>
            {"   "}
            My orders
          </Text>
          <Text
            style={{
              padding: 15,
              alignSelf: "flex-end",
              position: "absolute",
            }}
          >
            <Icon name="ios-arrow-forward" size={20} color={"grey"} />
          </Text>
        </TouchableOpacity>
        <TouchableOpacity
          onPress={() => navigation.navigate("MyInformation")}
          style={{
            flexDirection: "column",
            width: "100%",
            height: 65,
            marginTop: 20,
            borderBottomColor: "grey",
            borderBottomWidth: 1,
          }}
        >
          <Text
            style={{
              fontSize: 18,

              paddingLeft: 20,
              paddingBottom: 20,
            }}
          >
            <Text>
              <Icon
                name="md-information-circle-outline"
                size={38}
                color={"grey"}
              />
            </Text>
            {"   "}
            My information
          </Text>
          <Text
            style={{
              fontSize: 32,

              padding: 15,
              alignSelf: "flex-end",
              position: "absolute",
            }}
          >
            <Icon name="ios-arrow-forward" size={20} color={"grey"} />
          </Text>
        </TouchableOpacity>
        <TouchableOpacity
          onPress={() => navigation.navigate("PromoCodes")}
          style={{
            flexDirection: "column",
            width: "100%",
            height: 45,
            marginTop: 20,
          }}
        >
          <Text
            style={{
              fontSize: 18,

              paddingLeft: 20,
            }}
          >
            <Text>
              <Icon name="md-flash" size={38} color={"grey"} />
            </Text>
            {"   "}
            Promo codes
          </Text>
          <Text
            style={{
              fontSize: 32,

              padding: 15,
              alignSelf: "flex-end",
              position: "absolute",
            }}
          >
            <Icon name="ios-arrow-forward" size={20} color={"grey"} />
          </Text>
        </TouchableOpacity>
        <TouchableOpacity
          onPress={() => navigation.navigate("FAQ")}
          style={{
            flexDirection: "column",
            width: "100%",
            height: 45,
            marginTop: 20,
          }}
        >
          <Text
            style={{
              fontSize: 18,

              paddingLeft: 20,
            }}
          >
            <Text>
              <Icon name="md-book" size={38} color={"grey"} />
            </Text>
            {"   "}
            F.A.Q
          </Text>
          <Text
            style={{
              fontSize: 32,

              padding: 15,
              alignSelf: "flex-end",
              position: "absolute",
            }}
          >
            <Icon name="ios-arrow-forward" size={20} color={"grey"} />
          </Text>
        </TouchableOpacity>
        <TouchableOpacity
          onPress={() => navigation.navigate("Notifications")}
          style={{
            flexDirection: "column",
            width: "100%",
            height: 45,
            marginTop: 20,
          }}
        >
          <Text
            style={{
              fontSize: 18,

              paddingLeft: 20,
            }}
          >
            <Text>
              <Icon name="md-notifications-outline" size={38} color={"grey"} />
            </Text>
            {"   "}
            Notifications
          </Text>
          <Text
            style={{
              fontSize: 32,

              padding: 15,
              alignSelf: "flex-end",
              position: "absolute",
            }}
          >
            <Icon name="ios-arrow-forward" size={20} color={"grey"} />
          </Text>
        </TouchableOpacity>
        <TouchableOpacity
          onPress={() => clearStorage()}
          style={{
            flexDirection: "column",
            width: "100%",
            height: 45,
            marginTop: 20,
          }}
        >
          <Text
            style={{
              fontSize: 18,

              paddingLeft: 20,
            }}
          >
            <Text>
              <Icon name="md-exit" size={38} color={"grey"} />
            </Text>
            {"   "}
            Log out
          </Text>
          <Text
            style={{
              fontSize: 32,

              padding: 15,
              alignSelf: "flex-end",
              position: "absolute",
            }}
          >
            <Icon name="ios-arrow-forward" size={20} color={"grey"} />
          </Text>
        </TouchableOpacity>
      </View>
      <View style={{ flex: 1.5, backgroundColor: "blue" }}></View>
    </View>
  );
}
