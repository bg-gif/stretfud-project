import React from "react";
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  KeyboardAvoidingView
} from "react-native";
import InputAdder from "./InputAdder";
import { ScrollView } from "react-native-gesture-handler";
import * as api from "../utils/api";
import ErrorAlerter from "./ErrorAlerter";
import * as Crypto from "expo-crypto";
import SignUpAlerter from "./SignUpAlerter";

class UserSignUpForm extends React.Component {
  state = {
    username: "",
    fullName: "",
    email: "",
    age: null,
    phoneNumber: "",
    password: "",
    confirmPassword: "",
    isEmpty: false
  };

  handleTextChange = (value, key) => {
    this.setState({ [key]: value, isEmpty: false });
  };

  handlePress = () => {
    const {
      username,
      fullName,
      email,
      age,
      phoneNumber,
      password,
      confirmPassword
    } = this.state;

    if (password !== confirmPassword) {
      ErrorAlerter("Password inputs did not match");
    } else if (!username || !password) {
      this.setState({ isEmpty: true });
    } else if (!fullName) {
      this.setState({ isEmpty: true });
    } else {
      Crypto.digestStringAsync("SHA-1", password).then(hashedPassword => {
        api
          .addUser({
            username,
            realname: fullName,
            email,
            age: +age,
            password: hashedPassword,
            phone_num: phoneNumber
          })
          .then(() => {
            SignUpAlerter("You have successfully signed up!");
            this.props.navigation.goBack();
          })
          .catch(err => {
            ErrorAlerter("Sign Up could not take place");
          });
      });
    }
  };

  render() {
    const {
      username,
      fullName,
      email,
      age,
      phoneNumber,
      password,
      confirmPassword,
      isEmpty
    } = this.state;
    return (
      <View style={{ flex: 1 }}>
        <ScrollView contentContainerStyle={styles.container}>
          <KeyboardAvoidingView
            style={styles.inputContainer}
            behavior="position"
          >
            <InputAdder
              name="username"
              handleTextChange={this.handleTextChange}
              value={username}
            />
            <InputAdder
              name="fullName"
              handleTextChange={this.handleTextChange}
              value={fullName}
            />
            <InputAdder
              name="email"
              handleTextChange={this.handleTextChange}
              value={email}
            />
            <InputAdder
              name="phoneNumber"
              handleTextChange={this.handleTextChange}
              value={phoneNumber}
            />
            <InputAdder
              name="age"
              handleTextChange={this.handleTextChange}
              value={age}
            />
            <InputAdder
              name="password"
              handleTextChange={this.handleTextChange}
              value={password}
            />
            <InputAdder
              name="confirmPassword"
              handleTextChange={this.handleTextChange}
              value={confirmPassword}
            />
            {isEmpty && (
              <Text style={styles.missingTextWarning}>
                Username, Full Name and Password are required fields
              </Text>
            )}
            <TouchableOpacity
              style={styles.addButton}
              onPress={this.handlePress}
            >
              <Text style={styles.buttonContent}>add</Text>
            </TouchableOpacity>
          </KeyboardAvoidingView>
        </ScrollView>
      </View>
    );
  }
}

export default UserSignUpForm;

const styles = StyleSheet.create({
  container: {
    flexGrow: 1,
    backgroundColor: "rgba(112, 150, 36, 1)"
  },
  inputContainer: {
    flex: 1,
    flexDirection: "column",
    alignItems: "center",
    justifyContent: "space-around",
    padding: 8
  },
  addButton: {
    justifyContent: "center",
    alignItems: "center",
    width: 100,
    padding: 10,
    backgroundColor: "rgba(175, 15, 103, 1)",
    borderRadius: 5
  },
  buttonContent: {
    fontFamily: "BebasNeue-Regular",
    fontSize: 20,
    color: "rgb(237, 237, 237)"
  },
  missingTextWarning: {
    fontFamily: "BebasNeue-Regular",
    fontSize: 20,
    color: "rgba(198, 197, 185, 1)"
  }
});
