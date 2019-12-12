
import React, { Component } from 'react';
import {
  StyleSheet,
  Text,
  TouchableOpacity,
  Image,
  View,
  Dimensions
} from 'react-native';
import * as api from '../utils/api';

import Loader from '../components/Loader';
import ErrorAlerter from '../components/ErrorAlerter';

import VendorMenuCard from "../components/VendorMenuCard";

class Menu extends Component {
  state = {
    menuItems: [],
    isLoading: true
  };

  componentDidMount() {

    api
      .fetchMenuItemsByVendor(this.props.navigation.state.params.username)
      .then(menuItems => {
        this.setState({ menuItems: menuItems, isLoading: false });
      })
      .catch(err => {
        ErrorAlerter("Menu items could not be found");
      });
  }

  handleSwitch = (username, menu_item_id, available) => {
    let newStatus = !available;
    newStatus = newStatus.toString();
    api
      .updateMenuItem({ username, menu_item_id, available: newStatus })
      .then(menuObj => {
        const updatedMenu = this.state.menuItems.map(
          ({ menu_item_id, available, ...rest }) => {
            if (menu_item_id === menuObj.menu_item_id)
              available = menuObj.available;
            return { menu_item_id, available, ...rest };
          }
        );
        this.setState({ menuItems: updatedMenu });
      });

  };

  render() {
    const { menuItems, isLoading } = this.state;

    if (isLoading) return <Loader />;
    return (

      <View style={styles.menuPageContainer}>
        <Text>{this.props.navigation.state.params.username}'s Menu Items</Text>
        {menuItems.map(item => {
          return (
            <VendorMenuCard
              key={item.name}
              menuItem={item}
              handleSwitch={this.handleSwitch}
            />
          );
        })}
        <Text>Please ask about allergen information</Text>

      </View>
    );
  }
}

const styles = StyleSheet.create({
  menuPageContainer: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'space-around'
  },
  menuImage: {
    width: Dimensions.get('window').width,
    height: 300
  },
  changeMenuButton: {
    alignItems: 'center',
    backgroundColor: 'rgba(112, 150, 36, 1)',
    width: 200,
    padding: 10,
    borderRadius: 5
  },
  inputStyle: {
    backgroundColor: 'rgba(175, 15, 103, 1)',
    borderRadius: 5,
    width: Dimensions.get('window').width - 20,
    padding: 15
  },
  vendorButtonText: {
    color: 'white',
    fontFamily: 'BebasNeue-Regular',
    fontSize: 20
  }
});

export default Menu;
