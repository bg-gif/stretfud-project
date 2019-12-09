import React from "react";
import { Text, TextInput, View, StyleSheet } from "react-native";

const InputAdder = ({ name, handleTextChange, value }) => {
  const handleChange = text => {
    handleTextChange(text, name);
  };

  return (
    <View>
      <Text>{name}</Text>
      <TextInput
        onChangeText={handleChange}
        style={styles.TextInput}
        secureTextEntry={name === "password"}
        value={value}
      ></TextInput>
      {/* {this.state.errorMsg && <Text>Please enter some deets</Text>} */}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    flexDirection: "column",
    backgroundColor: "#fff",
    alignItems: "center",
    justifyContent: "center"
  },
  picker: {
    height: 88,
    width: 100,
    borderWidth: 1,
    borderColor: "black",
    borderRadius: 25
  },
  pickerItem: { height: 88 },
  TextInput: {
    height: 40,
    width: 200,
    borderColor: "gray",
    borderWidth: 1
  },
  badText: {
    height: 40,
    width: 200,
    borderColor: "red",
    borderWidth: 1
  }
});

export default InputAdder;
