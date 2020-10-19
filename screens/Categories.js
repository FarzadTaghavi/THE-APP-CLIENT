import React, { useEffect } from "react";
import { Text, View, StyleSheet, Button, TouchableOpacity } from "react-native";
import { useQuery } from "@apollo/client";
import { CATEGORIES } from "../graphql/queries";
import AsyncStorage from "@react-native-community/async-storage";

export default function categories({ navigation }) {
  const { loading, error, data } = useQuery(CATEGORIES);

  function getSelectedCategoryId(id) {
    CATEGORIES;
    console.log("selected category id:", id);
    storeSelectedCategory(id);
    navigation.navigate("StoreTypes");
  }

  const storeSelectedCategory = async (value) => {
    try {
      const jsonValue = parseInt(value);

      await AsyncStorage.setItem("categoryId", jsonValue);
    } catch (e) {
      console.log(e);
    }
  };

  if (data) {
    return (
      <View style={styles.container}>
        <View>
          <Text style={styles.Categories}>Select a category:</Text>
          {data.storeCategories.map((category) => {
            return (
              <TouchableOpacity
                key={category.id}
                onPress={() => getSelectedCategoryId(category.id)}
              >
                <Text style={styles.categoryCard}>{category.type}</Text>
              </TouchableOpacity>
            );
          })}
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
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
    /* elevation: 5, */
  },
  /* appButtonContainer: {
    elevation: 8,
    backgroundColor: "#009688",
    borderRadius: 10,
    paddingVertical: 10,
    paddingHorizontal: 12,
  }, */
  appButtonText: {
    fontSize: 18,
    color: "#fff",
    fontWeight: "bold",
    alignSelf: "center",
    textTransform: "uppercase",
  },
});
