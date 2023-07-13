import {REACT_APP_PROD_BASE_URL} from '@env';

const listDevices = async token => {
  let options = {
    method: 'GET',
    headers: {
      Accept: 'application/json',
      'Content-type': 'application/json',
      Authorization: `Bearer ${token}`,
    },
  };

  return await fetch(
    `${REACT_APP_PROD_BASE_URL}/api/platform-mobile-infos`,
    options,
  )
    .then(response => response.json())
    .then(json => json)
    .catch(error => error.json());
};

const getDevice = async (token, id) => {
  let options = {
    method: 'GET',
    headers: {
      Accept: 'application/json',
      'Content-type': 'application/json',
      Authorization: `Bearer ${token}`,
    },
  };

  return await fetch(
    `${REACT_APP_PROD_BASE_URL}/api/platform-mobile-infos/${id}`,
    options,
  )
    .then(response => response.json())
    .then(json => json)
    .catch(error => error.json());
};

const logoutDevice = async (token, form) => {
  let options = {
    method: 'PATCH',
    headers: {
      Accept: 'application/json',
      'Content-type': 'application/json',
      Authorization: `Bearer ${token}`,
    },
    body: JSON.stringify(form),
  };

  return await fetch(
    `${REACT_APP_PROD_BASE_URL}/api/platform-mobile-infos/${form.id}`,
    options,
  )
    .then(response => response.json())
    .then(json => json)
    .catch(error => error.json());
};

export default {
  listDevices,
  getDevice,
  logoutDevice,
};
