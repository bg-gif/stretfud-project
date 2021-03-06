import React from "react";
import { Text, TextInput, View, StyleSheet } from "react-native";

const InputAdder = ({ name, handleTextChange, value, isEmpty }) => {
  const handleChange = text => {
    handleTextChange(text, name);
  };

  return (
    <View style={styles.container}>
      <Text style={styles.text}>{name}</Text>
      <TextInput
        onChangeText={handleChange}
        style={isEmpty ? styles.inputBoxEmpty : styles.inputBox}
        secureTextEntry={name === "password" || name === "confirmPassword"}
        value={value}
      ></TextInput>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flexDirection: "column",
    alignItems: "center",
    justifyContent: "center"
  },
  inputBox: {
    textAlign: "center",
    borderColor: "transparent",
    backgroundColor: "rgb(237, 237, 237)",
    width: 250,
    height: 40,
    borderRadius: 25,
    fontWeight: "400",
    fontSize: 20
  },
  inputBoxEmpty: {
    textAlign: "center",
    borderColor: "rgba(175, 15, 103, 1)",
    borderWidth: 2,
    backgroundColor: "rgb(237, 237, 237)",
    width: 250,
    height: 40,
    borderRadius: 25,
    fontWeight: "400",
    fontSize: 20
  },
  text: {
    color: "rgb(237, 237, 237)",
    fontSize: 20,
    fontFamily: "BebasNeue-Regular"
  },
  inputAccessoryViewIDText: {
    fontWeight: "400",
    fontSize: 20,
    textAlign: "center",
    width: 150,
    paddingTop: 10
  },
  inputAccessoryViewIDValue: {
    fontWeight: "400",
    fontSize: 20,
    textAlign: "center",
    width: 150,
    paddingTop: 10,
    textAlign: "left"
  },
  keyboardView: {
    flex: 0.5,
    flexDirection: "row",
    justifyContent: "center",
    backgroundColor: "rgb(237, 237, 237)",
    height: 40
  }
});

export default InputAdder;
