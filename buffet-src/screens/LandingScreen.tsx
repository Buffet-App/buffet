import React from "react";
import colors from "../config/colors";
import {
  Image,
  View,
  StyleSheet,
  Text,
  TouchableOpacity,
  SafeAreaView,
  Platform,
} from "react-native";
import { globalStyles } from "../config/globalStyles";

export default function LandingScreen({ navigation }) {
  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.topView}>
        <Image
          style={[globalStyles.imageLogo, { marginTop: 60 }]}
          source={require("../assets/buffet-logo-vertical.png")}
        />
      </View>
      <View style={styles.bottomView}>
        {/*Text*/}
        <View>
          <Text style={styles.captionText}>
            <Text style={{ color: colors.primary }}>Sign up </Text>
            as a customer or a restaurant?
          </Text>
        </View>
        {/*Customer/Restaurant*/}
        <View style={styles.midLogos}>
          <TouchableOpacity
            style={styles.logoText}
            onPress={() => {
              navigation.navigate("SignUpScreen", { isRestaurant: false });
            }}
          >
            <Image
              style={styles.logo}
              source={require("../assets/customer-signup-logo.png")}
            />
            <Text style={styles.cusResText}> Customer</Text>
          </TouchableOpacity>
          <TouchableOpacity
            style={styles.logoText}
            onPress={() => {
              navigation.navigate("SignUpScreen", { isRestaurant: true });
            }}
          >
            <Image
              style={styles.logo}
              source={require("../assets/restaurant-signup-logo.png")}
            />
            <Text style={styles.cusResText}>Restaurant </Text>
          </TouchableOpacity>
        </View>
        {/*Log In Button*/}
        <View>
          <View
            style={{ flexDirection: "row", alignItems: "center", padding: 10 }}
          >
            <View style={{ flex: 1, height: 1, backgroundColor: "gray" }} />
            <View>
              <Text style={{ width: 25, textAlign: "center", color: "gray" }}>
                OR
              </Text>
            </View>
            <View style={{ flex: 1, height: 1, backgroundColor: "gray" }} />
          </View>

          <TouchableOpacity
            style={globalStyles.loginButton}
            onPress={() => {
              navigation.navigate("LoginScreen");
            }}
          >
            <Text style={[styles.captionText, { color: colors.white }]}>
              Log In
            </Text>
          </TouchableOpacity>
        </View>
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors.primary,
    paddingTop: Platform.OS === "android" ? 25 : 0,
  },
  topView: {
    flex: 1,
    backgroundColor: colors.primary,
    alignItems: "center",
    justifyContent: "center",
  },
  bottomView: {
    flex: 2,
    backgroundColor: colors.white,
    borderTopLeftRadius: 30,
    borderTopRightRadius: 30,
    overflow: "hidden",
    alignItems: "center",
    justifyContent: "center",
  },
  captionText: {
    fontWeight: "bold",
    fontSize: 24,
    textAlign: "center",
    color: colors.text,
  },
  midLogos: {
    flexDirection: "row",
  },
  logoText: {
    flexDirection: "column",
    margin: 5,
    alignItems: "center",
    justifyContent: "space-around",
  },
  logo: {
    width: 150,
    height: 150,
    resizeMode: "contain",
    marginTop: 20,
  },
  cusResText: {
    fontSize: 18,
    textAlign: "center",
  },
});
