import React, { Component } from "react";
import { View, Text, StyleSheet } from "react-native";
import { TouchableOpacity } from "react-native-gesture-handler";
import * as api from "../utils/api";
let socket = require("socket.io-client")(`ws://stretfud.herokuapp.com:80`);

class OrderCard extends Component {
  constructor() {
    super();
    this.state = {
      confirmed: false
    };
  }

  handleStatus = () => {
    const order = this.props.order;
    const orderStatus = order[0].status;
    const orderId = order[0].order_id;
    const vendor = order[0].vendor_username;
    const user = order[0].user_username;
    api.updateStatus(orderStatus, orderId).then(response => {
      this.props.refresh();
      socket.emit("incoming", { vendor, user });
    });
  };

  render() {
    const order = this.props.order;
    const orderStatus = order[0].status;
    if (orderStatus === 'collected') return null;
    return (
      <View style={styles.orderCard}>
        <TouchableOpacity onPress={this.handleStatus}>
          <View style={styles.orderDetails}>
            <Text style={styles.orderText}>
              Customer Name: {order[0].user_username}
            </Text>

            {order.map((item, index) => {
              return (
                <Text key={index} style={styles.orderText}>
                  {item.name}
                </Text>
              );
            })}
            <Text style={styles.statusText}>Status: {orderStatus}</Text>
          </View>
        </TouchableOpacity>
      </View>
    );
  }
}

export default OrderCard;

const styles = StyleSheet.create({
  orderCard: {
    flexDirection: "column",
    borderColor: "rgba(175, 15, 103, 1)",
    borderRadius: 5,
    borderWidth: 4,
    marginBottom: 15,
    marginTop: 15,
    alignItems: "center"
  },
  orderDetails: {
    alignItems: "center"
  },
  orderText: {
    fontFamily: "BebasNeue-Regular",
    fontSize: 17,
    color: "rgba(175, 15, 103, 1)"
  },
  statusText: {
    fontFamily: "BebasNeue-Regular",
    fontSize: 22,
    color: "rgba(175, 15, 103, 1)"
  }
});
