import {StyleSheet} from "react-native";
import colors from "./colors";

export const globalStyles = StyleSheet.create({
    imageLogo: {
        width: 200,
        height: 200,
        resizeMode: "contain",
        marginTop: 40,
    },
    loginButton: {
        backgroundColor: colors.primary,
        width: 300,
        height: 50,
        alignItems: 'center',
        justifyContent: 'center',
        borderRadius: 30,
    }
});
