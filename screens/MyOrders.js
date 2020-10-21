import React, { useState, useEffect } from "react";
import {
  Text,
  View,
  StyleSheet,
  Dimensions,
  TouchableOpacity,
} from "react-native";
import { useQuery } from "@apollo/client";
import { ALL_ORDERS_BY_USER_ID } from "../graphql/queries";
import Icon from "react-native-vector-icons/Ionicons";
import AsyncStorage from "@react-native-community/async-storage";

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
  }, []);

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
          backgroundColor: "gold",
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
        {data.allOrdersByUserId.map((store) => (
          <TouchableOpacity style={styles.categoryCard} key={store.id}>
            <Text>Order status: {store.status}</Text>
            <Text>order amount: {store.orderTotal}</Text>

            <TouchableOpacity style={{ top: 10 }}>
              <Text style={{ fontWeight: "600" }}>Products:</Text>
              {data.products.map((store) => (
                <Text key={store.id} style={{ paddingTop: 5 }}>
                  {store.name}
                </Text>
              ))}
            </TouchableOpacity>
          </TouchableOpacity>
        ))}
      </View>
      <View style={{ flex: 1.5, backgroundColor: "blue" }}></View>
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
  categoryCard: {
    width: 200,
    height: 200,
    margin: 10,
    padding: 15,
    borderWidth: 1,
    justifyContent: "center",
    flexDirection: "column",
    //textAlign: "center",
    //alignItems: "center",
    borderColor: "#000",
    borderRadius: 5,
  },
});
