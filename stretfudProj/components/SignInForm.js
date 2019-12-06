import React from 'react';
import {
  TextInput,
  View,
  Text,
  TouchableOpacity,
  StyleSheet
} from 'react-native';

class SignInForm extends React.Component {
  state = {
    username: '',
    errorMsg: false
  };

  handleTextChange = username => {
    this.setState({ username: username, errorMsg: false });
  };

  handlePress = () => {
    const { signInType, navigation } = this.props;
    const { username } = this.state;
    const destination =
      signInType === 'user' ? 'UserHomePage' : 'VendorHomePage';
    if (!username) {
      return this.setState({ errorMsg: true });
    }

    navigation.navigate(destination);
  };

  render() {
    return (
      <View>
        <Text>Username:</Text>
        <TextInput
          onChangeText={this.handleTextChange}
          style={this.state.errorMsg ? styles.badText : styles.TextInput}
        ></TextInput>
        {this.state.errorMsg && <Text>Please enter some deets</Text>}
        <TouchableOpacity onPress={this.handlePress}>
          <Text>sign in</Text>
        </TouchableOpacity>
      </View>
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
