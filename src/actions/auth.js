import AsyncStorage from '@react-native-async-storage/async-storage';
import TYPES from './type';
import AuthService from '../services/auth.service';

export const login = user => dispatch => {
  return AuthService.logIn(user).then(
    response => {
      if (response.errors == 0) {
        delete response.errors;

        if (response.token) {
          AsyncStorage.setItem('user', JSON.stringify(response));
          AsyncStorage.setItem('__k', response.token);

          dispatch({
            type: TYPES.LOGIN_SUCCESS,
            payload: response,
          });

          return Promise.resolve(response);
        } else {
          dispatch({
            type: TYPES.LOGIN_SUCCESS,
            payload: response,
          });

          return Promise.resolve(response);
        }
      } else {
        return Promise.reject(response.message);
      }
    },
    error => {
      return Promise.reject(error.toString());
    },
  );
};

export const register = form => dispatch => {
  return AuthService.register(form).then(
    response => {
      dispatch({
        type: TYPES.RESET_REG_FORM,
      });

      if (response.errors) {
        return Promise.reject(response.message);
      } else {
        return Promise.resolve(response);
      }
    },
    error => {
      return Promise.reject(error.toString());
    },
  );
};

export const forgotPassword = user => dispatch => {
  return AuthService.forgotPassword(user)
    .then(response => {
      if (response.errors) {
        return Promise.reject(response.message);
      } else {
        dispatch({
          type: TYPES.FORGOT_PW_SUCCESS,
          payload: response,
        });

        return Promise.resolve(response);
      }
    })
    .catch(error => {
      return Promise.reject(error.toString());
    });
};

export const changePassword = user => dispatch => {
  return AuthService.changePassword(user)
    .then(response => {
      if (response.errors == 0) {
        dispatch({
          type: TYPES.CHANGE_PW_SUCCESS,
          payload: response,
        });

        return Promise.resolve(response);
      } else {
        return Promise.reject(response.message);
      }
    })
    .catch(error => {
      return Promise.reject(error.toString());
    });
};

export const logout = () => dispatch => {
  return AuthService.logOut().then(response => {
    if (response.status == '200') {
      return Promise.resolve(response);
    }
  });
};

export const resendOtp = form => dispatch => {
  return AuthService.resendOtp(form).then(response => {
    if (response.errors) {
      return Promise.reject(response.message.toString());
    } else {
      return Promise.resolve(response);
    }
  });
};

export const resetRegForm = () => {
  return {type: TYPES.RESET_REG_FORM};
};

export const updateRegForm = form => {
  return {type: TYPES.UPDATE_REG_FORM, payload: form};
};

export const resetLoginForm = () => {
  return {type: TYPES.RESET_LOGIN_FORM};
};

export const updateLoginForm = form => {
  return {type: TYPES.UPDATE_LOGIN_FORM, payload: form};
};

export const setDeviceInfo = data => {
  return {type: TYPES.AUTH_DEVICE_INFO, payload: data};
};

export const setCurrentLocation = data => {
  return {type: TYPES.LOCATION_ALLOW_OK, payload: data};
};
