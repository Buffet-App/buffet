import React from "react";
import { View, Text, TouchableOpacity, StyleSheet } from "react-native";
import colors from "../config/colors";
import { globalStyles } from "../config/globalStyles";

function DealCard(props) {
  const dealInfo = props.deal.data().values;
  return (
    <View style={styles.container}>
      <Text>{dealInfo.itemName}</Text>
      <TouchableOpacity
        style={globalStyles.loginButton}
        onPress={() => {
          props.navigation.navigate("EditDeal", {
            deal: dealInfo,
            dealId: props.deal.id,
          });
        }}
      >
        <Text>Edit Deal</Text>
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    backgroundColor: colors.primary,
  },
});

export default DealCard;
