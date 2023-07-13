import React from 'react';
import {StyleSheet} from 'react-native';
import SelectDropdown from 'react-native-select-dropdown';
import FontAwesome from 'react-native-vector-icons/FontAwesome';

const Dropdown = props => {
  const {data, onSelect, defaultSelected, ...attr} = props;

  return (
    <SelectDropdown
      ref={attr.ref}
      defaultButtonText={defaultSelected || 'Select an option'}
      defaultValue={defaultSelected}
      data={data || []}
      onSelect={onSelect}
      buttonTextAfterSelection={(item, index) => {
        return item;
      }}
      rowTextForSelection={(item, index) => {
        return item;
      }}
      buttonStyle={{...styles.ddButtonStyle, ...attr.ddButtonStyle}}
      buttonTextStyle={{
        ...styles.ddButtonTextStyle,
        ...attr.ddButtonTextStyle,
      }}
      renderDropdownIcon={isOpened => {
        return (
          <FontAwesome
            name={isOpened ? 'chevron-up' : 'chevron-down'}
            color={'#2583E6'}
            size={attr.iconSize ? attr.iconSize : 11}
          />
        );
      }}
      disabled={attr.disabled}
      dropdownIconPosition={'right'}
      rowStyle={styles.ddRowStyle}
      rowTextStyle={{...styles.ddRowTextStyle, ...attr.ddRowTextStyle}}
      dropdownStyle={styles.dropdownBoxStyle}
    />
  );
};

export default Dropdown;

const styles = StyleSheet.create({
  ddButtonStyle: {
    flex: 1,
    color: 'gray',
    borderWidth: 1,
    borderRadius: 3,
    borderColor: '#BAD8F7',
    backgroundColor: '#fff',
  },
  ddButtonTextStyle: {
    justifyContent: 'flex-start',
    textAlign: 'left',
    fontSize: 13,
    color: '#000',
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
  },
});
