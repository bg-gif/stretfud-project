import React, { Component } from 'react';
import { StyleSheet, Text, ScrollView, View, SafeAreaView } from 'react-native';
import * as api from '../utils/api';
import Loader from '../components/Loader';
import ErrorAlerter from '../components/ErrorAlerter';
import OrderCard from '../components/OrderCard';
import Constants from 'expo-constants';
let socket = require('socket.io-client')(`ws://stretfud.herokuapp.com:80`);

class Orders extends Component {
  state = {
    isLoading: false,
    orders: [],
    refresh: true
  };

  componentDidMount() {
    const { username } = this.props.navigation.state.params;
    api
      .fetchVendorOrders(username)
      .then(orders => {
        this.setState({ orders });
      })
      .catch(err => {
        ErrorAlerter('Orders could not be found');
      });
  }

  componentDidUpdate(prevProps, prevState) {
    if (prevState.refresh !== this.state.refresh) {
      const { username } = this.props.navigation.state.params;
      api.fetchVendorOrders(username).then(orders => {
        this.setState({ orders });
      });
    }
  }

  refresh = () => {
    this.setState(currentState => {
      return { refresh: !currentState.refresh };
    });
  };

  render() {
    const { orders, isLoading } = this.state;
    const orderNums = Object.keys(orders);
    const username = this.props.navigation.state.params;
    let count = 0;
    if (isLoading) return <Loader />;
    socket.on('outgoing', data => {
      if (data.vendor === username) {
        this.refresh();
      }
    });
    return (
      <SafeAreaView style={styles.container}>
        <ScrollView contentContainerStyle={styles.menuPageContainer}>
          <View>
            <View style={styles.headerContainer}>
              <Text style={styles.headerText}>Orders</Text>
            </View>
            {orderNums.map((num, index) => {
              return (
                <OrderCard
                  order={orders[num]}
                  key={`${orders}${++count}`}
                  refresh={this.refresh}
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
    // flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'space-around'
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

export default Orders;
