import TYPES from '../actions/type';

const initialState = {
  isLoggedIn: false,
  authResponse: {},
  deviceInfo: {},
  locationInfo: {},
};

export default authReducer = (state = initialState, action) => {
  const {type, payload} = action;
  switch (type) {
    case TYPES.LOGIN_SUCCESS:
      return {
        ...state,
        isLoggedIn: true,
        authResponse: payload,
      };
    case TYPES.LOGIN_FAILED:
      return {
        ...state,
        isLoggedIn: false,
        authResponse: {},
        deviceInfo: {},
        locationInfo: {},
      };
    case TYPES.LOGOUT:
      return {
        ...state,
        isLoggedIn: false,
        authResponse: {},
        deviceInfo: {},
        locationInfo: {},
      };
    case TYPES.AUTH_DEVICE_INFO:
      return {
        ...state,
        deviceInfo: payload,
      };
    case TYPES.LOCATION_ALLOW_OK:
      return {
        ...state,
        locationInfo: payload,
      };
    default:
      return state;
  }
};
