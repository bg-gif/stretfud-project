import React from "react";
import { View, Text, ScrollView, StyleSheet, Picker } from "react-native";
import UserSignUpForm from "../components/UserSignUpForm";
import VendorSignUpForm from "../components/VendorSignUpForm";

class SignUp extends React.Component {
  static navigationOptions = ({ navigationOptions }) => {
    return {
      title: "Sign Up"
    };
  };
  state = {
    signUpType: "user"
  };

  handleChange = itemValue => {
    this.setState({ signUpType: itemValue });
  };

  render() {
    const { signUpType } = this.state;
    return (
      <View style={{ flex: 1 }}>
        <ScrollView contentContainerStyle={styles.container}>
          <Picker
            selectedValue={signUpType}
            style={styles.picker}
            onValueChange={this.handleChange}
            itemStyle={styles.pickerItem}
          >
            <Picker.Item label="User" value="user" />
            <Picker.Item label="Vendor" value="vendor" />
          </Picker>
          {signUpType === "user" ? (
            <UserSignUpForm navigation={this.props.navigation} />
          ) : (
            <VendorSignUpForm navigation={this.props.navigation} />
          )}
        </ScrollView>
      </View>
    );
  }
}

export default SignUp;

const styles = StyleSheet.create({
  container: {
    flexGrow: 1,
    flexDirection: "column",
    alignItems: "center",
    backgroundColor: "rgba(112, 150, 36, 1)",
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
  }
});
