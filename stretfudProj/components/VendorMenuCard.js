import React from "react";
import { View, Text, StyleSheet, Switch } from "react-native";

const VendorMenuCard = ({ menuItem, handleSwitch }) => {
  const handleAvailability = () => {
    handleSwitch(menuItem.item);
  };

  return (
    <View>
      <Text>
        {menuItem.item} £{menuItem.price}
      </Text>
      <Text>{menuItem.description}</Text>
      <Text>{menuItem.available}</Text>
      <Switch
        onValueChange={handleAvailability}
        name={menuItem.item}
        value={menuItem.available}
      />
    </View>
  );
};

export default VendorMenuCard;
