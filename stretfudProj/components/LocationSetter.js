import React from "react";
import {
  Platform,
  Text,
  View,
  Button,
  TouchableOpacity,
  StyleSheet
} from "react-native";
import Constants from "expo-constants";
import * as Location from "expo-location";
import * as Permissions from "expo-permissions";

const LocationSetter = ({ handleLocation }) => {
  const handlePress = async () => {
    let { status } = await Permissions.askAsync(Permissions.LOCATION);
    if (status !== "granted") {
      handleLocation({ errorMsg: "Permission was denied" });
    } else {
      let location = await Location.getCurrentPositionAsync({});
      handleLocation({
        location: {
          latitude: location.coords.latitude,
          longitude: location.coords.longitude
        }
      });
    }
  };
  return (
    <View>
      <TouchableOpacity style={styles.locationButton} onPress={handlePress}>
        <Text style={styles.buttonText}>Update Location!</Text>
      </TouchableOpacity>
    </View>
  );
};

export default LocationSetter;

const styles = StyleSheet.create({
  locationButton: {
    alignItems: "center",
    backgroundColor: "rgba(175, 15, 103, 1)",
    color: "rgba(198, 197, 185, 1)",
    width: 200,
    padding: 10,
    borderRadius: 5
  },
  buttonText: { color: "rgba(198, 197, 185, 1)" }
});
