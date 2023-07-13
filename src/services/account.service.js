import {REACT_APP_PROD_BASE_URL} from '@env';

const getAccount = async token => {
  let options = {
    method: 'GET',
    headers: {
      Accept: 'application/json',
      'Content-type': 'application/json',
      Authorization: `Bearer ${token}`,
    },
  };

  return await fetch(`${REACT_APP_PROD_BASE_URL}/api/get-account-info`, options)
    .then(response => response.json())
    .then(json => json)
    .catch(error => error.json());
};

const updateAccount = async (token, form) => {
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
    `${REACT_APP_PROD_BASE_URL}/api/update-account-info`,
    options,
  )
    .then(response => response.json())
    .then(json => json)
    .catch(error => error.json());
};

const disableAuth = async token => {
  let options = {
    method: 'POST',
    headers: {
      Accept: 'application/json',
      'Content-type': 'application/json',
      Authorization: `Bearer ${token}`,
    },
  };

  return await fetch(
    `${REACT_APP_PROD_BASE_URL}/api/update-two-factor-authentication`,
    options,
  )
    .then(response => response.json())
    .then(json => json)
    .catch(error => error.json());
};

export default {
  getAccount,
  updateAccount,
  disableAuth,
};
