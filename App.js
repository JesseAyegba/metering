import "react-native-gesture-handler";
import React from "react";
import { View, Text, StyleSheet } from "react-native";
import { StatusBar } from "expo-status-bar";

import { NavigationContainer } from "@react-navigation/native";

function App() {
  return (
    <NavigationContainer>
      <View style={styles.app}>
        <StatusBar style="light" />
        <Text>Try doing this tomorrow okay?</Text>
      </View>
    </NavigationContainer>
  );
}

export default App;

const styles = StyleSheet.create({
  app: {
    flex: 1,
    backgroundColor: "pink",
    alignItems: "center",
    justifyContent: "center",
  },
});
