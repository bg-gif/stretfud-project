import React, { Component } from 'react';
import { StyleSheet, Text, View, TouchableOpacity } from 'react-native';
import StatusSetter from '../components/StatusSetter';
import LocationSetter from '../components/LocationSetter';
import * as api from '../utils/api';
import { withUserHOC } from '../components/UserContext';
import { formatLocation } from '../utils/utils';
import Loader from '../components/Loader';
import ErrorAlerter from '../components/ErrorAlerter';
import UpdateOrder from '../components/UpdateOrder';
let socket = require('socket.io-client')(`ws://stretfud.herokuapp.com:80`);

class VendorHome extends Component {
  static navigationOptions = {
    title: 'Vendor Home'
  };
  state = {
    businessName: 'Joes Burgers',
    email: 'joe@joesbugrers.com',
    openStatus: false,
    currentLocation: '',
    openingTimes: '',
    isLoading: true
  };

  componentDidMount() {
    api.fetchVendor(this.props.user.username).then(vendor => {
      this.setState({
        businessName: vendor.businessname,
        email: vendor.email,
        openStatus: vendor.open_status,
        openingTimes: vendor.opening_times,
        isLoading: false
      });
    });
  }

  handleStatus = () => {
    let strStatus = !this.state.openStatus;
    strStatus = strStatus.toString();

    api
      .updateVendorInfo({
        username: this.props.user.username,
        open_status: strStatus
      })
      .then(updatedVendor => {
        this.setState({ openStatus: updatedVendor.open_status });
      })
      .catch(err => {
        ErrorAlerter('Open Status could not be updated');
      });
  };

  handleLocation = ({ location }) => {
    api
      .updateVendorInfo({
        username: this.props.user.username,
        location: formatLocation(location)
      })
      .then(updatedVendor => {
        this.setState({
          currentLocation: updatedVendor.location
        });
      })
      .catch(err => {
        ErrorAlerter('Location could not be updated');
      });
  };

  render() {
    const {
      navigation,
      user: { username }
    } = this.props;

    const {
      businessName,
      openStatus,
      currentLocation,
      email,
      openingTimes,
      isLoading
    } = this.state;
    this.props.user.username;

    if (isLoading) return <Loader />;
    return (
      <View style={styles.venderHomePage}>
        <View style={styles.vendorInfoContainer}>
          <Text style={styles.headerText}>Vendor Home</Text>
          <View style={styles.vendorDetailsContainer}>
            <Text style={styles.detailText}>name: {businessName}</Text>
            <Text style={styles.detailText}>email: {email}</Text>
            <Text style={styles.detailText}>opening times: {openingTimes}</Text>
          </View>
        </View>
        <View style={styles.vendorButtonsContainer}>
          <LocationSetter handleLocation={this.handleLocation} />
          {currentLocation !== '' && (
            <Text style={this.buttonText}>New Location Set!</Text>
          )}
          <TouchableOpacity
            style={styles.editMenuButton}
            onPress={() => {
              navigation.navigate('Menu', { username: username });
            }}
          >
            <Text style={styles.buttonText}>View/Edit Menu</Text>
          </TouchableOpacity>
          <TouchableOpacity
            style={styles.editMenuButton}
            onPress={() => {
              navigation.navigate('Orders', { username: username });
            }}
          >
            <Text style={styles.buttonText}>Orders</Text>
          </TouchableOpacity>
        </View>
        <View style={styles.vendorStatusContainer}>
          <StatusSetter
            handleStatus={this.handleStatus}
            openStatus={openStatus}
          />
        </View>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  venderHomePage: {
    flex: 1,
    flexDirection: 'column',
    backgroundColor: 'white'
  },
  vendorInfoContainer: {
    flex: 2,
    flexDirection: 'column',
    padding: 10
  },
  vendorButtonsContainer: {
    flex: 2,
    flexDirection: 'column',
    justifyContent: 'space-evenly',
    alignItems: 'center',
    height: 200
  },
  vendorDetailsContainer: {
    flex: 1,
    flexDirection: 'column',
    justifyContent: 'space-around',
    borderRadius: 5,
    textAlign: 'left',
    backgroundColor: 'rgba(175, 15, 103, 1)'
  },
  vendorStatusContainer: {
    flex: 1,
    flexDirection: 'column',
    justifyContent: 'space-evenly',
    alignItems: 'center',
    height: 200
  },
  detailText: {
    color: 'white',
    fontFamily: 'BebasNeue-Regular',
    fontSize: 25,
    paddingLeft: 10
  },
  headerText: {
    color: 'rgba(175, 15, 103, 1)',
    fontFamily: 'BebasNeue-Regular',
    fontSize: 40,
    textAlign: 'center'
  },
  openStatusContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center'
  },
  buttonText: {
    color: 'white',
    fontFamily: 'BebasNeue-Regular',
    fontSize: 20
  },
  vendorOptionsContainer: {
    flex: 3,
    flexDirection: 'row',
    justifyContent: 'space-around',
    alignItems: 'center'
  },
  editMenuButton: {
    alignItems: 'center',
    backgroundColor: 'rgba(112, 150, 36, 1)',
    width: 200,
    padding: 10,
    borderRadius: 5
  }
});

export default withUserHOC(VendorHome);
