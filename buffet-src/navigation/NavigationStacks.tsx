import * as React from "react";
import { NavigationContainer } from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";

// CUSTOMER SCREENS IMPORT
import HomeScreen from "../screens/customers/HomeScreen";
import MapScreen from "../screens/customers/MapScreen";
import ScanScreen from "../screens/customers/ScanScreen";
import MyRestaurantsScreen from "../screens/customers/MyRestaurantsScreen";
import ProfileScreen from "../screens/customers/ProfileScreen";

// RESTAURANT SCREENS IMPORT
import RestaurantHomeScreen from "../screens/restaurants/RestaurantHomeScreen";
import AnalyticsScreen from "../screens/restaurants/AnalyticsScreen";
import NewDealScreen from "../screens/restaurants/NewDealScreen";
import BankScreen from "../screens/restaurants/BankScreen";
import RestaurantProfileScreen from "../screens/restaurants/RestaurantProfileScreen";
import RestaurantInfoScreen from "../screens/restaurants/RestaurantInfoScreen";

export type HomeStackParamList = {
  Home: undefined;
  RestaurantInfo: undefined;
};

export const HomeStack = () => {
  const Stack = createNativeStackNavigator<HomeStackParamList>();
  return (
    <Stack.Navigator
      initialRouteName="Home"
      screenOptions={{ headerShown: false }}
    >
      <Stack.Screen name="Home" component={HomeScreen} />
      <Stack.Screen name="RestaurantInfo" component={RestaurantInfoScreen} />
    </Stack.Navigator>
  );
};
