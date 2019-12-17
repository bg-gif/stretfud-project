<<<<<<< HEAD
import React from 'react';
import { createStackNavigator } from 'react-navigation-stack';
import { Button } from 'react-native';
import UserHome from './screens/UserHome';
import SingleVendor from './screens/SingleVendor';
import VendorHome from './screens/VendorHome';
import Menu from './screens/Menu';
import SignOut from './screens/SignOut';
import ViewMenu from './screens/ViewMenu';
import SignIn from './screens/SignIn';
import SignUp from './screens/SignUp';
import ShoppingCartViewer from './components/ShoppingCartViewer';
import ShoppingCart from './screens/ShoppingCart';
import UserOrders from './screens/UserOrders';
import OrdersNavigator from './components/OrdersNavigator';
import HomeMover from './components/HomeMover';
import Orders from './screens/Orders';
=======
import React from "react";
import { createStackNavigator } from "react-navigation-stack";
import { Button } from "react-native";

import UserHome from "./screens/UserHome";
import SingleVendor from "./screens/SingleVendor";
import VendorHome from "./screens/VendorHome";
import Menu from "./screens/Menu";
import SignOut from "./screens/SignOut";
import ViewMenu from "./screens/ViewMenu";
import SignIn from "./screens/SignIn";
import SignUp from "./screens/SignUp";
import ShoppingCartViewer from "./components/ShoppingCartViewer";
import ShoppingCart from "./screens/ShoppingCart";
import UserOrders from "./screens/UserOrders";
import OrdersNavigator from "./components/OrdersNavigator";
import HomeMover from "./components/HomeMover";
import Orders from "./screens/Orders";

>>>>>>> cd564bcfc816033bff1b306d6364cbe8c472d7ad
export const UserStack = createStackNavigator(
  {
    Home: UserHome,
    SingleVendor,
    ViewMenu,
    ShoppingCart,
    UserOrders
  },
  {
    defaultNavigationOptions: ({ navigation }) => {
      return {
        title: 'Home',
        headerRight: () => (
          <>
            <SignOut navigation={navigation} />
            <OrdersNavigator navigation={navigation} />
          </>
        ),
        headerStyle: { backgroundColor: 'rgba(175, 15, 103, 1)' },
        headerTintColor: 'rgb(237, 237, 237)',
        headerTitleStyle: { fontWeight: 'bold' }
      };
    }
  },
  {
    navigationOptions: () => {
      return {
        title: 'Home',
        headerLeft: () => <SignOut navigation={navigation} />,
        headerRight: () => <ShoppingCartViewer navigation={navigation} />
      };
    }
  },
  {
    navigationOptions: () => {
      return {
        title: 'Orders',
        headerRight: () => <SignOut navigation={navigation} />,
        headerLeft: () => (
          <>
            <Button
              title="Back"
              onPress={() => {
                navigation.goBack();
              }}
            />
            <HomeMover navigation={navigation} />
          </>
        )
      };
    }
  }
);

export const VendorStack = createStackNavigator(
  {
    Home: VendorHome,
    Menu,
    Orders
  },
  {
    defaultNavigationOptions: ({ navigation }) => {
      return {
        title: 'Home',
        headerRight: () => <SignOut navigation={navigation} />,
        headerStyle: { backgroundColor: 'rgba(112, 150, 36, 1)' },
        headerTintColor: 'rgb(237, 237, 237)',
        headerTitleStyle: { fontWeight: 'bold' }
      };
    }
  },
  {
    navigationOptions: () => {
      return {
        title: 'Home'
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
        title: 'Stretfud',
        headerStyle: { backgroundColor: 'rgba(112, 150, 36, 1)' },
        headerTintColor: 'rgb(237, 237, 237)',
        headerTitleStyle: { fontWeight: 'bold' }
      };
    }
  },
  {
    navigationOptions: () => {
      return {
        title: 'Stretfud'
      };
    }
  }
);

// const styles = StyleSheet.create({
//   signout: {

//   }
// })
