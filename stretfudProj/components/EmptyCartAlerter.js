import React from "react";
import { View, Text, StyleSheet } from "react-native";

const EmptyCartAlerter = () => {
  return (
    <View style={styles.container}>
      <Text>Cart is empty</Text>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    justifyContent: "center",
    alignItems: "center"
  }
});

export default EmptyCartAlerter;
