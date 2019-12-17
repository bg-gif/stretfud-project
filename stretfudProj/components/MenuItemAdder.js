import React, { Component } from 'react';
import { TouchableOpacity, Text, View, StyleSheet } from 'react-native';
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
      <View style={styles.container}>
        <TouchableOpacity onPress={this.toggleView} style={styles.vendorButton}>
          <Text style={styles.vendorButtonContent}>Add Menu Item</Text>
        </TouchableOpacity>
        {showForm && (
          <NewItemForm username={username} handleAddItem={handleAddItem} />
        )}
      </View>
    );
  }
}

const styles = StyleSheet.create({
  vendorButton: {
    alignItems: 'center',
    backgroundColor: 'rgba(112, 150, 36, 1)',
    width: 200,
    padding: 10,
    borderRadius: 5
  },
  vendorButtonContent: {
    color: 'white',
    fontFamily: 'BebasNeue-Regular',
    fontSize: 20
  },
  container: {
    alignItems: 'center'
  }
});

export default MenuItemAdder;
