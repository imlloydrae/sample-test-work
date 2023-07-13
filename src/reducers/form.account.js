import TYPES from '../actions/type';

const initialState = {
  errors: {},
  accountForm: {},
};

export default accountFormReducer = (state = initialState, action) => {
  const {type, payload} = action;
  switch (type) {
    case TYPES.RESET_ACCOUNT_FORM:
      return {
        ...state,
        errors: {},
        accountForm: {},
      };
    case TYPES.UPDATE_ACCOUNT_FORM:
      return {
        ...state,
        ...payload,
      };
    default:
      return state;
  }
};
