import React, { useState, useEffect } from "react";
import Icon from "react-native-vector-icons/Ionicons";
import {
  Text,
  View,
  StyleSheet,
  Image,
  TouchableOpacity,
  Dimensions,
} from "react-native";
var { width } = Dimensions.get("window");
import { useQuery } from "@apollo/client";
import { PRODUCTS_BY_STORE_ID } from "../graphql/queries";
import AsyncStorage from "@react-native-community/async-storage";
import { ScrollView } from "react-native-gesture-handler";

export default function ProductCart({ navigation }) {
  const [storeId, setStoreId] = useState(1);
  const [getCart, setCart] = useState(0);

  const { loading, error, data } = useQuery(PRODUCTS_BY_STORE_ID, {
    variables: { id: storeId },
  });

  useEffect(() => {
    async function retrieveData() {
      try {
        const storeId = await AsyncStorage.getItem("storeId");
        setStoreId(parseInt(storeId));
      } catch (error) {
        console.log("error: ", error.message);
      }
    }
    retrieveData();
  }, [getCart]);

  function onLoadTotal() {
    let total = 0;
    const cart = getCart;

    for (var i = 0; i < cart.length; i++) {
      total = total + cart[i].price * cart[i].quantity;
    }
    return total.toFixed(2);
  }

  function onClickAddCart(data) {
    const itemcart = {
      food: data,
      quantity: 1,
      price: data.price,
    };

    AsyncStorage.getItem("cart")
      .then((datacart) => {
        if (datacart !== null) {
          // We have data!!
          const cart = JSON.parse(datacart);
          console.log("cart", cart);
          cart.push(itemcart);
          AsyncStorage.setItem("cart", JSON.stringify(cart));
          setCart(cart);
        } else {
          const cart = [];
          cart.push(itemcart);
          AsyncStorage.setItem("cart", JSON.stringify(cart));
        }
        //alert("Add Cart");
      })
      .catch((err) => {
        alert(err);
      });
  }

  if (data)
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
            {data.productsByStoreId.map((product, i) => {
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
                    source={{ uri: product.image }}
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
                        {product.name}
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
                        €{product.price}
                      </Text>
                      <View
                        style={{ flexDirection: "row", alignItems: "center" }}
                      >
                        <TouchableOpacity
                          onPress={() => onClickAddCart(product)}
                          style={{
                            width: 40,
                            backgroundColor: "#33c37d",
                            flexDirection: "row",
                            alignItems: "center",
                            justifyContent: "center",
                            borderRadius: 5,
                            padding: 5,
                            paddingRight: 5,
                            margin: 5,
                          }}
                        >
                          <Text
                            style={{
                              fontSize: 18,
                              color: "white",
                              fontWeight: "bold",
                            }}
                          ></Text>
                          <View style={{ width: 3 }} />
                          <Icon
                            name="ios-add-circle"
                            size={30}
                            color={"white"}
                          />
                        </TouchableOpacity>
                      </View>
                    </View>
                  </View>
                </View>
              );
            })}

            <View style={{ height: 10 }} />
          </ScrollView>
          <TouchableOpacity
            onPress={() => navigation.navigate("OrderDetails")}
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
              PLACE ORDER
            </Text>
            <Text
              style={{
                fontSize: 22,
                color: "white",
                backgroundColor: "#337a36",
                fontWeight: "bold",
                marginLeft: 20,
                padding: 10,
                borderRadius: 50,
              }}
            >
              € {onLoadTotal()}
            </Text>
          </TouchableOpacity>

          <View style={{ height: 20 }} />
        </View>
      </View>
    );
  else {
    return (
      <View>
        <Text>Loading</Text>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  mainContainer: {
    flex: 1,
    flexDirection: "column",
    alignItems: "center",
    justifyContent: "center",
    marginBottom: 10,
    backgroundColor: "white",
  },
  products: {
    alignSelf: "center",
    flexDirection: "row",
    fontSize: 20,
    width: 170,
    marginBottom: 10,
    marginTop: 10,
  },
  categoryCard: {
    width: width - 40,
    height: 120,
    margin: 10,
    padding: 15,
    borderWidth: 2,
    justifyContent: "center",
    flexDirection: "row",
    textAlign: "center",
    alignItems: "center",
    borderColor: "#000",
    borderRadius: 5,
  },
  button: {
    alignItems: "center",
    backgroundColor: "#2296f3",
    padding: 10,
    margin: 5,
    color: "#fff",
  },
});
