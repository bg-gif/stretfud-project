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
          <Text>
            {name} £{price}
          </Text>
          <Text>{description}</Text>
          {gluten_free && <Text>GF</Text>}
          {vegetarian && <Text>V</Text>}
          {vegan && <Text>VG</Text>}
        </View>
      )}
    </View>
  );
};

export default UserMenuCard;

const styles = StyleSheet.create({
  userMenuCardContainer: {
    flex: 1,
    justifyContent: "flex-start"
  }
});
