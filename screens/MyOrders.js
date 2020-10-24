import React, { useState, useEffect } from "react";
import {
  Text,
  View,
  StyleSheet,
  Dimensions,
  TouchableOpacity,
} from "react-native";
var { width } = Dimensions.get("window");
import { useQuery } from "@apollo/client";
import { ALL_ORDERS_BY_USER_ID } from "../graphql/queries";
import Icon from "react-native-vector-icons/Ionicons";
import AsyncStorage from "@react-native-community/async-storage";
import { ScrollView } from "react-native-gesture-handler";

export default function MyOrders({ navigation }) {
  const [userId, setUserId] = useState(0);
  const { loading, error, data } = useQuery(ALL_ORDERS_BY_USER_ID, {
    variables: { id: userId },
  });

  useEffect(() => {
    async function retrieveData() {
      try {
        const id = await AsyncStorage.getItem("userId");
        setUserId(parseInt(id));
      } catch (error) {
        console.log("error: ", error.message);
      }
    }
    retrieveData();
  }, [data]);

  if (data) {
    return (
      <View style={{ flex: 1 }}>
        <View style={{ flex: 1, backgroundColor: "white" }}>
          <Icon
            onPress={() => navigation.navigate("ProfilePage")}
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
            alignItems: "center",
            justifyContent: "flex-start",
          }}
        >
          <Text
            style={{
              fontSize: 22,
              marginTop: 20,
              marginBottom: 20,
              fontWeight: "800",
            }}
          >
            Your Orders
          </Text>
          <ScrollView style={{ width: width - 30 }}>
            {data.allOrdersByUserId.map((store, i) => (
              <View style={styles.categoryCard} key={i}>
                <Text>Order status: {store.status}</Text>
                <Text>order amount: {store.orderTotal}</Text>
              </View>
            ))}
          </ScrollView>
        </View>

        <View style={{ flex: 1.5, backgroundColor: "white" }}></View>
      </View>
    );
  } else {
    return (
      <View>
        <Text>Loading</Text>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    flexDirection: "column",
    alignItems: "center",
    justifyContent: "center",
    marginBottom: 10,
  },
  categoryCard: {
    width: width - 50,
    height: 80,
    margin: 10,
    padding: 15,
    borderWidth: 3,
    justifyContent: "center",
    flexDirection: "column",
    borderColor: "#000",
    borderRadius: 5,
  },
});
