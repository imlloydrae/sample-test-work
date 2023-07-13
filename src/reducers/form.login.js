import TYPES from '../actions/type';

const initialState = {
  loginForm: {
    username: '',
    password: '',
    otp: '',
    deviceInfo: {},
  },
};

export default loginFormReducer = (state = initialState, action) => {
  const {type, payload} = action;
  switch (type) {
    case TYPES.RESET_LOGIN_FORM:
      return {
        ...state,
        loginForm: {
          username: '',
          password: '',
          otp: '',
          deviceInfo: {},
        },
      };
    case TYPES.UPDATE_LOGIN_FORM:
      return {
        ...state,
        ...payload,
      };
    default:
      return state;
  }
};
