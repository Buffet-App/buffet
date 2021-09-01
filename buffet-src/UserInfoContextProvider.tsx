import React, { useState, createContext, useEffect, useContext } from "react";
import { IRestaurantObject, IUserObject } from "./config/interfaces";
import Firebase from "../config/firebase";
import "firebase/firestore";

const auth = Firebase.auth();
const db = Firebase.firestore();

export const UserInfoContext = createContext({} as IUserObject);
export const RestaurantInfoContext = createContext({} as IRestaurantObject);

export const UserInfoContextProvider = ({ children }) => {
  const [userInfo, setUserInfo] = useState<IUserObject | undefined>(undefined);

  useEffect(() => {
    (async () => {
      console.log("READ: UserInfoContextProvider");
      let unsubscribe = db
        .collection("users")
        .doc(auth.currentUser.uid)
        .onSnapshot((doc) => {
          if (doc.exists) {
            setUserInfo(doc.data() as IUserObject);
          } else {
            console.log("No such document!");
          }
        });
      return () => unsubscribe();
    })();
  }, []);

  return (
    <UserInfoContext.Provider value={userInfo}>
      {children}
    </UserInfoContext.Provider>
  );
};

export const RestaurantInfoContextProvider = ({ children }) => {
  const userInfo = useContext(UserInfoContext);
  const [restaurantInfo, setRestaurantInfo] = useState(null);

  useEffect(() => {
    (async () => {
      console.log("READ: UserInfoContextProvider: Restaurant");
      let doc = await db
        .collection("restaurants")
        .doc(userInfo.restaurantId)
        .get();
      if (doc.exists) {
        setRestaurantInfo(doc.data() as IRestaurantObject);
      } else {
        console.log("No such document!");
      }
    })();
  }, []);

  return (
    <RestaurantInfoContext.Provider value={restaurantInfo}>
      {children}
    </RestaurantInfoContext.Provider>
  );
};
