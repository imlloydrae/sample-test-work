import React, {useState} from 'react';
import {
  Alert,
  Image,
  View,
  SafeAreaView,
  StyleSheet,
  Text,
  TouchableOpacity,
} from 'react-native';
import {useDispatch, useSelector} from 'react-redux';
import {KeyboardAwareScrollView} from 'react-native-keyboard-aware-scroll-view';

import FormInput from '../../../Components/FormInput';
import CustomModal from '../../../Components/CustomModal';
import ContactsLater from './ContactsLater';
import Loader from '../../../Components/Loader';
import IMAGES from '../../../../constants/images';
import {
  updateDirectory,
  updateDirectoryForm,
  resetDirectoryForm,
} from '../../../../actions/directory';

const EditDirectory = ({navigation, route}) => {
  const dispatch = useDispatch();

  const {directoryDetails} = useSelector(state => state.directoryReducer);

  const FORM = useSelector(state => state.directoryFormReducer);
  const [loading, setLoading] = useState(false);
  const [visible, setVisible] = useState(true);

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

  const onUpdateDirectory = () => {
    if (isInvalid()) return;

    let dataForm = {
      directory_id: FORM.directory_id,
      directory_name: FORM.directory_name,
      custom_fields: FORM.custom_fields
        .filter(i => i.value != '')
        .map(i => i.value),
    };

    setLoading(true);
    dispatch(updateDirectory(dataForm))
      .then(response => {
        setVisible(!visible);
        setLoading(false);
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

    // if (
    //   FORM.custom_fields.length > 0 &&
    //   FORM.custom_fields.find(i => i.value === '') != undefined
    // ) {
    //   Alert.alert('Please complete input on custom fields');
    //   return true;
    // }

    // if (FORM.custom_fields.length === 0) {
    //   Alert.alert('Please add custom fields');
    //   return true;
    // }
  };

  return (
    <SafeAreaView style={styles.mainBody}>
      <Loader visible={loading} />
      <KeyboardAwareScrollView behavior="position" enabled>
        <View style={styles.container}>
          <CustomModal
            isVisible={!visible}
            alertLabel="Success!"
            alertMsg="Your directory was successfully updated."
            buttonText="OK"
            onPress={() => {
              dispatch(resetDirectoryForm());
              setVisible(!visible);
              navigation.goBack('DirectoryListScreen');
            }}
          />
          <View style={styles.colTop}>
            <View>
              <TouchableOpacity
                style={styles.radioItem}
                onPress={() => navigation.navigate('DirectoryListScreen')}>
                <Image
                  source={IMAGES.IC_BACK_BLACK}
                  style={styles.backButton}
                />
                <Text style={styles.pageLabel}>
                  {directoryDetails.directory_name}
                </Text>
              </TouchableOpacity>
            </View>

            <View>
              <TouchableOpacity
                style={styles.greenBtn}
                onPress={() => onUpdateDirectory()}>
                <Text style={styles.buttonTextStyle}>Save</Text>
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

            <ContactsLater />
          </View>
        </View>
      </KeyboardAwareScrollView>
    </SafeAreaView>
  );
};

export default EditDirectory;

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
  radioItem: {
    flexDirection: 'row',
    width: '100%',
    marginTop: 5,
  },
  backButton: {
    height: 15,
    width: 15,
    paddingTop: 15,
    marginTop: 3,
    marginTop: 1,
  },
  pageLabel: {
    fontSize: 15,
    fontWeight: 'bold',
    marginLeft: 10,
    width: 200,
    color: '#000',
  },
  hrStyle: {
    borderBottomColor: '#BAD8F7',
    borderBottomWidth: 1,
    marginTop: 10,
    marginBottom: 10,
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
  buttonTextStyle: {
    color: '#FFFFFF',
    fontSize: 11,
    fontWeight: 'bold',
  },
});
