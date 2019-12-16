import React from "react";
const UserContext = React.createContext({});
export const UserProvider = UserContext.Provider;
export const UserConsumer = UserContext.Consumer;
export const withUserHOC = Component => props => (
  <UserConsumer>{state => <Component {...props} user={state} />}</UserConsumer>
);

export default UserContext;
