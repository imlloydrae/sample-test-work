import AsyncStorage from '@react-native-async-storage/async-storage';
import TYPES from './type';
import CampaignService from '../services/campaign.service';
import DirectoryService from '../services/directory.service';

export const listCampaigns = page => async dispatch => {
  const TOKEN = await AsyncStorage.getItem('__k');
  // dispatch({type: TYPES.LIST_CAMPAIGNS_LOAD});

  return CampaignService.listCampaigns(TOKEN, page).then(
    response => {
      if (response.data) {
        if (page <= 1) {
          dispatch({
            type: TYPES.LIST_CAMPAIGNS_OK,
            payload: response,
          });
        } else {
          dispatch({
            type: TYPES.LIST_CAMPAIGNS_UPDATE_OK,
            payload: response,
          });
        }

        return Promise.resolve();
      } else {
        dispatch({type: TYPES.LIST_CAMPAIGNS_FAILED});
        return Promise.reject();
      }
    },
    error => {
      dispatch({type: TYPES.LIST_CAMPAIGNS_FAILED});
      return Promise.reject(error.toString());
    },
  );
};

export const getCampaign = id => async dispatch => {
  const TOKEN = await AsyncStorage.getItem('__k');
  dispatch({type: TYPES.GET_CAMPAIGN_LOAD});

  return CampaignService.getCampaign(TOKEN, id).then(
    response => {
      dispatch({
        type: TYPES.GET_CAMPAIGN_OK,
        payload: response.data,
      });

      return Promise.resolve();
    },
    error => {
      dispatch({type: TYPES.GET_CAMPAIGN_FAILED});
      return Promise.reject(error.toString());
    },
  );
};

export const sendCampaign = data => async dispatch => {
  const TOKEN = await AsyncStorage.getItem('__k');

  // data['last_ip'] = '' // insert ip here
  return CampaignService.sendCampaign(TOKEN, data).then(
    response => {
      if (response.data) {
        dispatch({
          type: TYPES.SEND_CAMPAIGN_SUCCESS,
          payload: response.data,
        });

        return Promise.resolve();
      } else {
        return Promise.reject(response.message);
      }
    },
    error => {
      return Promise.reject(error.toString());
    },
  );
};

export const searchCampaign = key => async dispatch => {
  const TOKEN = await AsyncStorage.getItem('__k');

  return CampaignService.searchCampaign(TOKEN, key).then(
    response => {
      dispatch({
        type: TYPES.SEARCH_CAMPAIGN_OK,
        payload: response.data,
      });

      return Promise.resolve();
    },
    error => {
      return Promise.reject(error.toString());
    },
  );
};

export const deleteCampaign = id => async dispatch => {
  const TOKEN = await AsyncStorage.getItem('__k');

  return CampaignService.deleteCampaign(TOKEN, id).then(
    response => {
      if (response.message) {
        dispatch({type: TYPES.DELETE_CAMPAIGN_FAILED});
        return Promise.reject(response.message);
      } else {
        return Promise.resolve();
      }
    },
    error => {
      return Promise.reject(error.toString());
    },
  );
};

export const getTodaysCampaign = apicode => async dispatch => {
  const TOKEN = await AsyncStorage.getItem('__k');

  return CampaignService.getTodaysCampaign(TOKEN, apicode).then(
    response => {
      if (response.data) {
        dispatch({
          type: TYPES.GET_TODAYS_CAMPAIGN_OK,
          payload: response.data.slice(0, 5),
        });

        return Promise.resolve();
      } else {
        dispatch({
          type: TYPES.GET_TODAYS_CAMPAIGN_FAILED,
        });
        return Promise.reject(response.message);
      }
    },
    error => {
      return Promise.reject(error.toString());
    },
  );
};

export const getCampaignChart = filter => async dispatch => {
  const TOKEN = await AsyncStorage.getItem('__k');

  return CampaignService.getCampaignChart(TOKEN, filter).then(
    response => {
      if (!response.message) {
        dispatch({
          type: TYPES.GET_CAMPAIGN_CHART_OK,
          payload: response,
        });

        return Promise.resolve();
      } else {
        dispatch({
          type: TYPES.GET_CAMPAIGN_CHART_FAILED,
        });
        return Promise.reject(response.message);
      }
    },
    error => {
      return Promise.reject(error.toString());
    },
  );
};

export const getCampaignRecipients = (customNo, id, page) => async dispatch => {
  const TOKEN = await AsyncStorage.getItem('__k');
  page == 1 && dispatch({type: TYPES.LIST_CAMPAIGN_RECIPIENTS_LOAD});

  if (customNo.length > 0 && id == 0) {
    // only custom numbers
    dispatch({
      type: TYPES.LIST_CAMPAIGN_RECIPIENTS_OK,
      payload: customNo,
    });

    return Promise.resolve();
  } else {
    // a directory is selected
    return DirectoryService.listDirectoryContacts(TOKEN, id, page).then(
      response => {
        if (response.data) {
          if (page == 1) {
            if (customNo.length > 0) {
              // has directory and custom numbers, concatenate
              response.data = customNo.concat(response.data);
            }

            dispatch({
              type: TYPES.LIST_CAMPAIGN_RECIPIENTS_OK,
              payload: response,
            });
          } else {
            dispatch({
              type: TYPES.LIST_CAMPAIGN_RECIPIENTS_UPDATE_OK,
              payload: response,
            });
          }
          return Promise.resolve();
        } else {
          dispatch({type: TYPES.LIST_CAMPAIGN_RECIPIENTS_FAILED});
          return Promise.reject();
        }
      },
      error => {
        dispatch({type: TYPES.LIST_CAMPAIGN_RECIPIENTS_FAILED});
        return Promise.reject(error.toString());
      },
    );
  }
};

export const resetCampaignForm = () => {
  return {type: TYPES.RESET_CAMPAIGN_FORM};
};

export const updateCampaignForm = form => {
  return {type: TYPES.UPDATE_CAMPAIGN_FORM, payload: form};
};
