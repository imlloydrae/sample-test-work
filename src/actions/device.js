import AsyncStorage from '@react-native-async-storage/async-storage';
import TYPES from './type';
import DeviceService from '../services/device.service';

export const listDevices = async dispatch => {
  const TOKEN = await AsyncStorage.getItem('__k');

  return DeviceService.listDevices(TOKEN).then(
    response => {
      if (response.data) {
        dispatch({
          type: TYPES.LIST_DEVICES_OK,
          payload: response.data,
        });

        return Promise.resolve();
      } else {
        dispatch({type: TYPES.LIST_DEVICES_FAILED});
        return Promise.reject();
      }
    },
    error => {
      dispatch({type: TYPES.LIST_DEVICES_FAILED});
      return Promise.reject(error.toString());
    },
  );
};

export const getDevice = id => async dispatch => {
  const TOKEN = await AsyncStorage.getItem('__k');
  dispatch({type: TYPES.GET_DEVICE_LOAD});

  return DeviceService.getDevice(TOKEN, id).then(
    response => {
      if (response.message) {
        return Promise.reject(response.message);
      } else {
        dispatch({
          type: TYPES.GET_DEVICE_OK,
          payload: response.data,
        });

        return Promise.resolve();
      }
    },
    error => {
      dispatch({type: TYPES.GET_DEVICE_FAILED});
      return Promise.reject(error.toString());
    },
  );
};

export const logoutDevice = data => async dispatch => {
  const TOKEN = await AsyncStorage.getItem('__k');

  return DeviceService.logoutDevice(TOKEN, data).then(
    response => {
      // if (!response) {
      //   return Promise.reject(response.message);
      // } else {
      return Promise.resolve();
      // }
    },
    error => {
      return Promise.reject(error.toString());
    },
  );
};
