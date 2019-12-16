import React, { Component } from "react";
import { StyleSheet, Text, View, ScrollView } from "react-native";
import * as api from "../utils/api";
import ErrorAlerter from "../components/ErrorAlerter";
import Loader from "../components/Loader";
import UserMenuCard from "../components/UserMenuCard";
import ShoppingCartViewer from "../components/ShoppingCartViewer";
import { TouchableOpacity } from "react-native-gesture-handler";

class SingleVendor extends Component {
  static navigationOptions = ({ navigationOptions, navigation }) => {
    return {
      title: navigation.state.params.vendor.businessname,
      headerRight: () => (
        <ShoppingCartViewer
          navigation={navigation}
          count={navigation.getParam("cartParam")}
          vendor={navigation.state.params.vendor.username}
        />
      )
    };
  };

  state = {
    menuItems: [],
    isLoading: true,
    cart: []
  };

  componentDidMount() {
    api
      .fetchMenuItemsByVendor(
        this.props.navigation.state.params.vendor.username
      )
      .then(menuItems => {
        this.setState({ menuItems: menuItems, isLoading: false });
      })
      .then(() => {
        this.props.navigation.setParams({ cartParam: this.state.cart });
      })
      .catch(err => {
        ErrorAlerter("Menu items could not be found");
      });
  }

  componentDidUpdate(prevProps, prevState) {
    if (prevState.cart !== this.state.cart) {
      this.props.navigation.setParams({ cartParam: this.state.cart });
    }
  }

  addItem = newItemObj => {
    this.setState(currentState => {
      return { cart: [newItemObj, ...currentState.cart] };
    });
  };

  render() {
    const {
      businessname,
      opening_times,
      cuisine,
      email,
      phone_num,
      open_status,
      username
    } = this.props.navigation.state.params.vendor;

    const open = open_status ? "Open" : "Closed";
    const { menuItems, isLoading } = this.state;
    if (isLoading) return <Loader />;

    const availableItems = menuItems.filter(item => {
      if (item.available) return item;
    });
    return (
      <View style={{ flex: 1 }}>
        <ScrollView
          contentContainerStyle={styles.container}
          pagingEnabled={true}
        >
          <View style={styles.vendorDetailsContainer}>
            <Text style={styles.businessHeaderText}>{businessname}</Text>
            <Text style={styles.detailText}>{cuisine}</Text>
            <Text style={styles.detailText}>
              Opening Times: {opening_times}
            </Text>
            <Text style={styles.detailText}>Phone: {phone_num}</Text>
            <Text style={styles.detailText}>E-mail: {email}</Text>
          </View>
          <View>
            <Text style={open_status ? styles.open : styles.closed}>
              {open}
            </Text>
          </View>
          <View style={styles.menuItemsContainer}>
            {availableItems.map(availableItem => {
              return (
                <TouchableOpacity
                  key={availableItem.menu_item_id}
                  onPress={() => {
                    this.addItem(availableItem);
                  }}
                >
                  <UserMenuCard menuItem={availableItem} />
                </TouchableOpacity>
              );
            })}
          </View>
        </ScrollView>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flexGrow: 1,
    backgroundColor: "#fff",
    alignItems: "center",
    justifyContent: "center",
    padding: 8
  },
  vendorDetailsContainer: {
    flex: 1,
    flexDirection: "column",
    justifyContent: "space-around",
    borderRadius: 5,
    textAlign: "left",
    padding: 10,
    paddingRight: 15,
    backgroundColor: "rgba(112, 150, 36, 1)"
  },
  menuItemsContainer: {
    flex: 3,
    justifyContent: "flex-start",
    padding: 20,
    paddingTop: 25
  },
  detailText: {
    color: "white",
    fontFamily: "BebasNeue-Regular",
    fontSize: 17,
    paddingLeft: 10
  },
  businessHeaderText: {
    color: "white",
    fontFamily: "BebasNeue-Regular",
    fontSize: 30,
    paddingLeft: 10
  },
  open: {
    marginTop: 5,
    color: "rgba(112, 150, 36, 1)",
    fontFamily: "BebasNeue-Regular",
    fontSize: 25,
    backgroundColor: "rgb(202, 232, 189)",
    padding: 5,
    paddingBottom: 3,
    borderRadius: 5,
    borderColor: "rgba(112, 150, 36, 1)",
    borderWidth: 2
  },
  closed: {
    marginTop: 5,
    color: "rgba(175, 15, 103, 1)",
    fontFamily: "BebasNeue-Regular",
    fontSize: 25,
    backgroundColor: "rgb(243, 202, 203)",
    padding: 5,
    paddingBottom: 3,
    borderRadius: 5,
    borderColor: "rgba(175, 15, 103, 1)",
    borderWidth: 2
  }
});

export default SingleVendor;
