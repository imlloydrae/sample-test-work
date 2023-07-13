import React from 'react';
import {StyleSheet, View, Text} from 'react-native';
import {Checkbox} from 'react-native-paper';

const CheckboxOption = props => {
  const {onPress, ...attr} = props;

  return (
    <View style={styles.checkboxWrapper}>
      <View style={styles.checkboxBorder}></View>
      <Checkbox.Android
        value={attr.value}
        status={attr.status}
        onPress={onPress}
        color="#2583E6"
      />
      <Text style={{...styles.label, ...attr.labelStyle}}>{attr.label}</Text>
    </View>
  );
};

export default CheckboxOption;

const styles = StyleSheet.create({
  checkboxWrapper: {
    flexDirection: 'row',
    height: 35,
    width: '100%',
  },
  label: {
    paddingTop: '3%',
    fontSize: 11,
    height: 50,
    color: '#000',
  },
});
