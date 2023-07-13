import {REACT_APP_PROD_DIY_URL} from '@env';

const listTemplates = async (token, page) => {
  let options = {
    method: 'GET',
    headers: {
      Accept: 'application/json',
      'Content-type': 'application/json',
      Authorization: `Bearer ${token}`,
    },
  };

  return await fetch(
    `${REACT_APP_PROD_DIY_URL}/api/templates?page=${page}`,
    options,
  )
    .then(response => response.json())
    .then(json => json)
    .catch(error => error.json());
};

const getTemplate = async (token, id) => {
  let options = {
    method: 'GET',
    headers: {
      Accept: 'application/json',
      'Content-type': 'application/json',
      Authorization: `Bearer ${token}`,
    },
  };

  return await fetch(`${REACT_APP_PROD_DIY_URL}/api/templates/${id}`, options)
    .then(response => response.json())
    .then(json => json)
    .catch(error => error.json());
};

const createTemplate = async (token, form) => {
  let options = {
    method: 'POST',
    headers: {
      Accept: 'application/json',
      'Content-type': 'application/json',
      Authorization: `Bearer ${token}`,
    },
    body: JSON.stringify(form),
  };

  return await fetch(`${REACT_APP_PROD_DIY_URL}/api/templates`, options)
    .then(response => response.json())
    .then(json => json)
    .catch(error => error.json());
};

const updateTemplate = async (token, form) => {
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
    `${REACT_APP_PROD_DIY_URL}/api/templates/${form.template_id}`,
    options,
  )
    .then(response => response.json())
    .then(json => json)
    .catch(error => error.json());
};

const searchTemplate = async (token, key) => {
  let options = {
    method: 'GET',
    headers: {
      Accept: 'application/json',
      'Content-type': 'application/json',
      Authorization: `Bearer ${token}`,
    },
  };

  return await fetch(
    `${REACT_APP_PROD_DIY_URL}/api/templates?lookUp=${key}`,
    options,
  )
    .then(response => response.json())
    .then(json => json)
    .catch(error => error.json());
};

const deleteTemplate = async (token, id) => {
  let options = {
    method: 'DELETE',
    headers: {
      Accept: 'application/json',
      'Content-type': 'application/json',
      Authorization: `Bearer ${token}`,
    },
  };

  return await fetch(`${REACT_APP_PROD_DIY_URL}/api/templates/${id}`, options)
    .then(response => response.json())
    .then(json => json)
    .catch(error => error.json());
};

export default {
  listTemplates,
  getTemplate,
  createTemplate,
  updateTemplate,
  searchTemplate,
  deleteTemplate,
};
