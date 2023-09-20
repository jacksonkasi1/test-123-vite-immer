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
  limit = 10,
  pageIndex =1,
  search = '',
  cursor = '',
  type = '',
  from = '',
  to = '',
) => {
  const cacheKey = `admin/restaurant/tbl/all?search=${search}&type=${type}&pageIndex=${pageIndex}&from=${from}&to=${to}&limit=${limit}&cursor=${cursor}`;
  const { error, ...data } = useSWR(cacheKey, fetcher, {
    revalidateOnFocus: false,
  });
  if (error) {
    console.error('An error occurred at getAllTable:', error);
  }
  return data;
};
