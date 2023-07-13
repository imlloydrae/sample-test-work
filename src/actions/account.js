import AsyncStorage from '@react-native-async-storage/async-storage';
import TYPES from './type';
import AccountService from '../services/account.service';

export const getAccount = async dispatch => {
  const TOKEN = await AsyncStorage.getItem('__k');
  dispatch({type: TYPES.GET_ACCOUNT_LOAD});

  return AccountService.getAccount(TOKEN).then(
    response => {
      dispatch({
        type: TYPES.GET_ACCOUNT_OK,
        payload: response.data,
      });

      dispatch({
        type: TYPES.UPDATE_ACCOUNT_FORM,
        payload: {
          accountForm: {
            email: response.data.email,
            username: response.data.username,
            firstname: response.data.firstname,
            lastname: response.data.lastname,
          },
        },
      });

      return Promise.resolve();
    },
    error => {
      dispatch({type: TYPES.GET_ACCOUNT_FAILED});
      return Promise.reject(error.toString());
    },
  );
};

export const updateAccount = data => async dispatch => {
  const TOKEN = await AsyncStorage.getItem('__k');

  return AccountService.updateAccount(TOKEN, data).then(
    response => {
      if (response.errors) {
        return Promise.reject(response.message);
      } else {
        return Promise.resolve();
      }
    },
    error => {
      return Promise.reject(error.toString());
    },
  );
};

export const disableAuth = async dispatch => {
  const TOKEN = await AsyncStorage.getItem('__k');

  return AccountService.disableAuth(TOKEN).then(
    response => {
      if (response.errors) {
        return Promise.reject(response.message);
      } else {
        return Promise.resolve(response.message);
      }
    },
    error => {
      return Promise.reject(error.toString());
    },
  );
};

export const resetAccountForm = () => {
  return {type: TYPES.RESET_ACCOUNT_FORM};
};

export const updateAccountForm = form => {
  return {type: TYPES.UPDATE_ACCOUNT_FORM, payload: form};
};
