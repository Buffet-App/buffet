import React, { Component } from "react";
import {StyleSheet, View, TouchableOpacity, Text, Platform} from "react-native";
import { NavigationContainer } from "@react-navigation/native";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import Ionicons from "@expo/vector-icons/Ionicons";

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

import colors from "../config/colors";
import Firebase from "../../config/firebase";
import firebase from "firebase/app";
import "firebase/firestore";

const Tab = createBottomTabNavigator();

const auth = Firebase.auth();
const db = firebase.firestore();

class TabNavigator extends Component<{}, { isRestaurant: boolean }> {
  constructor(props) {
    super(props);

    this.state = {
      isRestaurant: null,
    };

    this.isUserRestaurant().then((isRestaurant: boolean) => {
      this.setState({ isRestaurant: isRestaurant });
    });
  }

  render() {
    if (this.state.isRestaurant !== null) {
      return (
        <NavigationContainer>
          {this.state.isRestaurant
            ? this.createRestaurantTabs()
            : this.createUserTabs()}
        </NavigationContainer>
      );
    }
    return <View />;
  }

  async isUserRestaurant(): Promise<boolean> {
    let doc = await db.collection("users").doc(auth.currentUser.uid).get();
    if (doc.exists) {
      return doc.data().isRestaurant;
    } else {
      console.log("No such document!");
    }
  }

  createRestaurantTabs = () => {
    return (
      <Tab.Navigator
        initialRouteName="Home"
        screenOptions={({ route }) => ({
          tabBarIcon: ({ focused, color, size }) => {
            let iconName;
            switch (route.name) {
              case "Home":
                iconName = focused ? "ios-home" : "ios-home-outline";
                break;
              case "Analytics":
                iconName = focused ? "analytics" : "analytics-outline";
                break;
              case "New Deal":
                iconName = focused ? "add" : "add-outline";
                break;
              case "Bank":
                iconName = focused ? "cash" : "cash-outline";
                break;
              case "Profile":
                iconName = focused ? "ios-person" : "ios-person-outline";
                break;
            }

            return <Ionicons name={iconName} size={size} color={color} />;
          },
          tabBarStyle: {
            backgroundColor: colors.white,
            height: Platform.OS === "android" ? 65 : 90,
          },
          tabBarActiveTintColor: colors.secondary,
          tabBarInactiveTintColor: "gray",
        })}
      >
        <Tab.Screen name="Home" component={RestaurantHomeScreen} />
        <Tab.Screen name="Analytics" component={AnalyticsScreen} />
        <Tab.Screen
          name="New Deal"
          component={NewDealScreen}
          options={{
            tabBarButton: (props) => {
              return this.customTabBarButton(props);
            },
          }}
        />
        <Tab.Screen name="Bank" component={BankScreen} />
        <Tab.Screen name="Profile" component={RestaurantProfileScreen} />
      </Tab.Navigator>
    );
  };

  createUserTabs = () => {
    return (
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
              case "My Restaurants":
                iconName = focused ? "heart" : "heart-outline";
                break;
              case "Profile":
                iconName = focused ? "ios-person" : "ios-person-outline";
                break;
            }

            return <Ionicons name={iconName} size={size} color={color} />;
          },
          tabBarStyle: {
              backgroundColor: colors.white,
              height: Platform.OS === "android" ? 65 : 90,
          },
          headerShown: false,
          tabBarActiveTintColor: colors.primary,
          tabBarInactiveTintColor: "gray",
        })}
      >
        <Tab.Screen name="Home" component={HomeScreen} />
        <Tab.Screen name="Map" component={MapScreen} />
        <Tab.Screen
          name="Scan"
          component={ScanScreen}
          options={{
            tabBarButton: (props) => {
              return this.customTabBarButton(props);
            },
          }}
        />
        <Tab.Screen name="My Restaurants" component={MyRestaurantsScreen} />
        <Tab.Screen name="Profile" component={ProfileScreen} />
      </Tab.Navigator>
    );
  };

  customTabBarButton = (props) => {
    return (
      <View
        style={{
          justifyContent: "center",
          alignItems: "center",
        }}
      >
        <TouchableOpacity
          style={{
            top: -10,
            justifyContent: "center",
            alignItems: "center",
          }}
          onPress={props.onPress}
        >
          <View
            style={{
              width: 70,
              height: 70,
              borderRadius: 35,
              backgroundColor: this.state.isRestaurant ? colors.secondary : colors.primary,
              justifyContent: "center",
              alignItems: "center",
            }}
          >
            <Ionicons
              name={
                this.state.isRestaurant
                  ? "restaurant-outline"
                  : "qr-code-outline"
              }
              style={{
                fontSize: 45,
                color: "white",
              }}
            />
          </View>
        </TouchableOpacity>
        <Text style={{
            color: this.state.isRestaurant ? colors.secondary : colors.primary,
            top: Platform.OS === "android" ? -10 : 0,
        }}>
          {this.state.isRestaurant ? "New Deal" : "Scan"}
        </Text>
      </View>
    );
  };
}

const styles = StyleSheet.create({
  tabBarStyle: {
    backgroundColor: colors.primary,
  },
});

export default TabNavigator;
