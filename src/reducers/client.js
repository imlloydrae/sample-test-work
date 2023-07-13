import TYPES from '../actions/type';

const initialState = {
  clientData: {
    info: {},
    apiCodes: [],
    records: {
      total_campaigns: 0,
      total_directories: 0,
      total_templates: 0,
    },
    transactions: [],
  },
};

export default clientReducer = (state = initialState, action) => {
  const {type, payload} = action;
  switch (type) {
    case TYPES.GET_CLIENT_PERSONAL_INFO_OK:
      return {
        ...state,
        clientData: {
          ...state.clientData,
          info: payload,
        },
      };
    case TYPES.GET_CLIENT_SAVED_RECORDS_OK:
      return {
        ...state,
        clientData: {
          ...state.clientData,
          records: payload,
        },
      };
    case TYPES.LIST_APICODES_LOAD:
      return {
        ...state,
        clientData: {
          ...state.clientData,
          apiCodes: [],
        },
      };
    case TYPES.LIST_APICODES_OK:
      return {
        ...state,
        clientData: {
          ...state.clientData,
          apiCodes: payload,
        },
      };
    case TYPES.LIST_TRANSACTIONS_LOAD:
      return {
        ...state,
        clientData: {
          ...state.clientData,
          transactions: [],
        },
      };
    case TYPES.LIST_TRANSACTIONS_OK:
      return {
        ...state,
        clientData: {
          ...state.clientData,
          transactions: payload,
        },
      };
    default:
      return state;
  }
};
