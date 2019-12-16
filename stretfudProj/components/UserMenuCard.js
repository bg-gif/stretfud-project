import React from "react";
import { View, Text, StyleSheet } from "react-native";

const UserMenuCard = ({ menuItem }) => {
  const {
    available,
    description,
    gluten_free,
    name,
    price,
    vegan,
    vegetarian
  } = menuItem;
  return (
    <View style={styles.userMenuCardContainer}>
      {available === true && (
        <View>
          <View style={styles.menuItemHeader}>
            <Text style={styles.menuItemHeaderText}>{name}</Text>
            <Text style={styles.menuItemHeaderText}>£{price}</Text>
          </View>
          <View style={styles.descriptionContainer}>
            <Text style={styles.menuDescriptionText}>{description}</Text>
            <View style={styles.dietaryRequirementContainer}>
              {gluten_free && (
                <Text style={styles.menuDescriptionText}>GF</Text>
              )}
              {vegetarian && <Text style={styles.menuDescriptionText}>V</Text>}
              {vegan && <Text style={styles.menuDescriptionText}>VG</Text>}
            </View>
          </View>
        </View>
      )}
    </View>
  );
};

export default UserMenuCard;

const styles = StyleSheet.create({
  userMenuCardContainer: {
    flexDirection: "column",
    justifyContent: "flex-start",
    borderColor: "rgba(112, 150, 36, 1)",
    borderRadius: 5,
    borderWidth: 4,
    marginBottom: 15
  },
  menuItemHeader: {
    flexDirection: "row",
    backgroundColor: "rgba(112, 150, 36, 1)",
    justifyContent: "space-between",
    alignItems: "center",
    paddingLeft: 5,
    paddingRight: 5
  },
  menuItemHeaderText: {
    color: "white",
    fontFamily: "BebasNeue-Regular",
    fontSize: 25
  },
  menuDescriptionText: {
    fontFamily: "BebasNeue-Regular",
    fontSize: 17,
    color: "rgba(112, 150, 36, 1)"
  },
  descriptionContainer: {
    flexDirection: "column",
    padding: 5
  },
  dietaryRequirementContainer: {
    flexDirection: "row",
    justifyContent: "space-evenly"
  }
});
