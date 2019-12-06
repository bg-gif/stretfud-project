import React, { Component } from 'react';
import { StyleSheet, Text, View, Button } from 'react-native';
import SignOut from './SignOut';

class SingleVendor extends Component {
  render() {
    return (
      <View style={styles.container}>
        <Text>Single Vendor Page</Text>
        <SignOut navigation={this.props.navigation} />
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center'
  }
});

export default SingleVendor;
