import React, { Component } from 'react';
import { StyleSheet, Text, View, Button } from 'react-native';
import SignOut from './SignOut';

class UserHome extends Component {
  render() {
    return (
      <View style={styles.container}>
        <Text>User Home Page</Text>
        <SignOut navigation={this.props.navigation} />
        <Button
          title="See Vendor"
          onPress={() => {
            this.props.navigation.navigate('SingleVendor');
          }}
        />
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
