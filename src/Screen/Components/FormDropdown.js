import React from 'react';
import {StyleSheet, View, Text} from 'react-native';
import SelectDropdown from 'react-native-select-dropdown';
import FontAwesome from 'react-native-vector-icons/FontAwesome';

const FormDropdown = props => {
  const {onSelect, data, ...attr} = props;

  return (
    <View style={styles.formDropdown}>
      <Text style={styles.labelText}>
        {attr.labelName}{' '}
        <Text style={styles.sublabelText}>{attr.sublabelName}</Text>
      </Text>
      <SelectDropdown
        defaultButtonText={' '}
        data={data}
        defaultValue={attr.defaultSelected}
        onSelect={onSelect}
        buttonTextAfterSelection={(item, index) => {
          return item;
        }}
        rowTextForSelection={(item, index) => {
          return item;
        }}
        buttonStyle={styles.ddButtonStyle}
        buttonTextStyle={styles.ddButtonTextStyle}
        renderDropdownIcon={isOpened => {
          return (
            <FontAwesome
              name={isOpened ? 'chevron-up' : 'chevron-down'}
              color={'#2583E6'}
              size={11}
            />
          );
        }}
        disabled={attr.disabled}
        dropdownIconPosition={'right'}
        rowStyle={styles.ddRowStyle}
        rowTextStyle={styles.ddRowTextStyle}
        dropdownStyle={styles.dropdownBoxStyle}
      />
      {attr.hasError && <Text style={styles.errorText}>{attr.errorMsg}</Text>}
    </View>
  );
};

export default FormDropdown;

const styles = StyleSheet.create({
  formDropdown: {
    flexDirection: 'column',
    marginTop: 15,
  },
  labelText: {
    marginBottom: 10,
    fontWeight: 'bold',
    color: '#000',
  },
  sublabelText: {
    fontSize: 10,
    fontWeight: 'normal',
    color: '#000',
  },
  ddButtonStyle: {
    flex: 1,
    color: 'gray',
    paddingLeft: 15,
    paddingRight: 15,
    borderWidth: 1,
    borderRadius: 5,
    borderColor: '#BAD8F7',
    backgroundColor: '#F5FBFF',
    width: '100%',
  },
  ddButtonTextStyle: {
    justifyContent: 'flex-start',
    textAlign: 'left',
    fontSize: 13,
  },
  ddRowStyle: {
    backgroundColor: '#EFEFEF',
    borderBottomColor: '#C5C5C5',
  },
  ddRowTextStyle: {
    color: '#444',
    textAlign: 'left',
    fontSize: 13,
  },
  dropdownBoxStyle: {
    borderRadius: 2,
    maxHeight: 160,
  },
  errorText: {
    flex: 1,
    fontSize: 12,
    color: 'red',
    marginTop: 5,
  },
});
