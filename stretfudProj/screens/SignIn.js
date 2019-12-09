import React from "react";
import { StyleSheet, Text, View, Picker } from "react-native";
import SignInForm from "../components/SignInForm";
import { UserConsumer } from "../components/UserContext";
import { withUserHOC } from "../components/UserContext";

class SignIn extends React.Component {
  static contextType = UserConsumer;
  static navigationOptions = {
    tabBarLabel: "StetFud"
  };

  state = {
    signInType: "",
    textValue: "",
    errorMsg: false
  };

  componentDidMount() {
    this.setState({ signInType: "user" });
  }

  handleChange = itemValue => {
    this.setState({ signInType: itemValue });
  };

  render() {
    console.log(this.props, "<<< in SignIn");
    return (
      <View style={styles.container}>
        <Text>This is sign in page</Text>
        <Picker
          selectedValue={this.state.signInType}
          style={styles.picker}
          onValueChange={this.handleChange}
          itemStyle={styles.pickerItem}
        >
          <Picker.Item label="User" value="user" />
          <Picker.Item label="Vendor" value="vendor" />
        </Picker>
        <SignInForm
          signInType={this.state.signInType}
          navigation={this.props.navigation}
        />
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    flexDirection: "column",
    backgroundColor: "#fff",
    alignItems: "center",
    justifyContent: "center"
  },
  picker: {
    height: 88,
    width: 100,
    borderWidth: 1,
    borderColor: "black",
    borderRadius: 25
  },
  pickerItem: { height: 88 },
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
  }
});

export default withUserHOC(SignIn);
