import React from 'react';
import { StackNavigator, createAppContainer } from 'react-navigation';
import { createSwitchNavigator } from 'react-navigation';
import SignOut from './screens/SignOut';
import SignIn from './screens/SignIn';
import UserHome from './screens/UserHome';
import VendorHome from './screens/VendorHome';
import { createStackNavigator } from 'react-navigation-stack';
import SingleVendor from './screens/SingleVendor';
//import UserStack from './UserStack';
//import SignInPage  from './routes';

const UserStack = createStackNavigator({
  Home: UserHome,
  SingleVendor: SingleVendor
});

const RootSwitch = createSwitchNavigator(
  {
    SignIn: { screen: SignIn },
    UserHomePage: UserStack,
    VendorHomePage: { screen: VendorHome }
  },
  {
    initialRouteName: 'SignIn'
  }
);

const AppContainer = createAppContainer(RootSwitch);

export default class App extends React.Component {
  render() {
    return <AppContainer />;
  }
}
