import React from "react";
import { StyleSheet, View } from "react-native";
import colors from "../config/colors";

export default function Card(props) {
    return (
        <View style={styles.card}>
            <View style={styles.cardContent}>
                {props.children}
            </View>
        </View>
    );
}

const styles = StyleSheet.create({
    card: {
        borderRadius: 10,
        elevation: 3,
        backgroundColor: colors.secondary,
        shadowOffset: {
            width: 1,
            height: 1,
        },
        shadowColor: '#333',
        shadowOpacity: 0.3,
        shadowRadius: 2,
        margin: 5,
        width: 200,
        height: 300,
    },
    cardContent: {
        marginHorizontal: 18,
        marginVertical: 20,
    }
});
