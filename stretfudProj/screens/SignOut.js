import React from "react";
import { StyleSheet, Text, View, Button } from "react-native";

class SignOut extends React.Component {
  render() {
    return (
      <Button
        onPress={() => {
          this.props.navigation.navigate("SignIn");
        }}
        title="Sign Out"
        color="rgba(198, 197, 185, 1)"
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
