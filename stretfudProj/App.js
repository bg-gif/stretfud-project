import React from 'react';
import { StackNavigator, createAppContainer } from 'react-navigation';
import { createSwitchNavigator } from 'react-navigation';
import SignOut from './screens/SignOut';
import SignIn from './screens/SignIn';
//import SignInPage  from './routes';

const RootStack = createSwitchNavigator(
  {
    SignIn: { screen: SignIn },
    SignOut: { screen: SignOut }
  },
  { initialRouteName: 'SignIn' }
);

const AppContainer = createAppContainer(RootStack);

export default class App extends React.Component {
  render() {
    return <AppContainer />;
  }
}
