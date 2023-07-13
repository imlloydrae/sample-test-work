import AsyncStorage from '@react-native-async-storage/async-storage';
import TYPES from './type';
import ContactService from '../services/contact.service';

export const listContacts = async dispatch => {
  const TOKEN = await AsyncStorage.getItem('__k');
  dispatch({type: TYPES.LIST_CONTACTS_LOAD});

  return ContactService.listContacts(TOKEN).then(
    response => {
      dispatch({
        type: TYPES.LIST_CONTACTS_OK,
        payload: response,
      });

      return Promise.resolve();
    },
    error => {
      dispatch({type: TYPES.LIST_CONTACTS_FAILED});
      return Promise.reject(error.toString());
    },
  );
};

export const getContact = (directoryId, id) => async dispatch => {
  const TOKEN = await AsyncStorage.getItem('__k');
  dispatch({type: TYPES.GET_CONTACT_LOAD});

  return ContactService.getContact(TOKEN, id).then(
    response => {
      dispatch({
        type: TYPES.GET_CONTACT_OK,
        payload: response.data,
      });

      dispatch({
        type: TYPES.UPDATE_CONTACT_FORM,
        payload: {
          contactForm: {
            mobile_no: response.data.mobile_no,
            custom_records: response.data.custom_records,
            directory_id: directoryId,
          },
        },
      });

      return Promise.resolve();
    },
    error => {
      dispatch({type: TYPES.GET_CONTACT_FAILED});
      return Promise.reject(error.toString());
    },
  );
};

export const createContact = data => async dispatch => {
  const TOKEN = await AsyncStorage.getItem('__k');

  return ContactService.createContact(TOKEN, data).then(
    response => {
      if (response.errors) {
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

export const updateContact = data => async dispatch => {
  const TOKEN = await AsyncStorage.getItem('__k');

  return ContactService.updateContact(TOKEN, data).then(
    response => {
      if (response.errors) {
        return Promise.reject(response.message);
      } else {
        dispatch({
          type: TYPES.EDIT_CONTACT_SUCCESS,
          payload: response,
        });
        return Promise.resolve();
      }
    },
    error => {
      return Promise.reject(error.toString());
    },
  );
};

export const searchContact = key => async dispatch => {
  const TOKEN = await AsyncStorage.getItem('__k');

  return ContactService.searchContact(TOKEN, key).then(
    response => {
      if (response.data.length > 0) {
        dispatch({
          type: TYPES.SEARCH_CONTACT_OK,
          payload: response.data,
        });

        return Promise.resolve();
      } else {
        return Promise.reject('No results found!');
      }
    },
    error => {
      return Promise.reject(error.toString());
    },
  );
};

export const deleteContact = id => async dispatch => {
  const TOKEN = await AsyncStorage.getItem('__k');

  return ContactService.deleteContact(TOKEN, id).then(
    response => {
      if (response.errors) {
        dispatch({type: TYPES.DELETE_CONTACT_FAILED});
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

export const resetContactForm = () => {
  return {type: TYPES.RESET_CONTACT_FORM};
};

export const updateContactForm = form => {
  return {type: TYPES.UPDATE_CONTACT_FORM, payload: form};
};
