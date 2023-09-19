import useSWR from 'swr';
import axios from '@axios';

const fetcher = async (url) => {
  try {
    const response = await axios.post(url);
    return response.data;
  } catch (error) {
    throw error;
  }
};

export const getAllCategory = async (search, limit = 20, cursor, ...props) => {
  try {
    const response = await axios.post(
      `admin/meal/category/all?search=${search ?? ''}&limit=${
        limit ?? ''
      }&cursor=${cursor ?? ''}`,
      {
        ...props,
      },
    );
    console.log(response.data);
    return response.data;
  } catch (error) {
    console.error('An error occurred at getAllCategory:', error);
  }
};
