import React, { useState } from "react";
import { View, Text, StyleSheet, TextInput } from "react-native";
import { Button } from "react-native-elements";

export default function RegisterScreen({ navigation }) {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const register = () => {
    alert("Yay you just submitted something");
  };

  return (
    <View style={styles.container}>
      <Text style={styles.header}>Register</Text>
      <View style={styles.inpuContainer}>
        <TextInput
          style={styles.input}
          placeholder="Full Name"
          type="text"
          onChangeText={(name) => setName(name)}
          value={name}
        />
        <TextInput
          style={styles.input}
          placeholder="Email"
          type="email"
          onChangeText={(email) => setEmail(email)}
          value={email}
        />
        <TextInput
          style={styles.input}
          placeholder="Password"
          type="password"
          secureTextEntry
          onChangeText={(password) => setPassword(password)}
          value={password}
          onSubmitEditing={() => register()}
        />
        <Button
          onPress={() => register()}
          containerStyle={styles.button}
          title="REGISTER"
        />
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
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
