import React from "react";
import { TouchableOpacity, Text, StyleSheet } from "react-native";

const ItemRemover = ({ handleRemoval, item }) => {
  return (
    <TouchableOpacity
      style={styles.removerButton}
      onPress={() => {
        handleRemoval(item);
      }}
    >
      <Text style={styles.buttonText}>Remove</Text>
    </TouchableOpacity>
  );
};

styles = StyleSheet.create({
  removerButton: {
    alignItems: "center",
    backgroundColor: "rgba(175, 15, 103, 1)",
    width: 75,
    padding: 8,
    borderRadius: 5
  },
  buttonText: {
    color: "white",
    fontFamily: "BebasNeue-Regular",
    fontSize: 15
  }
});

export default ItemRemover;
