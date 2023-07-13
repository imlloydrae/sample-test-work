import React from 'react';
import {Alert, StyleSheet, View, Text, TouchableOpacity} from 'react-native';
import {useDispatch, useSelector} from 'react-redux';

import FormInput from '../../../Components/FormInput';
import {updateDirectoryForm} from '../../../../actions/directory';

const ContactsLater = ({}) => {
  const dispatch = useDispatch();
  const FORM = useSelector(state => state.directoryFormReducer);

  const onAddField = () => {
    if (FORM.custom_fields.length == 7) {
      Alert.alert('You cannot add more than 7 custom fields');
      return;
    }

    let nextIndex =
      FORM.custom_fields.length > 0
        ? FORM.custom_fields.slice(-1)[0].id + 1
        : 1;

    dispatch(
      updateDirectoryForm({
        custom_fields: [
          ...FORM.custom_fields,
          {
            id: nextIndex,
            value: '',
          },
        ],
      }),
    );
  };

  const onRemoveField = item => {
    dispatch(
      updateDirectoryForm({
        custom_fields: FORM.custom_fields.filter(i => i.id !== item.id),
      }),
    );
  };

  const onChangeInput = (item, val) => {
    dispatch(
      updateDirectoryForm({
        custom_fields: FORM.custom_fields.map(i => {
          if (i.id != item.id) {
            return i;
          } else {
            return {
              ...i,
              value: val,
            };
          }
        }),
      }),
    );
  };

  return (
    <View style={{marginLeft: 10, marginTop: 5}}>
      <View styles={styles.textLabel}>
        <Text style={styles.textNext}>
          Custom Fields serve as the information about the contacts. Examples
          are first name, last name, etc. Those are useful for personalizing a
          Campaign Message.
        </Text>
      </View>

      {FORM.custom_fields.map((item, index) => {
        return (
          <FormInput
            key={index}
            label={{name: `Custom Field ${index + 1}`}}
            inputName={`custom_field_${index + 1}`}
            icon={{icon: 'trash', color: 'red'}}
            onPress={() => onRemoveField(item)}
            onChangeText={value => onChangeInput(item, value)}
            value={item.value}
            hasError={item.error}
          />
        );
      })}

      <View>
        <TouchableOpacity
          style={styles.addMoreFields}
          onPress={onAddField}
          underlayColor="#fff">
          <Text style={styles.addFieldTextStyle}>+ Add More Custom Fields</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
};

export default ContactsLater;

const styles = StyleSheet.create({
  textLabel: {
    textAlign: 'left',
    paddingTop: '3%',
    fontSize: 13,
    fontWeight: 'bold',
    color: '#000',
  },
  textNext: {
    textAlign: 'left',
    fontSize: 11,
    color: '#000',
  },
  addFieldTextStyle: {
    color: '#FFFFFF',
    fontSize: 15,
    fontWeight: 'bold',
  },
  addMoreFields: {
    marginTop: 15,
    marginBottom: 15,
    backgroundColor: '#3D2DD9',
    borderWidth: 0,
    color: '#FFFFFF',
    borderColor: '#2583E6',
    alignItems: 'center',
    borderRadius: 3,
    padding: 12,
  },
});
