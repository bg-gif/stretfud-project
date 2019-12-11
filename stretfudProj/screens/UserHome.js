import React, { Component } from 'react';
import { StyleSheet, Text, View, Button, TouchableOpacity } from 'react-native';
import SignOut from './SignOut';
import { withUserHOC } from '../components/UserContext';
import Map from '../components/Map';
import ToggleSwitch from 'toggle-switch-react-native';

class UserHome extends Component {
  state = {
    toggleVal: false,
    refresh: false
  };

  static navigationOptions = ({ navigation }) => {
    return {
      headerRight: () => <SignOut navigation={navigation} />,
      title: 'Home',
      headerStyle: { backgroundColor: '#f56111' },
      headerTintColor: '#fff',
      headerTitleStyle: { fontWeight: 'bold' }
    };
  };

  changeRefresh = () => {
    this.setState({ refresh: false });
  };

  render() {
    return (
      <View style={styles.container}>
        <Map
          navigation={this.props.navigation}
          toggleVal={this.state.toggleVal}
          refresh={this.state.refresh}
          changeRefresh={this.changeRefresh}
        />
        <Text>User Home Page</Text>
        <ToggleSwitch
          isOn={this.state.toggleVal}
          onColor="green"
          offColor="red"
          label="Show Closed"
          labelStyle={{ color: 'black', fontWeight: '900' }}
          size="small"
          onToggle={() =>
            this.setState(currentState => {
              return { toggleVal: !currentState.toggleVal };
            })
          }
        />
        <TouchableOpacity
          onPress={() => {
            this.setState({ refresh: true });
          }}
        >
          <Text>Refresh Page</Text>
        </TouchableOpacity>
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
  },
  map: {
    borderStyle: 'solid',
    borderColor: 'green',
    borderWidth: 1,
    height: 100,
    width: 100
  }
});

export default withUserHOC(UserHome);
