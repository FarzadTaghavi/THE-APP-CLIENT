import React, { useState, useEffect } from "react";
import { Text, View, StyleSheet, Button, TouchableOpacity } from "react-native";
import { useQuery } from "@apollo/client";
import { STORES_BY_TYPE_ID } from "../graphql/queries";
import AsyncStorage from "@react-native-community/async-storage";

export default function allStores({ navigation }) {
  const [storeTypeId, setstoreTypeId] = useState(1);
  const { loading, error, data } = useQuery(STORES_BY_TYPE_ID, {
    variables: { id: storeTypeId },
  });

  useEffect(() => {
    async function retrieveData() {
      try {
        const storeTypeId = await AsyncStorage.getItem("storeTypeId");
        setstoreTypeId(parseInt(storeTypeId));
      } catch (error) {
        console.log("error: ", error.message);
      }
    }
    retrieveData();
  }, []);

  // get selected store type id from user
  function getSelectedStoreId(id) {
    STORES_BY_TYPE_ID;
    console.log("Selected store ID: ", id);
    storeSelectedStoreId(id);
    navigation.navigate("ProductCart");
  }

  // store selected store type id from user
  const storeSelectedStoreId = async (value) => {
    try {
      const jsonValue = value.toString();
      await AsyncStorage.setItem("storeId", jsonValue);
    } catch (e) {
      console.log(e);
    }
  };

  if (data) {
    return (
      <View style={styles.container}>
        <View>
          <Text style={styles.Categories}>Select a store:</Text>
          {data.storesByTypeId.map((store) => (
            <TouchableOpacity
              key={store.id}
              onPress={() => getSelectedStoreId(store.id)}
            >
              <Text style={styles.categoryCard}>{store.name}</Text>
            </TouchableOpacity>
          ))}
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
    width: 200,
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
});
