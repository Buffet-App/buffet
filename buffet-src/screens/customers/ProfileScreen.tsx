import React, { useState, useContext } from "react";
import {
  ScrollView,
  View,
  StyleSheet,
  Text,
  TouchableOpacity,
  SafeAreaView,
  Platform,
} from "react-native";

import Firebase from "../../../config/firebase";
import colors from "../../config/colors";
import { IUserObject } from "../../config/interfaces";
import { UserInfoContext } from "../../UserInfoContextProvider";

const auth = Firebase.auth();

const handleLogOut = async () => {
  try {
    await auth.signOut();
  } catch (error) {
    console.log(error);
  }
};

const ProfileScreen = ({ navigation }) => {
  const userInfo = useContext<IUserObject>(UserInfoContext);

  if (userInfo !== undefined) {
    return (
      <SafeAreaView style={styles.container}>
        {/*<Text>Profile Screen!</Text>*/}
        <ScrollView>
          <TouchableOpacity
            style={styles.signupButton}
            onPress={() => {
              navigation.navigate("Subscription");
            }}
          >
            <Text style={styles.captionText}>Subscribe</Text>
          </TouchableOpacity>

          <View style={styles.profileStat}>
            <Text style={styles.captionTitle}>Name</Text>
            <Text style={styles.captionText}>{userInfo.name}</Text>
          </View>

          <View style={styles.profileStat}>
            <Text style={styles.captionTitle}>Email</Text>
            <Text style={styles.captionText}>{userInfo.email}</Text>
          </View>

          <View style={styles.profileStat}>
            <Text style={styles.captionTitle}>Phone</Text>
            <Text style={styles.captionText}>{userInfo.phone}</Text>
          </View>

          <View style={styles.profileStat}>
            <Text style={styles.captionTitle}>Subscribed Since</Text>
            <Text style={styles.captionText}>YEET</Text>
          </View>

          <View style={styles.profileStat}>
            <Text style={styles.captionTitle}>Subscription Status</Text>
            <Text style={styles.captionText}>YEET</Text>
          </View>

          <TouchableOpacity
            style={styles.signupButton}
            onPress={() => {
              navigation.navigate("EditProfile");
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
      </SafeAreaView>
    );
  }
  return <View />;
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: "center",
    paddingTop: Platform.OS === "android" ? 25 : 0,
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
