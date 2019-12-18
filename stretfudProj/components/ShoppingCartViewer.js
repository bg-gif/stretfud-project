import React from 'react';
import { Platform, Button } from 'react-native';

class ShoppingCartViewer extends React.Component {
  render() {
    const emptyCart = this.props.navigation.state.params.emptyCart;
    const vendor = this.props.navigation.state.params.vendor.username;
    const count = this.props.navigation.state.params.cartParam;
    const platform = Platform.OS;
    let Color = '';
    androidColor =
      this.props.user === 'user'
        ? 'rgba(175, 15, 103, 1)'
        : 'rgba(112, 150, 36, 1)';
    iPhoneColor = 'rgb(237, 237, 237)';
    platform === 'android' ? (Color = androidColor) : (Color = iPhoneColor);

    return (
      <Button
        title={count === undefined ? 'Cart 0' : `Cart ${count.length}`}
        color={Color}
        onPress={() => {
          this.props.navigation.navigate('ShoppingCart', {
            cartParam: count,
            vendor,
            emptyCart
          });
        }}
      />
    );
  }
}

export default ShoppingCartViewer;
