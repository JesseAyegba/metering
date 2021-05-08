import React, { useState } from "react";
import { View, FlatList, Text, StyleSheet, TextInput, Button } from "react-native";
import { StatusBar } from "expo-status-bar";
import Recorder from "../components/Recorder";

function RecordScreen({ navigation }) {
  return (
    <View style={styles.container}>
      <Recorder />
      <Button
        styleContainer={styles.buttonContainer}
        title="Login"
        onPress={() => navigation.navigate("Login")}
      />
    </View>
  );
};

export default RecordScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
  },
  buttonContainer: {
    backgroundColor: "#ecf0f1",
    padding: 30,
  }
});
