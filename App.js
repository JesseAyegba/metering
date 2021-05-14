import "react-native-gesture-handler";
import React from "react";
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
  gesturesEnabled: true,
  headerStyle: { backgroundColor: "#04040D", height: 110 },
  headerTitleStyle: { color: "white", fontSize: 20, alignSelf: "center", fontWeight: "bold", },
  headerTintColor: "white",
};

export default function App() {
  return (
    <Provider store={store}>
      <NavigationContainer>
        <Stack.Navigator  screenOptions={globalScreenOptions}>
          <Stack.Screen name="Login" component={LoginScreen} />
          <Stack.Screen name="Register" component={RegisterScreen} />
          <Stack.Screen name="Record" component={RecordScreen} />
        </Stack.Navigator>
      </NavigationContainer>
    </Provider>
  );
}