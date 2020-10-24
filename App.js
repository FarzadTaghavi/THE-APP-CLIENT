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
import ProductCart from "./screens/ProductCart";
import OrderDetails from "./screens/OrderDetails";
import PaymentScreen from "./screens/PaymentScreen";
import PaymentReceived from "./screens/PaymentReceived";
import TrackOrder from "./screens/TrackOrder";
import ProfilePage from "./screens/ProfilePage";
import MyOrders from "./screens/MyOrders";
import { NavigationContainer } from "@react-navigation/native";
import { createStackNavigator } from "@react-navigation/stack";

import { ApolloProvider, HttpLink, ApolloClient } from "@apollo/client";

import { InMemoryCache } from "apollo-cache-inmemory";

const cache = new InMemoryCache({
  dataIdFromObject: (o) => o.id,
});

//const httpLink = new HttpLink({ uri: "http://localhost:4000/graphql" });
const httpLink = new HttpLink({ uri: "http://192.168.2.6:4000/graphql" });

const link = httpLink;
const client = new ApolloClient({
  link,
  cache,
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
          <Stack.Screen name="ProductCart" component={ProductCart} />
          <Stack.Screen name="OrderDetails" component={OrderDetails} />
          <Stack.Screen name="PaymentScreen" component={PaymentScreen} />
          <Stack.Screen name="ProfilePage" component={ProfilePage} />
          <Stack.Screen name="MyOrders" component={MyOrders} />
          <Stack.Screen name="PaymentReceived" component={PaymentReceived} />
          <Stack.Screen name="TrackOrder" component={TrackOrder} />
        </Stack.Navigator>
      </NavigationContainer>
    </ApolloProvider>
  );
}
