import React, { useContext } from "react";
import {
  TextInput,
  View,
  StyleSheet,
  Text,
  TouchableOpacity,
  SafeAreaView,
  Platform,
} from "react-native";
import { Formik } from "formik";

import colors from "../config/colors";
import { globalStyles } from "../config/globalStyles";
import Firebase from "../../config/firebase";
import { UserInfoContext } from "../UserInfoContextProvider";
import { IUserObject } from "../config/interfaces";
import "firebase/firestore";

const db = Firebase.firestore();
const auth = Firebase.auth();

function EditProfileScreen({ navigation }) {
  const userInfo = useContext<IUserObject>(UserInfoContext);

  return (
    <SafeAreaView style={styles.container}>
      <Formik
        initialValues={{
          name: userInfo.name,
          email: userInfo.email,
          phone: userInfo.phone,
          zipcode: userInfo.zipcode,
        }}
        onSubmit={async (values) => {
          try {
            console.log("WRITE:  editProfile");
            await db.collection("users").doc(auth.currentUser.uid).update({
              name: values.name,
              email: values.email,
              phone: values.phone,
              zipcode: values.zipcode,
            });
            navigation.goBack();
          } catch (error) {
            console.log(error);
          }
        }}
      >
        {(formikProps) => (
          <View style={styles.formContainer}>
            <Text style={globalStyles.headerText}>Edit Profile</Text>

            <View style={styles.inputView}>
              <TextInput
                style={styles.textInput}
                placeholder="Full Name"
                placeholderTextColor="#003f5c"
                onChangeText={formikProps.handleChange("name")}
                value={formikProps.values.name}
              />
            </View>

            <View style={styles.inputView}>
              <TextInput
                style={styles.textInput}
                placeholder="Email"
                placeholderTextColor="#003f5c"
                onChangeText={formikProps.handleChange("email")}
                value={formikProps.values.email}
              />
            </View>

            <View style={styles.inputView}>
              <TextInput
                style={styles.textInput}
                placeholder="Phone Number"
                placeholderTextColor="#003f5c"
                onChangeText={formikProps.handleChange("phone")}
                value={formikProps.values.phone}
              />
            </View>

            <View style={styles.inputView}>
              <TextInput
                style={styles.textInput}
                placeholder="Zip Code"
                placeholderTextColor="#003f5c"
                onChangeText={formikProps.handleChange("zipcode")}
                value={formikProps.values.zipcode}
              />
            </View>

            <TouchableOpacity
              style={globalStyles.loginButton}
              onPress={formikProps.handleSubmit as any}
            >
              <Text style={[styles.text, { color: colors.white }]}>
                Save Profile
              </Text>
            </TouchableOpacity>
          </View>
        )}
      </Formik>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    flexDirection: "column",
    backgroundColor: colors.white,
    alignItems: "center",
    justifyContent: "center",
  },
  formContainer: {
    flex: 1,
    flexDirection: "column",
    backgroundColor: colors.white,
    alignItems: "center",
    justifyContent: "center",
    paddingTop: Platform.OS === "android" ? 25 : 0,
  },
  inputView: {
    backgroundColor: colors.gray,
    borderRadius: 30,
    width: 300,
    height: 45,
    marginBottom: 20,
  },
  textInput: {
    height: 50,
    flex: 1,
    padding: 10,
    marginLeft: 20,
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
  image__logo: {
    width: 200,
    height: 200,
    resizeMode: "contain",
  },
  text: {
    fontWeight: "bold",
    fontSize: 24,
    textAlign: "center",
  },
  trouble: {
    color: colors.text,
  },
});

export default EditProfileScreen;
