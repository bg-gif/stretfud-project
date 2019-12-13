import React, { Component } from 'react';
import {
  Platform,
  StyleSheet,
  Text,
  View,
  Dimensions,
  Image
} from 'react-native';
import MapView, { Marker, Callout } from 'react-native-maps';
import Constants from 'expo-constants';
import * as Location from 'expo-location';
import * as Permissions from 'expo-permissions';
import { fetchVendorsByLocation } from '../utils/api';
import Loader from '../components/Loader';

import ErrorAlerter from './ErrorAlerter';

const geolib = require('geolib');

const instructions = Platform.select({
  ios: 'Press Cmd+R to reload,\n' + 'Cmd+D or shake for dev menu',
  android:
    'Double tap R on your keyboard to reload,\n' +
    'Shake or press menu button for dev menu'
});

export default class App extends Component {
  state = {
    errorMessage: null,
    long: null,
    lat: null,
    vendors: [],
    isLoading: false
  };

  componentWillMount() {
    if (Platform.OS === 'android' && !Constants.isDevice) {
      this.setState({
        errorMessage:
          'Oops, this will not work on Sketch in an Android emulator. Try it on your device!'
      });
    } else {
      this.setState({ isLoading: true });
      this._getLocationAsync();
    }
  }

  componentDidUpdate() {
    if (this.props.refresh) this._getLocationAsync();
  }

  _getLocationAsync = async () => {
    let { status } = await Permissions.askAsync(Permissions.LOCATION);
    if (status !== 'granted') {
      this.setState({
        errorMessage: 'Permission to access location was denied'
      });
    }

    let location = await Location.getCurrentPositionAsync({});

    this.setState(
      {
        location,
        long: location.coords.longitude,
        lat: location.coords.latitude
      },
      () => {
        const { long, lat } = this.state;
        fetchVendorsByLocation(lat, long).then(vendors => {
          this.setState({ vendors, isLoading: false }, () => {
            this.props.changeRefresh();
          });
        });
      }
    );
  };

  render() {
    const { lat, long, vendors, isLoading } = this.state;
    const coordinates = {
      latitude: lat,
      longitude: long
    };
    return isLoading ? (
      <Loader />
    ) : (
      <View style={styles.container}>
        <MapView
          style={styles.mapStyle}
          initialRegion={{
            latitude: lat,
            longitude: long,
            latitudeDelta: 0.02,
            longitudeDelta: 0.02
          }}
        >
          <MapView.Circle
            // key={lat + long}
            center={{
              latitude: coordinates.latitude,
              longitude: coordinates.longitude
            }}
            radius={805}
            strokeWidth={1}
            strokeColor={'#1a66ff'}
          />
          {vendors === undefined
            ? ErrorAlerter('Could not find vendors')
            : vendors.map(vendor => {
                const {
                  location,
                  open_status,
                  username,
                  businessname,
                  cuisine,
                  opening_times
                } = vendor;
                const coords = location.split(',');
                const openStatus = open_status ? 'Open' : 'Closed';
                const color = open_status ? '#008000' : '#FF0000';
                if (this.props.toggleVal || open_status) {
                  return (
                    <Marker
                      key={username}
                      coordinate={{
                        latitude: +coords[0],
                        longitude: +coords[1]
                      }}
                      title={businessname}
                      description={cuisine}
                      pinColor={color}
                    >
                      <Callout
                        style={styles.customView}
                        onPress={() => {
                          this.props.navigation.navigate('SingleVendor', {
                            vendor
                          });
                        }}
                      >
                        <View style={styles.customView2}>
                          <Text style={styles.businessCardHeader}>
                            {businessname}
                          </Text>
                          <View name="cardContent" style={styles.cardContent}>
                            <View name="VendorDetials">
                              <Text style={styles.businessCardInfo}>
                                {cuisine}
                              </Text>
                              <Text style={styles.businessCardInfo}>
                                {opening_times}
                              </Text>
                              <Text style={styles.businessCardInfo}>
                                {openStatus}
                              </Text>
                              <Text style={styles.businessCardInfo}>
                                Tap to View Menu
                              </Text>
                            </View>
                            <View name="Logo">
                              <Image
                                resizeMethod="resize"
                                source={require('../assets/stretfud-logo.png')}
                                style={styles.logo}
                              />
                            </View>
                          </View>
                        </View>
                      </Callout>
                    </Marker>
                  );
                }
              })}
          <Marker
            coordinate={{
              latitude: coordinates.latitude,
              longitude: coordinates.longitude
            }}
            pinColor="#0000A0"
          />
        </MapView>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#800080'
  },
  welcome: {
    fontSize: 20,
    textAlign: 'center',
    margin: 10
  },
  instructions: {
    textAlign: 'center',
    color: '#333333',
    marginBottom: 5
  },
  mapStyle: {
    flex: 1,
    width: Dimensions.get('window').width,
    height: Dimensions.get('window').height
  },
  customView: {
    height: 140
  },
  customView2: {
    height: 140
  },
  businessCardHeader: {
    fontFamily: 'BebasNeue-Regular',
    fontSize: 30,
    color: 'rgba(175, 15, 103, 1)',
    textAlign: 'center'
  },
  businessCardInfo: {
    fontFamily: 'BebasNeue-Regular',
    fontSize: 20,
    color: 'rgba(175, 15, 103, 1)',
    textAlign: 'left',
    paddingLeft: 5
  },
  cardContent: {
    flexDirection: 'row',
    justifyContent: 'space-between'
  },
  logo: {
    width: 100,
    height: 100,
    borderRadius: 75,
    borderColor: 'rgba(175, 15, 103, 1)',
    borderWidth: 4,
    paddingRight: 10
  }
});
