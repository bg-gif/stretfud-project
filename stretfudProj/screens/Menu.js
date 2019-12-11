import React, { Component } from "react";
import { StyleSheet, Text, TouchableOpacity, Image, View } from "react-native";
import * as api from "../utils/api";
import InputAdder from "../components/InputAdder";
import Loader from "../components/Loader";
import ErrorAlerter from "../components/ErrorAlerter";
import VendorMenuCard from "../components/VendorMenuCard";

class Menu extends Component {
  state = {
    menuItems: [
      {
        item: "Beef Steak",
        price: 13,
        description: "a steak of beef",
        available: true
      },
      {
        item: "Cauliflower Steak",
        price: 10,
        description: "a steak of cauliflower",
        available: true,
        vegetarian: true,
        vegan: true
      },
      {
        item: "Chicken Steak",
        price: 11.5,
        description: "a steak of chicken",
        available: true,
        glutenFree: true
      }
    ],
    isLoading: true
  };

  handleSwitch = name => {
    const updatedMenu = this.state.menuItems.map(
      ({ item, available, ...rest }) => {
        if (item === name) available = !available;
        return { item, available, ...rest };
      }
    );
    this.setState({ menuItems: updatedMenu });
  };

  render() {
    const { menuItems, isLoading } = this.state;
    //if (isLoading) return <Loader />;
    console.log(this.props.navigation.state.params.username);
    return (
      <View style={styles.menuPageContainer}>
        <Text>Menu Items</Text>
        {menuItems.map(item => {
          return (
            <VendorMenuCard
              key={item.item}
              menuItem={item}
              handleSwitch={this.handleSwitch}
            />
          );
        })}
      </View>
    );
  }
}

const styles = StyleSheet.create({
  menuPageContainer: {
    flex: 1,
    backgroundColor: "rgb(243, 202, 203)",
    alignItems: "center",
    justifyContent: "center"
  }
});

export default Menu;
