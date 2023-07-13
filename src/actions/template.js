import AsyncStorage from '@react-native-async-storage/async-storage';
import TYPES from './type';
import TemplateService from '../services/template.service';
import {getEncodingDetails} from '../libraries/helpers';

export const listTemplates = page => async dispatch => {
  const TOKEN = await AsyncStorage.getItem('__k');
  // dispatch({type: TYPES.LIST_TEMPLATES_LOAD});

  return TemplateService.listTemplates(TOKEN, page).then(
    response => {
      if (response.data) {
        if (page <= 1) {
          dispatch({
            type: TYPES.LIST_TEMPLATES_OK,
            payload: response,
          });

          dispatch({
            type: TYPES.LIST_CAMPAIGN_TEMPLATES_OK,
            payload: response,
          });
        } else {
          dispatch({
            type: TYPES.LIST_TEMPLATES_UPDATE_OK,
            payload: response,
          });

          dispatch({
            type: TYPES.LIST_CAMPAIGN_TEMPLATES_UPDATE_OK,
            payload: response,
          });
        }

        return Promise.resolve();
      } else {
        dispatch({type: TYPES.LIST_TEMPLATES_FAILED});
        dispatch({type: TYPES.LIST_CAMPAIGN_TEMPLATES_FAILED});
        return Promise.reject();
      }
    },
    error => {
      dispatch({type: TYPES.LIST_TEMPLATES_FAILED});
      return Promise.reject(error.toString());
    },
  );
};

export const getTemplate = id => async dispatch => {
  const TOKEN = await AsyncStorage.getItem('__k');
  dispatch({type: TYPES.GET_TEMPLATE_LOAD});

  return TemplateService.getTemplate(TOKEN, id).then(
    response => {
      dispatch({
        type: TYPES.GET_TEMPLATE_OK,
        payload: response.data,
      });

      let msgData = getEncodingDetails(response.data.template_message);
      dispatch({
        type: TYPES.UPDATE_TEMPLATE_FORM,
        payload: {
          smsLength: msgData.messageLength,
          smsParts: msgData.totalSegment,
          templateForm: {
            template_name: response.data.template_name,
            template_message: response.data.template_message,
          },
        },
      });

      return Promise.resolve();
    },
    error => {
      dispatch({type: TYPES.GET_TEMPLATE_FAILED});
      return Promise.reject(error.toString());
    },
  );
};

export const createTemplate = data => async dispatch => {
  const TOKEN = await AsyncStorage.getItem('__k');

  // data['last_ip'] = '' // insert ip here
  return TemplateService.createTemplate(TOKEN, data).then(
    response => {
      if (response.data) {
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

export const updateTemplate = data => async dispatch => {
  const TOKEN = await AsyncStorage.getItem('__k');

  // data['last_ip'] = '' // insert ip here
  return TemplateService.updateTemplate(TOKEN, data).then(
    response => {
      if (response.message) {
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

export const searchTemplate = key => async dispatch => {
  const TOKEN = await AsyncStorage.getItem('__k');

  return TemplateService.searchTemplate(TOKEN, key).then(
    response => {
      dispatch({
        type: TYPES.SEARCH_TEMPLATE_OK,
        payload: response.data,
      });

      return Promise.resolve();
    },
    error => {
      return Promise.reject(error.toString());
    },
  );
};

export const deleteTemplate = id => async dispatch => {
  const TOKEN = await AsyncStorage.getItem('__k');

  return TemplateService.deleteTemplate(TOKEN, id).then(
    response => {
      if (response.success) {
        return Promise.resolve();
      } else {
        dispatch({type: TYPES.DELETE_TEMPLATE_FAILED});
        return Promise.reject('Unable to delete template!');
      }
    },
    error => {
      dispatch({type: TYPES.DELETE_TEMPLATE_FAILED});
      return Promise.reject(error.toString());
    },
  );
};

export const resetTemplateForm = () => {
  return {type: TYPES.RESET_TEMPLATE_FORM};
};

export const updateTemplateForm = form => {
  return {type: TYPES.UPDATE_TEMPLATE_FORM, payload: form};
};
