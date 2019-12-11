import React from 'react';
import { StyleSheet, Text, View, Picker, Image } from 'react-native';
import SignInForm from '../components/SignInForm';
import { UserConsumer } from '../components/UserContext';
import { withUserHOC } from '../components/UserContext';
import * as Font from 'expo-font';

class SignIn extends React.Component {
  static contextType = UserConsumer;
  static navigationOptions = {
    tabBarLabel: 'StetFud'
  };

  state = {
    signInType: '',
    textValue: '',
    errorMsg: false,
    fontLoad: false
  };

  componentDidMount() {
    Font.loadAsync({
      'BebasNeue-Regular': require('../assets/fonts/BebasNeue-Regular.ttf')
    }).then(() => {
      this.setState({ signInType: 'user', fontLoad: true });
    });
  }

  handleChange = itemValue => {
    this.setState({ signInType: itemValue });
  };

  render() {
    if (!this.state.fontLoad) return <Text>Loading</Text>;
    return (
      <View style={styles.container}>
        <View style={styles.logoView}>
          <Image
            source={require('../assets/stretfud-logo.png')}
            style={styles.logo}
          />
          <Text style={styles.header}>StrētFüd</Text>
        </View>
        <Picker
          selectedValue={this.state.signInType}
          style={styles.picker}
          onValueChange={this.handleChange}
          itemStyle={styles.pickerItem}
        >
          <Picker.Item label="User" value="user" />
          <Picker.Item label="Vendor" value="vendor" />
        </Picker>
        <SignInForm
          signInType={this.state.signInType}
          navigation={this.props.navigation}
        />
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    flexDirection: 'column',
    backgroundColor: 'rgba(112, 150, 36, 1)',
    alignItems: 'center',
    justifyContent: 'space-around'
  },
  picker: {
    height: 75,
    width: 200,
    borderWidth: 1,
    borderColor: 'black',
    borderRadius: 25,
    backgroundColor: 'rgba(198, 197, 185, 1)'
  },
  pickerItem: { height: 75, fontFamily: 'BebasNeue-Regular' },
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
  },
  logo: {
    width: 200,
    height: 200,
    borderRadius: 100,
    borderColor: 'rgba(175, 15, 103, 1)',
    borderWidth: 16
  },
  header: {
    color: 'rgba(198, 197, 185, 1)',
    fontSize: 50,
    fontFamily: 'BebasNeue-Regular'
  },
  logoView: {
    flex: 0.5,
    flexDirection: 'column',
    backgroundColor: 'rgba(112, 150, 36, 1)',
    alignItems: 'center',
    justifyContent: 'flex-end'
  }
});

export default withUserHOC(SignIn);
