import React from "react";
import { View, Text, StyleSheet, StatusBar } from "react-native";

const LoginScreen = ({ navigation }) => {
    return(
        <View>
            <StatusBar style="light" />
            <Text>I am the Login Screen</Text>
        </View>
    )
}

export default LoginScreen;

const styles = StyleSheet.create({})