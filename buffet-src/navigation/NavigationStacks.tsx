import * as React from "react";
import { NavigationContainer } from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";

// CUSTOMER SCREENS IMPORT
import HomeScreen from "../screens/customers/HomeScreen";
import MapScreen from "../screens/customers/MapScreen";
import ScanScreen from "../screens/customers/ScanScreen";
import MyRestaurantsScreen from "../screens/customers/MyRestaurantsScreen";
import ProfileScreen from "../screens/customers/ProfileScreen";
import SubscriptionScreen from "../screens/customers/SubscriptionScreen";
import EditProfileScreen from "../screens/EditProfileScreen";

// RESTAURANT SCREENS IMPORT
import RestaurantHomeScreen from "../screens/restaurants/RestaurantHomeScreen";
import AnalyticsScreen from "../screens/restaurants/AnalyticsScreen";
import NewDealScreen from "../screens/restaurants/NewDealScreen";
import BankScreen from "../screens/restaurants/BankScreen";
import RestaurantProfileScreen from "../screens/restaurants/RestaurantProfileScreen";
import RestaurantInfoScreen from "../screens/restaurants/RestaurantInfoScreen";

export type HomeStackParamList = {
  HomeStack: undefined;
  MapStack: undefined;
  ScanStack: undefined;
  MyFavoritesStack: undefined;
  ProfileStack: undefined;
  RestaurantInfo: undefined;
  Subscription: undefined;
  EditProfile: undefined;
};

export const HomeStack = (props) => {
  const Stack = createNativeStackNavigator<HomeStackParamList>();
  return (
    <Stack.Navigator
      initialRouteName={props.initialRoute}
      screenOptions={{ headerShown: false }}
    >
      {/* TAB NAV -> STACK NAV ENTRYPOINTS */}
      <Stack.Screen name="HomeStack" component={HomeScreen} />
      <Stack.Screen name="MapStack" component={MapScreen} />
      <Stack.Screen name="ScanStack" component={ScanScreen} />
      <Stack.Screen name="MyFavoritesStack" component={MyRestaurantsScreen} />
      <Stack.Screen name="ProfileStack" component={ProfileScreen} />
      {/* NESTED SCREENS */}
      <Stack.Screen name="RestaurantInfo" component={RestaurantInfoScreen} />
      <Stack.Screen name="Subscription" component={SubscriptionScreen} />
      <Stack.Screen name="EditProfile" component={EditProfileScreen} />
    </Stack.Navigator>
  );
};
