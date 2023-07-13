import {REACT_APP_PROD_DIY_URL} from '@env';

const getPersonalInfo = async token => {
  let options = {
    method: 'GET',
    headers: {
      Accept: 'application/json',
      'Content-type': 'application/json',
      Authorization: `Bearer ${token}`,
    },
  };

  return await fetch(
    `${REACT_APP_PROD_DIY_URL}/api/clients/get/personal-info`,
    options,
  )
    .then(response => response.json())
    .then(json => json)
    .catch(error => error.json());
};

const getSavedRecords = async token => {
  let options = {
    method: 'GET',
    headers: {
      Accept: 'application/json',
      'Content-type': 'application/json',
      Authorization: `Bearer ${token}`,
    },
  };

  return await fetch(
    `${REACT_APP_PROD_DIY_URL}/api/clients/get/total-records`,
    options,
  )
    .then(response => response.json())
    .then(json => json)
    .catch(error => error.json());
};

const listApiCodes = async token => {
  let options = {
    method: 'GET',
    headers: {
      Accept: 'application/json',
      'Content-type': 'application/json',
      Authorization: `Bearer ${token}`,
    },
  };

  return await fetch(
    `${REACT_APP_PROD_DIY_URL}/api/clients/get/apicodes`,
    options,
  )
    .then(response => response.json())
    .then(json => json)
    .catch(error => error.json());
};

const listTransactions = async token => {
  let options = {
    method: 'GET',
    headers: {
      Accept: 'application/json',
      'Content-type': 'application/json',
      Authorization: `Bearer ${token}`,
    },
  };

  return await fetch(
    `${REACT_APP_PROD_DIY_URL}/api/transaction-history`,
    options,
  )
    .then(response => response.json())
    .then(json => json)
    .catch(error => error.json());
};

export default {
  getPersonalInfo,
  getSavedRecords,
  listApiCodes,
  listTransactions,
};
