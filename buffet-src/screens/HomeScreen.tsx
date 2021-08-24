import React from "react";
import {
  Image,
  SafeAreaView,
  StyleSheet,
  Text,
  TouchableOpacity,
} from "react-native";

const HomeScreen: React.FunctionComponent = () => {
  return (
    <SafeAreaView>
      <Text style={styles.text__header}>Your Buffet</Text>
      <Text style={styles.text__header}>Your Deals</Text>
      <Text style={styles.text__header}>Your Favorites</Text>
      <Text style={styles.text__header}>Your Tastes</Text>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  text__header: {
    fontSize: 48,
  },
});
export default HomeScreen;
