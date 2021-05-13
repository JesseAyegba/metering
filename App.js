import "react-native-gesture-handler";
import React from "react";
import { View, Text, StyleSheet, Button } from "react-native";
import { StatusBar } from "expo-status-bar";
import { NavigationContainer } from "@react-navigation/native";
import { createStackNavigator } from "@react-navigation/stack";
import LoginScreen from "./screens/LoginScreen";
import RegisterScreen from "./screens/RegisterScreen";
import RecordScreen from "./screens/RecordScreen";
import { Provider } from "react-redux";
import { store } from "./store/store";

const Stack = createStackNavigator();

const globalScreenOptions = {
  headerStyle: { backgroundColor: "#04040D", height: 110 },
  headerTitleStyle: { color: "white", fontSize: 20, alignSelf: "center" },
  headerTintColor: "white",
};

export default function App() {
  return (
    <Provider store={store}>
      <NavigationContainer>
        <Stack.Navigator screenOptions={globalScreenOptions}>
          <Stack.Screen name="Login" component={LoginScreen} />
          <Stack.Screen name="Register" component={RegisterScreen} />
          <Stack.Screen name="Record" component={RecordScreen} />
        </Stack.Navigator>
      </NavigationContainer>
    </Provider>
  );
}