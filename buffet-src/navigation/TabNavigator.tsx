import React, { useEffect, useContext } from "react";
import {
  StyleSheet,
  View,
  TouchableOpacity,
  Text,
  Platform,
} from "react-native";
import { NavigationContainer } from "@react-navigation/native";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import Ionicons from "@expo/vector-icons/Ionicons";

import { HomeStack } from "./NavigationStacks";
import {
  RestaurantInfoContextProvider,
  UserInfoContext,
} from "../UserInfoContextProvider";

// CUSTOMER SCREENS IMPORT
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
import RestaurantSignUpFlow from "../screens/restaurants/RestaurantSignUpFlow";

import colors from "../config/colors";
import { IUserObject } from "../config/interfaces";

const Tab = createBottomTabNavigator();

export const TabNavigator = () => {
  const userInfo = React.useContext<IUserObject>(UserInfoContext);

  const createRestaurantTabs = () => {
    if (userInfo.restaurantId !== undefined) {
      return (
        <RestaurantInfoContextProvider>
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
                    return customTabBarButton(props);
                  },
                }}
              />
              <Tab.Screen name="Bank" component={BankScreen} />
              <Tab.Screen name="Profile" component={RestaurantProfileScreen} />
            </Tab.Navigator>
          </NavigationContainer>
        </RestaurantInfoContextProvider>
      );
    } else {
      return <RestaurantSignUpFlow />;
    }
  };

  const createUserTabs = () => {
    return (
      <NavigationContainer>
        <Tab.Navigator
          initialRouteName="HomeStack"
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
                case "My Favorites":
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
          <Tab.Screen
            name="Home"
            children={() => {
              return <HomeStack initialRoute="HomeStack" />;
            }}
            options={{ unmountOnBlur: true }}
          />
          <Tab.Screen
            name="Map"
            children={() => {
              return <HomeStack initialRoute="MapStack" />;
            }}
          />
          <Tab.Screen
            name="Scan"
            children={() => {
              return <HomeStack initialRoute="ScanStack" />;
            }}
            options={{
              tabBarButton: (props) => {
                return customTabBarButton(props);
              },
            }}
          />
          <Tab.Screen
            name="My Favorites"
            children={() => {
              return <HomeStack initialRoute="MyFavoritesStack" />;
            }}
          />
          <Tab.Screen
            name="Profile"
            children={() => {
              return <HomeStack initialRoute="ProfileStack" />;
            }}
          />
        </Tab.Navigator>
      </NavigationContainer>
    );
  };

  const customTabBarButton = (props) => {
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
              backgroundColor: userInfo.isRestaurant
                ? colors.secondary
                : colors.primary,
              justifyContent: "center",
              alignItems: "center",
            }}
          >
            <Ionicons
              name={
                userInfo.isRestaurant ? "restaurant-outline" : "qr-code-outline"
              }
              style={{
                fontSize: 45,
                color: "white",
              }}
            />
          </View>
        </TouchableOpacity>
        <Text
          style={{
            color: userInfo.isRestaurant ? colors.secondary : colors.primary,
            top: Platform.OS === "android" ? -10 : 0,
          }}
        >
          {userInfo.isRestaurant ? "New Deal" : "Scan"}
        </Text>
      </View>
    );
  };

  if (userInfo !== undefined) {
    return userInfo.isRestaurant ? createRestaurantTabs() : createUserTabs();
  }
  return <View />;
};

const styles = StyleSheet.create({
  tabBarStyle: {
    backgroundColor: colors.primary,
  },
});

export default TabNavigator;
