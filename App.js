import React from "react";
import { SafeAreaView, StyleSheet, View } from "react-native";
import colors from "./buffet-src/config/colors";

import LandingScreen from "./buffet-src/screens/LandingScreen";
import LoginScreen from "./buffet-src/screens/LoginScreen";
import LoadingScreen from "./buffet-src/screens/LoadingScreen";

export default function App() {
    return <LandingScreen />;
    // return <LoginScreen />;
    // return <LoadingScreen />;
}

