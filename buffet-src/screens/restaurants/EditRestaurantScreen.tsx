import React, { useContext } from "react";
import {
  TextInput,
  View,
  StyleSheet,
  Text,
  TouchableOpacity,
  SafeAreaView,
  Platform,
  Button,
  Image,
  ScrollView,
} from "react-native";
import { Formik } from "formik";
import * as ImagePicker from "expo-image-picker";

import colors from "../../config/colors";
import { globalStyles } from "../../config/globalStyles";
import Firebase from "../../../config/firebase";
import {
  RestaurantInfoContext,
  UserInfoContext,
} from "../../UserInfoContextProvider";
import { IRestaurantObject, IUserObject } from "../../config/interfaces";
import "firebase/firestore";
import "firebase/storage";

const db = Firebase.firestore();
const store = Firebase.storage();
const auth = Firebase.auth();

const pickImage = async (handleChange) => {
  let result = await ImagePicker.launchImageLibraryAsync({
    allowsEditing: true,
    aspect: [4, 3],
  });
  console.log(result);
  if (result.cancelled === false) {
    const response = await fetch(result.uri);
    const blob = await response.blob();

    const ref = store
      .ref()
      .child(`profile-imgs/${auth.currentUser.uid}/profile.jpg`);
    await ref.put(blob);
    const link = await ref.getDownloadURL();
    handleChange(link);
  }
};

function EditRestaurantScreen({ navigation }) {
  const userInfo = useContext<IUserObject>(UserInfoContext);
  const restaurantInfo = useContext<IRestaurantObject>(RestaurantInfoContext);

  return (
    <SafeAreaView style={styles.container}>
      <ScrollView>
        <Formik
          initialValues={{
            profileImg: restaurantInfo.profileImg,
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
              await db
                .collection("restaurants")
                .doc(userInfo.restaurantId)
                .update({
                  profileImg: values.profileImg,
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

              <Button
                title="Pick an Image"
                onPress={() => {
                  pickImage(formikProps.handleChange("profileImg"));
                }}
              >
                Pick an image from camera roll
              </Button>
              {formikProps.values.profileImg &&
              formikProps.values.profileImg.length > 0 ? (
                <Image
                  source={{ uri: formikProps.values.profileImg }}
                  style={{ width: 200, height: 200 }}
                />
              ) : null}

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
      </ScrollView>
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

export default EditRestaurantScreen;
