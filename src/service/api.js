import axios from 'axios';

// Determine if the environment is local
const isLocalEnvironment = () => {
  const hostName = window.location.hostname;
  return hostName === 'localhost';
};

// Get the base URL depending on the environment
const getBaseUrl = () => {
  if (isLocalEnvironment()) {
    return '/api';
  } else {
    return `${window.location.origin}/api`;
  }
};

// Create an Axios instance with the base URL and default headers
const api = axios.create({
  baseURL: getBaseUrl(),
  headers: {
    'Content-Type': 'application/json',
  },
});

// Function to get data from service
export const getData = async (endpoint) => {
  return api
    .get(endpoint)
    .then((response) => response.data)
    .catch((error) => {
      throw error;
    });
};

export const postData = (endpoint, data, headers) => {
  return api
    .post(endpoint, data, headers)
    .then((response) => response.data)
    .catch((error) => {
      throw error;
    });
};
