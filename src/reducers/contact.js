import TYPES from '../actions/type';

const initialState = {
  contacts: {
    data: [],
    links: {},
    meta: {},
  },
  contactDetails: {},
};

export default contactReducer = (state = initialState, action) => {
  const {type, payload} = action;
  switch (type) {
    case TYPES.LIST_CONTACTS_LOAD:
      return {
        ...state,
        contacts: {
          data: [],
          links: {},
          meta: {},
        },
      };
    case TYPES.LIST_CONTACTS_OK:
      return {
        ...state,
        contacts: payload,
      };
    case TYPES.LIST_CONTACTS_FAILED:
      return {
        ...state,
        contacts: {
          data: [],
          links: {},
          meta: {},
        },
      };
    case TYPES.GET_CONTACT_LOAD:
      return {
        ...state,
        contactDetails: {},
      };
    case TYPES.GET_CONTACT_OK:
      return {
        ...state,
        contactDetails: payload,
      };
    case TYPES.GET_CONTACT_FAILED:
      return {
        ...state,
        contactDetails: {},
      };
    case TYPES.SEARCH_CONTACT_OK:
      return {
        ...state,
        contacts: {
          ...state.contacts,
          data: payload,
        },
      };
    case TYPES.DELETE_CONTACT_FAILED:
      return state;
    default:
      return state;
  }
};
