import { StyleSheet } from "react-native";
import colors from "./colors";

export const lightText = {
  fontFamily: "Montserrat_200ExtraLight",
};

export const baseText = {
  fontFamily: "Montserrat_500Medium",
};

export const boldText = {
  fontFamily: "Montserrat_700Bold",
};

export const globalStyles = StyleSheet.create({
  headerText: {
    ...boldText,
    fontSize: 36,
    color: colors.primary,
  },
  descText: {
    ...lightText,
    fontSize: 12,
  },
  imageLogo: {
    width: 200,
    height: 200,
    resizeMode: "contain",
    marginTop: 40,
  },
  loginButton: {
    backgroundColor: colors.primary,
    paddingVertical: 10,
    paddingHorizontal: 70,
    alignItems: "center",
    justifyContent: "center",
    borderRadius: 30,
  },
});
