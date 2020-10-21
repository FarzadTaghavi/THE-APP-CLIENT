import React, { useState, useEffect } from "react";
import { Text, View, StyleSheet, Button, TouchableOpacity } from "react-native";
import { useQuery } from "@apollo/client";
import { STORE_TYPE_BY_CATEGORY_ID } from "../graphql/queries";
import AsyncStorage from "@react-native-community/async-storage";

export default function storeTypes({ navigation }) {
  const [categoryId, setCategoryId] = useState(0);

  // working code
  useEffect(() => {
    async function retrieveData() {
      try {
        const categoryId = await AsyncStorage.getItem("categoryId");
        setCategoryId(parseInt(categoryId));
      } catch (error) {
        console.log("error: ", error.message);
      }
    }
    retrieveData();
  }, []);

  // fetch store type by categoryId
  const { loading, error, data } = useQuery(STORE_TYPE_BY_CATEGORY_ID, {
    variables: { id: categoryId },
  });

  // get selected store type id from user
  function getSelectedStoreTypeId(id) {
    STORE_TYPE_BY_CATEGORY_ID;
    console.log("Selected storeType ID: ", id);
    storeSelectedStoreTypeId(id);
    navigation.navigate("Stores");
  }

  // store selected store type id from user
  const storeSelectedStoreTypeId = async (value) => {
    try {
      const jsonValue = value.toString();
      await AsyncStorage.setItem("storeTypeId", jsonValue);
    } catch (e) {
      console.log(e);
    }
  };

  if (data) {
    return (
      <View style={styles.container}>
        <View>
          <Text style={styles.Categories}>Select a type store:</Text>
          {data.storeTypeByCategoryId.map((store) => (
            <TouchableOpacity
              key={store.id}
              onPress={() => getSelectedStoreTypeId(store.id)}
            >
              <Text style={styles.categoryCard}>{store.type}</Text>
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
