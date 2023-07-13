import TYPES from '../actions/type';

const initialState = {
  devices: [],
  deviceDetails: {},
};

export default packageReducer = (state = initialState, action) => {
  const {type, payload} = action;
  switch (type) {
    case TYPES.LIST_DEVICES_LOAD:
      return {
        ...state,
        devices: [],
      };
    case TYPES.LIST_DEVICES_OK:
      return {
        ...state,
        devices: payload,
      };
    case TYPES.LIST_DEVICES_FAILED:
      return {
        ...state,
        devices: [],
      };
    case TYPES.GET_DEVICE_LOAD:
      return {
        ...state,
        deviceDetails: {},
      };
    case TYPES.GET_DEVICE_OK:
      return {
        ...state,
        deviceDetails: payload,
      };
    case TYPES.GET_DEVICE_FAILED:
      return {
        ...state,
        deviceDetails: {},
      };
    default:
      return state;
  }
};
