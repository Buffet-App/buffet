import React from "react";
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
  return (
    <SafeAreaView style={styles.container}>
      <ScrollView>
        <View style={styles.section}>
          <Text style={styles.text__header}>Your Buffet</Text>
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
          <Text style={styles.text__header}>Your Deals</Text>
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
          <Text style={styles.text__header}>Your Favorites</Text>
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
          <Text style={styles.text__header}>Your Tastes</Text>
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
