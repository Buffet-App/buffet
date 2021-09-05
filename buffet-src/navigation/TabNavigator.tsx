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

import { UserStack, RestaurantStack } from "./NavigationStacks";
import {
  RestaurantInfoContextProvider,
  UserInfoContext,
} from "../UserInfoContextProvider";
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
              initialRouteName="RestaurantHomeStack"
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
                    case "Manage Deals":
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
                headerShown: false,
                tabBarActiveTintColor: colors.secondary,
                tabBarInactiveTintColor: "gray",
              })}
            >
              <Tab.Screen
                name="Home"
                children={() => {
                  return <RestaurantStack initialRoute="RestaurantHomeStack" />;
                }}
              />
              <Tab.Screen
                name="Analytics"
                children={() => {
                  return <RestaurantStack initialRoute="AnalyticsStack" />;
                }}
              />
              <Tab.Screen
                name="Manage Deals"
                children={() => {
                  return <RestaurantStack initialRoute="DealsStack" />;
                }}
                options={{
                  tabBarButton: (props) => {
                    return customTabBarButton(props);
                  },
                }}
              />
              <Tab.Screen
                name="Bank"
                children={() => {
                  return <RestaurantStack initialRoute="BankStack" />;
                }}
              />
              <Tab.Screen
                name="Profile"
                children={() => {
                  return (
                    <RestaurantStack initialRoute="RestaurantProfileStack" />
                  );
                }}
              />
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
              return <UserStack initialRoute="HomeStack" />;
            }}
            options={{ unmountOnBlur: true }}
          />
          <Tab.Screen
            name="Map"
            children={() => {
              return <UserStack initialRoute="MapStack" />;
            }}
          />
          <Tab.Screen
            name="Scan"
            children={() => {
              return <UserStack initialRoute="ScanStack" />;
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
              return <UserStack initialRoute="MyFavoritesStack" />;
            }}
          />
          <Tab.Screen
            name="Profile"
            children={() => {
              return <UserStack initialRoute="ProfileStack" />;
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
          {userInfo.isRestaurant ? "Deals" : "Scan"}
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
