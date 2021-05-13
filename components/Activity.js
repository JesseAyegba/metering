import React, { useEffect } from "react";
import { View, Text, ActivityIndicator, StyleSheet } from "react-native";
import { StatusBar } from "expo-status-bar";
import { useSelector } from "react-redux";

export default function Activity({ text }) {
  return (
    <View style={styles.container}>
      <StatusBar style="dark" />
      <Text style={{ color: "white", fontSize: 15, marginBottom: 10 }}>
        {text}
      </Text>
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
