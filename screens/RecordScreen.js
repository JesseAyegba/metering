import React, { useEffect, useState } from "react";
import { View, FlatList, Text, StyleSheet, TextInput } from "react-native";
import { Button, withTheme } from "react-native-elements";
import { StatusBar } from "expo-status-bar";
import Recorder from "../components/Recorder";
import { auth } from "../firebase";
import { AntDesign } from "@expo/vector-icons";
import { MaterialIcons } from "@expo/vector-icons";
import { TouchableOpacity } from "react-native-gesture-handler";
import Activity from "../components/Activity";
import { useSelector } from "react-redux";
import HeaderIcon from "../components/HeaderIcon";

export default function RecordScreen({ navigation }) {
  let activity = useSelector((globalState) => globalState.loaderReducer);

  const signOut = () => {
    auth
      .signOut()
      .then(() => {
        navigation.replace("Login");
      })
      .catch((error) => alert(error.message));
  };

  // useEffect that sets the navigation header
  // options to blank when the activity loader 
  // is in progress
  useEffect(() => {
    navigation.setOptions({
      title: activity ? "" : "Record",
      headerRight: activity
        ? null
        : () => (
            <HeaderIcon
              eventHandler={signOut}
              myStyle={{ marginRight: 30, width: 30 }}
              icon={<AntDesign name="logout" size={24} color="white" />}
            />
          ),
      headerLeft: activity
        ? null
        : () => (
            <HeaderIcon
              myStyle={{ marginLeft: 30, width: 30 }}
              icon={
                <MaterialIcons name="library-add" size={24} color="white" />
              }
            />
          ),
    });
  }, [navigation, activity]);

  // useEffect that makes the navigation header
  // options visible

  if (activity) {
    return <Activity text="Uploading your recording to our secure servers" />;
  } else {
    return (
      <View style={styles.container}>
        <StatusBar style="light" />
        <Recorder />
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    backgroundColor: "#04040D",
  },
});
