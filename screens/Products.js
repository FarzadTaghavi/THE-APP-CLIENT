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

export default function products({ navigation }) {
  const [storeId, setStoreId] = useState(1);
  const [incart, setInCart] = useState(0);
  console.log("incart: ", incart);
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
  }, []);

  // get selected product id from user
  function getSelectedProductId(id) {
    PRODUCTS_BY_STORE_ID;
    console.log("Selected product ID: ", id);
    storeSelectedProductId(id);
    setInCart(id);
  }

  // store selected store type id from user
  const storeSelectedProductId = async (value) => {
    try {
      const jsonValue = value.toString();
      await AsyncStorage.setItem("product", jsonValue);
    } catch (e) {
      console.log(e);
    }
  };

  if (data) {
    return (
      <View style={styles.container}>
        <View>
          <Text style={styles.Categories}>Select products:</Text>
          {data.productsByStoreId.map((product) => (
            <Text style={styles.categoryCard} key={product.id}>
              <Text>
                {product.name} - €{product.price}
                <Image
                  source={{
                    uri: store.image,
                  }}
                  style={{ width: "100%", height: 160, marginBottom: 30 }}
                />
                <TouchableOpacity
                  title="+"
                  style={styles.button}
                  onPress={() => getSelectedProductId(product.id)}
                >
                  <Text>+</Text>
                </TouchableOpacity>
                <TouchableOpacity
                  title="-"
                  style={styles.button}
                  onPress={() => removeSelectedProductId(product.id)}
                >
                  <Text>-</Text>
                </TouchableOpacity>
              </Text>
            </Text>
          ))}
        </View>
        <View>
          <Button
            title="place order"
            color="#5cb85c"
            onPress={() => navigation.navigate("OrderDetails")}
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
  container: {
    flex: 1,
    flexDirection: "column",
    alignItems: "center",
    justifyContent: "center",
    marginBottom: 10,
  },
  Categories: {
    justifyContent: "center",
    textAlign: "center",
    fontSize: 20,
    width: 170,
    marginBottom: 10,
    marginTop: 250,
  },
  categoryCard: {
    width: 250,
    height: 50,
    margin: 10,
    padding: 15,
    borderWidth: 1,
    justifyContent: "center",
    flexDirection: "column",
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
