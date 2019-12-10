import React, { Component } from 'react';
import { StyleSheet, Text, View, Button } from 'react-native';
import SignOut from './SignOut';
import { withUserHOC } from '../components/UserContext';

class UserHome extends Component {
  render() {
    return (
      <View style={styles.container}>
        <Text>User Home Page</Text>
        <SignOut navigation={this.props.navigation} />
        <View style={styles.map}>
          <Text>This is map</Text>
        </View>
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
  },
  map: {
    borderStyle: 'solid',
    borderColor: 'green',
    borderWidth: 1,
    height: 100,
    width: 100
  }
});

export default withUserHOC(UserHome);
