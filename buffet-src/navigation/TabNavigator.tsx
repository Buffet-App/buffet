import * as React from "react";
import { StyleSheet } from "react-native";
import { NavigationContainer } from "@react-navigation/native";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import Ionicons from "@expo/vector-icons/Ionicons";

import HomeScreen from "../screens/HomeScreen";
import MapScreen from "../screens/MapScreen";
import ScanScreen from "../screens/ScanScreen";
import MyRestaurantsScreen from "../screens/MyRestaurantsScreen";
import ProfileScreen from "../screens/ProfileScreen";
import colors from "../config/colors";

const Tab = createBottomTabNavigator();

const TabNavigator: React.FunctionComponent = () => {
  return (
    <NavigationContainer>
      <Tab.Navigator
        initialRouteName="Home"
        screenOptions={({ route }) => ({
          tabBarIcon: ({ focused, color, size }) => {
            let iconName;
            switch (route.name) {
              case "Home":
                iconName = focused ? "ios-home" : "ios-home-outline";
                break;
              case "Map":
                iconName = focused ? "ios-map" : "ios-map-outline";
                break;
              case "Scan":
                iconName = focused ? "qr-code" : "qr-code-outline";
                break;
              case "My Restaurants":
                iconName = focused ? "heart" : "heart-outline";
                break;
              case "Profile":
                iconName = focused ? "ios-person" : "ios-person-outline";
                break;
            }

            return <Ionicons name={iconName} size={size} color={color} />;
          },
          headerShown: false,
          tabBarActiveTintColor: colors.primary,
          tabBarInactiveTintColor: "gray",
        })}
      >
        <Tab.Screen name="Home" component={HomeScreen} />
        <Tab.Screen name="Map" component={MapScreen} />
        <Tab.Screen name="Scan" component={ScanScreen} />
        <Tab.Screen name="My Restaurants" component={MyRestaurantsScreen} />
        <Tab.Screen name="Profile" component={ProfileScreen} />
      </Tab.Navigator>
    </NavigationContainer>
  );
};

const styles = StyleSheet.create({
  tabBarStyle: {
    backgroundColor: colors.primary,
  },
});

export default TabNavigator;
