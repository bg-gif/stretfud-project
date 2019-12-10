import React, { Component } from "react";
import {
  StyleSheet,
  Text,
  View,
  Button,
  Image,
  Dimensions
} from "react-native";
import ImageZoom from "react-native-image-pan-zoom";
import SignOut from "./SignOut";

class SingleVendor extends Component {
  pinZoomLayoutRef = React.createRef();
  render() {
    const { vendor } = this.props.navigation.state.params;
    return (
      <View style={styles.container}>
        <Text>{vendor.businessname}</Text>
        <ImageZoom
          cropWidth={Dimensions.get("window").width}
          cropHeight={Dimensions.get("window").height}
          imageWidth={200}
          imageHeight={200}
        >
          <Image
            source={{ uri: vendor.menu }}
            style={{
              width: 200,
              height: 200,
              resizeMode: "stretch"
            }}
          />
        </ImageZoom>

        <SignOut navigation={this.props.navigation} />
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
    alignItems: "center",
    justifyContent: "center"
  }
});

export default SingleVendor;
