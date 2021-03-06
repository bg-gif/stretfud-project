import React from "react";
import {
  StyleSheet,
  Text,
  View,
  Picker,
  Image,
  TextInput,
  KeyboardAvoidingView
} from "react-native";
import SignInForm from "../components/SignInForm";
import { UserConsumer } from "../components/UserContext";
import { withUserHOC } from "../components/UserContext";
import * as Font from "expo-font";
import Loader from "../components/Loader";

class SignIn extends React.Component {
  static contextType = UserConsumer;
  static navigationOptions = ({ navigationOptions }) => {
    return {
      title: "Stretfud"
    };
  };

  state = {
    signInType: "",
    textValue: "",
    errorMsg: false,
    fontLoad: false
  };

  componentDidMount() {
    Font.loadAsync({
      "BebasNeue-Regular": require("../assets/fonts/BebasNeue-Regular.ttf")
    }).then(() => {
      this.setState({ signInType: "user", fontLoad: true });
    });
  }

  handleChange = itemValue => {
    this.setState({ signInType: itemValue });
  };

  render() {
    if (!this.state.fontLoad) return <Loader />;
    return (
      <KeyboardAvoidingView style={styles.container} behavior="position">
        <View style={styles.container}>
          <View style={styles.logoView}>
            <Image
              source={require("../assets/stretfud-logo.png")}
              style={styles.logo}
            />
            <Text style={styles.header}>StrētFüd</Text>
          </View>
          {/* <View style={styles.logoView}> */}
          <Picker
            selectedValue={this.state.signInType}
            style={styles.picker}
            onValueChange={this.handleChange}
            itemStyle={styles.pickerItem}
          >
            <Picker.Item label="User" value="user" />
            <Picker.Item label="Vendor" value="vendor" />
          </Picker>
          {/* </View> */}
          <SignInForm
            signInType={this.state.signInType}
            navigation={this.props.navigation}
          />
        </View>
      </KeyboardAvoidingView>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    flexDirection: "column",
    backgroundColor: "rgba(112, 150, 36, 1)",
    alignItems: "center",
    justifyContent: "space-around"
  },
  picker: {
    height: 75,
    width: 200,
    borderWidth: 1,
    borderColor: "black",
    borderRadius: 25,
    backgroundColor: "rgb(237, 237, 237)"
  },
  pickerItem: { height: 75, fontFamily: "BebasNeue-Regular" },
  TextInput: {
    height: 40,
    width: 200,
    borderColor: "gray",
    borderWidth: 1
  },
  badText: {
    height: 40,
    width: 200,
    borderColor: "red",
    borderWidth: 1
  },
  logo: {
    width: 200,
    height: 200,
    borderRadius: 100,
    borderColor: "rgba(175, 15, 103, 1)",
    borderWidth: 16
  },
  header: {
    color: "rgb(237, 237, 237)",
    fontSize: 65,
    fontFamily: "BebasNeue-Regular"
  },
  logoView: {
    flex: 0.5,
    flexDirection: "column",
    backgroundColor: "rgba(112, 150, 36, 1)",
    alignItems: "center",
    justifyContent: "flex-end",
    marginTop: 20
  }
});

export default withUserHOC(SignIn);
