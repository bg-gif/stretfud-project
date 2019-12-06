import React, { Component } from 'react';
import { StyleSheet, Text, View, Button } from 'react-native';

class UserHome extends Component {
  render() {
    return (
      <View style={styles.container}>
        <Text>User Home Page</Text>
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

export default UserHome;
