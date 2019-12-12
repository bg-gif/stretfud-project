
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
import InputAdder from '../components/InputAdder';
import Loader from '../components/Loader';
import ErrorAlerter from '../components/ErrorAlerter';
import VendorMenuCard from "../components/VendorMenuCard";

class Menu extends Component {
  state = {
    menuItems: [
      {
        item: "Beef Steak",
        price: 13,
        description: "a steak of beef",
        available: true
      },
      {
        item: "Cauliflower Steak",
        price: 10,
        description: "a steak of cauliflower",
        available: true,
        vegetarian: true,
        vegan: true
      },
      {
        item: "Chicken Steak",
        price: 11.5,
        description: "a steak of chicken",
        available: true,
        glutenFree: true
      }
    ],
    isLoading: true
  };

  componentDidMount() {
    api.fetchVendor(this.props.navigation.state.params).then(vendor => {
      this.setState({ menu: vendor.menu, isLoading: false });
    });
  }

  handleTextChange = value => {
    this.setState({ menu: value });
  };

  handleSwitch = name => {
    const updatedMenu = this.state.menuItems.map(
      ({ item, available, ...rest }) => {
        if (item === name) available = !available;
        return { item, available, ...rest };
      }
    );
    this.setState({ menuItems: updatedMenu });
  };

  render() {
    const { menuItems, isLoading } = this.state;
    //if (isLoading) return <Loader />;
    console.log(this.props.navigation.state.params.username);
    return (
      <View style={styles.container}>
        {menu !== '' && (
          <Image source={{ uri: menu }} style={styles.menuImage} />
        )}
        <View style={styles.inputStyle}>
          <InputAdder
            name="Menu URL"
            value={menu}
            handleTextChange={this.handleTextChange}
          />
        </View>
        <TouchableOpacity
          onPress={this.handleUpdate}
          style={styles.changeMenuButton}
        >
          <Text style={styles.vendorButtonText}>Update Menu</Text>
        </TouchableOpacity>
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
