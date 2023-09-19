import { mutate } from 'swr';
import axios from '@axios';

const login = async (unique_id, password) => {
  try {
    console.log('unique_id, password', unique_id, password);
    const res = await axios.post('/admin/login', { unique_id, password });
    if (res.data.success) {
      localStorage.setItem('token', res.data.data.token);
      mutate('admin', res.data, false); // here 'admin' is the key for the SWR cache
    }
    return res.data;
  } catch (error) {
    console.error(error);
    return {
      success: false,
      message: error.message,
    };
  }
};

export default login;
