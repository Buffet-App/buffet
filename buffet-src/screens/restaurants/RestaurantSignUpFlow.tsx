import React from "react";
import {
  StyleSheet,
  Text,
  View,
  TextInput,
  TouchableOpacity,
  Keyboard,
  TouchableWithoutFeedback,
  SafeAreaView,
  Platform,
} from "react-native";
import { Formik } from "formik";

import Firebase from "../../../config/firebase";
import "firebase/firestore";
import { globalStyles } from "../../config/globalStyles";
import colors from "../../config/colors";

const auth = Firebase.auth();
const db = Firebase.firestore();

export default function RestaurantSignUpFlow(props) {
  return (
    <SafeAreaView style={styles.container}>
      <Formik
        initialValues={{
          name: "",
          phone: "",
          streetAddress: "",
          city: "",
          zipcode: "",
        }}
        onSubmit={async (values) => {
          try {
            const docRef = await db.collection("restaurants").add({
              name: values.name,
              phone: values.phone,
              streetAddress: values.streetAddress,
              city: values.city,
              zipcode: values.zipcode,
            });
            await db.collection("users").doc(auth.currentUser.uid).set(
              {
                restaurantId: docRef.id,
              },
              { merge: true }
            );
            props.userInfoUpdater(docRef.id);
          } catch (error) {
            console.log(error);
          }
        }}
      >
        {(formikProps) => (
          <View style={styles.formContainer}>
            <Text style={globalStyles.headerText}>Welcome to Buffet!</Text>
            <Text style={globalStyles.descText}>
              Thank you for joining our platform as a restaurant, a couple of
              questions...
            </Text>
            <View style={styles.inputView}>
              <TextInput
                style={styles.textInput}
                placeholder="Restaurant Name"
                placeholderTextColor="#003f5c"
                onChangeText={formikProps.handleChange("name")}
                value={formikProps.values.name}
              />
            </View>

            <View style={styles.inputView}>
              <TextInput
                style={styles.textInput}
                placeholder="Restaurant Phone"
                placeholderTextColor="#003f5c"
                onChangeText={formikProps.handleChange("phone")}
                value={formikProps.values.phone}
              />
            </View>

            <View style={styles.inputView}>
              <TextInput
                style={styles.textInput}
                placeholder="Restaurant Street Address"
                placeholderTextColor="#003f5c"
                onChangeText={formikProps.handleChange("streetAddress")}
                value={formikProps.values.streetAddress}
              />
            </View>

            <View style={styles.inputView}>
              <TextInput
                style={styles.textInput}
                placeholder="City"
                placeholderTextColor="#003f5c"
                onChangeText={formikProps.handleChange("city")}
                value={formikProps.values.city}
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
                Register Restaurant
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
