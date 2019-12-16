import React, { Component } from 'react';
import {
  StyleSheet,
  Text,
  ScrollView,
  Image,
  View,
  Dimensions,
  SafeAreaView
} from 'react-native';
import * as api from '../utils/api';

import Loader from '../components/Loader';
import ErrorAlerter from '../components/ErrorAlerter';

import VendorMenuCard from '../components/VendorMenuCard';
// import { SafeAreaView } from 'react-navigation';
import Constants from 'expo-constants';

class Menu extends Component {
  static navigationOptions = ({ navigationOptions }) => {
    return {
      title: 'Menu'
    };
  };

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
      <SafeAreaView style={styles.container}>
        <ScrollView contentContainerStyle={styles.menuPageContainer}>
          <View>
            {menuItems.map(item => {
              return (
                <VendorMenuCard
                  key={item.name}
                  menuItem={item}
                  handleSwitch={this.handleSwitch}
                />
              );
            })}
          </View>
        </ScrollView>
      </SafeAreaView>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    marginTop: Constants.statusBarHeight
  },
  menuPageContainer: {
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'space-around'
  },
  headerText: {
    color: 'white',
    fontFamily: 'BebasNeue-Regular',
    fontSize: 25,
    textAlign: 'center'
  }
});

export default Menu;
