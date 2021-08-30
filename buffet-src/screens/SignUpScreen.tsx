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

import Firebase from "../../config/firebase";
import "firebase/firestore";
import { globalStyles } from "../config/globalStyles";
import colors from "../config/colors";
import LineBreak from "../components/LineBreak";

const auth = Firebase.auth();
const db = Firebase.firestore();

export default function SignUpScreen({ route }) {
  return (
    <TouchableWithoutFeedback onPress={() => Keyboard.dismiss()}>
      <SafeAreaView style={styles.container}>
        <Formik
          initialValues={{
            name: "",
            email: "",
            phone: "",
            zipcode: "",
            password: "",
          }}
          onSubmit={async (values) => {
            try {
              if (values.email !== "" && values.password !== "") {
                const cred = await auth.createUserWithEmailAndPassword(
                  values.email,
                  values.password
                );
                db.collection("users").doc(cred.user.uid).set({
                  name: values.name,
                  email: values.email,
                  phone: values.phone,
                  zipcode: values.zipcode,
                  isRestaurant: route.params.isRestaurant,
                });
              }
            } catch (error) {
              console.log(error);
            }
          }}
        >
          {(formikProps) => (
            <View style={styles.formContainer}>
              <Text style={globalStyles.headerText}>Let's Get Started!</Text>
              <Text style={[globalStyles.descText, { marginBottom: 50 }]}>
                Create your own account with Buffet
              </Text>

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

              <View style={styles.inputView}>
                <TextInput
                  style={styles.textInput}
                  placeholder="Password"
                  placeholderTextColor="#003f5c"
                  onChangeText={formikProps.handleChange("password")}
                  value={formikProps.values.password}
                  secureTextEntry={true}
                />
              </View>

              <TouchableOpacity
                style={globalStyles.loginButton}
                onPress={formikProps.handleSubmit as any}
              >
                <Text style={[styles.text, { color: colors.white }]}>
                  Sign Up
                </Text>
              </TouchableOpacity>

              <LineBreak>OR</LineBreak>
            </View>
          )}
        </Formik>
      </SafeAreaView>
    </TouchableWithoutFeedback>
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
