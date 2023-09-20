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

export const getAllCategory = (
  limit = 10,
  pageIndex = 1,
  search = '',
  type = '',
  from = '',
  to = '',
) => {
  const cacheKey = `admin/meal/category/all?search=${search ?? ''}&limit=${
    limit ?? ''
  }&pageIndex=${pageIndex}&type=${type}&from=${from}&to${to}`;
  const { error, ...data } = useSWR(cacheKey, fetcher, {
    revalidateOnFocus: false,
  });
  if (error) {
    console.error('An error occurred at getAllCategory:', error);
  }
  return data;
};
