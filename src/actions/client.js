import AsyncStorage from '@react-native-async-storage/async-storage';
import TYPES from './type';
import ClientService from '../services/client.service';

export const getPersonalInfo = async dispatch => {
  const TOKEN = await AsyncStorage.getItem('__k');

  return ClientService.getPersonalInfo(TOKEN).then(
    response => {
      if (response.length > 0) {
        dispatch({
          type: TYPES.GET_CLIENT_PERSONAL_INFO_OK,
          payload: response[0],
        });

        return Promise.resolve();
      } else {
        dispatch({
          type: TYPES.GET_CLIENT_PERSONAL_INFO_OK,
          payload: {},
        });
        return Promise.reject('No results found!');
      }
    },
    error => {
      return Promise.reject(error.toString());
    },
  );
};

export const getSavedRecords = async dispatch => {
  const TOKEN = await AsyncStorage.getItem('__k');

  return ClientService.getSavedRecords(TOKEN).then(
    response => {
      if (Object.keys(response).length > 0) {
        dispatch({
          type: TYPES.GET_CLIENT_SAVED_RECORDS_OK,
          payload: response,
        });

        return Promise.resolve();
      } else {
        return Promise.reject('No results found!');
      }
    },
    error => {
      return Promise.reject(error.toString());
    },
  );
};

export const listApiCodes = async dispatch => {
  const TOKEN = await AsyncStorage.getItem('__k');
  dispatch({type: TYPES.LIST_APICODES_LOAD});

  return ClientService.listApiCodes(TOKEN).then(
    response => {
      if (response.data.length > 0) {
        dispatch({
          type: TYPES.LIST_APICODES_OK,
          payload: response.data,
        });

        return Promise.resolve();
      } else {
        return Promise.reject('No results found!');
      }
    },
    error => {
      return Promise.reject(error.toString());
    },
  );
};

export const listTransactions = async dispatch => {
  const TOKEN = await AsyncStorage.getItem('__k');
  dispatch({type: TYPES.LIST_TRANSACTIONS_LOAD});
  return ClientService.listTransactions(TOKEN).then(
    response => {
      if (response.errors) {
        return Promise.reject('No results found!');
      } else {
        if (response.transactions) {
          let arr = [];

          Object.keys(response.transactions).map(i => {
            arr.push(response.transactions[i]);
          });

          arr = arr.filter(i => i.transaction_type == 2);

          dispatch({
            type: TYPES.LIST_TRANSACTIONS_OK,
            payload: arr,
          });

          return Promise.resolve();
        } else {
          return Promise.reject('No results found!');
        }
      }
    },
    error => {
      return Promise.reject(error.toString());
    },
  );
};
