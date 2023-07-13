import React, {useEffect, useState} from 'react';
import {
  Alert,
  StyleSheet,
  View,
  Text,
  Image,
  TouchableOpacity,
  SafeAreaView,
} from 'react-native';
import FontAwesome from 'react-native-vector-icons/FontAwesome';
import {KeyboardAwareScrollView} from 'react-native-keyboard-aware-scroll-view';
import {useDispatch, useSelector} from 'react-redux';

import Loader from './Components/Loader';
import FormInput from './Components/FormInput';
import IMAGES from '../constants/images';
import {login, resetLoginForm, resendOtp} from '../actions/auth';
import {obfuscateText} from '../libraries/helpers';

const OTPScreen = ({navigation}) => {
  const dispatch = useDispatch();
  const FORM = useSelector(state => state.loginFormReducer);
  const {authResponse} = useSelector(state => state.authReducer);

  const [loading, setLoading] = useState(false);
  const [enbaleResend, setEnbaleResend] = useState(false);
  const [otpPin, setOtpPin] = useState(null);
  const [counter, setCounter] = useState(120);
  const [resendCount, setResendCount] = useState(0);

  /* INIT */
  useEffect(() => {
    if (counter > 0) {
      setTimeout(() => setCounter(counter - 1), 1000);
    } else {
      setEnbaleResend(true);
    }
  }, [counter]);

  /* FUNCTIONS */
  const onVerifyOtp = () => {
    if (otpPin == null || otpPin == '') {
      Alert.alert('Invalid OTP');
      return;
    }

    let user = FORM.loginForm;
    user['otp'] = otpPin;

    setLoading(true);
    dispatch(login(user))
      .then(response => {
        setLoading(false);
        if (response.token) {
          setResendCount(0);
          dispatch(resetLoginForm());
          navigation.navigate('DrawerNavigationRoutes');
        }
      })
      .catch(error => {
        setLoading(false);
        Alert.alert('Error', error);
      });
  };

  const onResendOtp = type => {
    setResendCount(resendCount + 1);

    let form = {
      id: authResponse.id,
      count: resendCount + 1,
    };

    if (type == 1) form['phone'] = authResponse.phone;
    else form['email'] = authResponse.email;

    setLoading(true);
    dispatch(resendOtp(form))
      .then(response => {
        setLoading(false);
        if (response.otp_resent) {
          setEnbaleResend(false);
          setCounter(120);
        }
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
          <View style={styles.colTop}>
            <View>
              <TouchableOpacity
                style={styles.radioItem}
                onPress={() => navigation.replace('LoginScreen')}>
                <Image
                  source={IMAGES.IC_BACK_BLACK}
                  style={styles.backButton}
                />
                <Text style={styles.pageLabel}>Back to Login</Text>
              </TouchableOpacity>
            </View>
          </View>
          <View style={styles.colMiddle}>
            <View style={styles.otpImage}>
              <FontAwesome name={'mobile'} color={'#2583E6'} size={150} />
              <Text style={styles.noteText}>
                {authResponse.message}
                <Text style={styles.userNumber}>
                  {authResponse.twoFactorAuthenticationtype == 1
                    ? ` ending in ${obfuscateText(1, authResponse.phone)}`
                    : ` ${obfuscateText(2, authResponse.email)}`}
                </Text>
              </Text>
            </View>
            <View style={styles.otpBox}>
              <FormInput
                formInputStyle={{marginTop: 0, width: '30%'}}
                labelStyle={{display: 'none'}}
                inputBoxStyle={{textAlign: 'center', paddingRight: 0}}
                label={{name: ''}}
                inputName="otp_pin"
                onChangeText={value => setOtpPin(value)}
                hasError={false}
              />
            </View>
            <View style={styles.otpBox}>
              <Text style={styles.noteText}>
                Did not receive code?{' '}
                {!enbaleResend ? (
                  <Text style={{...styles.userNumber, color: '#bbb'}}>
                    RESEND OTP
                    <Text style={{color: '#bbb'}}>{`(in ${counter})`}</Text>
                  </Text>
                ) : (
                  <Text
                    style={styles.resendText}
                    onPress={() =>
                      onResendOtp(authResponse.twoFactorAuthenticationtype)
                    }>
                    {authResponse.twoFactorAuthenticationtype == 1
                      ? `RESEND VIA SMS`
                      : `RESEND VIA EMAIL`}
                  </Text>
                )}
              </Text>
            </View>
            <View style={styles.otpVerify}>
              <TouchableOpacity
                style={{
                  ...styles.otpBtn,
                  backgroundColor:
                    otpPin == null || otpPin == '' ? '#bbb' : '#2583e6',
                }}
                onPress={() => onVerifyOtp()}
                disabled={otpPin == null || otpPin == ''}>
                <Text style={styles.otpBtnText}>SUBMIT</Text>
              </TouchableOpacity>
            </View>
          </View>
          <View style={styles.colBottom}></View>
        </View>
      </KeyboardAwareScrollView>
    </SafeAreaView>
  );
};

export default OTPScreen;

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
    marginTop: 20,
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
  otpImage: {
    flex: 0,
    marginTop: 10,
    marginBottom: 10,
    flexDirection: 'column',
    justifyContent: 'center',
    alignContent: 'center',
    alignItems: 'center',
    paddingTop: 50,
  },
  otpBox: {
    flexDirection: 'row',
    justifyContent: 'center',
    alignContent: 'center',
    alignItems: 'center',
    marginTop: 20,
  },
  otpText: {
    height: 55,
    margin: 10,
    borderWidth: 1,
    padding: 12,
    width: 40,
    backgroundColor: '#f5fbff',
    color: 'gray',
    borderColor: '#2583e6',
    borderRadius: 5,
    borderWidth: 0.4,
    fontSize: 20,
    alignItems: 'center',
    justifyContent: 'center',
  },
  otpBtn: {
    width: '100%',
    height: 50,
    color: '#000',
    alignItems: 'center',
    padding: 15,
  },
  otpBtnText: {
    color: '#fff',
    fontSize: 15,
    fontWeight: 'bold',
  },
  userNumber: {
    fontWeight: 'bold',
    color: '#000',
  },
  noteText: {
    fontSize: 13,
    color: '#000',
    textAlign: 'center',
  },
  otpVerify: {
    marginTop: 15,
  },
  resendText: {
    fontWeight: 'bold',
    fontSize: 11,
    color: '#2583e6',
  },
});
