import React from "react";
import GetLocationScreen from "./screens/GetLocationScreen";
import IntroScreen from "./screens/IntroScreen";
import EndIntroScreen from "./screens/EndIntroScreen";
import SignUpOrLoginScreen from "./screens/SignUpOrLoginScreen";
import SignUpScreen from "./screens/SignUpScreen";
import LogInScreen from "./screens/LogInScreen";
import { NavigationContainer } from "@react-navigation/native";
import { createStackNavigator } from "@react-navigation/stack";

const Stack = createStackNavigator();

export default function App() {
  return (
    <NavigationContainer>
      <Stack.Navigator
        screenOptions={{
          headerShown: false,
          gesturesEnabled: true,
        }}
      >
        <Stack.Screen name="GetLocationScreen" component={GetLocationScreen} />
        <Stack.Screen name="IntroScreen" component={IntroScreen} />
        <Stack.Screen name="EndIntroScreen" component={EndIntroScreen} />
        <Stack.Screen
          name="SignUpOrLoginScreen"
          component={SignUpOrLoginScreen}
        />
        <Stack.Screen name="SignUpScreen" component={SignUpScreen} />
        <Stack.Screen name="LogInScreen" component={LogInScreen} />
      </Stack.Navigator>
    </NavigationContainer>
  );
}
