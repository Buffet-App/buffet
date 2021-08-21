import React from "react";
import { NavigationContainer } from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import { SafeAreaView, StyleSheet, View } from "react-native";

import colors from "./buffet-src/config/colors";
import LoginScreen from "./buffet-src/screens/LoginScreen";
import LoadingScreen from "./buffet-src/screens/LoadingScreen";
import SignUpScreen from "./buffet-src/screens/SignUpScreen";
import TabNavigator from "./buffet-src/components/TabNavigator";

const Stack = createNativeStackNavigator();
let loggedIn = false;

const handleLogin = () => {
  loggedIn = true;
};

export default function App() {
  if (loggedIn === false) {
    return (
      <NavigationContainer>
        <Stack.Navigator
          initialRouteName="LoadingScreen"
          screenOptions={{ headerShown: false }}
        >
          <Stack.Screen name="LoadingScreen" component={LoadingScreen} />
          <Stack.Screen name="SignUpScreen" component={SignUpScreen} />
          <Stack.Screen
            name="LoginScreen"
            component={LoginScreen}
            handleLogin={handleLogin}
          />
        </Stack.Navigator>
      </NavigationContainer>
    );
  } else {
    return <TabNavigator />;
  }
}
