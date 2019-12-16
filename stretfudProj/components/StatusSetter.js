import React from 'react';
import { TouchableOpacity, Text, StyleSheet } from 'react-native';

const StatusSetter = ({ handleStatus, openStatus }) => {
  return (
    <TouchableOpacity
      style={openStatus ? styles.open : styles.closed}
      onPress={handleStatus}
    >
      <Text style={openStatus ? styles.buttonOpen : styles.buttonClosed}>
        {openStatus ? 'OPEN' : 'CLOSED'}
      </Text>
    </TouchableOpacity>
  );
};

export default StatusSetter;

const styles = StyleSheet.create({
  open: {
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'rgb(202, 232, 189)',
    padding: 10,
    width: 100,
    height: 100,
    borderRadius: 100,
    borderColor: 'rgba(112, 150, 36, 1)',
    borderWidth: 4
  },
  closed: {
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'rgb(243, 202, 203)',
    padding: 10,
    width: 100,
    height: 100,
    borderRadius: 100,
    borderColor: 'rgba(175, 15, 103, 1)',
    borderWidth: 4
  },
  buttonOpen: {
    color: 'rgba(112, 150, 36, 1)',
    fontFamily: 'BebasNeue-Regular',
    fontSize: 25
  },
  buttonClosed: {
    color: 'rgba(175, 15, 103, 1)',
    fontFamily: 'BebasNeue-Regular',
    fontSize: 25
  }
});
