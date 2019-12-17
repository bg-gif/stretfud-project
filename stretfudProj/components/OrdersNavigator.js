import React from "react";
import { Platform, Button } from "react-native";

class OrdersNavigator extends React.Component {
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
        title="Orders"
        color={Color}
        onPress={() => {
          this.props.navigation.navigate("UserOrders");
        }}
      />
    );
  }
}
export default OrdersNavigator;
