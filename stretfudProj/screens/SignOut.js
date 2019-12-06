import React from 'react';
import { StyleSheet, Text, View, Button } from 'react-native';

class SignOut extends React.Component {
  render() {
    return (
      <View style={styles.container}>
        <Text>This is sign out page</Text>
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

export default SignOut;
