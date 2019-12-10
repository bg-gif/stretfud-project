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

class ViewMenu extends Component {
  pinZoomLayoutRef = React.createRef();
  render() {
    const { menu } = this.props.navigation.state.params;
    return (
      <View style={styles.container}>
        <ImageZoom
          cropWidth={Dimensions.get("window").width}
          cropHeight={Dimensions.get("window").height}
          imageWidth={Dimensions.get("window").width}
          imageHeight={Dimensions.get("window").height}
        >
          <Image
            source={{ uri: menu }}
            style={{
              width: Dimensions.get("window").width,
              height: Dimensions.get("window").height,
              resizeMode: "contain"
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

export default ViewMenu;
