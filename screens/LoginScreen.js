import React, { useState, useEffect } from "react";
import { View, Text, TextInput, StyleSheet, StatusBar } from "react-native";
import { Button } from "react-native-elements";
import { auth } from "../firebase";
import { useSelector, useDispatch } from "react-redux";
import Activity from "../components/Activity";
import { loaderActive, loaderInActive } from "../store/actions/loaderAction";

export default function LoginScreen({ navigation }) {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  let activity = useSelector((globalState) => globalState.loaderReducer);
  let dispatch = useDispatch();

  // useEffect that controls navigation
  // when a user signs in
  useEffect(() => {
    auth.onAuthStateChanged((user) => {
      if (user) {
        navigation.replace("Record");
      }
    });
  }, [navigation]);

  // useEffect that removes the navigation header
  //  when the activity loader is in progress
  useEffect(() => {
    navigation.setOptions({
      title: activity ? "" : "Login",
    });
  }, [activity]);

  const signIn = async () => {
    const trimmedEmail = email.trim();
    
    try {
      dispatch(loaderActive());
      await auth.signInWithEmailAndPassword(trimmedEmail, password);
      dispatch(loaderInActive());
    } catch (error) {
      dispatch(loaderInActive());
      alert(error.message);
    }
  };

  if (activity) {
    return <Activity navigation={navigation} text="Signing in" />;
  } else {
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
            onSubmitEditing={() => signIn()}
          />
        </View>
        <Button
          onPress={() => signIn()}
          containerStyle={styles.button}
          title="Login"
        />
        <Button
          onPress={() => navigation.navigate("Register")}
          containerStyle={styles.button}
          title="Register"
          type="outline"
        />
      </View>
    );
  }
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
