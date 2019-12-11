import React, { Component } from "react";
import { StyleSheet, Text, View, Button } from "react-native";
import SignOut from "./SignOut";
import { withUserHOC } from "../components/UserContext";
import Map from "../components/Map";
import ToggleSwitch from "toggle-switch-react-native";

class UserHome extends Component {
  state = {
    toggleVal: false
  };

  static navigationOptions = ({ navigation }) => {
    return {
      headerRight: () => <SignOut navigation={navigation} />,
      title: "Home",
      headerStyle: { backgroundColor: "#f56111" },
      headerTintColor: "#fff",
      headerTitleStyle: { fontWeight: "bold" }
    };
  };

  render() {
    const { toggleVal } = this.state;
    return (
      <View style={styles.container}>
        <Map navigation={this.props.navigation} />
        <Text>User Home Page</Text>
        <ToggleSwitch
          isOn={toggleVal}
          onColor="green"
          offColor="red"
          label="Hide Closed"
          labelStyle={{ color: "black", fontWeight: "900" }}
          size="large"
          onToggle={() =>
            this.setState(currentState => {
              return { toggleVal: !currentState.toggleVal };
            })
          }
        />
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
<<<<<<< HEAD
  },
  map: {
    borderStyle: "solid",
    borderColor: "green",
    borderWidth: 1,
    height: 100,
    width: 100
=======
>>>>>>> 41a78adeab1587eae20c4cde2e2371cbb1a774df
  }
});

export default withUserHOC(UserHome);
