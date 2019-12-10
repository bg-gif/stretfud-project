import React from "react";
import { Alert } from "react-native";

const ErrorAlerter = msg => {
  return Alert.alert("Oops...something went wrong :(", msg);
};

export default ErrorAlerter;
