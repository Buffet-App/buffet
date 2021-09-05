import React, { useContext, useEffect, useState } from "react";
import {
  Text,
  SafeAreaView,
  TouchableOpacity,
  ScrollView,
  View,
} from "react-native";

import { globalStyles } from "../../config/globalStyles";
import { IDealsObject, IRestaurantObject } from "../../config/interfaces";
import {
  RestaurantInfoContext,
  UserInfoContext,
} from "../../UserInfoContextProvider";
import "firebase/firestore";
import Firebase from "../../../config/firebase";
import DealCard from "../../components/DealCard";

const db = Firebase.firestore();

function DealsScreen({ navigation }) {
  const restaurantInfo = useContext<IRestaurantObject>(RestaurantInfoContext);
  const userInfo = useContext(UserInfoContext);
  const [dealsArray, setDealsArray] = useState([]);

  useEffect(() => {
    (async () => {
      console.log("READ: DealsScreen.tsx");
      await db
        .collection("restaurants")
        .doc(userInfo.restaurantId)
        .collection("deals")
        .onSnapshot((snapshot) => {
          setDealsArray(snapshot.docs);
        });
    })();
  }, []);

  if (dealsArray !== undefined) {
    return (
      <SafeAreaView>
        <ScrollView>
          <TouchableOpacity
            style={globalStyles.loginButton}
            onPress={() => {
              navigation.navigate("EditDeal", {
                deal: undefined,
                dealId: undefined,
              });
            }}
          >
            <Text>Create Deal</Text>
          </TouchableOpacity>
        </ScrollView>
        <View>
          {dealsArray.map((deal) => {
            return (
              <DealCard
                deal={deal}
                navigation={navigation}
                key={deal.data().values.itemName}
              />
            );
          })}
        </View>
      </SafeAreaView>
    );
  } else {
    return <View />;
  }
}

export default DealsScreen;
