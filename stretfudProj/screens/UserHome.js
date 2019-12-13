import React, { Component } from 'react';
import {
  StyleSheet,
  Text,
  View,
  Dimensions,
  TouchableOpacity
} from 'react-native';
import SignOut from './SignOut';
import { withUserHOC } from '../components/UserContext';
import Map from '../components/Map';
import ToggleSwitch from 'toggle-switch-react-native';
import Loader from '../components/Loader';

class UserHome extends Component {
  state = {
    toggleVal: true,
    refresh: false,
    isLoading: true
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
          changeLoading={this.changeLoading}
        />
        <View style={styles.userOptionsContainer}>
          <TouchableOpacity
            onPress={() => {
              this.setState({ refresh: true });
            }}
            style={styles.userButton}
          >
            <Text style={styles.buttonContent}>Refresh</Text>
          </TouchableOpacity>
          <ToggleSwitch
            isOn={this.state.toggleVal}
            onColor="green"
            offColor="red"
            label="View Closed"
            labelStyle={styles.toggleSwitch}
            size="small"
            onToggle={() =>
              this.setState(currentState => {
                return { toggleVal: !currentState.toggleVal };
              })
            }
          />
        </View>
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
  userButton: {
    alignItems: 'center',
    width: 100,
    padding: 10,
    backgroundColor: 'rgba(175, 15, 103, 1)',
    borderRadius: 5,
    margin: 5
  },
  buttonContent: {
    fontFamily: 'BebasNeue-Regular',
    fontSize: 20,
    color: 'rgb(237, 237, 237)'
  },
  userOptionsContainer: {
    backgroundColor: 'rgb(237, 237, 237)',
    borderColor: 'rgba(112, 150, 36, 1)',
    borderWidth: 2,
    flexDirection: 'row',
    justifyContent: 'space-around',
    width: Dimensions.get('window').width
  },
  toggleSwitch: {
    color: 'rgba(175, 15, 103, 1)',
    fontFamily: 'BebasNeue-Regular',
    fontSize: 20
  }
});

export default withUserHOC(UserHome);
