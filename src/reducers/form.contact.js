import TYPES from '../actions/type';

const initialState = {
  errors: {},
  contactForm: {
    mobile_no: '',
    custom_records: {},
    directory_id: 0,
  },
};

export default contactFormReducer = (state = initialState, action) => {
  const {type, payload} = action;
  switch (type) {
    case TYPES.RESET_CONTACT_FORM:
      return {
        ...state,
        errors: {},
        contactForm: {
          mobile_no: '',
          custom_records: {},
          directory_id: 0,
        },
      };
    case TYPES.UPDATE_CONTACT_FORM:
      return {
        ...state,
        ...payload,
      };
    default:
      return state;
  }
};
