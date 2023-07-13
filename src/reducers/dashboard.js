import TYPES from '../actions/type';

const initialState = {
  todaysCampaign: [],
  campaignChart: [],
};

export default dashboardReducer = (state = initialState, action) => {
  const {type, payload} = action;
  switch (type) {
    case TYPES.GET_TODAYS_CAMPAIGN_OK:
      return {
        ...state,
        todaysCampaign: payload,
      };
    case TYPES.GET_TODAYS_CAMPAIGN_FAILED:
      return {
        ...state,
        todaysCampaign: [],
      };
    case TYPES.GET_CAMPAIGN_CHART_OK:
      return {
        ...state,
        campaignChart: payload,
      };
    case TYPES.GET_CAMPAIGN_CHART_FAILED:
      return {
        ...state,
        campaignChart: [],
      };
    default:
      return state;
  }
};
