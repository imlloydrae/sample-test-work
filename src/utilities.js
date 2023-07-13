import {Platform} from 'react-native';
export const getDeepLink = (path = '') => {
  const scheme = 'itexmo';
  const prefix = Platform.OS == 'android' ? `${scheme}://` : `${scheme}://`;
  return prefix + path;
};
