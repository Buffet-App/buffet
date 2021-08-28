import { useNavigation } from "@react-navigation/native";
import { StackNavigationProp } from "@react-navigation/stack";
import React from "react";
import { StyleSheet, View, Text, Image, TouchableOpacity } from "react-native";

import colors from "../config/colors";
import { HomeStackParamList } from "../navigation/NavigationStacks";

type HomeStackProps = StackNavigationProp<HomeStackParamList, "Home">;

export default function Card(props) {
  return (
    <TouchableOpacity
      onPress={() => {
        props.navigation.navigate("RestaurantInfo", {
          restaurantInfo: props.item,
        });
      }}
    >
      <View style={styles.card}>
        <View style={styles.cardContent}>
          <Text style={styles.restaurantName}>
            {props.item.name.toUpperCase()}
          </Text>
          <Text style={styles.restaurantDesc}>{props.item.restaurantDesc}</Text>
          <View style={styles.imageSection}>
            <Image source={{ uri: props.item.photo }} style={styles.image} />
          </View>
        </View>
      </View>
    </TouchableOpacity>
  );
}

const styles = StyleSheet.create({
  card: {
    borderRadius: 10,
    elevation: 3,
    backgroundColor: colors.secondary,
    shadowOffset: {
      width: 1,
      height: 1,
    },
    shadowColor: "#333",
    shadowOpacity: 0.3,
    shadowRadius: 2,
    margin: 5,
    width: 200,
    height: 300,
  },
  cardContent: {
    marginHorizontal: 18,
    marginVertical: 20,
  },
  image: {
    width: 180,
    height: 210,
    resizeMode: "stretch",
    borderRadius: 10,
  },
  restaurantName: {
    fontSize: 18,
    fontWeight: "bold",
  },
  restaurantDesc: {
    fontSize: 16,
  },
  imageSection: {
    alignItems: "center",
    margin: 10,
  },
});
