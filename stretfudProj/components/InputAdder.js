import React from 'react';
import { Text, TextInput, View, StyleSheet } from 'react-native';

const InputAdder = ({ name, handleTextChange, value }) => {
  const handleChange = text => {
    handleTextChange(text, name);
  };

  return (
    <View style={styles.container}>
      <Text style={styles.text}>{name}</Text>
      <TextInput
        onChangeText={handleChange}
        style={styles.inputBox}
        secureTextEntry={name === 'password'}
        value={value}
      ></TextInput>
      {/* {this.state.errorMsg && <Text>Please enter some deets</Text>} */}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flexDirection: 'column',
    alignItems: 'center',
    justifyContent: 'center'
  },
  inputBox: {
    textAlign: 'center',
    borderColor: 'transparent',
    backgroundColor: 'rgba(198, 197, 185, 1)',
    width: 250,
    height: 40,
    borderRadius: 25,
    fontWeight: '400',
    fontSize: 20
  },
  text: {
    color: 'rgba(198, 197, 185, 1)',
    fontSize: 20,
    fontFamily: 'BebasNeue-Regular'
  }
});

export default InputAdder;
