import React from 'react';
import { StyleSheet, Text, View, Button } from 'react-native';

class SignOut extends React.Component {
  render() {
    return (
      <Button
        onPress={() => {
          this.props.navigation.navigate('SignIn');
        }}
        title="Sign Out"
      ></Button>
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

export default SignOut;
