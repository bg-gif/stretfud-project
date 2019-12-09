import React, { Component } from 'react';
import { StyleSheet, Text, View } from 'react-native';
import SignOut from './SignOut';

class Menu extends Component {
  static navigationOptions = ({ navigation }) => {
    return {
      headerRight: () => <SignOut navigation={navigation} />,
      title: 'Home',
      headerStyle: { backgroundColor: '#f56111' },
      headerTintColor: '#fff',
      headerTitleStyle: { fontWeight: 'bold' }
    };
  };

  render() {
    return (
      <View style={styles.container}>
        <Text>Edit Menu Page</Text>
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

export default Menu;
