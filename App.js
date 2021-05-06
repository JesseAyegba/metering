import "react-native-gesture-handler";
import React from "react";
import { View, Text, StyleSheet } from "react-native";
import { StatusBar } from "expo-status-bar";
import { NavigationContainer } from "@react-navigation/native";
import { createStackNavigator } from '@react-navigation/stack';
import Login from "./screens/Login";
import RecordScreen from "./screens/RecordScreen";

const Stack = createStackNavigator();
const globalScreenOptions = {
  headerStyle: { backgroundColor: "#04040D"},
  headerTitleStyle: { color: "white"},
  headerTintColor: "white",
}

const App = () => {

  return (
    <NavigationContainer>
      <Stack.Navigator screenOptions={globalScreenOptions}>
        <Stack.Screen name="Login" component={Login} />
        <Stack.Screen name="Record" component={RecordScreen} />
      </Stack.Navigator>
    </NavigationContainer>
  );
}

export default App;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "pink",
    alignItems: "center",
    justifyContent: "center",
  },
});
