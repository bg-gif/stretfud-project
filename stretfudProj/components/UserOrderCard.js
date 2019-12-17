import React from "react";
import { View, Text, StyleSheet } from "react-native";
import * as utils from "../utils/utils";

const UserOrderCard = ({ order }) => {
  if (order.status === "collected") return null;
  return (
    <View style={styles.orderContainer}>
      <View style={styles.orderName}>
        <Text style={styles.nameText}>{order.name}</Text>
      </View>
      <View style={styles.detailConainter}>
        <Text style={styles.dateText}>
          {utils.formatDate(order.created_at)}
        </Text>
        <Text style={styles.statusText}>{order.status}</Text>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  orderContainer: {
    flexDirection: "column",
    justifyContent: "center",
    borderColor: "rgba(112, 150, 36, 1)",
    borderRadius: 5,
    borderWidth: 4,
    margin: 15
  },
  orderName: {
    backgroundColor: "rgba(112, 150, 36, 1)",
    alignItems: "center"
  },
  nameText: {
    color: "white",
    fontFamily: "BebasNeue-Regular",
    fontSize: 25
  },
  detailConainter: {
    alignItems: "center"
  },
  statusText: {
    color: "rgba(112, 150, 36, 1)",
    fontFamily: "BebasNeue-Regular",
    fontSize: 20,
    padding: 3
  },
  dateText: {
    color: "rgba(112, 150, 36, 1)",
    fontFamily: "BebasNeue-Regular",
    fontSize: 15
  }
});

export default UserOrderCard;
