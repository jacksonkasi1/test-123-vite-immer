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

export const getFoodDetails = ({ meal_id, with_related }) => {
  const cacheKey = `restaurant/meals/details?meal_id=${meal_id}&with_related=${with_related}`;

  const { error, ...data } = useSWR(cacheKey, fetcher, {
    revalidateOnFocus: true,
  });
  if (error) {
    console.error('An error occurred at getFoodDetails:', error);
  }
  data.mutate;
  return data;
};
