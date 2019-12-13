import React from "react";
import { createStackNavigator } from "react-navigation-stack";
// import { StyleSheet } from "react-native";

import UserHome from "./screens/UserHome";
import SingleVendor from "./screens/SingleVendor";
import VendorHome from "./screens/VendorHome";
import Menu from "./screens/Menu";
import SignOut from "./screens/SignOut";
import ViewMenu from "./screens/ViewMenu";
import SignIn from "./screens/SignIn";
import SignUp from "./screens/SignUp";

export const UserStack = createStackNavigator(
  {
    Home: UserHome,
    SingleVendor,
    ViewMenu
  },
  {
    defaultNavigationOptions: ({ navigation }) => {
      return {
        title: "Home",
        headerRight: () => <SignOut navigation={navigation} />,
        headerStyle: { backgroundColor: "rgba(175, 15, 103, 1)" },
        headerTintColor: "rgb(237, 237, 237)",
        headerTitleStyle: { fontWeight: "bold" }
      };
    }
  },
  {
    navigationOptions: () => {
      return {
        title: "Home"
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
        title: "Home",
        headerRight: () => <SignOut navigation={navigation} />,
        headerStyle: { backgroundColor: "rgba(112, 150, 36, 1)" },
        headerTintColor: "rgb(237, 237, 237)",
        headerTitleStyle: { fontWeight: "bold" }
      };
    }
  },
  {
    navigationOptions: () => {
      return {
        title: "Home"
      };
    }
  }
);

export const SignUpStack = createStackNavigator(
  {
    Home: SignIn,
    SignUp: SignUp
  },
  {
    defaultNavigationOptions: () => {
      return {
        title: "Stretfud",
        headerStyle: { backgroundColor: "rgba(112, 150, 36, 1)" },
        headerTintColor: "rgb(237, 237, 237)",
        headerTitleStyle: { fontWeight: "bold" }
      };
    }
  },
  {
    navigationOptions: () => {
      return {
        title: "Stretfud"
      };
    }
  }
);

// const styles = StyleSheet.create({
//   signout: {

//   }
// })
