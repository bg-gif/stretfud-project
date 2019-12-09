import React, { Component } from 'react';
import { StyleSheet, Text, View, Button } from 'react-native';
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

  render() {
    const { businessName } = this.state;
    return (
      <View style={styles.container}>
        <Text>{businessName}</Text>
        <Button
          title="Edit Menu"
          onPress={() => {
            this.props.navigation.navigate('Menu');
          }}
        />
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
