import useSWR from 'swr';
import axios from '@axios';

const fetcher = async (url) => {
  try {
    const response = await axios.get(url);
    return response.data;
  } catch (error) {
    throw error;
  }
};

export const getAllTable = (
  search = '',
  limit = 10,
  cursor = '',
  type = '',
  from = '',
  to = '',
) => {
  const cacheKey = `admin/restaurant/tbl/all?search=${search}&type=${type}&from={{${from}}}&to={{${to}}}&limit=${limit}&cursor=${cursor}`;
  const { error, ...data } = useSWR(cacheKey, fetcher, {
    revalidateOnFocus: false,
  });
  if (error) {
    console.error('An error occurred at getAllTable:', error);
  }
  return data;
};
