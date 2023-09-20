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

export const getFoodList = (
  available = '',
  limit = 10,
  pageIndex=1,
  cursor = '',
  type = '',
  from = '',
  to = '',
) => {
  const cacheKey = `admin/restaurant/meal/all?available=${available}&limit=${limit}&pageIndex=${pageIndex}&type=${type}&from=${from}&to${to}`;
  const { error, ...data } = useSWR(cacheKey, fetcher, {
    revalidateOnFocus: false,
  });
  if (error) {
    console.error('An error occurred at getFoodList:', error);
  }
  return data;
};
