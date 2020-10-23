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
import { STORES_BY_TYPE_ID } from "../graphql/queries";
import AsyncStorage from "@react-native-community/async-storage";
import Icon from "react-native-vector-icons/Ionicons";

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
            Which store?
          </Text>
          <ScrollView>
            {data.storesByTypeId.map((store, i) => {
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
                        onPress={() => getSelectedStoreId(store.id)}
                      >
                        <Text
                          style={{
                            fontWeight: "bold",
                            fontSize: 28,
                            color: "white",
                          }}
                        >
                          {store.name}
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

/* 
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
} */

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
