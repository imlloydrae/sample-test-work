import TYPES from '../actions/type';

const initialState = {
  errors: {},
  directory_name: '',
  directory_id: 0,
  custom_fields: [
    {
      id: 1,
      value: '',
    },
    {
      id: 2,
      value: '',
    },
    {
      id: 3,
      value: '',
    },
  ],
  contacts: {},
};

export default directoryFormReducer = (state = initialState, action) => {
  const {type, payload} = action;
  switch (type) {
    case TYPES.RESET_DIRECTORY_FORM:
      return {
        ...state,
        errors: {},
        directory_name: '',
        directory_id: 0,
        custom_fields: [
          {
            id: 1,
            value: '',
          },
          {
            id: 2,
            value: '',
          },
          {
            id: 3,
            value: '',
          },
        ],
        contacts: {},
      };
    case TYPES.UPDATE_DIRECTORY_FORM:
      return {
        ...state,
        ...payload,
      };
    default:
      return state;
  }
};
