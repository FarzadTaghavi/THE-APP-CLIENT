import React from "react";
import GetLocationScreen from "./screens/GetLocationScreen";
import IntroScreen from "./screens/IntroScreen";
import EndIntroScreen from "./screens/EndIntroScreen";
import SignUpOrLoginScreen from "./screens/SignUpOrLoginScreen";
import SignUpScreen from "./screens/SignUpScreen";
import LogInScreen from "./screens/LogInScreen";
import Categories from "./screens/Categories";
import StoreTypes from "./screens/StoreTypes";
import Stores from "./screens/Stores";
import Products from "./screens/Products";
import OrderDetails from "./screens/OrderDetails";
import { NavigationContainer } from "@react-navigation/native";
import { createStackNavigator } from "@react-navigation/stack";

import {
  ApolloProvider,
  HttpLink,
  ApolloClient,
  InMemoryCache,
} from "@apollo/client";

const httpLink = new HttpLink({ uri: "http://localhost:4000/graphql" }); //http://192.168.2.6:4000/graphql

const link = httpLink;
const client = new ApolloClient({
  link,
  cache: new InMemoryCache(),
});

const Stack = createStackNavigator();

export default function App() {
  return (
    <ApolloProvider client={client}>
      <NavigationContainer>
        <Stack.Navigator
          screenOptions={{
            headerShown: false,
            gesturesEnabled: true,
          }}
        >
          <Stack.Screen
            name="GetLocationScreen"
            component={GetLocationScreen}
          />
          <Stack.Screen name="IntroScreen" component={IntroScreen} />
          <Stack.Screen name="EndIntroScreen" component={EndIntroScreen} />
          <Stack.Screen
            name="SignUpOrLoginScreen"
            component={SignUpOrLoginScreen}
          />
          <Stack.Screen name="SignUpScreen" component={SignUpScreen} />
          <Stack.Screen name="LogInScreen" component={LogInScreen} />
          <Stack.Screen name="Categories" component={Categories} />
          <Stack.Screen name="StoreTypes" component={StoreTypes} />
          <Stack.Screen name="Stores" component={Stores} />
          <Stack.Screen name="Products" component={Products} />
          <Stack.Screen name="OrderDetails" component={OrderDetails} />
        </Stack.Navigator>
      </NavigationContainer>
    </ApolloProvider>
  );
}
