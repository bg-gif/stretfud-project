import React, { Component } from "react";
import { StyleSheet, Text, View, TouchableOpacity } from "react-native";
import SignOut from "./SignOut";
import StatusSetter from "../components/StatusSetter";
import LocationSetter from "../components/LocationSetter";
import * as api from "../utils/utils";
import { withUserHOC } from "../components/UserContext";

class VendorHome extends Component {
  state = {
    businessName: "Joes Burgers",
    email: "joe@joesbugrers.com",
    openStatus: false,
    currentLocation: "",
    openingTimes: "",
    menu: "www.joesmenu.com"
  };

  componentDidMount() {
    api.fetchVendor(this.props.user.username).then(vendor => {
      this.setState({
        businessName: vendor.businessname,
        email: vendor.email,
        openStatus: vendor.open_status,
        openingTimes: vendor.opening_times
      });
    });
  }

  handleStatus = () => {
    api
      .updateVendorInfo({
        username: this.props.user.username,
        open_status: !this.state.openStatus
      })
      .then(updatedVendor => {
        this.setState(() => {
          return { openStatus: updatedVendor.open_status };
        });
      });
  };

  handleLocation = ({ location }) => {
    console.log(location);
    this.setState({ currentLocation: location });
  };

  render() {
    // const {
    //   navigation,
    //   user: { username }
    // } = this.props;

    const {
      businessName,
      openStatus,
      currentLocation,
      email,
      openingTimes
    } = this.state;
    return (
      <View style={styles.container}>
        <Text>username: {this.props.user.username}</Text>
        <Text>{businessName}</Text>
        <Text>{email}</Text>
        <Text>{openingTimes}</Text>
        <StatusSetter
          handleStatus={this.handleStatus}
          openStatus={openStatus}
        />
        <LocationSetter handleLocation={this.handleLocation} />
        {currentLocation !== "" && <Text>New Location Set!</Text>}
        <TouchableOpacity
          style={{
            alignItems: "center",
            backgroundColor: "#dddddd",
            padding: 10
          }}
          onPress={() => {
            this.props.navigation.navigate("Menu");
          }}
        >
          <Text>Edit Menu</Text>
        </TouchableOpacity>
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

export default withUserHOC(VendorHome);
