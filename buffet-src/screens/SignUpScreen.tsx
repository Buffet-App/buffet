import React from "react";
import {
  StyleSheet,
  Text,
  View,
  TextInput,
  TouchableOpacity,
  Image,
  Keyboard,
  TouchableWithoutFeedback,
} from "react-native";
import { Formik } from "formik";

import Firebase from "../../config/firebase";
import colors from "../config/colors";

const auth = Firebase.auth();

export default function SignUpScreen() {
  return (
    <TouchableWithoutFeedback onPress={() => Keyboard.dismiss()}>
      <View style={styles.container}>
        <Formik
          initialValues={{
            email: "",
            password: "",
          }}
          onSubmit={async (values) => {
            try {
              console.log("button pressed");
              if (values.email !== "" && values.password !== "") {
                await auth.createUserWithEmailAndPassword(
                  values.email,
                  values.password
                );
              }
            } catch (error) {
              console.log(error);
            }
          }}
        >
          {(formikProps) => (
            <View style={styles.formContainer}>
              <Image
                style={styles.image__logo}
                source={require("../assets/buffet-logo-vertical.png")}
              />

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
                  placeholder="Password"
                  placeholderTextColor="#003f5c"
                  onChangeText={formikProps.handleChange("password")}
                  value={formikProps.values.password}
                  secureTextEntry={true}
                />
              </View>

              <TouchableOpacity
                onPress={() => {
                  console.log("Trouble with sign in");
                }}
              >
                <Text style={styles.trouble}>Having trouble logging in?</Text>
              </TouchableOpacity>

              <TouchableOpacity
                style={styles.signupButton}
                onPress={formikProps.handleSubmit as any}
              >
                <Text>SIGN UP</Text>
              </TouchableOpacity>
            </View>
          )}
        </Formik>
      </View>
    </TouchableWithoutFeedback>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    flexDirection: "column",
    backgroundColor: colors.primary,
    alignItems: "center",
    justifyContent: "center",
  },
  formContainer: {
    flex: 1,
    flexDirection: "column",
    backgroundColor: colors.primary,
    alignItems: "center",
    justifyContent: "center",
  },
  inputView: {
    backgroundColor: colors.white,
    borderRadius: 30,
    width: 250,
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
