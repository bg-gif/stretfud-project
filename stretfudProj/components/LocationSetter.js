import React from "react";
import {
  Platform,
  Text,
  View,
  Button,
  TouchableOpacity,
  Stylesheet
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
      <TouchableOpacity onPress={handlePress}>
        <Text>Update Location!</Text>
      </TouchableOpacity>
    </View>
  );
};

export default LocationSetter;
