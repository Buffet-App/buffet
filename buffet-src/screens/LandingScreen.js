import React from "react";
import {
  SafeAreaView,
  StyleSheet,
  Text,
  Image,
  View,
  Button,
} from "react-native";
import { Colors } from "react-native/Libraries/NewAppScreen";

import colors from "../config/colors";

function LandingScreen(props) {
  return (
    <SafeAreaView style={styles.view__landing}>
      <View styles={styles.container__logo}>
        <Image
          style={styles.image__logo}
          source={require("../assets/buffet-logo-vertical.png")}
        />
        <Text style={styles.text__slogan}>Everybody Eats!</Text>
      </View>
      <Button title="Log In" color={colors.white} />
      <Button title="Sign Up" />
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  view__landing: {
    flex: 1,
    backgroundColor: colors.primary,
    justifyContent: "center",
    alignItems: "center",
  },
  container__logo: {
    justifyContent: "center",
    alignItems: "center",
  },
  text__slogan: {
    fontSize: 20,
    color: colors.white,
    textAlign: "center",
  },
  image__logo: {
    width: 200,
    height: 200,
    resizeMode: "contain",
  },
});

export default LandingScreen;
