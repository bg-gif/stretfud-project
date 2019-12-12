import React from 'react';
import {
  Text,
  TextInput,
  View,
  StyleSheet,
  InputAccessoryView
} from 'react-native';

const InputAdder = ({ name, handleTextChange, value }) => {
  const handleChange = text => {
    handleTextChange(text, name);
  };
  const inputAccessoryViewID = name;

  return (
    <View style={styles.container}>
      <Text style={styles.text}>{name}</Text>
      <TextInput
        inputAccessoryViewID={inputAccessoryViewID}
        onChangeText={handleChange}
        style={styles.inputBox}
        secureTextEntry={name === 'password'}
        value={value}
      ></TextInput>
      <InputAccessoryView nativeID={inputAccessoryViewID}>
        <View style={styles.keyboardView}>
          <Text style={styles.inputAccessoryViewIDText}>{name}: </Text>
          <TextInput
            value={value}
            secureTextEntry={name === 'password'}
            style={styles.inputAccessoryViewIDValue}
          ></TextInput>
        </View>
      </InputAccessoryView>
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
    backgroundColor: 'rgb(237, 237, 237)',
    width: 250,
    height: 40,
    borderRadius: 25,
    fontWeight: '400',
    fontSize: 20
  },
  text: {
    color: 'rgb(237, 237, 237)',
    fontSize: 20,
    fontFamily: 'BebasNeue-Regular'
  },
  inputAccessoryViewIDText: {
    fontWeight: '400',
    fontSize: 20,
    textAlign: 'center',
    width: 150,
    paddingTop: 10
  },
  inputAccessoryViewIDValue: {
    fontWeight: '400',
    fontSize: 20,
    textAlign: 'center',
    width: 150,
    paddingTop: 10,
    textAlign: 'left'
  },
  keyboardView: {
    flex: 0.5,
    flexDirection: 'row',
    justifyContent: 'center',
    backgroundColor: 'rgb(237, 237, 237)',
    height: 40
  }
});

export default InputAdder;
