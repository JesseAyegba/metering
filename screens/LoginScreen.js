import React, { useState, useEffect } from "react";
import {
  View,
  Text,
  TextInput,
  StyleSheet,
  StatusBar,
  KeyboardAvoidingView,
} from "react-native";
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

  // function that signs a user into
  // the application
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
      <KeyboardAvoidingView style={styles.container}>
        <StatusBar style="light" />
        <Text style={styles.header}>Secure Login</Text>
        <View style={styles.inputContainer}>
          <TextInput
            onChangeText={(email) => setEmail(email)}
            style={styles.input}
            placeholder="Email"
            placeholderTextColor="gray"
            type="email"
            value={email}
          />
          <TextInput
            onChangeText={(password) => setPassword(password)}
            style={styles.input}
            placeholder="Password"
            placeholderTextColor="gray"
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
        <Text style={{ color: "white", marginBottom: 20 }}>Or</Text>
        <Button
          onPress={() => navigation.replace("Register")}
          containerStyle={styles.button}
          title="Register"
          type="outline"
        />
      </KeyboardAvoidingView>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
    backgroundColor: "#04040D",
  },
  header: {
    fontSize: 35,
    fontWeight: "bold",
    color: "white",
    marginBottom: 15,
  },
  input: {
    width: 350,
    fontSize: 18,
    fontWeight: "bold",
    marginBottom: 22,
    borderBottomWidth: 2,
    borderTopWidth: 2,
    borderLeftWidth: 2,
    borderRightWidth: 2,
    borderRadius: 10,
    borderColor: "gray",
    padding: 10,
    height: 60,
    color: "white",
  },
  button: {
    width: 350,
    marginBottom: 30,
    marginTop: 10,
    borderRadius: 10,
  },
});
