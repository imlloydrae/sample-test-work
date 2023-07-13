import React, {useEffect, useState} from 'react';
import {
  Image,
  StyleSheet,
  View,
  Text,
  TouchableOpacity,
  SafeAreaView,
  ScrollView,
  Alert,
} from 'react-native';
import {RadioButton} from 'react-native-paper';
import DocumentPicker from 'react-native-document-picker';
import {useDispatch, useSelector} from 'react-redux';
import {KeyboardAwareScrollView} from 'react-native-keyboard-aware-scroll-view';

import Loader from '../../Components/Loader';
import FormInput from '../../Components/FormInput';
import CustomModal from '../../Components/CustomModal';
import RadioButtonOption from '../../Components/RadioButtonOption';
import ContactsLater from './DirectoryScreenSub/ContactsLater';
import ContactsViaUpload from './DirectoryScreenSub/ContactsViaUpload';
import {
  createDirectory,
  uploadDirectory,
  resetDirectoryForm,
  updateDirectoryForm,
} from '../../../actions/directory';

const DirectoryScreen = ({navigation}) => {
  const dispatch = useDispatch();

  const FORM = useSelector(state => state.directoryFormReducer);
  const [visible, setVisible] = useState(true);
  const [loading, setLoading] = useState(false);
  const [checked, setChecked] = React.useState('0');

  useEffect(() => {
    dispatch(resetDirectoryForm());
  }, []);

  /* FUNCTIONS */
  const onChangeName = name => {
    name === ''
      ? dispatch(
          updateDirectoryForm({errors: {...FORM.errors, directory_name: true}}),
        )
      : dispatch(
          updateDirectoryForm({
            errors: {...FORM.errors, directory_name: false},
          }),
        );

    dispatch(
      updateDirectoryForm({
        directory_name: name,
      }),
    );
  };

  const onCreateDirectory = () => {
    if (isInvalid()) return;

    let dataForm = {};
    if (checked == 1) {
      dataForm = {
        directory_name: FORM.directory_name,
        custom_fields: FORM.custom_fields
          .filter(i => i.value != '')
          .map(i => i.value),
      };
    } else if (checked == 2) {
      dataForm = {
        directory_name: FORM.directory_name,
        contacts: FORM.contacts,
      };
    }

    setLoading(true);
    dispatch(createDirectory(dataForm))
      .then(response => {
        setLoading(false);
        dispatch(resetDirectoryForm());
        setVisible(!visible);
      })
      .catch(error => {
        setLoading(false);
        Alert.alert('Error', error);
      });
  };

  const isInvalid = () => {
    if (FORM.directory_name === '') {
      dispatch(
        updateDirectoryForm({errors: {...FORM.errors, directory_name: true}}),
      );
      return true;
    }

    if (checked == 0) {
      Alert.alert('Please select an option.');
      return true;
    }

    // if (
    //   checked == 1 &&
    //   FORM.custom_fields.find(i => i.value === '') != undefined
    // ) {
    //   Alert.alert('Please complete input on custom fields');
    //   return true;
    // }

    // if (checked == 1 && FORM.custom_fields.length === 0) {
    //   Alert.alert('Please add custom fields');
    //   return true;
    // }

    if (checked == 2 && Object.keys(FORM.contacts).length === 0) {
      Alert.alert('Please select a file');
      return true;
    }
  };

  const handleDocumentSelection = () => {};

  return (
    <SafeAreaView style={styles.mainBody}>
      <Loader visible={loading} />
      <KeyboardAwareScrollView behavior="position" enabled>
        <ScrollView>
          <View style={styles.container}>
            <CustomModal
              isVisible={!visible}
              alertLabel="Success!"
              alertMsg="Your directory was successfully created."
              buttonText="Back To Directory"
              onPress={() => {
                setVisible(!visible);
                navigation.navigate('DirectoryListScreen');
              }}
            />
            <View style={styles.colTop}>
              <View>
                <TouchableOpacity
                  style={styles.radioItem}
                  onPress={() => navigation.goBack()}>
                  <Image
                    source={IMAGES.IC_BACK_BLACK}
                    style={styles.backButton}
                  />
                  <Text style={styles.pageLabel}> Create Directory</Text>
                </TouchableOpacity>
              </View>
              <View>
                <TouchableOpacity
                  style={styles.greenBtn}
                  // onPress={() => navigation.navigate('DirectoryListScreen')}
                  onPress={onCreateDirectory}>
                  <Text style={styles.buttonTextStyle}>Create</Text>
                </TouchableOpacity>
              </View>
            </View>
            <View style={styles.colMiddle}>
              <FormInput
                label={{name: 'Directory Name'}}
                inputName="directory_name"
                onChangeText={name => onChangeName(name)}
                hasError={FORM.errors.directory_name}
                value={FORM.directory_name}
              />

              <View style={styles.radioStyle}>
                <RadioButton.Group
                  onValueChange={newValue => {
                    setChecked(newValue);
                  }}
                  value={checked}>
                  <RadioButtonOption
                    label="Add contacts later"
                    value="1"
                    status={checked === '1' ? 'checked' : 'unchecked'}
                    onValueChange={() => setChecked('1')}></RadioButtonOption>
                  {checked === '1' && <ContactsLater />}

                  <RadioButtonOption
                    label="Add Contacts Via Upload"
                    value="2"
                    status={checked === '2' ? 'checked' : 'unchecked'}
                    onValueChange={() => setChecked('2')}></RadioButtonOption>
                  {checked === '2' && <ContactsViaUpload />}
                </RadioButton.Group>
              </View>
              {/* <View style={{marginTop: 10}}>
                <Text style={styles.addContactThruPhoneText}>
                  Add Contacts Thru Phone
                </Text>
                <TouchableOpacity
                  style={styles.addContactButtonStyle}
                  onPress={handleDocumentSelection}
                  underlayColor="#fff">
                  <Text style={styles.addContactButtonTextStyle}>
                    + Add Contacts
                  </Text>
                </TouchableOpacity>
              </View> */}
            </View>
            <View style={styles.colBottom}></View>
          </View>
        </ScrollView>
      </KeyboardAwareScrollView>
    </SafeAreaView>
  );
};

export default DirectoryScreen;

const styles = StyleSheet.create({
  mainBody: {
    flex: 1,
    justifyContent: 'center',
    backgroundColor: '#fff',
    alignContent: 'center',
  },
  container: {
    flex: 1,
    flexDirection: 'column',
    paddingLeft: 20,
    paddingRight: 20,
  },
  colTop: {
    flex: 0,
    marginTop: 10,
    marginBottom: 10,
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  colMiddle: {
    flex: 1,
  },
  colBottom: {
    flex: 0.25,
    flexDirection: 'row',
    justifyContent: 'center',
  },
  pageLabel: {
    fontSize: 15,
    fontWeight: 'bold',
    marginLeft: 10,
    color: '#000',
  },
  nameStyle: {
    flexDirection: 'column',
    height: 70,
    marginTop: 15,
    margin: 5,
  },
  labelText: {
    marginBottom: 10,
    fontWeight: 'bold',
  },
  inputStyle: {
    flex: 1,
    padding: 22,
    color: 'white',
    paddingLeft: 15,
    paddingRight: 15,
    borderWidth: 0.4,
    borderRadius: 5,
    borderColor: '#2583E6',
    backgroundColor: '#F5FBFF',
    borderStyle: 'solid',
    marginBottom: 10,
  },
  radioItem: {
    flexDirection: 'row',
    width: '100%',
  },
  backButton: {
    height: 15,
    width: 15,
    paddingTop: 15,
    marginTop: 1,
  },
  buttonTextStyle: {
    color: '#FFFFFF',
    fontSize: 11,
    fontWeight: 'bold',
  },
  radioStyle: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    alignContent: 'space-around',
    width: '100%',
  },
  radioButtonItem: {
    flexDirection: 'row',
    width: '100%',
  },
  radioBorder: {
    height: 36,
    width: 36,
    borderWidth: 1,
    borderRadius: 50,
    borderColor: '#2583E6',
    position: 'absolute',
  },
  textLabel: {
    textAlign: 'left',
    paddingTop: '3%',
    fontSize: 13,
    fontWeight: 'bold',
    marginLeft: 5,
  },
  radioList: {
    width: '85%',
    flexDirection: 'row',
  },
  buttonList: {
    width: '15%',
  },
  addContactThruPhoneText: {
    fontSize: 14,
    fontWeight: 'bold',
    paddingVertical: 10,
    color: '#000',
  },
  addContactButtonStyle: {
    backgroundColor: '#2583E6',
    borderWidth: 0,
    color: '#FFFFFF',
    borderColor: '#2583E6',
    alignItems: 'center',
    borderRadius: 3,
    padding: 12,
  },
  addContactButtonTextStyle: {
    color: '#FFFFFF',
    fontSize: 15,
    fontWeight: 'bold',
  },
  greenBtn: {
    backgroundColor: '#41BBA2',
    borderWidth: 0,
    color: '#FFFFFF',
    borderColor: '#2583E6',
    alignItems: 'center',
    borderRadius: 3,
    padding: 10,
  },
  /* MODAL STYLE */
  button: {
    backgroundColor: '#2583E6',
    padding: 12,
    marginTop: 50,
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: 4,
    borderColor: 'rgba(0, 0, 0, 0.1)',
    color: 'white',
  },
  modalContent: {
    backgroundColor: 'white',
    paddingTop: 30,
    paddingBottom: 30,
    paddingLeft: 5,
    paddingRight: 5,
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: 4,
    borderColor: 'rgba(0, 0, 0, 0.1)',
  },
  sentImg: {
    height: 120,
    width: 120,
    marginBottom: 15,
  },
  textHolder: {
    textAlign: 'left',
    paddingLeft: 5,
    paddingRight: 5,
  },
  textSent: {
    fontSize: 17,
    fontWeight: 'bold',
  },
  textMini: {
    fontSize: 15,
  },
});
