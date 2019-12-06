import { createStackNavigator } from 'react-navigation-stack';

import UserHome from './screens/UserHome';
import SingleVendor from './screens/SingleVendor';
import VendorHome from './screens/VendorHome';
import Menu from './screens/Menu';

export const UserStack = createStackNavigator({
  Home: UserHome,
  SingleVendor
});

export const VendorStack = createStackNavigator({
  Home: VendorHome,
  Menu
});
