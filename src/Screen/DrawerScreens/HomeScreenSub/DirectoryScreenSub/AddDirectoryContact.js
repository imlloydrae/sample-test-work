import React, {useEffect, useState} from 'react';
import {
  Alert,
  Image,
  View,
  SafeAreaView,
  StyleSheet,
  Text,
  TouchableOpacity,
  ScrollView,
  Linking,
} from 'react-native';
import {useDispatch, useSelector} from 'react-redux';
import {KeyboardAwareScrollView} from 'react-native-keyboard-aware-scroll-view';

import Loader from '../../../Components/Loader';
import CustomModal from '../../../Components/CustomModal';
import FormInput from '../../../Components/FormInput';
import EmptyList from '../../../Components/EmptyList';
import IMAGES from '../../../../constants/images';
import {resetScreenState} from '../../../../libraries/helpers';
import {
  createContact,
  updateContactForm,
  resetContactForm,
} from '../../../../actions/contact';

const AddDirectoryContact = ({navigation}) => {
  const dispatch = useDispatch();

  const {directoryDetails} = useSelector(state => state.directoryReducer);
  const FORM = useSelector(state => state.contactFormReducer);
  const [visible, setVisible] = useState(true);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    dispatch(
      updateContactForm({
        contactForm: {
          ...FORM.contactForm,
          directory_id: directoryDetails.id,
        },
      }),
    );
  }, []);

  /* FUNCTIONS */
  const onGoBack = () => {
    resetScreenState(navigation, 'DirectoryContactListScreen');
  };

  const onChangeNumber = value => {
    value === ''
      ? dispatch(updateContactForm({errors: {...FORM.errors, mobile_no: true}}))
      : dispatch(
          updateContactForm({
            errors: {...FORM.errors, mobile_no: false},
          }),
        );

    dispatch(
      updateContactForm({
        contactForm: {
          ...FORM.contactForm,
          mobile_no: value,
        },
      }),
    );
  };

  const onChangeCustomField = (label, value) => {
    value === ''
      ? dispatch(updateContactForm({errors: {...FORM.errors, [label]: true}}))
      : dispatch(
          updateContactForm({
            errors: {...FORM.errors, [label]: false},
          }),
        );

    dispatch(
      updateContactForm({
        contactForm: {
          ...FORM.contactForm,
          custom_records: {
            ...FORM.contactForm.custom_records,
            [label]: value,
          },
        },
      }),
    );
  };

  const onCreateContact = () => {
    setLoading(true);

    dispatch(createContact(FORM.contactForm))
      .then(response => {
        setLoading(false);
        dispatch(resetContactForm());
        setVisible(!visible);
      })
      .catch(error => {
        setLoading(false);
        Alert.alert('Error', error);
      });
  };

  const isInvalid = () => {
    return true;
  };

  return (
    <SafeAreaView style={styles.mainBody}>
      <Loader visible={loading} />
      <KeyboardAwareScrollView behavior="position" enabled>
        <View style={styles.container}>
          <CustomModal
            isVisible={!visible}
            alertLabel="Success!"
            alertMsg="Your contact was successfully created."
            buttonText="OK"
            onPress={() => {
              resetScreenState(navigation, 'AddDirectoryContact');
              setVisible(!visible);
              navigation.goBack();
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
                <Text style={styles.pageLabel}>
                  {directoryDetails.directory_name}
                </Text>
              </TouchableOpacity>
            </View>
            <View>
              <TouchableOpacity
                style={styles.buttonStyle}
                onPress={() => onCreateContact()}>
                <Text style={styles.buttonTextStyle}>Create</Text>
              </TouchableOpacity>
            </View>
          </View>
          <View style={styles.colMiddle}>
            <ScrollView>
              {/* <View style={{flex: 0}}>
                <Text style={styles.description}>
                  Download sample file{' '}
                  <Text
                    style={styles.ancLink}
                    onPress={() =>
                      Linking.openURL(
                        `https://diy.itexmo.com/api/contacts/${directoryDetails.id}/template/export`,
                      )
                    }>
                    here.
                  </Text>
                </Text>
              </View> */}
              <FormInput
                label={{name: 'mobile_no'}}
                inputName="mobile_no"
                keyboardType="numeric"
                onChangeText={val => onChangeNumber(val)}
                hasError={FORM.errors.mobile_no}
              />
              {Object.keys(directoryDetails.custom_fields).length > 0 ? (
                Object.keys(directoryDetails.custom_fields).map(
                  (item, index) => {
                    return (
                      <FormInput
                        key={index}
                        label={{name: directoryDetails.custom_fields[item]}}
                        inputName={item}
                        onChangeText={val =>
                          onChangeCustomField(
                            directoryDetails.custom_fields[item],
                            val,
                          )
                        }
                        hasError={
                          FORM.errors[directoryDetails.custom_fields[item]]
                        }
                      />
                    );
                  },
                )
              ) : (
                <></>
              )}
            </ScrollView>
          </View>
        </View>
      </KeyboardAwareScrollView>
    </SafeAreaView>
  );
};

export default AddDirectoryContact;

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
  backButton: {
    height: 15,
    width: 15,
    paddingTop: 15,
    marginTop: 1,
  },
  radioItem: {
    flexDirection: 'row',
    width: '100%',
    marginTop: 5,
  },
  pageLabel: {
    fontSize: 15,
    fontWeight: 'bold',
    marginLeft: 10,
    width: 200,
    color: '#000',
  },
  buttonStyle: {
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
  subStatustext: {
    fontSize: 11,
    color: '#000',
  },
  description: {
    textAlign: 'left',
    fontSize: 11,
    color: '#000',
  },
  ancLink: {
    color: '#2583E6',
    textDecorationColor: 'underline',
  },
});
