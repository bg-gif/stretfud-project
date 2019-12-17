import React, { Component } from "react";
import {
  View,
  Text,
  StyleSheet,
  Switch,
  Dimensions,
  ScrollView
} from "react-native";
import { TouchableOpacity } from "react-native-gesture-handler";
import * as api from "../utils/api";

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
    api.updateStatus(orderStatus, orderId).then(response => {
      this.props.refresh();
      console.log(response);
    });
  };

  render() {
    const order = this.props.order;
    const orderStatus = order[0].status;
    return (
      <View style={styles.menuCard}>
        <Text>Customer Name: {order[0].user_username}</Text>
        <Text>Status: {orderStatus}</Text>
        {order.map((item, index) => {
          return <Text key={index}>{item.name}</Text>;
        })}
        <TouchableOpacity onPress={this.handleStatus}>
          <Text>Status: {orderStatus}</Text>
        </TouchableOpacity>
      </View>
    );
  }
}

export default OrderCard;

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
    padding: 5
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
  vendorStatusContainer: {
    flex: 1,
    flexDirection: "column",
    justifyContent: "space-evenly",
    alignItems: "center",
    height: 50
  },
  availabilityText: {
    fontFamily: "BebasNeue-Regular",
    fontSize: 17,
    color: "rgba(175, 15, 103, 1)"
  }
});
