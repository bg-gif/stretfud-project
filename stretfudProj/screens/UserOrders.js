import React from "react";
import { View, Text, Button } from "react-native";
import SignOut from "./SignOut";
import BackMover from "../components/BackMover";

class UserOrders extends React.Component {
  static navigationOptions = ({ navigation }) => {
    return {
      title: "Orders",
      headerRight: () => <SignOut navigation={navigation} />,
      headerLeft: () => <BackMover navigation={navigation} />
    };
  };

  render() {
    return (
      <View>
        <Text>Orders Page</Text>
      </View>
    );
  }
}

export default UserOrders;
