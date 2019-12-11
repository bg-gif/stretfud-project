import React from 'react';
import { View, Text, TouchableOpacity, StyleSheet } from 'react-native';
import InputAdder from './InputAdder';
import * as Crypto from 'expo-crypto';
import UserContext, { UserProvider } from './UserContext';

class SignInForm extends React.Component {
  state = {
    username: '',
    password: '',
    errorMsg: false
  };

  handleTextChange = (value, key) => {
    this.setState({ [key]: value, errorMsg: false });
  };

  handlePress = () => {
    const { signInType, navigation } = this.props;
    const { username, password } = this.state;
    const destination =
      signInType === 'user' ? 'UserHomePage' : 'VendorHomePage';
    if (!username) {
      return this.setState({ errorMsg: true });
    }
    Crypto.digestStringAsync('SHA-1', password).then(response => {
      console.log(response); // will need to send hashed password to backend and await validation response
      UserContext.username = username;
      navigation.navigate(destination);
    });
  };

  render() {
    const { username, password } = this.state;
    return (
      <UserProvider value={username}>
        <View>
          <InputAdder
            name="username"
            handleTextChange={this.handleTextChange}
            value={username}
          />
          <InputAdder
            name="password"
            handleTextChange={this.handleTextChange}
            value={password}
          />

          <TouchableOpacity onPress={this.handlePress}>
            <Text>sign in</Text>
          </TouchableOpacity>
        </View>
      </UserProvider>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    flexDirection: 'column',
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center'
  },
  picker: {
    height: 88,
    width: 100,
    borderWidth: 1,
    borderColor: 'black',
    borderRadius: 25
  },
  pickerItem: { height: 88 },
  TextInput: {
    height: 40,
    width: 200,
    borderColor: 'gray',
    borderWidth: 1
  },
  badText: {
    height: 40,
    width: 200,
    borderColor: 'red',
    borderWidth: 1
  }
});

export default SignInForm;
