import React from "react";
import { View, TouchableOpacity } from "react-native";

export default function HeaderIcon({ icon, myStyle, eventHandler }) {
  return (
    <View
      style={{
        ...myStyle,
      }}
    >
      <TouchableOpacity onPress={() => eventHandler()}>{icon}</TouchableOpacity>
    </View>
  );
}
