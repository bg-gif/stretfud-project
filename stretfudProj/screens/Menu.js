import React, { Component } from "react";
import {
  StyleSheet,
  Text,
  TouchableOpacity,
  Image,
  ScrollView
} from "react-native";
import * as api from "../utils/api";
import InputAdder from "../components/InputAdder";
// import { TouchableOpacity } from 'react-native-gesture-handler';

class Menu extends Component {
  state = {
    menu: ""
  };

  componentDidMount() {
    api.fetchVendor(this.props.navigation.state.params).then(vendor => {
      this.setState({ menu: vendor.menu });
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
      });
  };

  render() {
    const { menu } = this.state;
    return (
      <ScrollView>
        <Text>Edit Menu Page</Text>
        {menu !== "" && (
          <Image source={{ uri: menu }} style={{ width: 300, height: 300 }} />
        )}
        <InputAdder
          name="Menu URL"
          value={menu}
          handleTextChange={this.handleTextChange}
        />
        <TouchableOpacity onPress={this.handleUpdate}>
          <Text>Update Menu</Text>
        </TouchableOpacity>
      </ScrollView>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
    alignItems: "center",
    justifyContent: "center"
  }
});

export default Menu;
