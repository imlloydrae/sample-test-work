import React, {useState} from 'react';
import {
  Alert,
  Image,
  View,
  SafeAreaView,
  StyleSheet,
  Text,
  TouchableOpacity,
  ScrollView,
} from 'react-native';
import {useDispatch, useSelector} from 'react-redux';
import {KeyboardAwareScrollView} from 'react-native-keyboard-aware-scroll-view';

import Loader from '../../../Components/Loader';
import FormInput from '../../../Components/FormInput';
import CustomModal from '../../../Components/CustomModal';
import EmptyList from '../../../Components/EmptyList';
import IMAGES from '../../../../constants/images';
import {
  updateContact,
  updateContactForm,
  resetContactForm,
} from '../../../../actions/contact';

const EditDirectoryContact = ({navigation, route}) => {
  const dispatch = useDispatch();

  const FORM = useSelector(state => state.contactFormReducer);
  const [visible, setVisible] = useState(true);
  const [loading, setLoading] = useState(false);

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
            ...FORM.custom_records,
            [label]: value,
          },
        },
      }),
    );
  };

  const onUpdateContact = () => {
    let form = {...FORM.contactForm, contact_id: route.params.id};

    setLoading(true);
    dispatch(updateContact(form))
      .then(response => {
        setVisible(!visible);
        setLoading(false);
      })
      .catch(error => {
        setLoading(false);
        Alert.alert('Error', error);
      });
  };

  return (
    <SafeAreaView style={styles.mainBody}>
      <Loader visible={loading} />
      <KeyboardAwareScrollView behavior="position" enabled>
        <View style={styles.container}>
          <CustomModal
            isVisible={!visible}
            alertLabel="Success!"
            alertMsg="Your contact was successfully updated."
            buttonText="OK"
            onPress={() => {
              dispatch(resetContactForm());
              setVisible(!visible);
              navigation.goBack('DirectoryContactListScreen');
            }}
          />
          <View style={styles.colTop}>
            <View>
              <TouchableOpacity
                style={styles.radioItem}
                onPress={() => navigation.goBack('DirectoryContactListScreen')}>
                <Image
                  source={IMAGES.IC_BACK_BLACK}
                  style={styles.backButton}
                />
                <Text style={styles.pageLabel}>
                  {FORM.contactForm.mobile_no}
                </Text>
              </TouchableOpacity>
            </View>
            <View>
              <TouchableOpacity
                style={styles.buttonStyle}
                onPress={() => onUpdateContact()}>
                <Text style={styles.buttonTextStyle}>Save</Text>
              </TouchableOpacity>
            </View>
          </View>
          <View style={styles.colMiddle}>
            {Object.keys(FORM.contactForm.custom_records).length > 0 ? (
              <ScrollView>
                {Object.keys(FORM.contactForm.custom_records).map(
                  (item, index) => {
                    return (
                      <FormInput
                        key={index}
                        label={{name: item}}
                        inputName={item}
                        value={FORM.contactForm.custom_records[item]}
                        onChangeText={val => onChangeCustomField(item, val)}
                      />
                    );
                  },
                )}
              </ScrollView>
            ) : (
              <EmptyList></EmptyList>
            )}
          </View>
        </View>
      </KeyboardAwareScrollView>
    </SafeAreaView>
  );
};

export default EditDirectoryContact;

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
    marginBottom: 20,
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
});
