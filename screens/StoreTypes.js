import React, { useState, useEffect } from "react";
import {
  Text,
  View,
  StyleSheet,
  Dimensions,
  TouchableOpacity,
  ScrollView,
} from "react-native";
import { useQuery } from "@apollo/client";
import { STORE_TYPE_BY_CATEGORY_ID } from "../graphql/queries";
import AsyncStorage from "@react-native-community/async-storage";
import Icon from "react-native-vector-icons/Ionicons";
export default function storeTypes({ navigation }) {
  const [categoryId, setCategoryId] = useState(0);

  // get the categoryId from storage
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
  }, [categoryId]);

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
            Food
          </Text>
          <ScrollView>
            {data.storeTypeByCategoryId.map((store, i) => {
              return (
                <View
                  key={i}
                  style={{
                    backgroundColor: "#33c37d",
                    width: 250,
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
                        key={store.id}
                        onPress={() => getSelectedStoreTypeId(store.id)}
                      >
                        <Text
                          style={{
                            fontWeight: "bold",
                            fontSize: 28,
                            color: "white",
                          }}
                        >
                          {store.type}
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
            /* flex: 1,
            flexDirection: "column-reverse", */
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
