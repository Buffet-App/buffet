import React, { useContext } from "react";
import {
  Image,
  TextInput,
  SafeAreaView,
  StyleSheet,
  View,
  Text,
  TouchableOpacity,
  ScrollView,
  Switch,
  Button,
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
import {
  IRestaurantObject,
  IDealsObject,
  IUserObject,
} from "../../config/interfaces";
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
  if (result.cancelled === false) {
    const response = await fetch(result.uri);
    const blob = await response.blob();

    const ref = store.ref().child(`deal-imgs/${auth.currentUser.uid}/deal.jpg`);
    await ref.put(blob);
    const link = await ref.getDownloadURL();
    handleChange(link);
  }
};

const EditDealScreen = ({ route, navigation }) => {
  const restaurantInfo = useContext<IRestaurantObject>(RestaurantInfoContext);
  const userInfo = useContext<IUserObject>(UserInfoContext);

  const isExistingDeal = route.params.deal !== undefined ? true : false;

  return (
    <SafeAreaView style={styles.container}>
      <ScrollView showsVerticalScrollIndicator={false}>
        <Formik
          initialValues={{
            itemName: isExistingDeal ? route.params.deal.itemName : "",
            itemDesc: isExistingDeal ? route.params.deal.itemDesc : "",
            itemPrice: isExistingDeal ? route.params.deal.itemPrice : "",
            itemImage: isExistingDeal ? route.params.deal.itemImage : "",
            hasAddOn: isExistingDeal ? route.params.deal.hasAddOn : false,
            addOnName: isExistingDeal ? route.params.deal.addOnName : "",
            addOnDesc: isExistingDeal ? route.params.deal.addOnDesc : "",
            addOnPrice: isExistingDeal ? route.params.deal.addOnPrice : "",
            addOnImage: isExistingDeal ? route.params.deal.addOnImage : "",
            isBuffetDeal: isExistingDeal
              ? route.params.deal.isBuffetDeal
              : false,
          }}
          onSubmit={async (values: IDealsObject) => {
            try {
              console.log("WRITE:  newDeals");

              if (isExistingDeal) {
                await db
                  .collection("restaurants")
                  .doc(userInfo.restaurantId)
                  .collection("deals")
                  .doc(route.params.dealId)
                  .set(
                    {
                      values,
                    },
                    { merge: true }
                  );
              } else {
                await db
                  .collection("restaurants")
                  .doc(userInfo.restaurantId)
                  .collection("deals")
                  .add({
                    values,
                  });
              }
              if (values.isBuffetDeal === true) {
                await db
                  .collection("restaurants")
                  .doc(userInfo.restaurantId)
                  .set(
                    {
                      isFeatured: true,
                    },
                    { merge: true }
                  );
              }
              navigation.goBack();
            } catch (error) {
              console.log(error);
            }
          }}
        >
          {(formikProps) => (
            <View style={styles.formContainer}>
              <Text style={globalStyles.headerText}>Edit Deal</Text>

              <Button
                title="Pick an Image"
                onPress={() => {
                  pickImage(formikProps.handleChange("itemImage"));
                }}
              >
                Pick an image from camera roll
              </Button>
              {formikProps.values.itemImage &&
              formikProps.values.itemImage.length > 0 ? (
                <Image
                  source={{ uri: formikProps.values.itemImage }}
                  style={{ width: 200, height: 200 }}
                />
              ) : null}

              <View style={styles.inputView}>
                <TextInput
                  style={styles.textInput}
                  placeholder="Item Name"
                  placeholderTextColor="#003f5c"
                  onChangeText={formikProps.handleChange("itemName")}
                  value={formikProps.values.itemName}
                />
              </View>

              <View style={styles.inputView}>
                <TextInput
                  style={styles.textInput}
                  placeholder="Item Description"
                  placeholderTextColor="#003f5c"
                  onChangeText={formikProps.handleChange("itemDesc")}
                  value={formikProps.values.itemDesc}
                />
              </View>

              <View style={styles.inputView}>
                <TextInput
                  style={styles.textInput}
                  placeholder="Item Price"
                  placeholderTextColor="#003f5c"
                  onChangeText={formikProps.handleChange("itemPrice")}
                  value={formikProps.values.itemPrice}
                />
              </View>

              <View>
                <Switch
                  trackColor={{ false: "#767577", true: "#81b0ff" }}
                  thumbColor={
                    formikProps.values.hasAddOn ? "#f5dd4b" : "#f4f3f4"
                  }
                  ios_backgroundColor={colors.gray}
                  onValueChange={() => {
                    formikProps.setFieldValue(
                      "hasAddOn",
                      !formikProps.values.hasAddOn
                    );
                  }}
                  value={formikProps.values.hasAddOn}
                />
                <Text>Add on for this deal?</Text>
              </View>

              <View style={styles.inputView}>
                <TextInput
                  style={styles.textInput}
                  placeholder="Add On Name"
                  placeholderTextColor="#003f5c"
                  onChangeText={formikProps.handleChange("addOnName")}
                  value={formikProps.values.addOnName}
                />
              </View>

              <View style={styles.inputView}>
                <TextInput
                  style={styles.textInput}
                  placeholder="Add On Description"
                  placeholderTextColor="#003f5c"
                  onChangeText={formikProps.handleChange("addOnDesc")}
                  value={formikProps.values.addOnDesc}
                />
              </View>

              <View style={styles.inputView}>
                <TextInput
                  style={styles.textInput}
                  placeholder="Add On Price"
                  placeholderTextColor="#003f5c"
                  onChangeText={formikProps.handleChange("addOnPrice")}
                  value={formikProps.values.addOnPrice}
                />
              </View>

              <View style={styles.inputView}>
                <TextInput
                  style={styles.textInput}
                  placeholder="Add On Image"
                  placeholderTextColor="#003f5c"
                  onChangeText={formikProps.handleChange("addOnImage")}
                  value={formikProps.values.addOnImage}
                />
              </View>

              <View>
                <Switch
                  trackColor={{ false: "#767577", true: "#81b0ff" }}
                  thumbColor={
                    formikProps.values.isBuffetDeal ? "#f5dd4b" : "#f4f3f4"
                  }
                  ios_backgroundColor={colors.gray}
                  onValueChange={() => {
                    formikProps.setFieldValue(
                      "isBuffetDeal",
                      !formikProps.values.isBuffetDeal
                    );
                  }}
                  value={formikProps.values.isBuffetDeal}
                />
                <Text>Would you like to join the buffet?</Text>
              </View>

              <TouchableOpacity
                style={globalStyles.loginButton}
                onPress={formikProps.handleSubmit as any}
              >
                <Text style={[styles.text, { color: colors.white }]}>
                  Save Deal
                </Text>
              </TouchableOpacity>
            </View>
          )}
        </Formik>
      </ScrollView>
    </SafeAreaView>
  );
};

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

export default EditDealScreen;
