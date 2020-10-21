import React, { useEffect } from "react";
import {
  Text,
  View,
  StyleSheet,
  Dimensions,
  TouchableOpacity,
} from "react-native";
import { useQuery } from "@apollo/client";
import { CATEGORIES } from "../graphql/queries";
import AsyncStorage from "@react-native-community/async-storage";
import Icon from "react-native-vector-icons/Ionicons";
var { width } = Dimensions.get("window");

export default function categories({ navigation }) {
  const { loading, error, data } = useQuery(CATEGORIES);

  function getSelectedCategoryId(id) {
    CATEGORIES;
    storeSelectedCategory(id);
    navigation.navigate("StoreTypes");
  }

  const storeSelectedCategory = async (value) => {
    try {
      const jsonValue = value.toString();
      console.log("jsonValue:", jsonValue);
      await AsyncStorage.setItem("categoryId", jsonValue);
    } catch (e) {
      console.log(e);
    }
  };

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
            name="md-person"
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
            Select a category
          </Text>
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
        <View style={{ flex: 1.5, backgroundColor: "blue" }}></View>
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
  },
  categoryCard: {
    width: width - 20,
    height: 70,
    margin: 10,
    fontSize: 22,
    paddingTop: 15,
    paddingBottom: 15,
    borderWidth: 2,
    shadowColor: "black",
    justifyContent: "center",
    flexDirection: "column",
    textAlign: "center",
    alignItems: "center",
    borderColor: "#000",
    borderRadius: 50,
  },
});
