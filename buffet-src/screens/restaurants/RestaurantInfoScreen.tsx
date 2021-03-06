import React from "react";
import {
  Image,
  SafeAreaView,
  StyleSheet,
  Text,
  View,
  TouchableOpacity,
} from "react-native";
import { IRestaurantObject } from "../../config/interfaces";
import { globalStyles } from "../../config/globalStyles";

const RestaurantInfoScreen = ({ route, navigation }) => {
  const restaurantInfo = route.params.restaurantInfo as IRestaurantObject;
  return (
    <SafeAreaView>
      <Image source={{ uri: restaurantInfo.profileImg }} style={styles.image} />
      <Text>{restaurantInfo.name}</Text>
      <Text>{restaurantInfo.address}</Text>
      <Text>{restaurantInfo.phone}</Text>
      <Text>{restaurantInfo.restaurantDesc}</Text>
      <View>
        {route.params.restaurantDeals.map((deal) => {
          return <Text>{deal.itemName}</Text>;
        })}
      </View>
      <TouchableOpacity
        style={globalStyles.loginButton}
        onPress={() => {
          navigation.navigate("ScanStack");
        }}
      >
        <Text>Scan Restaurant Code </Text>
      </TouchableOpacity>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  image: {
    width: 180,
    height: 210,
    resizeMode: "stretch",
    borderRadius: 10,
  },
});

export default RestaurantInfoScreen;
