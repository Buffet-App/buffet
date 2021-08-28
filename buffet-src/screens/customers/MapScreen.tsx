import React from "react";
import MapView from "react-native-maps";
import { Image, View, StyleSheet, Text, Dimensions } from "react-native";

const MapScreen: React.FunctionComponent = () => {
  return (
    <View>
      <MapView style={styles.map} />
    </View>
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
    height: Dimensions.get("window").height,
  },
});
