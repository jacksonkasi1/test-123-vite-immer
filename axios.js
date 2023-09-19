import axios from 'axios';
import env from '@env';

// Function to get the token from local storage 
// *********** later will change to save in cookies
const getTokenFromLocalStorage = () => {
  return localStorage.getItem('token');
};

// Create an instance with custom configuration options
const instance = axios.create({
  baseURL:
    env.BASE_URL + '/api/v1', // Your API base URL
  timeout: 10000, // Request timeout in milliseconds
  headers: {
    'Content-Type': 'application/json', // Set default content type
    // Add any other custom headers here
    'Authorization': `${getTokenFromLocalStorage()}`
  },
  withCredentials: true,
});


export default instance;
