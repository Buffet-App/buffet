import React, { useEffect, useState } from "react";
import {
  Image,
  SafeAreaView,
  StyleSheet,
  Text,
  TouchableOpacity,
  Platform,
  View,
  ScrollView,
  FlatList,
} from "react-native";
import Card from "../../components/Card";

import { IRestaurantObject } from "../../config/interfaces";
import colors from "../../config/colors";
import Firebase from "../../../config/firebase";
import "firebase/firestore";

const db = Firebase.firestore();

export const restaurants: IRestaurantObject[] = [
  {
    name: "In-N-Out",
    address: "123 Burger Way",
    restaurantDesc: "Burger restaurant",
    phone: "(012) 345-6789",
    photo:
      "https://media-cdn.tripadvisor.com/media/photo-p/0e/af/99/09/in-n-out-2.jpg",
  },
  {
    name: "Sushi Stop",
    address: "456 Sushi Street",
    restaurantDesc: "Sushi restaurant",
    phone: "(098) 765-4321",
    photo: "https://sushistop.com/wp-content/uploads/2021/04/1.jpg",
  },
  {
    name: "Starbucks",
    address: "789 Coffee Avenue",
    restaurantDesc: "Cafe",
    phone: "(111) 111-1111",
    photo:
      "https://coffeeatthree.com/wp-content/uploads/starbucks-secret-menu-1.jpg",
  },
];

const HomeScreen = ({ navigation }) => {
  const [featuredRestaurants, setFeaturedRestaurants] = useState([]);
  useEffect(() => {
    (async () => {
      console.log("READ: HomeScreen.tsx");
      const snapshot = await db
        .collection("restaurants")
        .where("isFeatured", "==", true)
        .get();
      setFeaturedRestaurants(
        snapshot.docs.map((doc) => {
          return doc.data();
        })
      );
    })();
  }, []);

  return (
    <SafeAreaView style={styles.container}>
      <ScrollView>
        <View style={styles.section}>
          <TouchableOpacity
            onPress={() => {
              navigation.navigate("Buffet");
            }}
          >
            <Text style={styles.text__header}>Your Buffet</Text>
          </TouchableOpacity>
          <FlatList
            nestedScrollEnabled={true}
            horizontal={true}
            data={featuredRestaurants}
            renderItem={({ item }) => (
              <Card item={item} navigation={navigation} />
            )}
            keyExtractor={(item) => item.name}
          />
        </View>

        <View style={styles.section}>
          <TouchableOpacity
            onPress={() => {
              navigation.navigate("MyDeals");
            }}
          >
            <Text style={styles.text__header}>Your Deals</Text>
          </TouchableOpacity>
          <FlatList
            nestedScrollEnabled={true}
            horizontal={true}
            data={restaurants}
            renderItem={({ item }) => (
              <Card item={item} navigation={navigation} />
            )}
            keyExtractor={(item) => item.name}
          />
        </View>

        <View style={styles.section}>
          <TouchableOpacity
            onPress={() => {
              navigation.navigate("MyFavoritesStack");
            }}
          >
            <Text style={styles.text__header}>Your Favorites</Text>
          </TouchableOpacity>
          <FlatList
            nestedScrollEnabled={true}
            horizontal={true}
            data={restaurants}
            renderItem={({ item }) => (
              <Card item={item} navigation={navigation} />
            )}
            keyExtractor={(item) => item.name}
          />
        </View>
      </ScrollView>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    paddingTop: Platform.OS === "android" ? 25 : 0,
  },
  text__header: {
    fontSize: 24,
    margin: 5,
    fontWeight: "bold",
    color: colors.primary,
  },
  section: {
    padding: 10,
  },
});
export default HomeScreen;
