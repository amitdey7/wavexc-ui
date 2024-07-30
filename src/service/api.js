import axios from 'axios';

/**
 * Determine if the environment is local.
 * @returns {boolean} True if the environment is local (localhost), false otherwise.
 */
const isLocalEnvironment = () => {
  const hostName = window.location.hostname;
  return hostName === 'localhost';
};

/**
 * Get the base URL depending on the environment.
 * @returns {string} The base URL for API requests.
 */
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
});

/**
 * Axios request interceptor to add headers (authorization, content type)
 * @param {Object} config - Axios request
 * @returns {Object} updated Axios request
 */
api.interceptors.request.use(
  (config) => {
    const token = getAuthToken();
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    config.headers['Content-Type'] = 'application/json';
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

/**
 * Function to get data from a service.
 * @param {string} endpoint - API endpoint to fetch data from.
 * @returns {Promise<Object>} A promise that resolves to the response data.
 */
export const getData = async (endpoint) => {
  return api
    .get(endpoint)
    .then((response) => response.data)
    .catch((error) => {
      handleError(error);
      throw error;
    });
};

/**
 * Function to post data to a service.
 * @param {string} endpoint - API endpoint to post data to.
 * @param {Object} payload - payload/data to be sent
 * @returns {Promise<Object>} A promise that resolves to the response data.
 */
export const postData = (endpoint, payload) => {
  return api
    .post(endpoint, payload)
    .then((response) => response.data)
    .catch((error) => {
      handleError(error);
      throw error;
    });
};

/**
 * Gets the authentication token from local storage.
 * @returns {string|null} authentication token or null if not present.
 */
function getAuthToken() {
  return window.localStorage.getItem('wavexctoken');
}

/**
 * Handle errors from API requests.
 * @param {Object} error - The error object from Axios.
 */
function handleError(error) {
  const { response } = error;
  if (response?.status === 403) {
    localStorage.removeItem('wavexctoken');
  }
}
