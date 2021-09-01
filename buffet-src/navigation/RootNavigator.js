import React, { useContext, useEffect, useState } from "react";
import { View, ActivityIndicator } from "react-native";

import Firebase from "../../config/firebase";
import { AuthenticatedUserContext } from "./AuthenticatedUserProvider";
import { UserInfoContextProvider } from "../UserInfoContextProvider";
import AuthNavigator from "./AuthNavigator";
import TabNavigator from "./TabNavigator";

const auth = Firebase.auth();

const RootNavigator = () => {
  const { user, setUser } = useContext(AuthenticatedUserContext);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    return auth.onAuthStateChanged(async (authenticatedUser) => {
      try {
        await (authenticatedUser ? setUser(authenticatedUser) : setUser(null));
        setIsLoading(false);
      } catch (error) {
        console.log(error);
      }
    });
  }, []);

  if (isLoading) {
    // change to splash screen
    return (
      <View style={{ flex: 1, justifyContent: "center", alignItems: "center" }}>
        <ActivityIndicator size="large" />
      </View>
    );
  }

  return user ? (
    <UserInfoContextProvider>
      <TabNavigator />
    </UserInfoContextProvider>
  ) : (
    <AuthNavigator />
  );
};

export default RootNavigator;
