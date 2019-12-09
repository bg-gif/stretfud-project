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

    menu: "www.joesmenu.com"
  };

  componentDidMount() {
    api.fetchVendor();
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
    //const { params } = this.props.navigation.state;
    console.dir(this.props.user.username);
    //console.log(this.props.navigation.state.params);
    const {
      navigation,
      user: { username }
    } = this.props;

    const { businessName, openStatus, currentLocation, email } = this.state;
    return (
      <View style={styles.container}>
        <Text>username: {username}</Text>
        <Text>{businessName}</Text>
        <Text>{email}</Text>
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
