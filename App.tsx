import React from "react";
import AppLoading from "expo-app-loading";
import {
  useFonts,
  Montserrat_200ExtraLight,
  Montserrat_500Medium,
  Montserrat_700Bold,
} from "@expo-google-fonts/montserrat";

import { AuthenticatedUserProvider } from "./buffet-src/navigation/AuthenticatedUserProvider";
import RootNavigator from "./buffet-src/navigation/RootNavigator";

export default function App() {
  let [fontsLoaded] = useFonts({
    Montserrat_200ExtraLight,
    Montserrat_500Medium,
    Montserrat_700Bold,
  });

  if (!fontsLoaded) {
    return <AppLoading />;
  } else {
    return (
      <AuthenticatedUserProvider>
        <RootNavigator />
      </AuthenticatedUserProvider>
    );
  }
}
