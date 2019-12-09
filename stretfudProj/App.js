import React from 'react';
import { createAppContainer } from 'react-navigation';
import { createSwitchNavigator } from 'react-navigation';
import SignIn from './screens/SignIn';
import { UserStack, VendorStack } from './routes';

const RootSwitch = createSwitchNavigator(
  {
    SignIn: { screen: SignIn },
    UserHomePage: UserStack,
    VendorHomePage: VendorStack
  },
  {
    initialRouteName: 'SignIn',
    defaultNavigationOptions: {
      headerStyle: { backgroundColor: '#f56111' },
      headerTintColor: '#fff',
      headerTitleStyle: { fontWeight: 'bold' }
    }
  }
);

const AppContainer = createAppContainer(RootSwitch);

export default class App extends React.Component {
  render() {
    return <AppContainer />;
  }
}
