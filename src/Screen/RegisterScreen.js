import React, {useState, useEffect} from 'react';
import {
  Alert,
  StyleSheet,
  View,
  Text,
  TouchableOpacity,
  ImageBackground,
} from 'react-native';
import {KeyboardAwareScrollView} from 'react-native-keyboard-aware-scroll-view';
import {useDispatch, useSelector} from 'react-redux';
import Modal from 'react-native-modal';

import CustomModal from './Components/CustomModal';
import FormInput from './Components/FormInput';
import Loader from './Components/Loader';
import {resetScreenState} from '.././libraries/helpers';
import {register, resetRegForm, updateRegForm} from '../actions/auth';

const RegisterScreen = ({navigation}) => {
  const dispatch = useDispatch();

  const FORM = useSelector(state => state.registrationReducer);
  const [visible, setVisible] = useState(true);
  const [loading, setLoading] = useState(false);
  const [isPasswordSecure, setIsPasswordSecure] = useState(true);
  const [isPasswordConfirmSecure, setIsPasswordConfirmSecure] = useState(true);

  useEffect(() => {
    dispatch(resetRegForm());
  }, []);

  /* FUNCTIONS */
  const onChangeValue = (key, value) => {
    value === ''
      ? dispatch(updateRegForm({errors: {...FORM.errors, [key]: true}}))
      : dispatch(updateRegForm({errors: {...FORM.errors, [key]: false}}));

    dispatch(
      updateRegForm({
        regForm: {
          ...FORM.regForm,
          [key]: value,
        },
      }),
    );
  };

  const onSubmitRegistration = () => {
    setLoading(true);
    dispatch(register(FORM.regForm))
      .then(response => {
        setLoading(false);
        dispatch(resetRegForm());
        setVisible(!visible);
      })
      .catch(error => {
        setLoading(false);
        Alert.alert('Error', error);
      });
  };

  return (
    <ImageBackground style={styles.mainBody} source={IMAGES.BG_REGISTER}>
      <Loader visible={loading} />
      <CustomModal
        isVisible={!visible}
        alertLabel="Success!"
        alertMsg="Your have successfully registered."
        buttonText="Login"
        isClosed={() => setVisible(!visible)}
        onPress={() => {
          setVisible(!visible);
          resetScreenState(navigation, 'RegisterScreen');
          navigation.navigate('LoginScreen');
        }}
      />
      <KeyboardAwareScrollView behavior="padding" style={styles.container}>
        <View style={styles.colTop}>
          <Text style={styles.loginLabel}>Hi, There!</Text>
        </View>
        <View style={styles.colMiddle}>
          <FormInput
            inputBoxStyle={{backgroundColor: '#fff'}}
            inputStyle={{backgroundColor: '#fff'}}
            label={{name: 'First Name'}}
            inputName="firstname"
            placeholder="Eg: Joseph"
            onChangeText={value => onChangeValue('firstname', value)}
            hasError={FORM.errors.firstname}
          />

          <FormInput
            inputBoxStyle={{backgroundColor: '#fff'}}
            inputStyle={{backgroundColor: '#fff'}}
            label={{name: 'Last Name'}}
            inputName="lastname"
            placeholder="Eg: Morris"
            onChangeText={value => onChangeValue('lastname', value)}
            hasError={FORM.errors.lastname}
          />

          <FormInput
            inputBoxStyle={{backgroundColor: '#fff'}}
            inputStyle={{backgroundColor: '#fff'}}
            label={{name: 'Email Address'}}
            inputName="email"
            keyboardType="email-address"
            placeholder="Eg: Joseph.Morris@Email.Com"
            onChangeText={value => onChangeValue('email', value)}
            hasError={FORM.errors.email}
          />

          <FormInput
            inputBoxStyle={{backgroundColor: '#fff'}}
            inputStyle={{backgroundColor: '#fff'}}
            label={{name: 'Username'}}
            inputName="username"
            placeholder="Eg: Joseph123"
            onChangeText={value => onChangeValue('username', value)}
            hasError={FORM.errors.username}
          />

          <FormInput
            isPassword={true}
            inputStyle={{backgroundColor: '#fff'}}
            inputBoxStyle={{backgroundColor: '#fff'}}
            label={{name: 'Password'}}
            inputName="password"
            secureTextEntry={isPasswordSecure}
            onChangeText={value => onChangeValue('password', value)}
            onPress={() => {
              setIsPasswordSecure(!isPasswordSecure);
              return false;
            }}
            icon={{
              icon: isPasswordSecure ? 'eye-slash' : 'eye',
              color: '#2583E6',
            }}
            hasError={FORM.errors.password}
          />

          <FormInput
            isPassword={true}
            inputStyle={{backgroundColor: '#fff'}}
            inputBoxStyle={{backgroundColor: '#fff'}}
            label={{name: 'Confirm Password'}}
            inputName="password_confirmation"
            secureTextEntry={isPasswordConfirmSecure}
            onChangeText={value =>
              onChangeValue('password_confirmation', value)
            }
            onPress={() => {
              setIsPasswordConfirmSecure(!isPasswordConfirmSecure);
              return false;
            }}
            icon={{
              icon: isPasswordConfirmSecure ? 'eye-slash' : 'eye',
              color: '#2583E6',
            }}
            hasError={FORM.errors.password_confirmation}
          />

          <TouchableOpacity
            style={styles.buttonStyle}
            activeOpacity={0.5}
            onPress={() => onSubmitRegistration()}>
            <Text style={styles.buttonTextStyle}>Sign Up</Text>
          </TouchableOpacity>
        </View>
        <View style={styles.colBottom}>
          <Text
            style={styles.registerTextStyle}
            onPress={() => navigation.navigate('LoginScreen')}>
            Already Have An Account?{' '}
            <Text style={styles.forgotPwStyle}>Sign in</Text>
          </Text>
        </View>
      </KeyboardAwareScrollView>
    </ImageBackground>
  );
};
export default RegisterScreen;

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
    marginTop: 50,
  },
  colTop: {
    flex: 0,
    marginTop: 10,
  },
  colMiddle: {
    flex: 1,
    paddingVertical: 20,
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
  loginText: {
    fontSize: 15,
  },
  firstNameStyle: {
    flexDirection: 'column',
    height: 70,
    marginTop: 40,
    margin: 5,
  },
  sectionStyle: {
    flexDirection: 'column',
    height: 70,
    marginTop: 15,
    margin: 5,
  },
  labelText: {
    marginBottom: 10,
    fontWeight: 'bold',
    color: '#000',
  },
  passwordSection: {
    flexDirection: 'column',
    height: 70,
    marginTop: 15,
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
    borderRadius: 0.2,
    borderColor: '#BAD8F7',
    backgroundColor: '#F5FBFF',
  },
  registerTextStyle: {
    color: '#000',
    textAlign: 'center',
    fontSize: 14,
    alignSelf: 'center',
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
  },
});
