import 'react-native-gesture-handler';

import React, {useEffect} from 'react';
import {NavigationContainer} from '@react-navigation/native';
import {createStackNavigator} from '@react-navigation/stack';
import {Provider as StoreProvider, useDispatch} from 'react-redux';
import GetLocation from 'react-native-get-location';

import store from './src/store';
import SplashScreen from './src/Screen/SplashScreen';
import LoginScreen from './src/Screen/LoginScreen';
import RegisterScreen from './src/Screen/RegisterScreen';
import DrawerNavigationRoutes from './src/Screen/DrawerNavigatorRoutes';
import WelcomeSplash from './src/Screen/WelcomeSplash';
import WelcomeMessage from './src/Screen/WelcomeMessage';
import ForgotPassword from './src/Screen/ForgotPassword';
import EmailVerification from './src/Screen/EmailVerification';
import OTPScreen from './src/Screen/OTPScreen';
import {setCurrentLocation} from './src/actions/auth';
import { getTrackingStatus, requestTrackingPermission } from 'react-native-tracking-transparency';


const Stack = createStackNavigator();

const Auth = () => {
  return (
    <Stack.Navigator initialRouteName="WelcomeSplash">
      {/* <Stack.Screen
        name="WelcomeSplash"
        component={WelcomeSplash}
        options={{headerShown: false}}
      />
      <Stack.Screen
        name="WelcomeMessage"
        component={WelcomeMessage}
        options={{headerShown: false}}
      /> */}

      <Stack.Screen
        name="LoginScreen"
        component={LoginScreen}
        options={{headerShown: false}}
      />
      <Stack.Screen
        name="OTPScreen"
        component={OTPScreen}
        options={{headerShown: false}}
      />
      <Stack.Screen
        name="RegisterScreen"
        component={RegisterScreen}
        options={{headerShown: false}}
        r
      />
      <Stack.Screen
        name="ForgotPassword"
        component={ForgotPassword}
        options={{headerShown: false}}
      />
      <Stack.Screen
        name="EmailVerification"
        component={EmailVerification}
        options={{headerShown: false}}
      />
    </Stack.Navigator>
  );
};

const MainApp = () => {
  const dispatch = useDispatch();

  useEffect(() => {
    trackingPermission();
  }, []);

  
  const trackingPermission = async () => {
    try {
      const status = await requestTrackingPermission();
      console.log('Tracking Authorization Status:', status);
      switch (status) {
        case 'authorized':
          getCurrentLocation();
          break;
        case 'denied':
            console.log('location is not available')
          break;
        case 'not-determined':
            trackingPermission();
          break;
        case 'restricted':
          console.log('location is not available')
          break;
        default:
          break;
      }
    } catch (error) {
      console.log('Error requesting tracking authorization:', error);
    }
  };

  
  const getCurrentLocation = async () => {
    GetLocation.getCurrentPosition({
      enableHighAccuracy: true,
      timeout: 60000,
    })
      .then(location => {
        fetch(
          `https://maps.googleapis.com/maps/api/geocode/json?address=${location.latitude},${location.longitude}&key=AIzaSyBRcBLOD7ZOxKpcyJAMA-qOLx-zHBZJAEI`,
        )
          .then(response => response.json())
          .then(responseJson => {
            dispatch(
              setCurrentLocation({
                city: responseJson.results[0].address_components[2].long_name,
                country:
                  responseJson.results[0].address_components[4].long_name,
                geometry: responseJson.results[0].geometry.location,
              }),
            );
          });
      })
      .catch(error => {
        const {code, message} = error;
        console.warn(code, message);
      });
  };

  return (
    <NavigationContainer>
      <Stack.Navigator initialRouteName="SplashScreen">
        <Stack.Screen
          name="SplashScreen"
          component={SplashScreen}
          options={{headerShown: false}}
        />
        <Stack.Screen
          name="Auth"
          component={Auth}
          options={{headerShown: false}}
        />
        <Stack.Screen
          name="DrawerNavigationRoutes"
          component={DrawerNavigationRoutes}
          options={{headerShown: false}}
        />
      </Stack.Navigator>
    </NavigationContainer>
  );
};

const App = () => {
  return (
    <StoreProvider store={store}>
      <MainApp />
    </StoreProvider>
  );
};

export default App;
