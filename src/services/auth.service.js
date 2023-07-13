import AsyncStorage from '@react-native-async-storage/async-storage';
import {REACT_APP_PROD_BASE_URL} from '@env';

const logIn = async user => {
  let options = {
    method: 'POST',
    headers: {
      Accept: 'application/json',
      'Content-type': 'application/json',
    },
    body: JSON.stringify(user),
  };

  return await fetch(`${REACT_APP_PROD_BASE_URL}/api/login`, options)
    .then(response => response.json())
    .then(json => json)
    .catch(error => error.json());
};

const register = async data => {
  let options = {
    method: 'POST',
    headers: {
      Accept: 'application/json',
      'Content-type': 'application/json',
    },
    body: JSON.stringify(data),
  };

  return await fetch(`${REACT_APP_PROD_BASE_URL}/api/register`, options)
    .then(response => response.json())
    .then(json => json)
    .catch(error => error.json());
};

const forgotPassword = async user => {
  let options = {
    method: 'POST',
    headers: {
      Accept: 'application/json',
      'Content-type': 'application/json',
    },
    body: JSON.stringify(user),
  };

  return await fetch(`${REACT_APP_PROD_BASE_URL}/api/forgot-password`, options)
    .then(response => response.json())
    .then(json => json)
    .catch(error => error.json());
};

const changePassword = async user => {
  let options = {
    method: 'POST',
    headers: {
      Accept: 'application/json',
      'Content-type': 'application/json',
    },
    body: JSON.stringify(user),
  };

  return await fetch(`${REACT_APP_PROD_BASE_URL}/api/change-password`, options)
    .then(response => response.json())
    .then(json => json)
    .catch(error => error.json());
};

const resendOtp = async form => {
  let options = {
    method: 'POST',
    headers: {
      Accept: 'application/json',
      'Content-type': 'application/json',
    },
    body: JSON.stringify(form),
  };

  return await fetch(`${REACT_APP_PROD_BASE_URL}/api/login-otp-resend`, options)
    .then(response => response.json())
    .then(json => json)
    .catch(error => error.json());
};

const logOut = async () => {
  await AsyncStorage.clear();
  return {
    status: '200',
    message: 'You are logged out',
  };
};

export default {
  logIn,
  register,
  logOut,
  forgotPassword,
  changePassword,
  resendOtp,
};
