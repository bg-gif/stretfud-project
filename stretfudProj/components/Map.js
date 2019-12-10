import React, { Component } from "react";
import {
  Platform,
  StyleSheet,
  Text,
  View,
  Dimensions,
  TouchableHighlight
} from "react-native";
import MapView, { Marker } from "react-native-maps";
import Constants from "expo-constants";
import * as Location from "expo-location";
import * as Permissions from "expo-permissions";
import { fetchVendorsByLocation } from "../utils/utils";

const geolib = require("geolib");

const instructions = Platform.select({
  ios: "Press Cmd+R to reload,\n" + "Cmd+D or shake for dev menu",
  android:
    "Double tap R on your keyboard to reload,\n" +
    "Shake or press menu button for dev menu"
});

export default class App extends Component {
  state = {
    errorMessage: null,
    long: null,
    lat: null,
    loading: true,
    vendors: []
  };

  componentWillMount() {
    if (Platform.OS === "android" && !Constants.isDevice) {
      this.setState({
        errorMessage:
          "Oops, this will not work on Sketch in an Android emulator. Try it on your device!"
      });
    } else {
      this._getLocationAsync();
    }
  }

  _getLocationAsync = async () => {
    let { status } = await Permissions.askAsync(Permissions.LOCATION);
    if (status !== "granted") {
      this.setState({
        errorMessage: "Permission to access location was denied"
      });
    }

    let location = await Location.getCurrentPositionAsync({});

    this.setState(
      {
        location,
        long: location.coords.longitude,
        lat: location.coords.latitude,
        loading: false
      },
      () => {
        const { long, lat } = this.state;
        fetchVendorsByLocation(lat, long).then(vendors => {
          this.setState({ vendors });
        });
      }
    );
  };

  render() {
    const { lat, long, vendors, loading } = this.state;
    const coordinates = {
      latitude: lat,
      longitude: long
    };

    return loading ? (
      <Text>Loading</Text>
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
            strokeColor={"#1a66ff"}
            // fillColor={"rgba(230,238,255,0.5)"}
            // onRegionChangeComplete={this.onRegionChangeComplete.bind(this)}
          />
          {vendors.map(vendor => {
            const coords = vendor.location.split(",");
            const openStatus = vendor.open_status ? "Open" : "Closed";
            return (
              <Marker
                key={vendor.username}
                coordinate={{
                  latitude: +coords[0],
                  longitude: +coords[1]
                }}
                title={vendor.businessname}
                description={vendor.cuisine}
              >
                <MapView.Callout
                  onPress={() => {
                    this.props.navigation.navigate("SingleVendor", { vendor });
                  }}
                >
                  <TouchableHighlight underlayColor="#dddddd">
                    <View>
                      <Text>{vendor.businessname}</Text>
                      <Text> {vendor.cuisine}</Text>
                      <Text> {openStatus}</Text>
                      <Text> {vendor.opening_times}</Text>
                    </View>
                  </TouchableHighlight>
                </MapView.Callout>
              </Marker>
            );
          })}
          <Marker
            coordinate={{
              latitude: coordinates.latitude,
              longitude: coordinates.longitude
            }}
            title="your location"
            pinColor="#3f33ff"
          />
        </MapView>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "#F5FCFF"
  },
  welcome: {
    fontSize: 20,
    textAlign: "center",
    margin: 10
  },
  instructions: {
    textAlign: "center",
    color: "#333333",
    marginBottom: 5
  },
  mapStyle: {
    width: Dimensions.get("window").width,
    height: Dimensions.get("window").height
  }
});
