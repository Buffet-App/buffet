import React from "react";
import {
  ScrollView,
  View,
  StyleSheet,
  Text,
  TouchableOpacity,
} from "react-native";

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
    <View style={styles.container}>
      {/*<Text>Profile Screen!</Text>*/}
      <ScrollView>
        <View style={styles.profileStat}>
          <Text style={styles.captionTitle}>Name</Text>
          <Text style={styles.captionText}>PLACEHOLDER</Text>
        </View>

        <View style={styles.profileStat}>
          <Text style={styles.captionTitle}>Email</Text>
          <Text style={styles.captionText}>PLACEHOLDER</Text>
        </View>

        <View style={styles.profileStat}>
          <Text style={styles.captionTitle}>Phone</Text>
          <Text style={styles.captionText}>PLACEHOLDER</Text>
        </View>

        <View style={styles.profileStat}>
          <Text style={styles.captionTitle}>Subscribed Since</Text>
          <Text style={styles.captionText}>PLACEHOLDER</Text>
        </View>

        <View style={styles.profileStat}>
          <Text style={styles.captionTitle}>Subscription Status</Text>
          <Text style={styles.captionText}>PLACEHOLDER</Text>
        </View>

        <TouchableOpacity
          style={styles.signupButton}
          onPress={() => {
            console.log("want to edit profile");
          }}
        >
          <Text style={styles.captionText}>Edit Profile</Text>
        </TouchableOpacity>

        <TouchableOpacity
          style={[styles.signupButton, { marginBottom: 20 }]}
          onPress={handleLogOut}
        >
          <Text style={styles.captionText}>Log Out</Text>
        </TouchableOpacity>
      </ScrollView>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: "center",
    // backgroundColor: colors.primary,
  },
  profileStat: {
    width: 300,
    borderRadius: 30,
    //height: 50,
    padding: 10,
    alignItems: "center",
    justifyContent: "center",
    marginTop: 20,
    backgroundColor: colors.primary,
  },
  signupButton: {
    width: 300,
    borderRadius: 30,
    height: 50,
    alignItems: "center",
    justifyContent: "center",
    marginTop: 20,
    backgroundColor: colors.secondary,
  },
  captionText: {
    fontWeight: "bold",
    fontSize: 24,
    textAlign: "center",
    color: colors.white,
  },
  captionTitle: {
    color: colors.white,
  },
});

export default ProfileScreen;
