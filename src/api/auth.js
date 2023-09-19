import useSWR, { mutate } from 'swr';
import axios from '@axios';


export const login = async (unique_id, password) => {
    const response = await axios.post('/admin/login', { unique_id, password });
    if (response.data.success) {
      mutate('/admin/login', response.data, false); // local mutation
    }
    return response.data;
  };
  
