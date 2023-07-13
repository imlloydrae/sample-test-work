import {REACT_APP_PROD_DIY_URL} from '@env';

const listDirectories = async (token, page) => {
  let options = {
    method: 'GET',
    headers: {
      Accept: 'application/json',
      'Content-type': 'application/json',
      Authorization: `Bearer ${token}`,
    },
  };

  return await fetch(
    `${REACT_APP_PROD_DIY_URL}/api/directories?page=${page}`,
    options,
  )
    .then(response => response.json())
    .then(json => json)
    .catch(error => error.json());
};

const listAllDirectories = async (token, page) => {
  let options = {
    method: 'GET',
    headers: {
      Accept: 'application/json',
      'Content-type': 'application/json',
      Authorization: `Bearer ${token}`,
    },
  };

  return await fetch(
    `${REACT_APP_PROD_DIY_URL}/api/mobile-directories`,
    options,
  )
    .then(response => response.json())
    .then(json => json)
    .catch(error => error.json());
};

const getDirectory = async (token, id) => {
  let options = {
    method: 'GET',
    headers: {
      Accept: 'application/json',
      'Content-type': 'application/json',
      Authorization: `Bearer ${token}`,
    },
  };

  return await fetch(`${REACT_APP_PROD_DIY_URL}/api/directories/${id}`, options)
    .then(response => response.json())
    .then(json => json)
    .catch(error => error.json());
};

const createDirectory = async (token, form) => {
  let options = {};

  if (form.contacts) {
    const uploadData = new FormData();
    uploadData.append('directory_name', form.directory_name);
    uploadData.append('contacts', form.contacts);

    options = {
      method: 'POST',
      headers: {
        Accept: 'application/json',
        'Content-Type': 'multipart/form-data',
        Authorization: `Bearer ${token}`,
      },
      body: uploadData,
    };
  } else {
    options = {
      method: 'POST',
      headers: {
        Accept: 'application/json',
        'Content-type': 'application/json',
        Authorization: `Bearer ${token}`,
      },
      body: JSON.stringify(form),
    };
  }

  return await fetch(`${REACT_APP_PROD_DIY_URL}/api/directories`, options)
    .then(response => response)
    .then(json => json)
    .catch(error => error.json());
};

const uploadDirectory = async (token, form) => {
  const uploadData = new FormData();
  uploadData.append('directory_id', form.directory_id);
  uploadData.append('contacts', form.contacts);

  let options = {
    method: 'POST',
    headers: {
      Accept: 'application/json',
      'Content-Type': 'multipart/form-data',
      Authorization: `Bearer ${token}`,
    },
    body: uploadData,
  };

  return await fetch(
    `${REACT_APP_PROD_DIY_URL}/api/directories/contacts/upload`,
    options,
  )
    .then(response => response.json())
    .then(json => json)
    .catch(error => error.json());
};

const updateDirectory = async (token, form) => {
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
    `${REACT_APP_PROD_DIY_URL}/api/directories/${form.directory_id}`,
    options,
  )
    .then(response => response.json())
    .then(json => json)
    .catch(error => error.json());
};

const searchDirectory = async (token, key) => {
  let options = {
    method: 'GET',
    headers: {
      Accept: 'application/json',
      'Content-type': 'application/json',
      Authorization: `Bearer ${token}`,
    },
  };

  return await fetch(
    `${REACT_APP_PROD_DIY_URL}/api/directories?lookUp=${key}`,
    options,
  )
    .then(response => response.json())
    .then(json => json)
    .catch(error => error.json());
};

const deleteDirectory = async (token, id) => {
  let options = {
    method: 'DELETE',
    headers: {
      Accept: 'application/json',
      'Content-type': 'application/json',
      Authorization: `Bearer ${token}`,
    },
  };

  return await fetch(`${REACT_APP_PROD_DIY_URL}/api/directories/${id}`, options)
    .then(response => response.json())
    .then(json => json)
    .catch(error => error.json());
};

const listDirectoryContacts = async (token, id, page) => {
  let options = {
    method: 'GET',
    headers: {
      Accept: 'application/json',
      'Content-type': 'application/json',
      Authorization: `Bearer ${token}`,
    },
  };

  return await fetch(
    `${REACT_APP_PROD_DIY_URL}/api/directories/${id}/contacts?page=${page}`,
    options,
  )
    .then(response => response.json())
    .then(json => json)
    .catch(error => error.json());
};

const deleteDirectoryContacts = async (token, id) => {
  let options = {
    method: 'DELETE',
    headers: {
      Accept: 'application/json',
      'Content-type': 'application/json',
      Authorization: `Bearer ${token}`,
    },
  };

  return await fetch(
    `${REACT_APP_PROD_DIY_URL}/api/directories/${id}/contacts`,
    options,
  )
    .then(response => response.json())
    .then(json => json)
    .catch(error => error.json());
};

export default {
  listDirectories,
  listAllDirectories,
  getDirectory,
  createDirectory,
  uploadDirectory,
  updateDirectory,
  searchDirectory,
  deleteDirectory,
  listDirectoryContacts,
  deleteDirectoryContacts,
};
