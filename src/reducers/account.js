import TYPES from '../actions/type';

const initialState = {
  accountDetails: {},
};

export default accountReducer = (state = initialState, action) => {
  const {type, payload} = action;
  switch (type) {
    case TYPES.GET_ACCOUNT_LOAD:
      return {
        ...state,
        accountDetails: {},
      };
    case TYPES.GET_ACCOUNT_OK:
      return {
        ...state,
        accountDetails: payload,
      };
    case TYPES.GET_ACCOUNT_FAILED:
      return {
        ...state,
        accountDetails: {},
      };
    default:
      return state;
  }
};
