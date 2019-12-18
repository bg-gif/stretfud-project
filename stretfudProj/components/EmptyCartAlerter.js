import React from "react";
import { View, Text, StyleSheet } from "react-native";

const EmptyCartAlerter = () => {
  return (
    <View style={styles.container}>
      <Text style={styles.text}>Cart is empty</Text>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center"
  },
  text: {
    color: "rgba(112, 150, 36, 1)",
    fontFamily: "BebasNeue-Regular",
    fontSize: 50
  }
});

export default EmptyCartAlerter;
