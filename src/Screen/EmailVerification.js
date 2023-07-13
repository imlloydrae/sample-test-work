import React from 'react';
import {
  Image,
  View,
  SafeAreaView,
  StyleSheet,
  Text,
  TouchableOpacity,
} from 'react-native';

import IMAGES from '../constants/images';

const EmailVerification = ({navigation}) => {
  return (
    <SafeAreaView style={styles.mainBody}>
      <View style={styles.container}>
        <View style={styles.colTop}>
          <Image
            source={IMAGES.EMAIL_VER}
            style={styles.image}
            resizeMode="stretch"
          />
        </View>
        <View style={styles.colMiddle}>
          <Text style={styles.title}>Email Verification</Text>
          <Text style={{color: '#000'}}>
            Could you please confirm your email address by clicking on the link
            that was just emailed to you before proceeding? If you did not
            receive the email, please let us know and we will send it to you
            again.
          </Text>
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
            onPress={() => navigation.navigate('LoginScreen')}
            underlayColor="#fff">
            <Text style={styles.loginText}>Resend Verification</Text>
          </TouchableOpacity>
        </View>
      </View>
    </SafeAreaView>
  );
};

export default EmailVerification;

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
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
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
    paddingTop: 10,
    backgroundColor: '#2583E6',
    height: 45,
    borderRadius: 3,
  },
  loginText: {
    color: 'white',
    textAlign: 'center',
    paddingLeft: 30,
    paddingRight: 30,
    fontSize: 18,
    fontWeight: 'bold',
  },
  sectionStyle: {
    flexDirection: 'column',
    height: 50,
    marginTop: 60,
    margin: 5,
  },
  labelText: {
    marginBottom: 10,
    fontWeight: 'bold',
  },
  inputStyle: {
    flex: 1,
    color: 'white',
    paddingLeft: 15,
    paddingRight: 15,
    borderWidth: 1,
    borderRadius: 1,
    borderColor: '#F5FBFF',
    backgroundColor: '#F5FBFF',
  },
  image: {
    width: '85%',
    height: '80%',
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
