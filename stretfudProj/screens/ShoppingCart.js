import React, { Component } from 'react';
import { View, Text, TouchableOpacity, StyleSheet } from 'react-native';
import { withUserHOC } from '../components/UserContext';
import * as api from '../utils/api';
import EmptyCartAlerter from '../components/EmptyCartAlerter';
import ItemRemover from '../components/ItemRemover';
import * as utils from '../utils/utils';
import OrderAlerter from '../components/OrderAlerter';
import ErrorAlerter from '../components/ErrorAlerter';
let socket = require('socket.io-client')(`ws://stretfud.herokuapp.com:80`);

class ShoppingCart extends Component {
  static navigationOptions = ({ navigationOptions, navigation }) => {
    return {
      title: 'Cart'
    };
  };
  handlePress = () => {
    const user = this.props.user.username;
    const vendor = this.props.navigation.state.params.vendor;
    const order = this.props.navigation.state.params.cartParam;
    const orderObj = { user, vendor, order: [...order] };
    const emptyCart = this.props.navigation.state.params.emptyCart;

    api
      .postOrder(JSON.stringify(orderObj))
      .then(() => {
        OrderAlerter();
        emptyCart();
        this.props.navigation.setParams({ cartParam: [] });
        socket.emit('incoming', { user, vendor });
      })
      .catch(err => {
        ErrorAlerter('Could not send order at this time.');
      });
  };

  handleRemoval = menuItem => {
    const newCart = utils.removeItem(
      this.props.navigation.state.params.cartParam,
      menuItem
    );
    this.props.navigation.setParams({ cartParam: newCart });
  };

  render() {
    const cartArray = this.props.navigation.state.params.cartParam;
    if (cartArray.length === 0) return <EmptyCartAlerter />;
    const total = cartArray.reduce((acc, val) => {
      return { price: +acc.price + +val.price };
    });
    return (
      <View style={styles.orderContainer}>
        {cartArray.map((item, index) => {
          return (
            <View key={item.name + index} style={styles.itemContainer}>
              <Text style={styles.text}>{item.name} </Text>
              <Text style={styles.text}>£{item.price}</Text>
              <ItemRemover
                handleRemoval={this.handleRemoval}
                item={item.name}
              />
            </View>
          );
        })}
        <Text style={styles.text}>
          Total: £{Number.parseFloat(total.price).toFixed(2)}
        </Text>
        <TouchableOpacity
          onPress={this.handlePress}
          style={styles.submitOrderButton}
        >
          <Text style={styles.buttonText}>Submit Order</Text>
        </TouchableOpacity>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  orderContainer: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center'
  },
  itemContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingBottom: 30,
    width: 300
  },
  submitOrderButton: {
    alignItems: 'center',
    backgroundColor: 'rgba(175, 15, 103, 1)',
    width: 200,
    padding: 10,
    borderRadius: 5
  },
  buttonText: {
    color: 'white',
    fontFamily: 'BebasNeue-Regular',
    fontSize: 20
  },
  text: {
    color: 'rgba(112, 150, 36, 1)',
    fontFamily: 'BebasNeue-Regular',
    fontSize: 20
  }
});

export default withUserHOC(ShoppingCart);
