import React from "react";
import { Button, Platform, Text, TouchableOpacity } from "react-native";

class ShoppingCartViewer extends React.Component {
  render() {
    const vendor = this.props.navigation.state.params.vendor.username;
    const count = this.props.navigation.state.params.cartParam;
    const platform = Platform.OS;
    let Color = "";
    androidColor =
      this.props.user === "user"
        ? "rgba(175, 15, 103, 1)"
        : "rgba(112, 150, 36, 1)";
    iPhoneColor = "rgb(237, 237, 237)";
    platform === "android" ? (Color = androidColor) : (Color = iPhoneColor);
    return (
      <TouchableOpacity
        onPress={() => {
          this.props.navigation.navigate("ShoppingCart", {
            cartParam: count,
            vendor
          });
        }}
      >
        <Text style={{ color: Color }}>
          Shopping Cart {count && count.length}
        </Text>
      </TouchableOpacity>
    );
  }
}

export default ShoppingCartViewer;
