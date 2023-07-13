import React, {useEffect, useState, createRef} from 'react';
import {
  Alert,
  Keyboard,
  View,
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  ImageBackground,
  Platform,
} from 'react-native';
import {useDispatch, useSelector} from 'react-redux';
import {KeyboardAwareScrollView} from 'react-native-keyboard-aware-scroll-view';
import FontAwesome from 'react-native-vector-icons/FontAwesome';
import DeviceInfo, {getManufacturer} from 'react-native-device-info';
import AsyncStorage from '@react-native-async-storage/async-storage';

import Loader from './Components/Loader';
import {
  login,
  updateLoginForm,
  resetLoginForm,
  setDeviceInfo,
} from '../actions/auth';

const LoginScreen = ({navigation}) => {
  const dispatch = useDispatch();
  const passwordInputRef = createRef();
  const FORM = useSelector(state => state.loginFormReducer);
  const {locationInfo} = useSelector(state => state.authReducer);

  const [session, setSession] = useState({});
  const [loadingSession, setLoadingSession] = useState(true);
  const [checked, setChecked] = React.useState(false);
  const [isPasswordSecure, setIsPasswordSecure] = useState(true);
  const [userEmail, setUserEmail] = useState('');
  const [userPassword, setUserPassword] = useState('');
  const [loading, setLoading] = useState(false);
  const [asyncDeviceInfo, setAsyncDeviceInfo] = useState({});

  useEffect(() => {
    Promise.all([setLoadingSession(true), getSession()]).then(() =>
      setLoadingSession(false),
    );
    getDataAsync();
  }, []);

  const getSession = async () => {
    let info = await AsyncStorage.getItem('user');
    let token = await AsyncStorage.getItem('token');
    setSession(info);
    // if (info.token != '') {
    //   navigation.navigate('DrawerNavigationRoutes');
    // }
  };

  const getDataAsync = async () => {
    let deviceJSON = {};
    try {
      deviceJSON.manufacturer = await getManufacturer();
      deviceJSON.deviceName = await DeviceInfo.getDeviceName();
      deviceJSON.androidId = await DeviceInfo.getAndroidId();
      deviceJSON.IpAddress = await DeviceInfo.getIpAddress();
      deviceJSON.phoneNumber =
        Platform.OS == 'ios' ? '' : await DeviceInfo.getPhoneNumber();
      deviceJSON.isLocationEnabled = await DeviceInfo.isLocationEnabled();
      deviceJSON.model = DeviceInfo.getModel();
      deviceJSON.UniqueID = await DeviceInfo.getUniqueId();
      try {
        deviceJSON.deviceToken = await DeviceInfo.getDeviceToken();
      } catch (e) {
        console.log(
          'Unable to get device token.Either simulator or not iOS11+',
        );
      }
    } catch (e) {
      console.log('Trouble getting device info ', e);
    }

    dispatch(setDeviceInfo(deviceJSON));
    setAsyncDeviceInfo({...deviceJSON, ...locationInfo});
  };

  const onLogin = () => {
    if (!userEmail) {
      Alert.alert('Please fill username');
      return;
    }
    if (!userPassword) {
      Alert.alert('Please fill password');
      return;
    }
    setLoading(true);

    let user = {
      username: userEmail,
      password: userPassword,
    };

    dispatch(login(user))
      .then(response => {
        setLoading(false);
        if (!response.token) {
          dispatch(
            updateLoginForm({
              loginForm: {
                ...FORM.loginForm,
                username: userEmail,
                password: userPassword,
                device_info: asyncDeviceInfo,
              },
            }),
          );

          navigation.replace('OTPScreen');
        } else {
          dispatch(resetLoginForm());
          navigation.navigate('DrawerNavigationRoutes');
        }
      })
      .catch(error => {
        setLoading(false);
        Alert.alert('Error', error);
      });
  };

  return (
    <ImageBackground style={styles.mainBody} source={IMAGES.BG_REGISTER}>
      <Loader visible={loading} />
      <KeyboardAwareScrollView style={styles.container}>
        <View style={styles.colTop}></View>
        <View style={styles.colMiddle}>
          <Text style={styles.loginLabel}>Login</Text>
          <Text style={styles.sublabel}>
            Welcome Back! Please Enter Your Details
          </Text>
          <View style={styles.sectionStyle}>
            <Text style={styles.labelText}>Username</Text>
            <TextInput
              style={styles.inputStyle}
              onChangeText={UserEmail => setUserEmail(UserEmail)}
              placeholder="Enter Username" //dummy@abc.com
              placeholderTextColor="#8b9cb5"
              autoCapitalize="none"
              keyboardType="email-address"
              returnKeyType="next"
              onSubmitEditing={() =>
                passwordInputRef.current && passwordInputRef.current.focus()
              }
              underlineColorAndroid="#f000"
              blurOnSubmit={false}
            />
          </View>
          <View style={styles.passwordSection}>
            <Text style={styles.labelText}>Password</Text>
            <View style={styles.passwordSectionStyle}>
              <TextInput
                style={styles.passwordStyleText}
                onChangeText={UserPassword => setUserPassword(UserPassword)}
                placeholder="Enter Password"
                placeholderTextColor="#8b9cb5"
                keyboardType="default"
                ref={passwordInputRef}
                onSubmitEditing={Keyboard.dismiss}
                blurOnSubmit={false}
                secureTextEntry={isPasswordSecure}
                underlineColorAndroid="#f000"
                returnKeyType="next"
              />
              <FontAwesome
                name={isPasswordSecure ? 'eye-slash' : 'eye'}
                color={'#2583E6'}
                size={20}
                onPress={() => {
                  setIsPasswordSecure(!isPasswordSecure);
                  return false;
                }}
              />
            </View>
          </View>
          <View style={styles.colExtra}>
            <View style={styles.radioItem}>
              {/* <CheckboxOption
                label="Remember Me"
                labelStyle={{
                  textAlign: 'left',
                  marginTop: '3%',
                  fontSize: 12,
                  fontWeight: 'normal',
                  color: '#000',
                }}
                status={checked ? 'checked' : 'unchecked'}
                onPress={() => setChecked(!checked)}
              /> */}
            </View>
            <View style={{marginTop: '2.5%'}}>
              <Text
                style={styles.forgotPwStyle}
                onPress={() => navigation.navigate('ForgotPassword')}>
                Forgot Password?
              </Text>
            </View>
          </View>
          <TouchableOpacity
            style={styles.buttonStyle}
            activeOpacity={0.5}
            onPress={() => onLogin()}>
            <Text style={styles.buttonTextStyle}>Submit</Text>
          </TouchableOpacity>
        </View>
        <View style={styles.colBottom}>
          {/* <Text
            style={styles.registerTextStyle}
            onPress={() => navigation.navigate('RegisterScreen')}>
            Don't have an account?{' '}
            <Text style={styles.forgotPwStyle}>Sign up for free</Text>
          </Text> */}
        </View>
      </KeyboardAwareScrollView>
    </ImageBackground>
  );
};

export default LoginScreen;

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
    flex: 0.25,
    marginTop: 120,
  },
  colMiddle: {
    flex: 1,
  },
  colExtra: {
    flex: 0.25,
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  title: {
    color: '#000',
    fontSize: 30,
    fontWeight: 'bold',
  },
  colBottom: {
    flex: 0.25,
    flexDirection: 'row',
    justifyContent: 'center',
  },
  loginLabel: {
    fontSize: 30,
    fontWeight: 'bold',
    color: '#000',
  },
  sublabel: {
    color: '#000',
  },
  loginText: {
    fontSize: 15,
    color: '#000',
  },
  sectionStyle: {
    flexDirection: 'column',
    height: 75,
    marginTop: 60,
    margin: 5,
  },
  labelText: {
    marginBottom: 10,
    fontWeight: 'bold',
    color: '#000',
  },
  passwordSection: {
    flexDirection: 'column',
    height: 75,
    marginTop: 20,
    margin: 5,
  },
  buttonStyle: {
    backgroundColor: '#2583E6',
    borderWidth: 0,
    color: '#FFFFFF',
    borderColor: '#2583E6',
    height: 40,
    alignItems: 'center',
    borderRadius: 3,
    marginTop: 20,
    marginBottom: 25,
  },
  buttonTextStyle: {
    color: '#FFFFFF',
    paddingVertical: 10,
    fontSize: 16,
  },
  inputStyle: {
    flex: 1,
    color: 'black',
    paddingLeft: 15,
    paddingRight: 15,
    borderWidth: 1,
    borderRadius: 5,
    borderColor: '#BAD8F7',
  },
  passwordStyleText: {
    flex: 1,
    color: 'black',
    paddingLeft: 15,
    paddingRight: 15,
    borderWidth: 1,
    borderRadius: 5,
    borderColor: '#FFF',
    padding: 15,
  },
  registerTextStyle: {
    color: '#000',
    textAlign: 'center',
    fontSize: 14,
    alignSelf: 'center',
    padding: 10,
  },
  errorTextStyle: {
    color: 'red',
    textAlign: 'center',
    fontSize: 14,
  },
  label: {
    margin: 8,
  },
  forgotPwStyle: {
    color: '#2583E6',
    textDecorationLine: 'underline',
    textDecorationStyle: 'solid',
    textDecorationColor: '#2583E6',
    margin: 8,
    height: 50,
  },
  page: {
    flex: 1,
    resizeMode: 'cover',
    // resizeMode: 'contain',
  },
  radioItem: {
    flexDirection: 'row',
    width: '50%',
    marginLeft: 5,
  },
  textLabel: {
    textAlign: 'left',
    paddingTop: '7%',
    fontSize: 12,
  },
  sectionStyles: {
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    height: 50,
    paddingRight: 20,
  },
  passwordSectionStyle: {
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    borderWidth: 1,
    borderRadius: 5,
    borderColor: '#BAD8F7',
    height: 50,
    paddingRight: 20,
  },
});
