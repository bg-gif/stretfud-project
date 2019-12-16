import React from 'react';
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  ScrollView
} from 'react-native';
import InputAdder from './InputAdder';
import * as api from '../utils/api';
import ErrorAlerter from './ErrorAlerter';
import * as Crypto from 'expo-crypto';
import SignUpAlerter from './SignUpAlerter';

class UserSignUpForm extends React.Component {
  state = {
    username: '',
    fullName: '',
    businessName: '',
    cuisine: '',
    openingTimes: '',
    email: '',
    age: null,
    phoneNumber: '',
    password: '',
    confirmPassword: '',
    isEmpty: false
  };

  handleTextChange = (value, key) => {
    this.setState({ [key]: value, isEmpty: false });
  };

  handlePress = () => {
    const {
      username,
      fullName,
      businessName,
      cuisine,
      openingTimes,
      email,
      age,
      phoneNumber,
      password,
      confirmPassword
    } = this.state;

    const { signUpType } = this.props;

    const isRequired = ['username', 'fullName', 'password'];
    const isRequiredVendor = ['businesName', 'cuisine', 'openingTimes'];

    let anyEmpty = false;
    for (let key in this.state) {
      if (isRequired.includes(key) && this.state[key] === '') {
        anyEmpty = true;
      }
      if (signUpType === 'vendor') {
        if (isRequiredVendor.includes(key) && this.state[key] === '') {
          anyEmpty = true;
        }
      }
      this.setState({ isEmpty: anyEmpty });
    }

    if (anyEmpty) return ErrorAlerter('Required fields missing');

    if (password !== confirmPassword || password === '') {
      ErrorAlerter('Password inputs did not match');
    } else {
      Crypto.digestStringAsync('SHA-1', password).then(hashedPassword => {
        let userObj;
        if (signUpType === 'user') {
          userObj = {
            username,
            realname: fullName,
            email,
            age: +age,
            password: hashedPassword,
            phone_num: phoneNumber
          };
        } else {
          userObj = {
            username,
            realname: fullName,
            businessname: businessName,
            cuisine,
            opening_times: openingTimes,
            phone_num: phoneNumber,
            email,
            password: hashedPassword
          };
        }
        api
          .addUser(`${signUpType}s`, userObj)
          .then(() => {
            signUpType === 'user'
              ? SignUpAlerter('You have successfully signed up!')
              : SignUpAlerter(
                  "You have succesfully signed up! Please sign in to set your vans's location"
                );
            this.props.navigation.goBack();
          })
          .catch(err => {
            ErrorAlerter('Sign Up could not take place');
          });
      });
    }
  };

  render() {
    const {
      username,
      fullName,
      businessName,
      cuisine,
      openingTimes,
      email,
      age,
      phoneNumber,
      password,
      confirmPassword,
      isEmpty
    } = this.state;
    const { signUpType } = this.props;
    return (
      <View style={{ flex: 1 }}>
        <ScrollView contentContainerStyle={styles.inputContainer}>
          <InputAdder
            isEmpty={isEmpty}
            name="username"
            handleTextChange={this.handleTextChange}
            value={username}
          />
          <InputAdder
            isEmpty={isEmpty}
            name="fullName"
            handleTextChange={this.handleTextChange}
            value={fullName}
          />
          {signUpType === 'vendor' && (
            <InputAdder
              isEmpty={isEmpty}
              name="businessName"
              handleTextChange={this.handleTextChange}
              value={businessName}
            />
          )}
          {signUpType === 'vendor' && (
            <InputAdder
              isEmpty={isEmpty}
              name="cuisine"
              handleTextChange={this.handleTextChange}
              value={cuisine}
            />
          )}
          {signUpType === 'vendor' && (
            <InputAdder
              isEmpty={isEmpty}
              name="openingTimes"
              handleTextChange={this.handleTextChange}
              value={openingTimes}
            />
          )}
          <InputAdder
            name="email"
            handleTextChange={this.handleTextChange}
            value={email}
          />
          <InputAdder
            name="phoneNumber"
            handleTextChange={this.handleTextChange}
            value={phoneNumber}
          />
          {signUpType === 'user' && (
            <InputAdder
              name="age"
              handleTextChange={this.handleTextChange}
              value={age}
            />
          )}
          <InputAdder
            isEmpty={isEmpty}
            name="password"
            handleTextChange={this.handleTextChange}
            value={password}
          />
          <InputAdder
            isEmpty={isEmpty}
            name="confirmPassword"
            handleTextChange={this.handleTextChange}
            value={confirmPassword}
          />
          <TouchableOpacity style={styles.addButton} onPress={this.handlePress}>
            <Text style={styles.buttonContent}>add</Text>
          </TouchableOpacity>
        </ScrollView>
      </View>
    );
  }
}

export default UserSignUpForm;

const styles = StyleSheet.create({
  container: {
    flexGrow: 1,
    backgroundColor: 'rgba(112, 150, 36, 1)'
  },
  inputContainer: {
    flex: 1,
    flexDirection: 'column',
    alignItems: 'center',
    justifyContent: 'space-around',
    padding: 8
  },
  addButton: {
    justifyContent: 'center',
    alignItems: 'center',
    width: 100,
    padding: 10,
    backgroundColor: 'rgba(175, 15, 103, 1)',
    borderRadius: 5,
    margin: 10
  },
  buttonContent: {
    fontFamily: 'BebasNeue-Regular',
    fontSize: 20,
    color: 'rgb(237, 237, 237)'
  },
  missingTextWarning: {
    fontFamily: 'BebasNeue-Regular',
    fontSize: 20,
    color: 'rgba(198, 197, 185, 1)'
  },
  emptyInput: {
    borderColor: 'rgba(175, 15, 103, 1)',
    borderBottomWidth: 2
  }
});
