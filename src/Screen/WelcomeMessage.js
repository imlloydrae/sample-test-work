import React, {useState, useEffect} from 'react';
import {Image, View, StyleSheet, Text, TouchableOpacity} from 'react-native';

import LinearGradient from 'react-native-linear-gradient';
import IMAGES from '../constants/images';

const WelcomeMessage = ({navigation}) => {
  return (
    <LinearGradient colors={['#2583E6', '#FFFFFF']} style={styles.mainBody}>
      <View style={styles.container}>
        <View style={styles.colTop}>
          <Image
            source={IMAGES.MESSAGE}
            style={styles.image}
            resizeMode="stretch"
          />
        </View>
        <View style={styles.colMiddle}>
          <Text style={styles.title}>Messaging</Text>
          <Text style={styles.title}>
            <Text style={styles.forgotPwStyle}>Empowers</Text> You!
          </Text>
          {/* <Text style={{color: '#000'}}>
            Welcome! Lorem ipsum dolor sit amet, consectetur adipiscing elit.
            Donec euismod lacus varius risus hendreit consequat. Etiam non risus
            elementum.
          </Text> */}
        </View>
        <View style={styles.colBottom}>
          <TouchableOpacity
            onPress={() => navigation.navigate('WelcomeSplash')}
            style={{marginTop: 30, flexDirection: 'row'}}>
            <View style={styles.circle} />
            <View style={styles.rectangle} />
          </TouchableOpacity>
          <TouchableOpacity
            style={styles.loginScreenButton}
            onPress={() => navigation.navigate('LoginScreen')}
            underlayColor="#fff">
            <Text style={styles.loginText}>Done</Text>
          </TouchableOpacity>
        </View>
      </View>
    </LinearGradient>
  );
};

export default WelcomeMessage;

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
    flex: 0.25,
    marginBottom: 30,
  },
  title: {
    color: '#000',
    fontSize: 30,
    fontWeight: 'bold',
  },
  colBottom: {
    flex: 0.25,
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  loginScreenButton: {
    marginTop: 10,
    paddingTop: 10,
    backgroundColor: '#C8E0F9',
    height: 45,
    borderRadius: 3,
  },
  loginText: {
    color: '#2583E6',
    textAlign: 'center',
    paddingLeft: 40,
    paddingRight: 40,
    fontSize: 18,
    fontWeight: 'bold',
  },
  forgotPwStyle: {
    color: '#2583E6',
    margin: 8,
  },
  image: {
    width: '85%',
    height: '60%',
  },
  rectangle: {
    borderRadius: 4,
    height: 2,
    width: 15,
    borderWidth: 0.1,
    backgroundColor: '#2583E6',
    padding: 4,
    marginHorizontal: 3,
  },
  circle: {
    borderRadius: 5,
    height: 2,
    width: 2,
    borderWidth: 0.1,
    backgroundColor: '#2583E6',
    opacity: 0.5,
    padding: 4,
  },
});
