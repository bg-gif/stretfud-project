import React from "react";
import { createStackNavigator } from "react-navigation-stack";
// import { StyleSheet } from "react-native";

import UserHome from "./screens/UserHome";
import SingleVendor from "./screens/SingleVendor";
import VendorHome from "./screens/VendorHome";
import Menu from "./screens/Menu";
import SignOut from "./screens/SignOut";
import ViewMenu from "./screens/ViewMenu";

export const UserStack = createStackNavigator(
  {
    Home: UserHome,
    SingleVendor,
    ViewMenu
  },
  {
    defaultNavigationOptions: ({ navigation }) => {
      return {
        headerRight: () => <SignOut navigation={navigation} />,
        headerStyle: { backgroundColor: "rgba(175, 15, 103, 1)" },
        headerTintColor: "rgba(198, 197, 185, 1)",
        headerTitleStyle: { fontWeight: "bold" }
      };
    }
  }
);

export const VendorStack = createStackNavigator(
  {
    Home: VendorHome,
    Menu
  },
  {
    defaultNavigationOptions: ({ navigation }) => {
      return {
        headerRight: () => <SignOut navigation={navigation} />,
        headerStyle: { backgroundColor: "rgba(112, 150, 36, 1)" },
        headerTintColor: "rgba(198, 197, 185, 1)",
        headerTitleStyle: { fontWeight: "bold" }
      };
    }
  }
);

// const styles = StyleSheet.create({
//   signout: {

//   }
// })
