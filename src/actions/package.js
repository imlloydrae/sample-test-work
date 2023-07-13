import AsyncStorage from '@react-native-async-storage/async-storage';
import TYPES from './type';
import PackageService from '../services/package.service';

export const listPackages = async dispatch => {
  const TOKEN = await AsyncStorage.getItem('__k');
  dispatch({type: TYPES.LIST_PACKAGES_LOAD});

  return PackageService.listPackages(TOKEN).then(
    response => {
      if (response.data.length > 0) {
        response.data.map(i => {
          i['count'] = 0;

          return i;
        });

        dispatch({
          type: TYPES.LIST_PACKAGES_OK,
          payload: response.data,
        });

        return Promise.resolve();
      } else {
        dispatch({type: TYPES.LIST_PACKAGES_FAILED});
        return Promise.reject('No results found!');
      }
    },
    error => {
      return Promise.reject(error.toString());
    },
  );
};

export const increaseCount = id => {
  return {type: TYPES.INCREASE_API_COUNT, payload: id};
};

export const decreaseCount = id => {
  return {type: TYPES.DECREASE_API_COUNT, payload: id};
};
