import React, { Component } from "react";
import { StyleSheet, Text, View, ScrollView } from "react-native";
import * as api from "../utils/api";
import ErrorAlerter from "../components/ErrorAlerter";
import Loader from "../components/Loader";
import UserMenuCard from "../components/UserMenuCard";

class SingleVendor extends Component {
  state = {
    menuItems: [],
    isLoading: true
  };

  componentDidMount() {
    api
      .fetchMenuItemsByVendor(
        this.props.navigation.state.params.vendor.username
      )
      .then(menuItems => {
        this.setState({ menuItems: menuItems, isLoading: false });
      })
      .catch(err => {
        ErrorAlerter("Menu items could not be found");
      });
  }

  render() {
    const {
      businessname,
      opening_times,
      cuisine,
      email,
      phone_num,
      open_status
    } = this.props.navigation.state.params.vendor;

    const open = open_status ? "Open" : "Closed";
    const { menuItems, isLoading } = this.state;
    if (isLoading) return <Loader />;

    return (
      <ScrollView contentContainerStyle={styles.container}>
        <View style={styles.vendorDetailsContainer}>
          <Text>{businessname}</Text>
          <Text>{cuisine}</Text>
          <Text>{open}</Text>
          <Text>Opening Times: {opening_times}</Text>
          <Text>Phone: {phone_num}</Text>
          <Text>E-mail: {email}</Text>
        </View>
        <View style={styles.menuItemsContainer}>
          {menuItems.map(menuItem => {
            return (
              <UserMenuCard key={menuItem.menu_item_id} menuItem={menuItem} />
            );
          })}
        </View>
      </ScrollView>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
    alignItems: "center",
    justifyContent: "center"
  },
  vendorDetailsContainer: {
    flex: 1,
    flexDirection: "column",
    alignItems: "center"
  },
  menuItemsContainer: {
    flex: 3,
    justifyContent: "flex-start",
    paddingLeft: 20,
    paddingRight: 20
  }
});

export default SingleVendor;
