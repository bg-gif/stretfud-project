import React from "react";
import { Alert } from "react-native";

const OrderAlerter = () => {
  return Alert.alert(
    "Your order has been sent!",
    "Please visit the Order Page to keep up to date with the progess of your order."
  );
};

export default OrderAlerter;
