import React from 'react';
import { createStackNavigator } from 'react-navigation-stack';

/* Sreens */
// import SingleVendor from './screens/singleVendor';
// import Menu from './screens/menu';
import SignIn from './screens/SignIn.js';
// import SignUp from './screens/signUp';
// import UserHome from './screens/userHome';
// import VendorHome from './screens/vendorHome';

const SignInPage = createStackNavigator({
  SignIn: {
    screen: SignIn,
    navigationOptions: { title: 'Sign In', headerStyle }
  }
});

export default SignInPage;

// export const createRootNavigator = ()=>{
//   return
// }
