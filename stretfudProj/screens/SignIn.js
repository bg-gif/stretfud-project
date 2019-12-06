import React from 'react';
import { StyleSheet, Text, View, Button, Picker } from 'react-native';

class SignIn extends React.Component {
  static navigationOptions = {
    tabBarLabel: 'StetFud'
  };

  state = {
    signInType: ''
  };

  componentDidMount() {
    this.setState({ signInType: 'user' });
  }

  handleChange = (itemValue, itemIndex) => {
    this.setState({ signInType: itemValue });
  };

  handlePress = () => {
    const { signInType } = this.state;
    const destination =
      signInType === 'user' ? 'UserHomePage' : 'VendorHomePage';

    this.props.navigation.navigate(destination);
  };

  render() {
    return (
      <View style={styles.container}>
        <Text>This is sign in page</Text>
        <Picker
          selectedValue={this.state.signInType}
          style={styles.picker}
          onValueChange={this.handleChange}
        >
          <Picker.Item label="User" value="user" />
          <Picker.Item label="Vendor" value="vendor" />
        </Picker>
        <Button title="sign in" onPress={this.handlePress} />
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
  picker: { height: 50, width: 100 }
});

export default SignIn;
