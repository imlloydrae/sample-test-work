import React, {useState, useEffect} from 'react';
import {
  Alert,
  Image,
  View,
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  ImageBackground,
} from 'react-native';
import {useDispatch} from 'react-redux';
import {KeyboardAwareScrollView} from 'react-native-keyboard-aware-scroll-view';

import Loader from './Components/Loader';
import IMAGES from '../constants/images';
import {forgotPassword} from '../actions/auth';

const ForgotPassword = ({navigation}) => {
  const dispatch = useDispatch();

  const [loading, setLoading] = useState(false);
  const [userEmail, setUserEmail] = useState('');

  const onSend = () => {
    let reg = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w\w+)+$/;
    if (!userEmail) {
      alert('Please fill Email');
      return;
    }
    if (reg.test(userEmail) === false) {
      Alert.alert('Invalid Email', 'Please check your email format.');
    } else {
      let user = {email: userEmail};

      setLoading(true);
      dispatch(forgotPassword(user))
        .then(response => {
          setLoading(false);
          setUserEmail('');
          Alert.alert('Success', response.message);
        })
        .catch(error => {
          setLoading(false);
          Alert.alert('Error', error);
        });
    }
  };

  return (
    <View style={styles.mainBody}>
      <Loader visible={loading} />
      <KeyboardAwareScrollView style={styles.container}>
        <View style={styles.colTop}>
          <View style={{height: 300, alignItems: 'center'}}>
            <Image
              source={IMAGES.FORGOT_PW}
              style={styles.image}
              resizeMode="stretch"
            />
          </View>
        </View>
        <View style={styles.colMiddle}>
          <Text style={styles.title}>Forgot Password</Text>
          <Text style={{color: '#000'}}>
            Forgot your password? Not a problem! Simply enter your email address
            and we will send you a password reset link so you can create a new
            one.
          </Text>
          <View style={styles.sectionStyle}>
            <Text style={styles.labelText}>Email Address</Text>
            <TextInput
              style={styles.inputStyle}
              onChangeText={UserEmail => setUserEmail(UserEmail)}
              placeholder="Eg: Joseph.Morris@email.com" //dummy@abc.com
              placeholderTextColor="#8b9cb5"
              autoCapitalize="none"
              keyboardType="email-address"
              returnKeyType="next"
              underlineColorAndroid="#f000"
              blurOnSubmit={false}
              value={userEmail}
            />
          </View>
        </View>
        <View style={styles.colBottom}>
          <TouchableOpacity
            style={styles.roundBell}
            onPress={() => navigation.navigate('LoginScreen')}
            underlayColor="#fff">
            <Image
              source={IMAGES.IC_B_ARROW}
              style={styles.backIcons}
              resizeMode="contain"
            />
          </TouchableOpacity>
          <TouchableOpacity
            style={styles.loginScreenButton}
            onPress={() => onSend()}
            underlayColor="#fff">
            <Text style={styles.loginText}>Send</Text>
          </TouchableOpacity>
        </View>
      </KeyboardAwareScrollView>
    </View>
  );
};

export default ForgotPassword;

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
    marginTop: 120,
  },
  colMiddle: {
    flex: 1,
  },
  title: {
    color: '#000',
    fontSize: 30,
    fontWeight: 'bold',
    marginBottom: 10,
  },
  colBottom: {
    flex: 0.25,
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  loginScreenButton: {
    marginTop: 10,
    paddingTop: 12,
    backgroundColor: '#2583E6',
    height: 45,
    borderRadius: 3,
  },
  backArrow: {
    marginTop: 10,
    paddingTop: 10,
    height: 45,
    borderRadius: 3,
  },
  loginText: {
    color: 'white',
    textAlign: 'center',
    paddingLeft: 40,
    paddingRight: 40,
    fontSize: 18,
    fontWeight: 'bold',
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
  inputStyle: {
    flex: 1,
    color: 'black',
    paddingLeft: 15,
    paddingRight: 15,
    borderWidth: 1,
    borderRadius: 1,
    borderColor: '#F5FBFF',
    backgroundColor: '#F5FBFF',
  },
  image: {
    width: '85%',
    height: '100%',
  },
  roundBell: {
    width: 40,
    height: 40,
    justifyContent: 'center',
    alignItems: 'center',
    padding: 10,
    marginTop: 10,
  },
  backIcons: {
    width: '100%',
    height: '100%',
  },
});
