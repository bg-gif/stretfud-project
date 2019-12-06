import React from 'react';
import { StackNavigator } from 'react-navigation';
import UserHome from './screens/UserHome';
import SingleVendor from './screens/SingleVendor';
import { createStackNavigator } from 'react-navigation-stack';

export const UserStack = createStackNavigator({
  UserHomePage: { screen: UserHome }
});

//export default UserStack;
