import React, { Component } from 'react';
import { TouchableOpacity, Text, View } from 'react-native';
import NewItemForm from './NewItemForm';

class MenuItemAdder extends Component {
  state = {
    showForm: false
  };

  toggleView = () => {
    this.setState({ showForm: !this.state.showForm });
  };

  render() {
    const { showForm } = this.state;
    const { username, handleAddItem } = this.props;
    return (
      <View>
        <TouchableOpacity onPress={this.toggleView}>
          <Text>Add Menu Item</Text>
        </TouchableOpacity>
        {showForm && (
          <NewItemForm username={username} handleAddItem={handleAddItem} />
        )}
      </View>
    );
  }
}

export default MenuItemAdder;
