import React, { useState, useEffect } from "react";
import { View, Text, TextInput, StyleSheet, StatusBar } from "react-native";
import { Button } from "react-native-elements";

export default function LoginScreen({ navigation }) {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  return (
    <View style={styles.container}>
      <StatusBar style="light" />
      <Text style={styles.header}>Secure Login</Text>
      <View style={styles.inputContainer}>
        <TextInput
          onChangeText={(email) => setEmail(email)}
          style={styles.input}
          placeholder="Email"
          type="email"
          value={email}
        />
        <TextInput
          onChangeText={(password) => setPassword(password)}
          style={styles.input}
          placeholder="Password"
          secureTextEntry
          type="password"
          value={password}
        />
      </View>
      <Button containerStyle={styles.button} title="LOGIN" />
      <Button
        onPress={() => navigation.navigate("Register")}
        containerStyle={styles.button}
        title="REGISTER"
        type="outline"
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
  },
  header: {
    fontSize: 45,
    color: "#04040D",
    marginBottom: 15,
  },
  input: {
    width: 300,
    fontSize: 18,
    marginBottom: 22,
    borderBottomWidth: 2,
    borderTopWidth: 2,
    borderLeftWidth: 2,
    borderRightWidth: 2,
    borderRadius: 4,
    borderColor: "gray",
    padding: 10,
    height: 60,
  },
  button: {
    width: 300,
    marginBottom: 10,
  },
});
