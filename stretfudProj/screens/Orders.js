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
import { withUserHOC } from '../components/UserContext';
import Loader from '../components/Loader';
import ErrorAlerter from '../components/ErrorAlerter';
import OrderCard from '../components/OrderCard';
import Constants from 'expo-constants';

class Menu extends Component {
  state = {
    isLoading: false,
    orders: [],
    refresh: true
  };

  componentDidMount() {
    const { username } = this.props.navigation.state.params;
    api.fetchVendorOrders(username).then(orders => {
      this.setState({ orders });
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
    if (isLoading) return <Loader />;
    return (
      <SafeAreaView style={styles.container}>
        <ScrollView contentContainerStyle={styles.menuPageContainer}>
          <View>
            <View style={styles.headerContainer}>
              <Text style={styles.headerText}>Orders</Text>
            </View>
            {orderNums.map(num => {
              return (
                <OrderCard
                  order={orders[num]}
                  key={orders[num]}
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

export default Menu;
