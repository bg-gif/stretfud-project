import React from "react";
import { createStackNavigator } from "react-navigation-stack";

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
        headerStyle: { backgroundColor: "#f56111" },
        headerTintColor: "#fff",
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
        headerStyle: { backgroundColor: "#f56111" },
        headerTintColor: "#fff",
        headerTitleStyle: { fontWeight: "bold" }
      };
    }
  }
);
