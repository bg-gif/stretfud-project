import React, { Component } from 'react';
import { StyleSheet, Text, View, TouchableOpacity } from 'react-native';
import SignOut from './SignOut';

class VendorHome extends Component {
  static navigationOptions = ({ navigation }) => {
    return {
      headerRight: () => <SignOut navigation={navigation} />,
      title: 'Home',
      headerStyle: { backgroundColor: '#f56111' },
      headerTintColor: '#fff',
      headerTitleStyle: { fontWeight: 'bold' }
    };
  };
  state = {
    businessName: 'Joes Burgers',
    email: 'joe@joesbugrers.com',
    openStatus: false,
    currentLocation: '',
    menu: 'www.joesmenu.com'
  };

  handleStatus = () => {
    this.setState(currentState => {
      return { openStatus: !currentState.openStatus };
    });
  };

  render() {
    const { businessName, openStatus } = this.state;
    return (
      <View style={styles.container}>
        <Text>{businessName}</Text>
        <TouchableOpacity
          style={{
            alignItems: 'center',
            backgroundColor: openStatus ? 'green' : 'red',
            padding: 10
          }}
          onPress={this.handleStatus}
        >
          <Text>Open Status : {openStatus ? 'OPEN' : 'CLOSED'}</Text>
        </TouchableOpacity>
        <TouchableOpacity
          style={{
            alignItems: 'center',
            backgroundColor: '#dddddd',
            padding: 10
          }}
          onPress={() => {
            this.props.navigation.navigate('Menu');
          }}
        >
          <Text>Edit Menu</Text>
        </TouchableOpacity>
        {/* <SignOut navigation={this.props.navigation} /> */}
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

export default VendorHome;
