import React from "react";
import { View, StyleSheet, Text, TouchableOpacity } from "react-native";

import Firebase from "../../config/firebase";
import colors from "../config/colors";

const auth = Firebase.auth();

const handleLogOut = async () => {
  try {
    await auth.signOut();
  } catch (error) {
    console.log(error);
  }
};

const ProfileScreen = () => {
  return (
    <View>
      <Text>Profile Screen!</Text>
      <TouchableOpacity style={styles.signupButton} onPress={handleLogOut}>
        <Text>Log Out</Text>
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  signupButton: {
    width: 300,
    borderRadius: 30,
    height: 50,
    alignItems: "center",
    justifyContent: "center",
    marginTop: 20,
    backgroundColor: colors.secondary,
  },
});

export default ProfileScreen;
