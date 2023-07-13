import TYPES from '../actions/type';

const initialState = {
  campaigns: {
    data: [],
    links: {},
    meta: {},
  },
  sentCampaign: {},
  campaignDetails: {},
  campaignTemplates: {
    data: [],
    links: {},
    meta: {},
  },
  campaignRecipients: {
    data: [],
    links: {},
    meta: {},
  },
};

export default campaignReducer = (state = initialState, action) => {
  const {type, payload} = action;
  switch (type) {
    case TYPES.LIST_CAMPAIGNS_LOAD:
      return {
        ...state,
        campaigns: {
          data: [],
          links: {},
          meta: {},
        },
      };
    case TYPES.LIST_CAMPAIGNS_OK:
      return {
        ...state,
        campaigns: payload,
      };
    case TYPES.LIST_CAMPAIGNS_FAILED:
      return {
        ...state,
        campaigns: {
          data: [],
          links: {},
          meta: {},
        },
      };
    case TYPES.LIST_CAMPAIGNS_UPDATE_OK:
      return {
        ...state,
        campaigns: {
          data: state.campaigns.data.concat(payload.data),
          links: payload.links,
          meta: payload.meta,
        },
      };
    case TYPES.SEND_CAMPAIGN_SUCCESS:
      return {
        ...state,
        sentCampaign: payload,
      };
    case TYPES.GET_CAMPAIGN_LOAD:
      return {
        ...state,
        campaignDetails: {},
      };
    case TYPES.GET_CAMPAIGN_OK:
      return {
        ...state,
        campaignDetails: payload,
      };
    case TYPES.GET_CAMPAIGN_FAILED:
      return {
        ...state,
        campaignDetails: {},
      };
    case TYPES.SEARCH_CAMPAIGN_OK:
      return {
        ...state,
        campaigns: {
          ...state.campaigns,
          data: payload,
        },
      };
    case TYPES.DELETE_CAMPAIGN_FAILED:
      return state;
    case TYPES.LIST_CAMPAIGN_TEMPLATES_LOAD:
      return {
        ...state,
        campaignTemplates: {
          data: [],
          links: {},
          meta: {},
        },
      };
    case TYPES.LIST_CAMPAIGN_TEMPLATES_OK:
      return {
        ...state,
        campaignTemplates: payload,
      };
    case TYPES.LIST_CAMPAIGN_TEMPLATES_FAILED:
      return {
        ...state,
        campaignTemplates: {
          data: [],
          links: {},
          meta: {},
        },
      };
    case TYPES.LIST_CAMPAIGN_TEMPLATES_UPDATE_OK:
      return {
        ...state,
        campaignTemplates: {
          data: state.campaignTemplates.data.concat(payload.data),
          links: payload.links,
          meta: payload.meta,
        },
      };
    case TYPES.LIST_CAMPAIGN_RECIPIENTS_LOAD:
      return {
        ...state,
        campaignRecipients: {
          data: [],
          links: {},
          meta: {},
        },
      };
    case TYPES.LIST_CAMPAIGN_RECIPIENTS_OK:
      return {
        ...state,
        campaignRecipients: payload,
      };
    case TYPES.LIST_CAMPAIGN_RECIPIENTS_FAILED:
      return {
        ...state,
        campaignRecipients: {
          data: [],
          links: {},
          meta: {},
        },
      };
    case TYPES.LIST_CAMPAIGN_RECIPIENTS_UPDATE_OK:
      return {
        ...state,
        campaignRecipients: {
          data: state.campaignRecipients.data.concat(payload.data),
          links: payload.links,
          meta: payload.meta,
        },
      };
    default:
      return state;
  }
};
