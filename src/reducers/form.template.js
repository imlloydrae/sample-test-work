import TYPES from '../actions/type';

const initialState = {
  smsParts: 0,
  smsLength: 0,
  errors: {},
  templateForm: {
    template_name: '',
    template_message: '',
  },
};

export default templateFormReducer = (state = initialState, action) => {
  const {type, payload} = action;
  switch (type) {
    case TYPES.RESET_TEMPLATE_FORM:
      return {
        ...state,
        smsParts: 0,
        smsLength: 0,
        errors: {},
        templateForm: {
          template_name: '',
          template_message: '',
        },
      };
    case TYPES.UPDATE_TEMPLATE_FORM:
      return {
        ...state,
        ...payload,
      };
    default:
      return state;
  }
};
