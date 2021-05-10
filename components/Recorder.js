import React, { useState } from "react";
import { Text, View, StyleSheet, Image } from "react-native";
import { Button } from "react-native-elements";
import { Audio } from "expo-av";
import { FontAwesome } from "@expo/vector-icons";
import { Feather } from '@expo/vector-icons'; 
import { Foundation } from '@expo/vector-icons'; 
import { MaterialCommunityIcons } from '@expo/vector-icons';
import mic from "../assets/mic.png";

export default function Recorder() {
  const [recording, setRecording] = useState();

  async function startRecording() {
    try {
      console.log("Requesting permissions..");
      await Audio.requestPermissionsAsync();
      await Audio.setAudioModeAsync({
        allowsRecordingIOS: true,
        playsInSilentModeIOS: true,
      });
      console.log("Starting recording..");
      const recording = new Audio.Recording();
      await recording.prepareToRecordAsync(
        Audio.RECORDING_OPTIONS_PRESET_HIGH_QUALITY
      );
      await recording.startAsync();
      setRecording(recording);
      console.log("Recording started");
    } catch (err) {
      console.error("Failed to start recording", err);
    }
  }

  async function stopRecording() {
    console.log("Stopping recording..");
    setRecording(undefined);
    await recording.stopAndUnloadAsync();
    const uri = recording.getURI();
    console.log("Recording stopped and stored at", uri);
  }

  return (
    <View style={styles.container}>
      {/* <Button
        styleContainer={styles.buttonStyle}
        title={recording ? "Stop Recording" : "Start Recording"}
        onPress={recording ? stopRecording : startRecording}
      /> */}
      {/* <View style={styles.micContainer}>
        <MaterialCommunityIcons name="microphone" size={250} color="#fff784" />
      </View> */}
      <Image style={{marginTop: 150 }} source={mic}/>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: "center",
  },
  buttonStyle: {
    backgroundColor: "#1873FB",
  },
  micContainer: {
    width: 300,
    height: 300,
    borderBottomWidth: 4,
    borderTopWidth: 4,
    borderLeftWidth: 4,
    borderRightWidth: 4,
    borderRadius: 300,
    borderColor: "gray",
    alignItems: "center",
    justifyContent: "center",
  },
});
