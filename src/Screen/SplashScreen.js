import React, {useState, useEffect} from 'react';
import {ActivityIndicator, Image, StyleSheet, View} from 'react-native';

import AsyncStorage from '@react-native-async-storage/async-storage';

const SplashScreen = ({navigation}) => {
  const [animating, setAnimating] = useState(true);

  useEffect(() => {
    setTimeout(() => {
      setAnimating(false);
      AsyncStorage.getItem('user_id').then(value =>
        navigation.replace(value === null ? 'Auth' : 'DrawerNavigationRoutes'),
      );
    }, 5000);
  }, []);

  return (
    <View style={styles.container}>
      <Image
        source={require('../assets/logo_gif.gif')}
        style={{width: '100%', resizeMode: 'center', margin: 30}}
      />
      <ActivityIndicator
        animating={animating}
        color="#fff"
        size="large"
        style={styles.activityIndicator}
      />
    </View>
  );
};

export default SplashScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    backgroundColor: '#fcfcf9',
  },
  activityIndicator: {
    alignItems: 'center',
    height: 80,
  },
});
