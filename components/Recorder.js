import React, { useState } from "react";
import { Text, View, StyleSheet, Image, TouchableOpacity, Alert } from "react-native";
import { Button } from "react-native-elements";
import { Audio } from "expo-av";
import { FontAwesome } from "@expo/vector-icons";
import { Feather } from "@expo/vector-icons";
import { Foundation } from "@expo/vector-icons";
import { MaterialCommunityIcons } from "@expo/vector-icons";
import mic from "../assets/mic.png";
import * as DocumentPicker from 'expo-document-picker';
import { storage } from "../firebase";

export default function Recorder() {
  const [recording, setRecording] = useState();

  const uploadAudio = async (uri) => {
    const response = await fetch(uri);
    const blob = await response.blob();

    const storageRef = storage.ref();
    const imageRef = storageRef.child("audio/test-audio")
    return imageRef.put(blob);
  }

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
    console.log("Upload starting.....");
    uploadAudio(uri).then(() => {
      Alert.alert("Audio Upload Successful");
    }).catch((error) => Alert.alert("Could not upload audio"))
  }

  const handlePress = async () => {
    try{
      const options = {
        type: "image/*",
        copyToCacheDirectory: true,
        multiple: false,

      }
      const response = await DocumentPicker.getDocumentAsync(options);
      Alert.alert("Image selected successfully. Upload in Progress...");
      uploadImage(response.uri).then(() => {
        Alert.alert("Image successfully uploaded to firebase");
      }).catch((error) => Alert.alert(error))
    }
    catch (errors) {
      alert(errors);
    }
  }

  return (
    <View style={styles.container}>
      <Button
        styleContainer={styles.buttonStyle}
        title={recording ? "Stop Recording" : "Start Recording"}
        onPress={recording ? stopRecording : startRecording}
      />
      {/* <View style={styles.micContainer}>
        <MaterialCommunityIcons name="microphone" size={250} color="#fff784" />
      </View> */}
      {/* <TouchableOpacity onPress={() => handlePress()}>
        <Image style={{ marginTop: 150 }} source={mic} />
      </TouchableOpacity> */}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
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
