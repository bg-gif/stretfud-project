import React from "react";
import { View, Text, StyleSheet, Switch, Dimensions } from "react-native";

const VendorMenuCard = ({ menuItem, handleSwitch, handleDeleteItem }) => {
  const handleAvailability = () => {
    handleSwitch(username, menu_item_id, available);
  };
  const {
    name,
    description,
    available,
    gluten_free,
    vegan,
    vegetarian,
    price,
    menu_item_id,
    username
  } = menuItem;

  removeItem = () => {
    Alert.alert("Delete Item", "Are you sure you want to remove this item?", [
      {
        text: "Yes",
        onPress: () => {
          handleDeleteItem(menu_item_id);
        }
      },
      {
        text: "No"
      }
    ]);
  };

  return (
    <View style={styles.menuCard}>
      <View style={styles.menuItemHeader}>
        <Text style={styles.menuItemHeaderText}>{name}</Text>
        <Text style={styles.menuItemHeaderText}>£{price}</Text>
      </View>
      <View style={styles.menuDetails}>
        <View style={styles.detailsContainer}>
          <Text style={styles.descriptionText}>{description}</Text>
          <View style={styles.dietaryRequirementsContainer}>
            {gluten_free === true && (
              <Text style={styles.descriptionText}>GF </Text>
            )}
            {vegan === true && <Text style={styles.descriptionText}>VG </Text>}
            {vegetarian === true && (
              <Text style={styles.descriptionText}>V </Text>
            )}
          </View>
        </View>
        <View style={styles.optionsContainer}>
          <View style={styles.availabilityButtonContainer}>
            <Text style={styles.availabilityText}>Available: </Text>
            <Switch
              onValueChange={handleAvailability}
              name={menu_item_id}
              value={available}
            />
          </View>
          <TouchableOpacity
            name={menu_item_id}
            onPress={this.removeItem}
            style={styles.vendorButton}
          >
            <Text style={styles.vendorButtonText}>Remove</Text>
          </TouchableOpacity>
        </View>
      </View>
    </View>
  );
};

export default VendorMenuCard;

const styles = StyleSheet.create({
  menuCard: {
    flexDirection: "column",
    borderColor: "rgba(175, 15, 103, 1)",
    borderRadius: 5,
    borderWidth: 4,
    marginBottom: 15,
    marginTop: 15
  },
  menuDetails: {
    flexDirection: "row"
  },
  detailsContainer: {
    flex: 2,
    padding: 5,
    flexDirection: "column",
    justifyContent: "space-between"
  },
  availabilityButtonContainer: {
    flex: 1,
    flexDirection: "row",
    justifyContent: "flex-end",
    alignItems: "center",
    paddingRight: 10
  },
  menuItemHeader: {
    flexDirection: "row",
    backgroundColor: "rgba(175, 15, 103, 1)",
    justifyContent: "space-between",
    alignItems: "center",
    paddingRight: 5,
    paddingLeft: 5,
    width: Dimensions.get("window").width - 30
  },
  menuItemHeaderText: {
    color: "white",
    fontFamily: "BebasNeue-Regular",
    fontSize: 25
  },
  descriptionText: {
    fontFamily: "BebasNeue-Regular",
    fontSize: 17,
    color: "rgba(175, 15, 103, 1)"
  },
  availabilityText: {
    fontFamily: "BebasNeue-Regular",
    fontSize: 17,
    color: "rgba(175, 15, 103, 1)"
  }
});
