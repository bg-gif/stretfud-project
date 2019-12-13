import React, { Component } from 'react';
import {
  StyleSheet,
  Text,
  ScrollView,
  Image,
  View,
  Dimensions
} from 'react-native';
import * as api from '../utils/api';

import Loader from '../components/Loader';
import ErrorAlerter from '../components/ErrorAlerter';

import VendorMenuCard from '../components/VendorMenuCard';

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
        ErrorAlerter('Menu items could not be found');
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
      <View style={{ flex: 1 }}>
        <ScrollView contentContainerStyle={styles.menuPageContainer}>
          <View style={styles.headerContainer}>
            <Text style={styles.headerText}>Menu Items</Text>
          </View>

          {menuItems.map(item => {
            return (
              <VendorMenuCard
                key={item.name}
                menuItem={item}
                handleSwitch={this.handleSwitch}
              />
            );
          })}
        </ScrollView>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  menuPageContainer: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'space-around',
    padding: 15
  },
  headerContainer: {
    backgroundColor: 'rgba(175, 15, 103, 1)',
    borderRadius: 5,
    padding: 5,
    marginBottom: 10
  },
  headerText: {
    color: 'white',
    fontFamily: 'BebasNeue-Regular',
    fontSize: 25
  }
});

export default Menu;
