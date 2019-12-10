import React, { Component } from "react";
import { StyleSheet, Text, View, TouchableOpacity } from "react-native";
import SignOut from "./SignOut";
import StatusSetter from "../components/StatusSetter";
import LocationSetter from "../components/LocationSetter";
import * as api from "../utils/utils";
import { withUserHOC } from "../components/UserContext";

class VendorHome extends Component {
  static navigationOptions = ({ navigation }) => {
    return {
      headerRight: () => <SignOut navigation={navigation} />,
      title: "Home",
      headerStyle: { backgroundColor: "#f56111" },
      headerTintColor: "#fff",
      headerTitleStyle: { fontWeight: "bold" }
    };
  };
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
    this.setState(currentState => {
      return { openStatus: !currentState.openStatus };
    });
  };

  handleLocation = ({ location }) => {
    console.log(location);
    this.setState({ currentLocation: location });
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
      openingTimes
    } = this.state;
    return (
      <View style={styles.container}>
        <Text>username: {username}</Text>
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
            navigation.navigate("Menu");
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
