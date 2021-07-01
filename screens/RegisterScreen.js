import React, { useState, useEffect } from "react";
import {
  View,
  Text,
  StyleSheet,
  TextInput,
  KeyboardAvoidingView,
} from "react-native";
import { Button } from "react-native-elements";
import { auth, db } from "../firebase";
import { StatusBar } from "expo-status-bar";
import { useSelector, useDispatch } from "react-redux";
import { loaderActive, loaderInActive } from "../store/actions/loaderAction";
import Activity from "../components/Activity";
import HeaderIcon from "../components/HeaderIcon";
import { Feather } from "@expo/vector-icons";

export default function RegisterScreen({ navigation }) {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  let activity = useSelector((globalState) => globalState.loaderReducer);
  let dispatch = useDispatch();

  // Function that creates a new account in firebase
  // auth
  const register = async () => {
    dispatch(loaderActive());
    try {
      const userCredential = await auth.createUserWithEmailAndPassword(
        email.trim(),
        password
      );
      userCredential.user.updateProfile({
        displayName: name,
      });
      db.collection("users")
        .doc(userCredential.user.email)
        .set({
          displayName: name,
          email: userCredential.user.email,
          isAdmin: false,
          isSuperUser: false,
          isOwner: false,
          dateJoined: new Date(),
        })
        .then(() => {
          dispatch(loaderInActive());
          alert("Your account was successfully created");
        })
        .catch((error) => {
          dispatch(loaderInActive());
          alert(error.message);
        });
    } catch (error) {
      dispatch(loaderInActive());
      alert(error.message);
    }
  };

  // useEffect responsible for changing the screen title
  // when the component mounts
  useEffect(() => {
    navigation.setOptions({
      title: "",
      headerLeft: () => (
        <HeaderIcon
          eventHandler={goBacktoLogin}
          myStyle={{ marginLeft: 30, width: 30 }}
          icon={<Feather name="arrow-left" size={24} color="white" />}
        />
      ),
    });
  }, []);

  // useEffect responsible for navigating to the record
  // screen when a user's account is successfully created
  // and the user is authenticated
  useEffect(() => {
    auth.onAuthStateChanged((user) => {
      if (user) {
        dispatch(loaderInActive());
        navigation.replace("Record");
      }
    });
  });

  const goBacktoLogin = () => {
    navigation.replace("Login");
  };

  if (activity) {
    return <Activity text="Creating your account" />;
  } else {
    return (
      <KeyboardAvoidingView style={styles.container}>
        <StatusBar style="light" />
        <Text style={styles.header}>Register</Text>
        <View style={styles.inpuContainer}>
          <TextInput
            style={styles.input}
            placeholder="Full Name"
            placeholderTextColor="gray"
            type="text"
            onChangeText={(name) => setName(name)}
            value={name}
          />
          <TextInput
            style={styles.input}
            placeholder="Email"
            placeholderTextColor="gray"
            type="email"
            onChangeText={(email) => setEmail(email)}
            value={email}
          />
          <TextInput
            style={styles.input}
            placeholder="Password"
            placeholderTextColor="gray"
            type="password"
            secureTextEntry
            onChangeText={(password) => setPassword(password)}
            value={password}
            onSubmitEditing={() => register()}
          />
          <Button
            onPress={() => register()}
            containerStyle={styles.button}
            title="Register"
          />
        </View>
      </KeyboardAvoidingView>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
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
    marginTop: 10,
    marginBottom: 10,
    borderRadius: 10,
    fontWeight: "bold",
  },
});
