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
  Platform,
  SafeAreaView,
} from "react-native";
import { Formik } from "formik";

import { globalStyles } from "../config/globalStyles";
import LineBreak from "../components/LineBreak";

import Firebase from "../../config/firebase";
import colors from "../config/colors";

const auth = Firebase.auth();

export default function LoginScreen() {
  return (
    <TouchableWithoutFeedback onPress={() => Keyboard.dismiss()}>
      <SafeAreaView style={styles.container}>
        <View>
          <Formik
            initialValues={{
              email: "",
              password: "",
            }}
            onSubmit={async (values) => {
              try {
                if (values.email !== "" && values.password !== "") {
                  await auth.signInWithEmailAndPassword(
                    values.email,
                    values.password
                  );
                }
              } catch (error) {
                console.log(error.message);
              }
            }}
          >
            {(formikProps) => (
              <View style={styles.formContainer}>
                <Image
                  style={styles.image__logo}
                  source={require("../assets/buffet-logo-red.png")}
                />

                <Text style={globalStyles.headerText}>Welcome Back!</Text>
                <Text style={[globalStyles.descText, { marginBottom: 50 }]}>
                  Login to your existing account with Buffet
                </Text>

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
                  <Text style={globalStyles.descText}>
                    Having trouble logging in?
                  </Text>
                </TouchableOpacity>

                <TouchableOpacity
                  style={[globalStyles.loginButton, { marginVertical: 20 }]}
                  onPress={formikProps.handleSubmit as any}
                >
                  <Text style={[styles.text, { color: colors.white }]}>
                    Log In
                  </Text>
                </TouchableOpacity>

                <LineBreak>OR</LineBreak>
              </View>
            )}
          </Formik>
        </View>
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
    paddingTop: Platform.OS === "android" ? 25 : 0,
  },
  formContainer: {
    flex: 1,
    flexDirection: "column",
    backgroundColor: colors.white,
    alignItems: "center",
    justifyContent: "center",
  },
  inputView: {
    backgroundColor: colors.gray,
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
  image__logo: {
    width: 100,
    height: 100,
    resizeMode: "contain",
    marginBottom: 30,
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
