import React from "react";
import { createAppContainer } from "react-navigation";
import { createSwitchNavigator } from "react-navigation";

import { UserStack, VendorStack, SignUpStack } from "./routes";
import UserContext, { UserProvider } from "./components/UserContext";

const RootSwitch = createSwitchNavigator(
  {
    SignIn: SignUpStack,
    UserHomePage: UserStack,
    VendorHomePage: VendorStack
  },
  {
    initialRouteName: "SignIn",
    defaultNavigationOptions: {
      headerStyle: { backgroundColor: "#f56111" },
      headerTintColor: "#fff",
      headerTitleStyle: { fontWeight: "bold" }
    }
  }
);

const AppContainer = createAppContainer(RootSwitch);

export default class App extends React.Component {
  render() {
    return (
      <UserProvider value={UserContext}>
        <AppContainer />
      </UserProvider>
    );
  }
}
