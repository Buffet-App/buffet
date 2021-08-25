import React from "react";
import {
  Image,
  SafeAreaView,
  StyleSheet,
  Text,
  TouchableOpacity,
  Platform,
} from "react-native";

const HomeScreen: React.FunctionComponent = () => {
  return (
    <SafeAreaView style={styles.container}>
      <Text style={styles.text__header}>Your Buffet</Text>
      <Text style={styles.text__header}>Your Deals</Text>
      <Text style={styles.text__header}>Your Favorites</Text>
      <Text style={styles.text__header}>Your Tastes</Text>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
      paddingTop: Platform.OS === 'android' ? 25 : 0,
  },
  text__header: {
    fontSize: 48,
  },
});
export default HomeScreen;
