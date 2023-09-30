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
  limit = 10,
  pageIndex = 1,
  search = '',
  category = '',
  type = '',
  from = '',
  to = '',
  available,
) => {
  let cacheKey;
  if (from == 'NaN-NaN-NaN' || to == 'NaN-NaN-NaN' || from == '' || to == '') {
    cacheKey = `admin/restaurant/meal/all?available=${
      available == 'Available'
        ? true
        : available == 'Not available'
        ? false
        : ''
    }&limit=${limit}&pageIndex=${pageIndex}&search=${search}&type=${type}&category=${category}`;
  } else {
    cacheKey = `admin/restaurant/meal/all?available=${
      available == 'Available'
        ? true
        : available == 'Not available'
        ? false
        : ''
    }&limit=${limit}&pageIndex=${pageIndex}&search=${search}&type=BetWeen&from=${from}&to=${to}&category=${category}`;
  }
  const { error, ...data } = useSWR(cacheKey, fetcher, {
    revalidateOnFocus: false,
  });
  if (error) {
    console.error('An error occurred at getFoodList:', error);
  }
  return data;
};

// ** post api for creating category
export const addMeal = async ({ ...payLoadObj }) => {
  try {
    const response = await axios.post(`admin/restaurant/meal/add-v2?lang_key=en`, {
      ...payLoadObj,
    });
    return response.data;
  } catch (error) {
    console.error('An error occurred at addMeal:', error);
  }
};
