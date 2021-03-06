import React from "react";
import { SafeAreaView } from "react-native";
import SignOut from "./SignOut";
import * as api from "../utils/api";
import { withUserHOC } from "../components/UserContext";
import ErrorAlerter from "../components/ErrorAlerter";
import UserOrderCard from "../components/UserOrderCard";
import { ScrollView } from "react-native-gesture-handler";
let socket = require("socket.io-client")(`ws://stretfud.herokuapp.com:80`);

class UserOrders extends React.Component {
  static navigationOptions = ({ navigation }) => {
    return {
      title: "Orders",
      headerRight: () => <SignOut navigation={navigation} />,
      headerLeft: () => <HomeMover navigation={navigation} />
    };
  };

  state = {
    orders: [],
    refresh: true
  };

  refresh = () => {
    api
      .fetchUserOrders(this.props.user.username)
      .then(orders => {
        this.setState({ orders: orders });
      })
      .catch(err => ErrorAlerter("Orders could not be found"));
  };

  componentDidMount() {
    api
      .fetchUserOrders(this.props.user.username)
      .then(orders => {
        this.setState({ orders: orders });
      })
      .catch(err => ErrorAlerter("Orders could not be found"));
  }

  render() {
    const { orders } = this.state;
    let count = 0;
    //if (this.state.orders === undefined) return <Text>No Orders</Text>;
    socket.on("outgoing", data => {
      if (data.user === this.props.user.username) {
        this.refresh();
      }
    });
    return (
      <SafeAreaView style={{ flex: 1 }}>
        <ScrollView>
          {orders.map(order => {
            return (
              <UserOrderCard
                key={`${order.created_at}${++count}`}
                order={order}
              />
            );
          })}
        </ScrollView>
      </SafeAreaView>
    );
  }
}

export default withUserHOC(UserOrders);
