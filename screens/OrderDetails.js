import React, { useState, useEffect } from "react";
import {
  Text,
  View,
  Button,
  Image,
  TouchableOpacity,
  StyleSheet,
  Dimensions,
  ScrollView,
} from "react-native";
var { width } = Dimensions.get("window");
import Icon from "react-native-vector-icons/Ionicons";
import AsyncStorage from "@react-native-community/async-storage";

function OrderDetails({ navigation }) {
  const [state, setState] = useState({
    dataCart: [],
  });
  const [getTotal, setTotal] = useState(0);
  console.log("getTotal", getTotal);
  console.log("state:", state);

  function onLoadTotal() {
    let total = 0;
    const cart = state.dataCart;

    for (var i = 0; i < cart.length; i++) {
      total = total + cart[i].price * cart[i].quantity;
    }
    return total.toFixed(2);
    setTotal(total);
  }

  useEffect(() => {
    {
      AsyncStorage.getItem("cart")
        .then((cart) => {
          if (cart !== null) {
            // We have data!!
            const cartfood = JSON.parse(cart);
            setState({ dataCart: cartfood });
          }
        })
        .catch((err) => {
          alert(err);
        });
    }
  }, []);

  function onChangeQual(i, type) {
    const dataCar = state.dataCart;
    console.log("dataCar: ", dataCar);
    let cantd = dataCar[i].quantity;

    if (type) {
      cantd = cantd + 1;
      dataCar[i].quantity = cantd;
      setState({ dataCart: dataCar });
    } else if (type == false && cantd >= 2) {
      cantd = cantd - 1;
      dataCar[i].quantity = cantd;
      setState({ dataCart: dataCar });
    } else if (type == false && cantd == 1) {
      dataCar.splice(i, 1);
      setState({ dataCart: dataCar });
    }
  }

  function clearStorage() {
    AsyncStorage.clear();
    navigation.navigate("Categories");
  }

  return (
    <View style={{ flex: 1, alignItems: "center", justifyContent: "center" }}>
      <View style={{ height: 20 }} />
      <Text style={{ fontSize: 32, fontWeight: "bold", color: "#33c37d" }}>
        Order details
      </Text>
      <View style={{ height: 10 }} />

      <View style={{ flex: 1 }}>
        <ScrollView>
          {state.dataCart.map((item, i) => {
            return (
              <View
                key={i}
                style={{
                  width: width - 20,
                  margin: 10,
                  backgroundColor: "transparent",
                  flexDirection: "row",
                  borderBottomWidth: 2,
                  borderColor: "#cccccc",
                  paddingBottom: 10,
                }}
              >
                <Image
                  resizeMode={"contain"}
                  style={{
                    width: width / 3,
                    height: width / 3,
                    borderRadius: 99,
                  }}
                  source={{ uri: item.food.image }}
                />
                <View
                  style={{
                    flex: 1,
                    backgroundColor: "trangraysparent",
                    padding: 10,
                    justifyContent: "space-between",
                  }}
                >
                  <View>
                    <Text style={{ fontWeight: "bold", fontSize: 20 }}>
                      {item.food.name}
                    </Text>
                  </View>
                  <View
                    style={{
                      flexDirection: "row",
                      justifyContent: "space-between",
                    }}
                  >
                    <Text
                      style={{
                        fontWeight: "bold",
                        color: "#33c37d",
                        fontSize: 20,
                      }}
                    >
                      €{item.price * item.quantity}
                    </Text>
                    <View
                      style={{ flexDirection: "row", alignItems: "center" }}
                    >
                      <TouchableOpacity onPress={() => onChangeQual(i, false)}>
                        <Icon
                          name="ios-remove-circle"
                          size={35}
                          color={"#33c37d"}
                        />
                      </TouchableOpacity>
                      <Text
                        style={{
                          paddingHorizontal: 8,
                          fontWeight: "bold",
                          fontSize: 18,
                        }}
                      >
                        {item.quantity}
                      </Text>
                      <TouchableOpacity onPress={() => onChangeQual(i, true)}>
                        <Icon
                          name="ios-add-circle"
                          size={35}
                          color={"#33c37d"}
                        />
                      </TouchableOpacity>
                    </View>
                  </View>
                </View>
              </View>
            );
          })}
        </ScrollView>
        <View style={{ height: 20 }} />

        <TouchableOpacity
          onPress={() => navigation.navigate("PaymentScreen")}
          style={{
            backgroundColor: "#33c37d",
            width: width - 40,
            alignItems: "center",
            padding: 10,
            borderRadius: 5,
            margin: 20,
          }}
        >
          <Text
            style={{
              fontSize: 24,
              fontWeight: "bold",
              color: "white",
              height: 50,
              paddingTop: 10,
            }}
          >
            CHECKOUT
            <Text
              style={{
                fontSize: 22,
                color: "white",
                backgroundColor: "#337a36",
                width: "100%",
                textAlign: "center",
                fontWeight: "bold",
                borderRadius: 15,
                padding: 20,
                margin: 5,
              }}
            >
              € {onLoadTotal()}
            </Text>
          </Text>
        </TouchableOpacity>
        <Button
          title="LOG OUT"
          color="#5cb85c"
          onPress={() => clearStorage()}
        />
        <Button title="Go back" onPress={() => navigation.goBack()} />

        <View style={{ height: 20 }} />
      </View>
    </View>
  );
}

export default OrderDetails;
