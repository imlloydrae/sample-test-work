import TYPES from '../actions/type';

const initialState = {
  templates: {
    data: [],
    links: {},
    meta: {},
  },
  templateDetails: {},
};

export default templateReducer = (state = initialState, action) => {
  const {type, payload} = action;
  switch (type) {
    case TYPES.LIST_TEMPLATES_LOAD:
      return {
        ...state,
        templates: {
          data: [],
          links: {},
          meta: {},
        },
      };
    case TYPES.LIST_TEMPLATES_OK:
      return {
        ...state,
        templates: payload,
      };
    case TYPES.LIST_TEMPLATES_FAILED:
      return {
        ...state,
        templates: {
          data: [],
          links: {},
          meta: {},
        },
      };
    case TYPES.LIST_TEMPLATES_UPDATE_OK:
      return {
        ...state,
        templates: {
          data: state.templates.data.concat(payload.data),
          links: payload.links,
          meta: payload.meta,
        },
      };
    case TYPES.GET_TEMPLATE_LOAD:
      return {
        ...state,
        templateDetails: {},
      };
    case TYPES.GET_TEMPLATE_OK:
      return {
        ...state,
        templateDetails: payload,
      };
    case TYPES.GET_TEMPLATE_FAILED:
      return {
        ...state,
        templateDetails: {},
      };
    case TYPES.SEARCH_TEMPLATE_OK:
      return {
        ...state,
        templates: {
          ...state.templates,
          data: payload.data,
        },
      };
    case TYPES.DELETE_TEMPLATE_FAILED:
      return state;
    default:
      return state;
  }
};
