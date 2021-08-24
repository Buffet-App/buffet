import React from "react";
<<<<<<< HEAD
import { View, StyleSheet, Text, TouchableOpacity, ScrollView } from "react-native";
=======
import {
  SafeAreaView,
  View,
  StyleSheet,
  Text,
  TouchableOpacity,
} from "react-native";
>>>>>>> added all bottom tab buttons + mapview + qr scanner + home page headers

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
<<<<<<< HEAD
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

          <TouchableOpacity style={styles.signupButton} onPress={() => {console.log('want to edit profile')}}>
              <Text style={styles.captionText}>Edit Profile</Text>
          </TouchableOpacity>

          <TouchableOpacity style={[styles.signupButton, {marginBottom: 20}]} onPress={handleLogOut}>
              <Text style={styles.captionText}>Log Out</Text>
          </TouchableOpacity>
      </ScrollView>
    </View>
=======
    <SafeAreaView>
      <Text>Profile Screen!</Text>
      <TouchableOpacity style={styles.signupButton} onPress={handleLogOut}>
        <Text>Log Out</Text>
      </TouchableOpacity>
    </SafeAreaView>
>>>>>>> added all bottom tab buttons + mapview + qr scanner + home page headers
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
  }
});

export default ProfileScreen;
