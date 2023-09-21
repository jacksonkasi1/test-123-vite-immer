// list all environment variables
const env = {
    BASE_URL: import.meta.env.VITE_NODE_ENV === 'development' ? import.meta.env.VITE_API_URL_DEV : import.meta.env.VITE_API_URL_PROD
  };
  
  export default env;
  