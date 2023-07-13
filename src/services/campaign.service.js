import {REACT_APP_PROD_DIY_URL} from '@env';

const listCampaigns = async (token, page) => {
  let options = {
    method: 'GET',
    headers: {
      Accept: 'application/json',
      'Content-type': 'application/json',
      Authorization: `Bearer ${token}`,
    },
  };

  return await fetch(
    `${REACT_APP_PROD_DIY_URL}/api/campaigns?page=${page}`,
    options,
  )
    .then(response => response.json())
    .then(json => json)
    .catch(error => error.json());
};

const getCampaign = async (token, id) => {
  let options = {
    method: 'GET',
    headers: {
      Accept: 'application/json',
      'Content-type': 'application/json',
      Authorization: `Bearer ${token}`,
    },
  };

  return await fetch(`${REACT_APP_PROD_DIY_URL}/api/campaigns/${id}`, options)
    .then(response => response.json())
    .then(json => json)
    .catch(error => error.json());
};

const sendCampaign = async (token, form) => {
  let options = {
    method: 'POST',
    headers: {
      Accept: 'application/json',
      'Content-type': 'application/json',
      Authorization: `Bearer ${token}`,
    },
    body: JSON.stringify(form),
  };

  return await fetch(`${REACT_APP_PROD_DIY_URL}/api/campaigns`, options)
    .then(response => response.json())
    .then(json => json)
    .catch(error => error.json());
};

const searchCampaign = async (token, key) => {
  let options = {
    method: 'GET',
    headers: {
      Accept: 'application/json',
      'Content-type': 'application/json',
      Authorization: `Bearer ${token}`,
    },
  };

  return await fetch(
    `${REACT_APP_PROD_DIY_URL}/api/campaigns?lookUp=${key}`,
    options,
  )
    .then(response => response.json())
    .then(json => json)
    .catch(error => error.json());
};

const deleteCampaign = async (token, id) => {
  let options = {
    method: 'DELETE',
    headers: {
      Accept: 'application/json',
      'Content-type': 'application/json',
      Authorization: `Bearer ${token}`,
    },
  };

  return await fetch(`${REACT_APP_PROD_DIY_URL}/api/campaigns/${id}`, options)
    .then(response => response)
    .then(json => json)
    .catch(error => error.json());
};

const getTodaysCampaign = async (token, apicode) => {
  let options = {
    method: 'GET',
    headers: {
      Accept: 'application/json',
      'Content-type': 'application/json',
      Authorization: `Bearer ${token}`,
    },
  };

  return await fetch(
    `${REACT_APP_PROD_DIY_URL}/api/campaigns/today/sent/${apicode}`,
    options,
  )
    .then(response => response.json())
    .then(json => json)
    .catch(error => error.json());
};

const getCampaignChart = async (token, filter) => {
  let options = {
    method: 'GET',
    headers: {
      Accept: 'application/json',
      'Content-type': 'application/json',
      Authorization: `Bearer ${token}`,
    },
  };

  return await fetch(
    `${REACT_APP_PROD_DIY_URL}/api/campaigns/mobile-chart/sent?week=${filter}`,
    options,
  )
    .then(response => response.json())
    .then(json => json)
    .catch(error => error.json());
};

export default {
  listCampaigns,
  getCampaign,
  sendCampaign,
  searchCampaign,
  deleteCampaign,
  getTodaysCampaign,
  getCampaignChart,
};
