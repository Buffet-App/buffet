import React, { useEffect, useState } from "react";
import { StyleSheet, View, Text, Image, TouchableOpacity } from "react-native";

import colors from "../config/colors";
import { IDealsObject } from "../config/interfaces";
import Firebase from "../../config/firebase";
import "firebase/firestore";

const db = Firebase.firestore();

export default function Card(props) {
  const [restaurantDeals, setRestaurantDeals] = useState<IDealsObject[]>([]);
  const [buffetDeal, setBuffetDeal] = useState<IDealsObject>(undefined);
  useEffect(() => {
    (async () => {
      console.log("READ: Card.tsx");
      const snapshot = await db
        .collection("restaurants")
        .doc(props.item.restaurantId)
        .collection("deals")
        .get();
      const deals = snapshot.docs.map((doc) => {
        return doc.data().values;
      });
      setBuffetDeal(deals.find((deal) => deal.isBuffetDeal === true));
      setRestaurantDeals(deals);
    })();
  }, []);

  if (buffetDeal !== undefined) {
    return (
      <TouchableOpacity
        onPress={() => {
          props.navigation.navigate("RestaurantInfo", {
            restaurantInfo: props.item,
            restaurantDeals: restaurantDeals,
          });
        }}
      >
        <View style={styles.card}>
          <View style={styles.cardContent}>
            <Text style={styles.restaurantName}>
              {props.item.name.toUpperCase()}
            </Text>
            <Text style={styles.restaurantDesc}>{buffetDeal.itemName}</Text>
            <View style={styles.imageSection}>
              <Image
                source={{ uri: buffetDeal.itemImage }}
                style={styles.image}
              />
            </View>
          </View>
        </View>
      </TouchableOpacity>
    );
  } else {
    return <View />;
  }
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
