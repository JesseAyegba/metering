import React, { useEffect } from "react";
import { View, FlatList, Text, StyleSheet, TextInput } from "react-native";
import { Button } from "react-native-elements";
import { StatusBar } from "expo-status-bar";
import Recorder from "../components/Recorder";

export default function RecordScreen({ navigation }) {
  return (
    <View style={styles.container}>
      <StatusBar style="light" />
      <Recorder />
      <Button
        styleContainer={styles.buttonContainer}
        title="Login"
        onPress={() => navigation.navigate("Login")}
      />
      <Button />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
  },
  buttonContainer: {
    backgroundColor: "#1873FB",
    padding: 30,
  }
});
