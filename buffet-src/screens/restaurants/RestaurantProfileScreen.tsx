import React from "react";
import {
  ScrollView,
  View,
  StyleSheet,
  Text,
  TouchableOpacity,
  SafeAreaView,
  Platform,
} from "react-native";
import { IRestaurantObject } from "../../config/interfaces";
import Firebase from "../../../config/firebase";

const auth = Firebase.auth();

const fakeRestaurant: IRestaurantObject = {
  name: "Fake Restaurant",
  address: "123 Food Street",
  hours: {
    monHours: "10AM-10PM",
    tuesHours: "10AM-10PM",
    wedHours: "10AM-10PM",
    thursHours: "10AM-10PM",
    friHours: "10AM-10PM",
    satHours: "10AM-10PM",
    sunHours: "CLOSED",
  },
  isParking: true,
  restaurantDesc: "We have good food",
  parkingDetails: "Free parking",
  phone: "(012)345-6789",
  addOns: "addOn value",
  photo: "img",
  featured: "featured deals",
};

const handleLogOut = async () => {
  try {
    await auth.signOut();
  } catch (error) {
    console.log(error);
  }
};

const RestaurantProfileScreen = () => {
  return (
    <SafeAreaView style={styles.container}>
        <ScrollView>
            <Text>Restaurant Profile Screen</Text>

            <View style={styles.profileStat}>
                <Text>Name: </Text>
                <Text>{fakeRestaurant.name}</Text>
            </View>

            <View style={styles.profileStat}>
                <Text>Address: </Text>
                <Text>{fakeRestaurant.address}</Text>
            </View>

            <View style={styles.profileStat}>
                <Text>Hours: </Text>
                <View style={styles.hours}>
                    <Text>Monday: {fakeRestaurant.hours.monHours}</Text>
                    <Text>Tuesday: {fakeRestaurant.hours.tuesHours}</Text>
                    <Text>Wednesday: {fakeRestaurant.hours.wedHours}</Text>
                    <Text>Thursday: {fakeRestaurant.hours.thursHours}</Text>
                    <Text>Friday: {fakeRestaurant.hours.friHours}</Text>
                    <Text>Saturday: {fakeRestaurant.hours.satHours}</Text>
                    <Text>Sunday: {fakeRestaurant.hours.sunHours}</Text>
                </View>
            </View>

            <View style={styles.profileStat}>
                <Text>Has Parking: </Text>
                <Text>{fakeRestaurant.isParking.toString()}</Text>
            </View>

            <View style={styles.profileStat}>
                <Text>Description: </Text>
                <Text>{fakeRestaurant.restaurantDesc}</Text>
            </View>

            <View style={styles.profileStat}>
                <Text>Parking Details: </Text>
                <Text>{fakeRestaurant.parkingDetails}</Text>
            </View>

            <View style={styles.profileStat}>
                <Text>Phone: </Text>
                <Text>{fakeRestaurant.address}</Text>
            </View>

            <View style={styles.profileStat}>
                <Text>Add Ons: </Text>
                <Text>{fakeRestaurant.addOns}</Text>
            </View>

            <View style={styles.profileStat}>
                <Text>Name: </Text>
                <Text>{fakeRestaurant.name}</Text>
            </View>

            <View style={styles.profileStat}>
                <Text>Photo: </Text>
                <Text>{fakeRestaurant.photo}</Text>
            </View>

            <View style={styles.profileStat}>
                <Text>Featured: </Text>
                <Text>{fakeRestaurant.featured}</Text>
            </View>

            <TouchableOpacity onPress={handleLogOut}>
                <Text>Log Out</Text>
            </TouchableOpacity>
        </ScrollView>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: "center",
    justifyContent: "space-around",
    paddingTop: Platform.OS === "android" ? 25 : 0,
  },
  profileStat: {
    // flex: 1,
    flexDirection: "row",
    alignItems: "center",
    // justifyContent: "space-around"
  },
  hours: {
    flexDirection: "column",
  },
});

export default RestaurantProfileScreen;
