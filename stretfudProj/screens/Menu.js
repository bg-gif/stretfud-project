import React, { Component } from 'react';
import {
  StyleSheet,
  ScrollView,
  View,
  SafeAreaView,
  KeyboardAvoidingView
} from 'react-native';
import * as api from '../utils/api';
import Loader from '../components/Loader';
import ErrorAlerter from '../components/ErrorAlerter';
import VendorMenuCard from '../components/VendorMenuCard';
import Constants from 'expo-constants';
import MenuItemAdder from '../components/MenuItemAdder';

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
    this.fetchMenuItems();
  }

  fetchMenuItems = () => {
    api
      .fetchMenuItemsByVendor(this.props.navigation.state.params.username)
      .then(menuItems => {
        this.setState({ menuItems: menuItems, isLoading: false });
      })
      .catch(err => {
        ErrorAlerter('Menu items could not be found');
      });
  };

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

  handleDeleteItem = menu_item_id => {
    const username = this.props.navigation.state.params.username;
    return api
      .deleteMenuItem(username, menu_item_id)
      .then(({ msg }) => {
        this.fetchMenuItems();
      })
      .catch(err => {
        ErrorAlerter(
          'deleting Menu Items isnt working right now, please try again later'
        );
      });
  };

  handleAddItem = newMenuItem => {
    const { menuItems } = this.state;
    this.setState({ menuItems: [newMenuItem, ...menuItems] });
  };

  render() {
    const { menuItems, isLoading } = this.state;
    const username = this.props.navigation.state.params.username;

    if (isLoading) return <Loader />;
    return (
      <SafeAreaView style={styles.container}>
        <ScrollView contentContainerStyle={styles.menuPageContainer}>
          <KeyboardAvoidingView behavior="padding">
            <View>
              {menuItems.map(item => {
                return (
                  <VendorMenuCard
                    key={item.menu_item_id}
                    menuItem={item}
                    handleSwitch={this.handleSwitch}
                    handleDeleteItem={this.handleDeleteItem}
                  />
                );
              })}
            </View>
            <View style={{ paddingTop: 30, paddingBottom: 20 }}>
              <MenuItemAdder
                username={username}
                handleAddItem={this.handleAddItem}
              />
            </View>
          </KeyboardAvoidingView>
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
