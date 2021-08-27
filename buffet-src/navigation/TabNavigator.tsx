import React, { Component } from "react";
import { StyleSheet, View } from "react-native";
import { NavigationContainer } from "@react-navigation/native";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import Ionicons from "@expo/vector-icons/Ionicons";

import HomeScreen from "../screens/HomeScreen";
import MapScreen from "../screens/MapScreen";
import ScanScreen from "../screens/ScanScreen";
import MyRestaurantsScreen from "../screens/MyRestaurantsScreen";
import ProfileScreen from "../screens/ProfileScreen";
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
      <Tab.Navigator>
        <Tab.Screen name="Home" component={HomeScreen} />
        <Tab.Screen name="Map" component={MapScreen} />
        <Tab.Screen name="Profile" component={ProfileScreen} />
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
    );
  };
}

const styles = StyleSheet.create({
  tabBarStyle: {
    backgroundColor: colors.primary,
  },
});

export default TabNavigator;
