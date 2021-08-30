import React from "react";
import MapView from "react-native-maps";
import {
  FlatList,
  ScrollView,
  StyleSheet,
  Text,
  Dimensions,
} from "react-native";

import { globalStyles } from "../../config/globalStyles";
import Card from "../../components/Card";
import { restaurants } from "./HomeScreen";

const MapScreen = ({ navigation }) => {
  return (
    <ScrollView>
      <MapView style={styles.map} />
      <Text style={globalStyles.headerText}>restaurants</Text>
      <FlatList
        nestedScrollEnabled={true}
        horizontal={true}
        data={restaurants}
        renderItem={({ item }) => <Card item={item} navigation={navigation} />}
        keyExtractor={(item) => item.name}
      />
    </ScrollView>
  );
};

export default MapScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
    alignItems: "center",
    justifyContent: "center",
  },
  map: {
    width: Dimensions.get("window").width,
    height: Dimensions.get("window").height / 1.7,
  },
});
