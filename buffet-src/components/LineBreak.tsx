import React from "react";
import { View, Text } from "react-native";

export default function Card(props) {
  return (
    <View
      style={{
        width: 300,
        flexDirection: "row",
        alignItems: "center",
        padding: 10,
      }}
    >
      <View style={{ flex: 1, height: 1, backgroundColor: "gray" }} />
      <View>
        <Text style={{ width: 25, textAlign: "center", color: "gray" }}>
          {props.children}
        </Text>
      </View>
      <View style={{ flex: 1, height: 1, backgroundColor: "gray" }} />
    </View>
  );
}
