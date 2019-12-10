import React, { Component } from "react";
import { StyleSheet, Text, View, Image } from "react-native";

import * as api from "../utils/api";

class Menu extends Component {
  state = {
    menu: ""
  };

  componentDidMount() {
    api.fetchVendor(this.props.navigation.state.params).then(vendor => {
      this.setState({ menu: vendor.menu });
    });
  }

  render() {
    const { menu } = this.state;
    return (
      <View style={styles.container}>
        <Text>Edit Menu Page</Text>
        {menu !== "" && (
          <Image source={{ uri: menu }} style={{ width: 400, height: 400 }} />
        )}
      </View>
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
