import React from 'react';
import { Text, Switch, View } from 'react-native';

const SwitchOption = ({ name, handleSwitch, value }) => {
  handleChange = () => {
    handleSwitch(name, value);
  };

  return (
    <View>
      <Text>{name}</Text>
      <Switch onChange={handleChange} value={value} />
    </View>
  );
};

export default SwitchOption;
