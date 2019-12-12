import React from "react";
import { View, Text, StyleSheet, Switch } from "react-native";

const VendorMenuCard = ({ menuItem, handleSwitch }) => {
  const handleAvailability = () => {
    handleSwitch(menuItem.item);
  };

  return (
    <View style={styles.menuCard}>
      <View style={styles.menuDetails}>
        <Text>
          {menuItem.item} £{menuItem.price}
        </Text>
        <Text>{menuItem.description}</Text>
        <Text>{menuItem.available}</Text>
      </View>

      <View style={styles.availabilityButtonContainer}>
        <Text>Available:</Text>
        <Switch
          onValueChange={handleAvailability}
          name={menuItem.item}
          value={menuItem.available}
        />
      </View>
    </View>
  );
};

export default VendorMenuCard;

const styles = StyleSheet.create({
  menuCard: {
    flex: 1,
    flexDirection: "row"
  },
  menuDetails: {
    justifyContent: "center",
    alignItems: "center",
    flex: 2
  },
  availabilityButtonContainer: {
    flex: 1,
    flexDirection: "row",
    justifyContent: "center",
    alignItems: "center",
    paddingRight: 20
  }
});
