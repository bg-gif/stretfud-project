import React from "react";
import { TouchableOpacity, Text } from "react-native";

const StatusSetter = ({ handleStatus, openStatus }) => {
  return (
    <TouchableOpacity
      style={{
        alignItems: "center",
        backgroundColor: openStatus ? "green" : "red",
        padding: 10
      }}
      onPress={handleStatus}
    >
      <Text>{openStatus ? "OPEN" : "CLOSED"}</Text>
    </TouchableOpacity>
  );
};

export default StatusSetter;
