import React from 'react';
import {StyleSheet, View, Text} from 'react-native';
import {RadioButton} from 'react-native-paper';

const RadioButtonOption = ({
  value,
  status,
  onValueChange,
  label,
  labelStyle,
}) => {
  return (
    <View style={styles.radioButtonWrapper}>
      <View style={styles.radioBorder}></View>
      <RadioButton.Android
        value={value}
        status={status}
        onValueChange={onValueChange}
        color="#2583E6"
      />
      <Text style={{...styles.label, ...labelStyle}}>{label}</Text>
    </View>
  );
};

export default RadioButtonOption;

const styles = StyleSheet.create({
  radioButtonWrapper: {
    flexDirection: 'row',
    marginTop: 5,
    marginBottom: 5,
    marginLeft: 5,
  },
  label: {
    textAlign: 'left',
    paddingTop: '3%',
    fontSize: 13,
    fontWeight: 'bold',
    marginLeft: 5,
    color: '#000',
  },
});
