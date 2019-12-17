import React from "react";
import { View, Text, TouchableOpacity, StyleSheet } from "react-native";
import InputAdder from "./InputAdder";
import * as Crypto from "expo-crypto";
import UserContext, { UserProvider } from "./UserContext";
import * as api from "../utils/api";
import ErrorAlerter from "./ErrorAlerter";

class SignInForm extends React.Component {
  state = {
    username: "",
    password: "",
    isEmpty: false
  };

  handleTextChange = (value, key) => {
    this.setState({ [key]: value, isEmpty: false });
  };

  handlePress = () => {
    const { signInType, navigation } = this.props;
    const { username, password } = this.state;
    const destination =
      signInType === "user" ? "UserHomePage" : "VendorHomePage";
    if (!username || !password) {
      return this.setState({ isEmpty: true });
    }
    Crypto.digestStringAsync("SHA-1", password).then(hashedPassword => {
      UserContext.username = username;
      api
        .postLoginAuth({ username, password: hashedPassword }, signInType)
        .then(varification => {
          if (varification.msg === "Verified") {
            navigation.navigate(destination);
          }
        })
        .catch(err => {
          ErrorAlerter("Username or Password is incorrect");
        });
    });
  };

  render() {
    const { username, password, isEmpty } = this.state;
    return (
      <UserProvider value={username}>
        <View style={styles.container}>
          <InputAdder
            isEmpty={isEmpty}
            name="username"
            handleTextChange={this.handleTextChange}
            value={username}
          />
          <InputAdder
            isEmpty={isEmpty}
            name="password"
            handleTextChange={this.handleTextChange}
            value={password}
          />
          {isEmpty && (
            <Text style={styles.missingTextWarning}>
              Please input Username or Password
            </Text>
          )}
          <View style={styles.buttonContainer}>
            <TouchableOpacity
              style={styles.signInButton}
              onPress={() => this.props.navigation.push("SignUp")}
              navigation={this.props.navigation}
            >
              <Text style={styles.buttonContent}>sign up</Text>
            </TouchableOpacity>
            <TouchableOpacity
              style={styles.signInButton}
              onPress={this.handlePress}
            >
              <Text style={styles.buttonContent}>sign in</Text>
            </TouchableOpacity>
          </View>
        </View>
      </UserProvider>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 0.4,
    flexDirection: "column",
    alignItems: "center",

    justifyContent: "space-around"
  },
  signInButton: {
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
  },
  buttonContainer: {
    flexDirection: "row",
    justifyContent: "space-around",
    alignSelf: "stretch"
  }
});

export default SignInForm;
