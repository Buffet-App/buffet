import React from "react";
import {
  Image,
  SafeAreaView,
  StyleSheet,
  ScrollView,
  View,
  Text,
  TouchableOpacity,
} from "react-native";

import colors from "../../config/colors";

const RestaurantHomeScreen = ({ navigation }) => {
  return (
    <SafeAreaView style={styles.container}>
      <ScrollView>
        <View style={styles.section}>
          <TouchableOpacity
            onPress={() => {
              navigation.navigate("Buffet");
            }}
          >
            <Text style={styles.text__header}>Overview</Text>
          </TouchableOpacity>
        </View>

        <View style={styles.section}>
          <TouchableOpacity
            onPress={() => {
              navigation.navigate("AnalyticsStack");
            }}
          >
            <Text style={styles.text__header}>Analytics</Text>
          </TouchableOpacity>
        </View>

        <View style={styles.section}>
          <TouchableOpacity
            onPress={() => {
              navigation.navigate("DealsStack");
            }}
          >
            <Text style={styles.text__header}>Manage Deals</Text>
          </TouchableOpacity>
        </View>

        <View style={styles.section}>
          <TouchableOpacity
            onPress={() => {
              navigation.navigate("BankStack");
            }}
          >
            <Text style={styles.text__header}>Revenue</Text>
          </TouchableOpacity>
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

export default RestaurantHomeScreen;
