import React, { useState, useEffect } from "react";
import {
  Text,
  View,
  Image,
  TouchableOpacity,
  Dimensions,
  ScrollView,
} from "react-native";
var { width } = Dimensions.get("window");
import Icon from "react-native-vector-icons/Ionicons";
import AsyncStorage from "@react-native-community/async-storage";
import { NEW_ORDER } from "../graphql/queries";
import { useMutation } from "@apollo/client";

function OrderDetails({ navigation }) {
  const [createNewOrder, { error }] = useMutation(NEW_ORDER);
  const [getTotal, setTotal] = useState(0);
  const [getUserId, setUserId] = useState(0);

  const [state, setState] = useState({
    dataCart: [],
  });

  // get total cart amount
  useEffect(() => {
    function onLoadTotal() {
      let total = 0;
      const cart = state.dataCart;

      for (var i = 0; i < cart.length; i++) {
        total = total + cart[i].price * cart[i].quantity;
      }
      setTotal(total);
    }
    onLoadTotal();
  }, [onChangeQual]);
  // get items from product cart page

  useEffect(() => {
    {
      AsyncStorage.getItem("cart")
        .then((cart) => {
          if (cart !== null) {
            const cartfood = JSON.parse(cart);
            setState({ dataCart: cartfood });
            // set the cart items in the state
          }
        })
        .catch((err) => {
          alert(err);
        });
    }
  }, []);

  function onChangeQual(i, type) {
    const dataCar = state.dataCart;

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

  function checkout() {
    const newOrder = createNewOrder({
      variables: {
        userId: getUserId,
        storeId: 1,
        delivererId: 1,
        orderTotal: getTotal,
        status: "pending",
      },
    });
    navigation.navigate("PaymentScreen");
  }

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
    <View style={{ flex: 1, alignItems: "center", justifyContent: "center" }}>
      <View style={{ height: 20 }} />
      <Text
        style={{
          fontSize: 32,
          fontWeight: "bold",
          color: "#33c37d",
          marginTop: 40,
        }}
      >
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
                  width: width - 30,
                  margin: 12,
                  backgroundColor: "white",
                  flexDirection: "row",
                  borderBottomWidth: 5,
                  borderRightWidth: 3,
                  borderColor: "#cccccc",
                  paddingBottom: 10,
                  borderRadius: 15,
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
                      €{item.price.toFixed(2) * item.quantity}
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
          onPress={() => checkout()}
          style={{
            backgroundColor: "#33c37d",
            width: width - 40,
            alignItems: "center",
            justifyContent: "space-evenly",
            padding: 10,
            borderRadius: 10,
            margin: 20,
            height: 60,
          }}
        >
          <Text
            style={{
              fontSize: 24,
              fontWeight: "bold",
              color: "white",

              paddingRight: 20,
            }}
          >
            CHECKOUT
            <Text
              style={{
                fontSize: 22,
                color: "white",
                backgroundColor: "#337a36",
                textAlign: "center",
                fontWeight: "bold",
              }}
            >
              € {getTotal.toFixed(2)}
            </Text>
          </Text>
        </TouchableOpacity>

        <View style={{ height: 20 }} />
      </View>
    </View>
  );
}

export default OrderDetails;
