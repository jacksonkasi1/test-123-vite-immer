import axios from 'axios';
import env from '@src/configs';

// Create an instance with custom configuration options
const instance = axios.create({
  baseURL: env.BASE_URL + '/api/v1', // Your API base URL
  timeout: 10000, // Request timeout in milliseconds
  headers: {
    'Content-Type': 'application/json', // Set default content type
    // Add any other custom headers here
  },
  withCredentials: true,
});

export default instance;
