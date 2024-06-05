import axios from 'axios';

// Determine if the environment is local
const isLocalEnvironment = () => {
  const hostName = window.location.hostname;
  return hostName === 'localhost';
};

// Get the base URL depending on the environment
const getBaseUrl = () => {
  if (isLocalEnvironment()) {
    return 'http://localhost:2000/api';
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
  try {
    const response = await api.get(endpoint);
    return response.data;
  } catch (error) {
    console.error('Error fetching data:', error);
    throw error;
  }
};

// Function to post data to service
export const postData = async (endpoint, data) => {
  try {
    const response = await api.post(endpoint, data);
    return response.data;
  } catch (error) {
    console.error('Error posting data:', error);
    throw error;
  }
};
