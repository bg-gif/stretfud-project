import React, { Component } from "react";
import { Button, Platform } from "react-native";

class BackMover extends Component {
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
        title="Back"
        color="white"
        onPress={() => {
          this.props.navigation.goBack();
        }}
      />
    );
  }
}

export default BackMover;
