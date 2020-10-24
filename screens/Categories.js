import React from "react";
import {
  Text,
  View,
  StyleSheet,
  Dimensions,
  TouchableOpacity,
  ScrollView,
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
        <View
          style={{
            flex: 1,
            flexDirection: "row",
            backgroundColor: "white",
            borderBottomColor: "grey",
            borderWidth: 1,
          }}
        >
          <Icon
            onPress={() => navigation.navigate("ProfilePage")}
            style={{
              flexDirection: "row",
              top: 50,
              left: 30,
            }}
            name="md-person"
            size={40}
            color={"black"}
          />
          <Icon
            onPress={() => navigation.navigate("ProfilePage")}
            style={{
              flexDirection: "row-reverse",
              top: 50,
              left: 320,
            }}
            name="md-share"
            size={40}
            color={"black"}
          />
        </View>
        <View
          style={{
            flex: 6,
            backgroundColor: "white",
            alignItems: "center",
            justifyContent: "flex-start",
          }}
        >
          <Text
            style={{
              fontSize: 30,
              marginTop: 20,
              marginBottom: 20,
              fontWeight: "600",
            }}
          >
            What can we get you?
          </Text>
          <ScrollView>
            {data.storeCategories.map((category, i) => {
              return (
                <View
                  key={i}
                  style={{
                    backgroundColor: "#33c37d",
                    width: width - 20,
                    flexDirection: "row",
                    alignSelf: "center",
                    alignItems: "center",
                    justifyContent: "space-evenly",
                    borderRadius: "50%",
                    textAlign: "center",
                    paddingLeft: 20,
                    margin: 20,
                    marginLeft: 10,
                    height: 60,
                  }}
                >
                  <View
                    style={{
                      flex: 1,
                      backgroundColor: "trangraysparent",
                      padding: 10,
                      justifyContent: "space-between",
                      alignSelf: "center",
                      alignItems: "center",
                      justifyContent: "space-evenly",
                      textAlign: "center",
                    }}
                  >
                    <View>
                      <TouchableOpacity
                        key={category.id}
                        onPress={() => getSelectedCategoryId(category.id)}
                      >
                        <Text
                          style={{
                            fontWeight: "bold",
                            fontSize: 28,
                            color: "white",
                          }}
                        >
                          {category.type}
                        </Text>
                      </TouchableOpacity>
                    </View>
                    <View
                      style={{
                        flexDirection: "row",
                        justifyContent: "space-between",
                      }}
                    >
                      <View
                        style={{ flexDirection: "row", alignItems: "center" }}
                      ></View>
                    </View>
                  </View>
                </View>
              );
            })}
          </ScrollView>
        </View>
        <View style={{ flex: 1.5, backgroundColor: "white" }}></View>
      </View>
    );
  } else {
    return (
      <View>
        <Text
          style={{
            alignItems: "center",
            justifyContent: "center",
            alignContent: "center",
            alignSelf: "center",
          }}
        >
          Loading
        </Text>
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
