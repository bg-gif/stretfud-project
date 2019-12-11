import React, { Component } from 'react';
import {
  StyleSheet,
  Text,
  View,
  Button,
  Image,
  Dimensions,
  TouchableHighlight
} from 'react-native';

class SingleVendor extends Component {
  pinZoomLayoutRef = React.createRef();
  render() {
    const {
      businessname,
      opening_times,
      cuisine,
      email,
      phone_num,
      open_status,
      menu
    } = this.props.navigation.state.params.vendor;
    const open = open_status ? 'Open' : 'Closed';
    return (
      <View style={styles.container}>
        <Text>{businessname}</Text>
        <Text>{cuisine}</Text>
        <Text>{open}</Text>
        <Text>Opening Times: {opening_times}</Text>
        <Text>Phone: {phone_num}</Text>
        <Text>E-mail: {email}</Text>
        <TouchableHighlight
          onPress={() => {
            this.props.navigation.navigate('ViewMenu', { menu });
          }}
        >
          <Image
            source={{ uri: menu }}
            style={{
              width: 200,
              height: 200,
              resizeMode: 'stretch'
            }}
          />
        </TouchableHighlight>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center'
  }
});

export default SingleVendor;
