import TYPES from '../actions/type';

const initialState = {
  directoryContacts: {
    data: [],
    links: {},
    meta: {},
  },
  directoryContactDetails: {},
};

export default directoryContactReducer = (state = initialState, action) => {
  const {type, payload} = action;
  switch (type) {
    case TYPES.LIST_DIRECTORY_CONTACTS_LOAD:
      return {
        ...state,
        directoryContacts: {
          data: [],
          links: {},
          meta: {},
        },
      };
    case TYPES.LIST_DIRECTORY_CONTACTS_OK:
      return {
        ...state,
        directoryContacts: payload,
      };
    case TYPES.LIST_DIRECTORY_CONTACTS_FAILED:
      return {
        ...state,
        directoryContacts: {
          data: [],
          links: {},
          meta: {},
        },
      };
    case TYPES.LIST_DIRECTORY_CONTACTS_UPDATE_OK:
      return {
        ...state,
        directoryContacts: {
          data: state.directoryContacts.data.concat(payload.data),
          links: payload.links,
          meta: payload.meta,
        },
      };
    case TYPES.GET_DIRECTORY_CONTACT_LOAD:
      return {
        ...state,
        directoryContactDetails: {},
      };
    case TYPES.GET_DIRECTORY_CONTACT_OK:
      return {
        ...state,
        directoryContactDetails: payload,
      };
    case TYPES.GET_DIRECTORY_CONTACT_FAILED:
      return {
        ...state,
        directoryContactDetails: {},
      };
    case TYPES.DELETE_DIRECTORY_CONTACTS_FAILED:
      return state;
    default:
      return state;
  }
};
