import React from "react";
import { View, ActivityIndicator, StyleSheet } from "react-native";

export default function Activity() {
  return (
    <View style={styles.container}>
      <ActivityIndicator color="white" size="large" />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#04040D",
    justifyContent: "center",
    alignItems: "center",
  },
});
