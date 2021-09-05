import * as React from "react";
import { NavigationContainer } from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";

// CUSTOMER SCREENS IMPORT
import HomeScreen from "../screens/customers/HomeScreen";
import MapScreen from "../screens/customers/MapScreen";
import ScanScreen from "../screens/customers/ScanScreen";
import MyRestaurantsScreen from "../screens/customers/MyRestaurantsScreen";
import ProfileScreen from "../screens/customers/ProfileScreen";
import MyDealsScreen from "../screens/customers/MyDealsScreen";
import BuffetScreen from "../screens/customers/BuffetScreen";
import SubscriptionScreen from "../screens/customers/SubscriptionScreen";
import EditProfileScreen from "../screens/EditProfileScreen";

// RESTAURANT SCREENS IMPORT
import RestaurantHomeScreen from "../screens/restaurants/RestaurantHomeScreen";
import AnalyticsScreen from "../screens/restaurants/AnalyticsScreen";
import DealsScreen from "../screens/restaurants/DealsScreen";
import BankScreen from "../screens/restaurants/BankScreen";
import RestaurantProfileScreen from "../screens/restaurants/RestaurantProfileScreen";
import RestaurantInfoScreen from "../screens/restaurants/RestaurantInfoScreen";
import EditDealScreen from "../screens/restaurants/EditDealScreen";

export type UserStackParamList = {
  HomeStack: undefined;
  MapStack: undefined;
  ScanStack: undefined;
  MyFavoritesStack: undefined;
  ProfileStack: undefined;
  RestaurantInfo: undefined;
  MyDeals: undefined;
  Buffet: undefined;
  Subscription: undefined;
  EditProfile: undefined;
};

export type RestaurantStackParamList = {
  RestaurantHomeStack: undefined;
  AnalyticsStack: undefined;
  DealsStack: undefined;
  BankStack: undefined;
  RestaurantProfileStack: undefined;
  RestaurantInfo: undefined;
  Subscription: undefined;
  EditProfile: undefined;
  EditDeal: undefined;
};

export const UserStack = (props) => {
  const Stack = createNativeStackNavigator<UserStackParamList>();
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
      <Stack.Screen name="Buffet" component={BuffetScreen} />
      <Stack.Screen name="MyDeals" component={MyDealsScreen} />
      <Stack.Screen name="Subscription" component={SubscriptionScreen} />
      <Stack.Screen name="EditProfile" component={EditProfileScreen} />
    </Stack.Navigator>
  );
};

export const RestaurantStack = (props) => {
  const Stack = createNativeStackNavigator<RestaurantStackParamList>();
  return (
    <Stack.Navigator
      initialRouteName={props.initialRoute}
      screenOptions={{ headerShown: false }}
    >
      {/* TAB NAV -> STACK NAV ENTRYPOINTS */}
      <Stack.Screen
        name="RestaurantHomeStack"
        component={RestaurantHomeScreen}
      />
      <Stack.Screen name="AnalyticsStack" component={AnalyticsScreen} />
      <Stack.Screen name="DealsStack" component={DealsScreen} />
      <Stack.Screen name="BankStack" component={BankScreen} />
      <Stack.Screen
        name="RestaurantProfileStack"
        component={RestaurantProfileScreen}
      />
      {/* NESTED SCREENS */}
      <Stack.Screen name="RestaurantInfo" component={RestaurantInfoScreen} />
      <Stack.Screen name="Subscription" component={SubscriptionScreen} />
      <Stack.Screen name="EditProfile" component={EditProfileScreen} />
      <Stack.Screen name="EditDeal" component={EditDealScreen} />
    </Stack.Navigator>
  );
};
