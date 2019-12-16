import React, { Component } from 'react';
import { TouchableOpacity, Text, View } from 'react-native';

class MenuItemAdder extends Component {
  state = {
    showForm: false
  };

  toggleView = () => {
    this.setState({ showForm: !this.state.showForm });
  };

  render() {
    const { showForm } = this.state;
    return (
      <View>
        <TouchableOpacity onPress={this.toggleView}>
          <Text>Add Menu Item</Text>
        </TouchableOpacity>
        {showForm && <Text>add menu item form</Text>}
      </View>
    );
  }
}

export default MenuItemAdder;
