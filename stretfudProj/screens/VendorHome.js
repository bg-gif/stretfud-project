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
      <View style={styles.venderHomePage}>
        <View style={styles.vendorInfo}>
          <View style={styles.vendorDetails}>
            <Text style={styles.detailText}>username: {username}</Text>
            <Text style={styles.detailText}>{businessName}</Text>
            <Text style={styles.detailText}>{email}</Text>
            <Text style={styles.detailText}>{openingTimes}</Text>
          </View>

          <Text>{currentLocation}</Text>
          <View style={styles.openStatusContainer}>
            <StatusSetter
              handleStatus={this.handleStatus}
              openStatus={openStatus}
            />
          </View>
        </View>
        <View style={styles.vendorButtonsContainer}>
          <LocationSetter handleLocation={this.handleLocation} />
          {currentLocation !== "" && <Text>New Location Set!</Text>}
          <TouchableOpacity
            style={styles.editMenuButton}
            onPress={() => {
              navigation.navigate("Menu", { username: username });
            }}
          >
            <Text style={styles.buttonText}>View/Edit Menu</Text>
          </TouchableOpacity>
        </View>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  venderHomePage: {
    flex: 1,
    flexDirection: "column",
    backgroundColor: "rgb(243, 202, 203)"
  },
  vendorInfo: {
    flex: 1,
    flexDirection: "row",
    padding: 10
  },
  vendorDetails: {
    flex: 1,
    flexDirection: "column",
    justifyContent: "space-around",
    borderWidth: 2,
    borderColor: "rgba(175, 15, 103, 1)",
    borderRadius: 25,
    alignItems: "center",
    backgroundColor: "rgba(198, 197, 185, 1)"
  },
  detailText: {
    color: "rgba(175, 15, 103, 1)"
  },
  openStatusContainer: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center"
  },
  buttonText: { color: "rgba(198, 197, 185, 1)" },
  vendorButtonsContainer: {
    flex: 1,
    flexDirection: "column",
    justifyContent: "space-around",
    alignItems: "center"
  },
  editMenuButton: {
    alignItems: "center",
    backgroundColor: "rgba(175, 15, 103, 1)",
    color: "rgba(198, 197, 185, 1)",
    width: 200,
    padding: 10,
    borderRadius: 5
  }

  // container: {
  //   flex: 1,
  //   backgroundColor: "#fff",
  //   alignItems: "center",
  //   justifyContent: "center"
  // }
});

export default withUserHOC(VendorHome);
