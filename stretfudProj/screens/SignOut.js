import React from "react";
import { StyleSheet, Text, View, Button, Platform } from "react-native";

class SignOut extends React.Component {
  render() {
    const platform = Platform.OS;
    let Color = "";
    androidColor =
      this.props.user === "user"
        ? "rgba(175, 15, 103, 1)"
        : "rgba(112, 150, 36, 1)";
    iPhoneColor = "rgb(237, 237, 237)";
    platform === "android" ? (Color = androidColor) : (Color = iPhoneColor);

    return (
      <Button
        onPress={() => {
          this.props.navigation.navigate("SignIn");
        }}
        title="Sign Out"
        color={Color}
      ></Button>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,

    color: "white",
    alignItems: "center",
    justifyContent: "center"
  }
});

export default SignOut;
