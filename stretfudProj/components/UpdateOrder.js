import React, { Component } from 'react';

let socket = require('socket.io-client')(`ws://stretfud.herokuapp.com:80`);
import {
  Platform,
  Text,
  View,
  Button,
  TouchableOpacity,
  StyleSheet
} from 'react-native';

class LocationSetter extends Component {
  constructor() {
    super();
    this.state = {
      confirmed: false
    };
  }
  componentDidMount() {
    socket.emit('incoming', { msg: ' User Connected' });
  }

  submit = () => {
    socket.emit('incoming', { order: 'anorder', username: 'cat' });
    socket.on('outgoing', ({ data }) => {
      const { confirmed, username } = data;
      console.log(data);
      if (username === 'cat') {
        return this.setState({ confirmed }, () => {
          console.log(this.state);
        });
      } else console.log('this is not for you!');
    });
  };

  render() {
    const { response, confirmed } = this.state;
    return (
      <View style={{ textAlign: 'center' }}>
        <Button onPress={this.submit} title="Send Order"></Button>
        {confirmed && <Text>Order Confirmed</Text>}
      </View>
    );
  }
}

export default LocationSetter;

const styles = StyleSheet.create({
  locationButton: {
    alignItems: 'center',
    backgroundColor: 'rgba(112, 150, 36, 1)',
    width: 200,
    padding: 10,
    borderRadius: 5
  },
  buttonText: {
    color: 'white',
    fontSize: 20,
    fontFamily: 'BebasNeue-Regular'
  }
});
