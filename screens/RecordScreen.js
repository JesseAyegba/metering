import React, { useEffect, useState } from "react";
import { View, FlatList, Text, StyleSheet, TextInput } from "react-native";
import { Button, withTheme } from "react-native-elements";
import { StatusBar } from "expo-status-bar";
import Recorder from "../components/Recorder";
import { auth } from "../firebase";
import { AntDesign } from "@expo/vector-icons";
import { MaterialIcons } from "@expo/vector-icons";
import { TouchableOpacity } from "react-native-gesture-handler";

export default function RecordScreen({ navigation }) {
  const signOut = () => {
    auth
      .signOut()
      .then(() => {
        navigation.replace("Login");
      })
      .catch((error) => alert(error.message));
  };

  useEffect(() => {
    navigation.setOptions({
      headerTitleStyle: { alignSelf: "center" },
      headerRight: () => (
        <View
          style={{
            marginRight: 30,
            width: 30,
          }}
        >
          <TouchableOpacity>
            <AntDesign
              onPress={() => signOut()}
              name="logout"
              size={24}
              color="white"
            />
          </TouchableOpacity>
        </View>
      ),
      headerLeft: () => (
        <View
          style={{
            marginLeft: 30,
            width: 30,
          }}
        >
          <TouchableOpacity>
            <MaterialIcons name="library-add" size={24} color="white" />
          </TouchableOpacity>
        </View>
      ),
    });
  }, [navigation]);
  return (
    <View style={styles.container}>
      <StatusBar style="light" />
      <Recorder />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    backgroundColor: "#04040D",
  },
});
