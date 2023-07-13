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
} from 'react-native';
import {useDispatch, useSelector} from 'react-redux';
import {KeyboardAwareScrollView} from 'react-native-keyboard-aware-scroll-view';
import FontAwesome from 'react-native-vector-icons/FontAwesome';

import Loader from '../../Components/Loader';
import FormInput from '../../Components/FormInput';
import CustomModal from '../../Components/CustomModal';
import IMAGES from '../../../constants/images';
import {
  getAccount,
  updateAccount,
  updateAccountForm,
  resetAccountForm,
} from '../../../actions/account';
import {forgotPassword} from '../../../actions/auth';

const EditProfileScreen = ({navigation, route}) => {
  const dispatch = useDispatch();

  const FORM = useSelector(state => state.accountFormReducer);
  const [visible, setVisible] = useState(true);
  const [visibleForgotPw, setVisibleForgotPw] = useState(true);
  const [loading, setLoading] = useState(false);
  const [userEmail, setUserEmail] = useState(null);
  const [isChangePassword, setIsChangePassword] = useState(false);
  const [isPasswordSecure, setIsPasswordSecure] = useState({
    pw1: true,
    pw2: true,
    pw3: true,
  });

  useEffect(() => {
    setUserEmail(FORM.accountForm.email);
  }, []);

  /* FUNCTIONS */
  const onChangeInput = (value, field) => {
    value === '' && field != 'lastname'
      ? dispatch(updateAccountForm({errors: {...FORM.errors, [field]: true}}))
      : dispatch(updateAccountForm({errors: {...FORM.errors, [field]: false}}));

    dispatch(
      updateAccountForm({
        accountForm: {
          ...FORM.accountForm,
          [field]: value,
        },
      }),
    );
  };

  const onEnablePassword = () => {
    setIsChangePassword(!isChangePassword);
    dispatch(
      updateAccountForm({
        accountForm: {
          ...FORM.accountForm,
          currentPassword: '',
          newPassword: '',
          newPassword_confirmation: '',
        },
      }),
    );
  };

  const onUpdateProfile = () => {
    if (isInvalid()) return;

    setLoading(true);
    dispatch(updateAccount(FORM.accountForm))
      .then(response => {
        dispatch(resetAccountForm());
        dispatch(getAccount).then(() => {
          setLoading(false);
          setVisible(!visible);
        });
      })
      .catch(error => {
        setLoading(false);
        Alert.alert('Error', error);
      });
  };

  const isInvalid = () => {
    let accountErrors = {};

    if (!isChangePassword) {
      delete FORM.accountForm.currentPassword;
      delete FORM.accountForm.newPassword;
      delete FORM.accountForm.newPassword_confirmation;
      delete FORM.accountForm.field;
    } else {
      if (
        FORM.accountForm.newPassword !=
        FORM.accountForm.newPassword_confirmation
      ) {
        accountErrors['newPassword_confirmation'] = true;
      }
    }

    Object.keys(FORM.accountForm).forEach(i => {
      if (FORM.accountForm[i] === '' && i != 'lastname') {
        accountErrors[i] = true;
      }
    });

    dispatch(
      updateAccountForm({
        errors: accountErrors,
      }),
    );

    if (Object.keys(accountErrors).length > 0) return true;
  };

  const onResetViaEmail = () => {
    dispatch(forgotPassword({email: userEmail}))
      .then(response => {
        setUserEmail('');
        setVisibleForgotPw(!visibleForgotPw);
      })
      .catch(error => {
        Alert.alert('Error', error);
      });
  };
  return (
    <SafeAreaView style={styles.mainBody}>
      <Loader visible={loading} />
      <KeyboardAwareScrollView behavior="position" enabled>
        <ScrollView>
          <View style={styles.container}>
            <CustomModal
              isVisible={!visible}
              alertLabel="Success!"
              alertMsg="Your profile was successfully updated."
              buttonText="OK"
              onPress={() => {
                setVisible(!visible);
                navigation.goBack('ProfileScreen');
              }}
            />
            <CustomModal
              isVisible={!visibleForgotPw}
              alertLabel="Success!"
              alertMsg="Password reset link successfully sent to your email!"
              buttonText="OK"
              onPress={() => {
                setVisibleForgotPw(!visibleForgotPw);
              }}
            />
            <View style={styles.colTop}>
              <View>
                <TouchableOpacity
                  style={styles.radioItem}
                  onPress={() => {
                    dispatch(getAccount).then(() => {
                      navigation.goBack();
                    });
                  }}>
                  <Image
                    source={IMAGES.IC_BACK_BLACK}
                    style={styles.backButton}
                  />
                  <Text style={styles.pageLabel}>Edit Profile</Text>
                </TouchableOpacity>
              </View>

              <View>
                <TouchableOpacity
                  style={styles.buttonStyle}
                  onPress={onUpdateProfile}>
                  <Text style={styles.buttonTextStyle}>Save</Text>
                </TouchableOpacity>
              </View>
            </View>

            <View style={styles.colMiddle}>
              <View style={styles.rowInputstyle}>
                <FormInput
                  formInputStyle={{flex: 1, marginRight: 5}}
                  label={{name: 'Account Name'}}
                  labelStyle={{fontSize: 11, fontWeight: 'normal'}}
                  inputName="firstname"
                  value={FORM.accountForm.firstname}
                  onChangeText={value => onChangeInput(value, 'firstname')}
                  hasError={FORM.errors.firstname}
                />
                <FormInput
                  formInputStyle={{flex: 1, marginLeft: 5}}
                  label={{name: ''}}
                  labelStyle={{fontSize: 11, fontWeight: 'normal'}}
                  inputName="lastname"
                  value={FORM.accountForm.lastname}
                  onChangeText={value => onChangeInput(value, 'lastname')}
                  hasError={FORM.errors.lastname}
                />
              </View>
              <View style={styles.hrStyle} />
              <FormInput
                label={{name: 'Username'}}
                labelStyle={{fontSize: 11, fontWeight: 'normal'}}
                inputName="username"
                value={FORM.accountForm.username}
                onChangeText={value => onChangeInput(value, 'username')}
                hasError={FORM.errors.username}
              />
              <View style={styles.hrStyle} />
              <FormInput
                label={{name: 'Email'}}
                labelStyle={{fontSize: 11, fontWeight: 'normal'}}
                inputName="email"
                value={FORM.accountForm.email}
                onChangeText={value => onChangeInput(value, 'email')}
                hasError={FORM.errors.email}
              />
              <View style={styles.hrStyle} />
              {!isChangePassword ? (
                <TouchableOpacity
                  style={styles.changePwBtn}
                  onPress={() => onEnablePassword()}>
                  <Text style={styles.changePwBtnTextStyle}>
                    Change Password
                  </Text>
                </TouchableOpacity>
              ) : (
                <View>
                  <View
                    style={{
                      width: '100%',
                      paddingHorizontal: 5,
                      alignItems: 'flex-end',
                    }}>
                    <TouchableOpacity
                      style={{marginTop: 10}}
                      onPress={() => setIsChangePassword(!isChangePassword)}>
                      <FontAwesome name="close" color="red" size={15} />
                    </TouchableOpacity>
                  </View>
                  <FormInput
                    label={{name: 'Current Password'}}
                    labelStyle={{fontSize: 11, fontWeight: 'normal'}}
                    isPassword={true}
                    secureTextEntry={isPasswordSecure.pw1}
                    inputName="currentPassword"
                    value={FORM.accountForm.currentPassword}
                    onChangeText={value =>
                      onChangeInput(value, 'currentPassword')
                    }
                    onPress={() => {
                      setIsPasswordSecure({
                        ...isPasswordSecure,
                        pw1: !isPasswordSecure.pw1,
                      });
                      return false;
                    }}
                    icon={{
                      icon: isPasswordSecure.pw1 ? 'eye-slash' : 'eye',
                      color: '#2583E6',
                    }}
                    hasError={FORM.errors.currentPassword}
                  />
                  <View style={styles.rowInputstyle}>
                    <FormInput
                      formInputStyle={{flex: 1, marginRight: 5}}
                      labelStyle={{fontSize: 11, fontWeight: 'normal'}}
                      label={{name: 'New Password'}}
                      isPassword={true}
                      secureTextEntry={isPasswordSecure.pw2}
                      inputName="newPassword"
                      onChangeText={value =>
                        onChangeInput(value, 'newPassword')
                      }
                      onPress={() => {
                        setIsPasswordSecure({
                          ...isPasswordSecure,
                          pw2: !isPasswordSecure.pw2,
                        });
                        return false;
                      }}
                      icon={{
                        icon: isPasswordSecure.pw2 ? 'eye-slash' : 'eye',
                        color: '#2583E6',
                      }}
                      hasError={FORM.errors.newPassword}
                    />
                    <FormInput
                      formInputStyle={{flex: 1, marginLeft: 5}}
                      labelStyle={{fontSize: 11, fontWeight: 'normal'}}
                      label={{name: 'Confirm New Password'}}
                      isPassword={true}
                      secureTextEntry={isPasswordSecure.pw3}
                      inputName="newPassword_confirmation"
                      onChangeText={value =>
                        onChangeInput(value, 'newPassword_confirmation')
                      }
                      onPress={() => {
                        setIsPasswordSecure({
                          ...isPasswordSecure,
                          pw3: !isPasswordSecure.pw3,
                        });
                        return false;
                      }}
                      icon={{
                        icon: isPasswordSecure.pw3 ? 'eye-slash' : 'eye',
                        color: '#2583E6',
                      }}
                      hasError={FORM.errors.newPassword_confirmation}
                      errorMsg={
                        FORM.accountForm.newPassword !=
                        FORM.accountForm.newPassword_confirmation
                          ? 'Password does not match'
                          : 'This field is required'
                      }
                    />
                  </View>
                  <View style={styles.resetStyle}>
                    <Text style={{fontSize: 11, marginRight: 5}}>
                      Can't remember your current password?
                    </Text>
                    <TouchableOpacity onPress={() => onResetViaEmail()}>
                      <Text style={styles.resetText}>Reset Via Email</Text>
                    </TouchableOpacity>
                  </View>
                </View>
              )}
            </View>

            <View style={styles.colBottom}></View>
          </View>
        </ScrollView>
      </KeyboardAwareScrollView>
    </SafeAreaView>
  );
};

export default EditProfileScreen;

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
  firstInput: {
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
    color: 'black',
    paddingLeft: 15,
    paddingRight: 15,
    borderWidth: 1,
    borderRadius: 0.2,
    borderColor: '#BAD8F7',
    backgroundColor: '#F5FBFF',
  },
  textAreaInput: {
    flexDirection: 'column',
    height: 150,
    marginTop: 15,
    margin: 5,
  },
  textArea: {
    flex: 1,
    color: 'black',
    paddingHorizontal: 15,
    paddingTop: 15,
    borderWidth: 1,
    borderRadius: 0.2,
    borderColor: '#BAD8F7',
    backgroundColor: '#F5FBFF',
    minHeight: 100,
  },
  textAreaInputLabelStyle: {
    flex: 0,
    flexDirection: 'row',
    alignContent: 'space-between',
  },
  inputLabelText: {
    marginBottom: 10,
    fontWeight: 'bold',
    flexBasis: 150,
  },
  subLabelText: {
    marginTop: 3,
    fontSize: 11,
    flexBasis: 95,
  },
  hrStyle: {
    borderBottomWidth: 0.2,
    borderColor: '#555',
    padding: 10,
  },
  rowInputstyle: {
    flex: 0,
    flexDirection: 'row',
    alignContent: 'space-between',
  },
  resetStyle: {
    flex: 0,
    flexDirection: 'row',
    marginTop: 10,
  },
  resetText: {
    fontSize: 11,
    fontWeight: 'bold',
    color: '#2583E6',
  },
  changePwBtn: {
    marginTop: 10,
    backgroundColor: '#2583E6',
    borderWidth: 0,
    color: '#FFFFFF',
    borderColor: '#2583E6',
    alignItems: 'center',
    borderRadius: 3,
    padding: 15,
    width: '50%',
  },
  changePwBtnTextStyle: {
    color: '#FFFFFF',
    fontSize: 12,
    fontWeight: 'bold',
  },
});
