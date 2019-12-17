import React from 'react';
import { Text, Switch, View, StyleSheet } from 'react-native';

const SwitchOption = ({ name, handleSwitch, value }) => {
  handleChange = () => {
    handleSwitch(name, value);
  };

  return (
    <View style={styles.switchContainer}>
      <Text style={styles.switchText}>{name}</Text>
      <Switch onChange={handleChange} value={value} />
    </View>
  );
};

const styles = StyleSheet.create({
  switchContainer: {
    flexDirection: 'column',
    alignItems: 'center'
  },
  switchText: {
    color: 'white',
    fontFamily: 'BebasNeue-Regular',
    fontSize: 25,
    paddingLeft: 10
  }
});

export default SwitchOption;
