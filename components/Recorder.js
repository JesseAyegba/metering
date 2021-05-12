import React, { useState } from "react";
import { Text, View, StyleSheet, Image, TouchableOpacity } from "react-native";
import { Audio } from "expo-av";
import mic from "../assets/mic.png";
import { storage, auth, db } from "../firebase";

export default function Recorder() {
  const [recording, setRecording] = useState();

  const createUploadRecord = async (fileName, audioUrl) => {
    const currentUserEmail = auth.currentUser.email;

    try {
      await db
        .collection("users")
        .doc(currentUserEmail)
        .collection("audioRecordings")
        .doc(fileName)
        .set({
          fileName: fileName,
          audioUrl: audioUrl,
          date: new Date(),
        });

      alert("Audio upload was successful");
    } catch (errors) {
      alert("Audio Record creation was not successful");
    }
  };

  // Function responsible for uploading
  // recorded audio to the cloud
  //  and returning the audio link

  const uploadAudio = async (uri) => {
    try {
      const response = await fetch(uri);
      const blob = await response.blob();
      const randomString = Math.random().toString(36).substring(7);
      const todaysDate = new Date()
        .toISOString()
        .slice(0, 10)
        .replace(/-/g, "");
      const storageRef = storage.ref();

      // Current logged in user

      const loggedInUserUsername = auth.currentUser.displayName;
      const loggedInUserUsernameCompressed = loggedInUserUsername
        .replace(/\s+/g, "")
        .trim();
      const audioFileName = `${loggedInUserUsernameCompressed}${todaysDate}${randomString}`;

      // Firebase storage Reference

      const audioRef = storageRef.child(`audio/${audioFileName}`);
      await audioRef.put(blob);

      const audioUrl = await audioRef.getDownloadURL();

      // Call the function that actually creates
      // the database record
      /////////////////////////////
      console.log(audioUrl);
      ///////////////////
      createUploadRecord(audioFileName, audioUrl);
    } catch (errors) {
      alert("Audio upload was not successful");
    }
  };

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

    // Start Upload to the Cloud

    uploadAudio(uri);
  }

  const handlePress = () => {
    if (recording) {
      stopRecording();
    } else {
      startRecording();
    }
  };

  return (
    <View style={styles.container}>
      {recording ? (
        <Text style={{ color: "white", fontSize: 18 }}>Recording</Text>
      ) : (
        <Text style={{ color: "white", fontSize: 18 }}>
          Tap to start recording
        </Text>
      )}
      <TouchableOpacity
        style={
          recording
            ? {
                ...styles.micContainer,
                borderColor: "red",
                width: 350,
                height: 350,
                borderRadius: 350,
                borderBottomWidth: 8,
                borderTopWidth: 8,
                borderLeftWidth: 8,
                borderRightWidth: 8,
              }
            : { ...styles.micContainer }
        }
        onPress={() => handlePress()}
      >
        <Image source={mic} />
      </TouchableOpacity>
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
    marginTop: 50,
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
