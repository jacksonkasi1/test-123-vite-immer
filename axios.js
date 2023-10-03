import axios from 'axios';
import env from '@src/configs';

// Create an instance with custom configuration options
const instance = axios.create({
  baseURL: env.BASE_URL + '/api/v1', // Your API base URL
  timeout: 20000, // Request timeout in milliseconds
  headers: {
    'Content-Type': 'application/json', // Set default content type
    // Add any other custom headers here
  },
  withCredentials: true,
});

// Add a response interceptor
instance.interceptors.response.use(function (response) {
  // Any status code that lie within the range of 2xx cause this function to trigger
  // This means the request was successful
  return response;
}, function (error) {
  // Any status codes that falls outside the range of 2xx cause this function to trigger
  // This means there was a problem with the request
  if (error.response && error.response.status === 403) { // Check if the response status is 'Forbidden'
    window.location.href = `${env.BASE_URL}/api/v1/admin/sign-out`;
  }
  return Promise.reject(error);
});

export default instance;
