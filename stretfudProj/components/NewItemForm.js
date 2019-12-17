import React, { Component } from 'react';
import {
  View,
  Text,
  StyleSheet,
  Dimensions,
  KeyboardAvoidingView
} from 'react-native';
import InputAdder from './InputAdder';
import SwitchOption from './SwitchOption';
import { TouchableOpacity } from 'react-native-gesture-handler';
import ErrorAlerter from './ErrorAlerter';
import * as API from '../utils/api';

class NewItemForm extends Component {
  state = {
    name: '',
    description: '',
    price: '',
    vegetarian: false,
    gluten_free: false,
    vegan: false,
    isEmpty: false
  };

  handleTextChange = (value, name) => {
    this.setState({ [name]: value });
  };

  handleSwitch = name => {
    const lookup = { V: 'vegetarian', VG: 'vegan', GF: 'gluten_free' };
    const key = lookup[name];
    this.setState({ [key]: !this.state[key] });
  };

  handleSubmit = () => {
    const {
      name,
      description,
      price,
      vegetarian,
      vegan,
      gluten_free
    } = this.state;

    const { username, handleAddItem } = this.props;
    const checkEmpty = arr => {
      return arr.filter(item => {
        return item === '';
      });
    };
    const formatPrice = string => {
      return +string;
    };
    const onlyFilled = checkEmpty([name, price]);
    const formattedPrice = formatPrice(price);
    if (onlyFilled.length !== 0) this.setState({ isEmpty: true });
    else {
      if (isNaN(formattedPrice)) {
        ErrorAlerter('you price is not in the correct format 00.00');
      } else {
        API.addMenuItem(username, {
          name,
          price: formattedPrice,
          description,
          vegan,
          vegetarian,
          gluten_free
        })
          .then(({ menu_item }) => {
            handleAddItem(menu_item);
          })
          .catch(err => {
            ErrorAlerter('Adding Items is unavaliable right now');
          });
      }
      this.setState({ isEmpty: false });
    }
  };

  render() {
    const {
      name,
      description,
      price,
      vegetarian,
      vegan,
      gluten_free,
      isEmpty
    } = this.state;
    return (
      <KeyboardAvoidingView behavior="height">
        <View style={styles.formContainer}>
          {isEmpty && (
            <Text style={styles.buttonContent}>
              Please fill in Highlighted fields
            </Text>
          )}
          <InputAdder
            name="name"
            handleTextChange={this.handleTextChange}
            value={name}
            isEmpty={isEmpty}
          />
          <InputAdder
            name="description"
            handleTextChange={this.handleTextChange}
            value={description}
          />
          <InputAdder
            name="price"
            handleTextChange={this.handleTextChange}
            value={price}
            isEmpty={isEmpty}
          />
          <View style={styles.switchContainer}>
            <SwitchOption
              name="V"
              value={vegetarian}
              handleSwitch={this.handleSwitch}
            />
            <SwitchOption
              name="VG"
              value={vegan}
              handleSwitch={this.handleSwitch}
            />
            <SwitchOption
              name="GF"
              value={gluten_free}
              handleSwitch={this.handleSwitch}
            />
          </View>
          <TouchableOpacity
            onPress={this.handleSubmit}
            style={styles.vendorButton}
          >
            <Text style={styles.buttonContent}>Add Item</Text>
          </TouchableOpacity>
        </View>
      </KeyboardAvoidingView>
    );
  }
}

const styles = StyleSheet.create({
  vendorButton: {
    alignItems: 'center',
    backgroundColor: 'rgba(112, 150, 36, 1)',
    width: 200,
    padding: 10,
    borderRadius: 5,
    marginTop: 10,
    marginBottom: 10
  },
  buttonContent: {
    color: 'white',
    fontFamily: 'BebasNeue-Regular',
    fontSize: 20
  },
  switchContainer: {
    flexDirection: 'row',
    justifyContent: 'space-evenly',
    marginTop: 10,
    marginBottom: 10
  },
  formContainer: {
    backgroundColor: 'rgba(175, 15, 103, 1)',
    width: Dimensions.get('window').width - 30,
    borderRadius: 5,
    alignItems: 'center'
  }
});

export default NewItemForm;
