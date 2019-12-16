import React, { Component } from "react";
import { View, Text, TouchableOpacity, StyleSheet } from "react-native";
import { withUserHOC } from "../components/UserContext";
import * as api from "../utils/api";

//import EmptyCartAlerter from "../components/EmptyCartAlerter";

class ShoppingCart extends Component {
  handlePress = () => {
    const user = this.props.user.username;
    const vendor = this.props.navigation.state.params.vendor;
    const order_items = this.props.navigation.state.params.cartParam;
    const orderObj = { user, vendor, order_items: [...order_items] };
    console.log(orderObj);
  };

  render() {
    const cartArray = this.props.navigation.state.params.cartParam;
    const total = cartArray.reduce((acc, val) => {
      return { price: +acc.price + +val.price };
    });

    return (
      <View style={styles.orderContainer}>
        {cartArray.map((item, index) => {
          return (
            <View key={item.name + index} style={styles.itemContainer}>
              <Text style={styles.text}>{item.name} </Text>
              <Text style={styles.text}>£{item.price}</Text>
            </View>
          );
        })}
        <Text style={styles.text}>
          Total: £{Number.parseFloat(total.price).toFixed(2)}
        </Text>
        <TouchableOpacity
          onPress={this.handlePress}
          style={styles.submitOrderButton}
        >
          <Text style={styles.buttonText}>Submit Order</Text>
        </TouchableOpacity>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  orderContainer: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center"
  },
  itemContainer: {
    flexDirection: "row",
    justifyContent: "space-between",
    width: 300
  },
  submitOrderButton: {
    alignItems: "center",
    backgroundColor: "rgba(175, 15, 103, 1)",
    width: 200,
    padding: 10,
    borderRadius: 5
  },
  buttonText: {
    color: "white",
    fontFamily: "BebasNeue-Regular",
    fontSize: 20
  },
  text: {
    color: "rgba(112, 150, 36, 1)",
    fontFamily: "BebasNeue-Regular",
    fontSize: 20
  }
});

export default withUserHOC(ShoppingCart);
