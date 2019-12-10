import React, { Component } from "react";
import { StyleSheet, Text, View, TouchableOpacity } from "react-native";
import StatusSetter from "../components/StatusSetter";
import LocationSetter from "../components/LocationSetter";
import * as api from "../utils/api";
import { withUserHOC } from "../components/UserContext";
import { formatLocation } from "../utils/utils";
import Loader from "../components/Loader";
import ErrorAlerter from "../components/ErrorAlerter";

class VendorHome extends Component {
  state = {
    businessName: "Joes Burgers",
    email: "joe@joesbugrers.com",
    openStatus: false,
    currentLocation: "",
    openingTimes: "",
    isLoading: true
  };

  componentDidMount() {
    api.fetchVendor(this.props.user.username).then(vendor => {
      this.setState({
        businessName: vendor.businessname,
        email: vendor.email,
        openStatus: vendor.open_status,
        openingTimes: vendor.opening_times,
        isLoading: false
      });
    });
  }

  handleStatus = () => {
    let strStatus = !this.state.openStatus;
    strStatus = strStatus.toString();

    api
      .updateVendorInfo({
        username: this.props.user.username,
        open_status: strStatus
      })
      .then(updatedVendor => {
        this.setState({ openStatus: updatedVendor.open_status });
      })
      .catch(err => {
        ErrorAlerter("Open Status could not be updated");
      });
  };

  handleLocation = ({ location }) => {
    api
      .updateVendorInfo({
        username: this.props.user.username,
        location: formatLocation(location)
      })
      .then(updatedVendor => {
        this.setState({
          currentLocation: updatedVendor.location
        });
      })
      .catch(err => {
        ErrorAlerter("Location could not be updated");
      });
  };

  render() {
    const {
      navigation,
      user: { username }
    } = this.props;

    const {
      businessName,
      openStatus,
      currentLocation,
      email,
      openingTimes,
      isLoading
    } = this.state;

    if (isLoading) return <Loader />;
    return (
      <View style={styles.container}>
        <Text>username: {username}</Text>
        <Text>{businessName}</Text>
        <Text>{email}</Text>
        <Text>{openingTimes}</Text>
        <Text>{currentLocation}</Text>
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
            navigation.navigate("Menu", username);
          }}
        >
          <Text>View/Edit Menu</Text>
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
