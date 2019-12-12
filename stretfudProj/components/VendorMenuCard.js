import React from "react";
import { View, Text, StyleSheet, Switch } from "react-native";

const VendorMenuCard = ({ menuItem, handleSwitch }) => {
  const handleAvailability = () => {
    handleSwitch(username, menu_item_id, available);
  };
  const {
    name,
    description,
    available,
    allergens,
    gluten_free,
    vegan,
    vegetarian,
    price,
    menu_item_id,
    username
  } = menuItem;

  return (
    <View style={styles.menuCard}>
      <View style={styles.menuDetails}>
        <Text>
          {name} £{price}
        </Text>
        <Text>{description}</Text>
        {gluten_free === true && <Text>GF</Text>}
        {vegan === true && <Text>VG</Text>}
        {vegetarian === true && <Text>V</Text>}
      </View>

      <View style={styles.availabilityButtonContainer}>
        <Text>Available:</Text>
        <Switch
          onValueChange={handleAvailability}
          name={menu_item_id}
          value={available}
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
