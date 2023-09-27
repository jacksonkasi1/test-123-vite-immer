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

export const getRestaurants = (limit = 10, cursor="", search = '') => {
  const cacheKey = `/admin/restaurant/get?limit=${limit}&cursor=${cursor}&search=${search}`;

  const { error, ...data } = useSWR(cacheKey, fetcher, {
    revalidateOnFocus: false,
  });
  if (error) {
    console.error('An error occurred at getRestaurants:', error);
  }
  return data;
};
