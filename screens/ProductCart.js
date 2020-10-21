import React, { useState, useEffect } from "react";
import Icon from "react-native-vector-icons/Ionicons";
import {
  Text,
  View,
  StyleSheet,
  Button,
  Image,
  TouchableOpacity,
  Dimensions,
} from "react-native";
var { width } = Dimensions.get("window");
import { useQuery } from "@apollo/client";
import { PRODUCTS_BY_STORE_ID } from "../graphql/queries";
import AsyncStorage from "@react-native-community/async-storage";

export default function ProductCart({ navigation }) {
  const [storeId, setStoreId] = useState(1);
  const [getCart, setCart] = useState(0);

  const { loading, error, data } = useQuery(PRODUCTS_BY_STORE_ID, {
    variables: { id: storeId },
  });

  function onLoadTotal() {
    let total = 0;
    const cart = getCart;

    for (var i = 0; i < cart.length; i++) {
      total = total + cart[i].price * cart[i].quantity;
    }
    return total.toFixed(2);
  }

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
  }, []);

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

  function clearStorage() {
    AsyncStorage.clear();
    navigation.navigate();
  }

  if (data) {
    return (
      <View style={styles.mainContainer}>
        <View>
          <Text style={styles.products}>Select products:</Text>
          {data.productsByStoreId.map((product) => (
            <Text style={styles.categoryCard} key={product.id}>
              <Text>
                {product.name} - €{product.price}
                <Image
                  resizeMode={"contain"}
                  style={{
                    width: width / 4,
                    height: width / 4,
                    borderRadius: 99,
                  }}
                  source={{
                    uri: product.image,
                  }}
                />
                <TouchableOpacity
                  onPress={() => onClickAddCart(product)}
                  style={{
                    width: "100%",
                    backgroundColor: "#33c37d",
                    flexDirection: "row",
                    alignItems: "center",
                    justifyContent: "center",
                    borderRadius: 5,
                    padding: 4,
                    margin: 5,
                  }}
                >
                  <Text
                    style={{ fontSize: 18, color: "white", fontWeight: "bold" }}
                  >
                    Add Cart
                  </Text>
                  <View style={{ width: 10 }} />
                  <Icon name="ios-add-circle" size={30} color={"white"} />
                </TouchableOpacity>
              </Text>
            </Text>
          ))}
        </View>
        <View>
          <TouchableOpacity
            onPress={() => navigation.navigate("OrderDetails")}
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
              Place Order{" "}
              <Text
                style={{
                  fontSize: 22,
                  color: "white",
                  backgroundColor: "#337a36",
                  width: "100%",
                  textAlign: "center",
                  fontWeight: "bold",
                  borderRadius: 5,
                  padding: 10,
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
        </View>
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
  mainContainer: {
    flex: 1,
    flexDirection: "column",
    alignItems: "center",
    justifyContent: "center",
    marginBottom: 10,
    backgroundColor: "white",
  },
  products: {
    //justifyContent: "center",
    //textAlign: "center",
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
