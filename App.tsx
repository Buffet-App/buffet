import React from "react";

import { AuthenticatedUserProvider } from "./buffet-src/navigation/AuthenticatedUserProvider";
import RootNavigator from "./buffet-src/navigation/RootNavigator";

import RestaurantProfileScreen from "./buffet-src/screens/restaurants/RestaurantProfileScreen";

export default function App() {
  return (
    <AuthenticatedUserProvider>
      <RootNavigator />
    </AuthenticatedUserProvider>
  );
}
