import React, { Component } from 'react';
import {
  StyleSheet,
  Text,
  TouchableOpacity,
  Image,
  View,
  Dimensions
} from 'react-native';
import * as api from '../utils/api';
import InputAdder from '../components/InputAdder';
import Loader from '../components/Loader';
import ErrorAlerter from '../components/ErrorAlerter';

class Menu extends Component {
  state = {
    menu: '',
    isLoading: true
  };

  componentDidMount() {
    api.fetchVendor(this.props.navigation.state.params).then(vendor => {
      this.setState({ menu: vendor.menu, isLoading: false });
    });
  }

  handleTextChange = value => {
    this.setState({ menu: value });
  };

  handleUpdate = () => {
    api
      .updateVendorInfo({
        username: this.props.navigation.state.params,
        menu: this.state.menu
      })
      .then(vendor => {
        this.setState({ menu: vendor.menu });
      })
      .catch(err => {
        ErrorAlerter('Menu could not be updated');
      });
  };

  render() {
    const { menu, isLoading } = this.state;
    if (isLoading) return <Loader />;
    return (
      <View style={styles.container}>
        {menu !== '' && (
          <Image source={{ uri: menu }} style={styles.menuImage} />
        )}
        <View style={styles.inputStyle}>
          <InputAdder
            name="Menu URL"
            value={menu}
            handleTextChange={this.handleTextChange}
          />
        </View>
        <TouchableOpacity
          onPress={this.handleUpdate}
          style={styles.changeMenuButton}
        >
          <Text style={styles.vendorButtonText}>Update Menu</Text>
        </TouchableOpacity>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'space-around'
  },
  menuImage: {
    width: Dimensions.get('window').width,
    height: 300
  },
  changeMenuButton: {
    alignItems: 'center',
    backgroundColor: 'rgba(112, 150, 36, 1)',
    width: 200,
    padding: 10,
    borderRadius: 5
  },
  inputStyle: {
    backgroundColor: 'rgba(175, 15, 103, 1)',
    borderRadius: 5,
    width: Dimensions.get('window').width - 20,
    padding: 15
  },
  vendorButtonText: {
    color: 'white',
    fontFamily: 'BebasNeue-Regular',
    fontSize: 20
  }
});

export default Menu;
