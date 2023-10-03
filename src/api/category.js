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

// ** get api for getting all category
export const getAllCategory = (
  limit = 10,
  pageIndex = 1,
  search = '',
  type = 'LifeTime',
  from = '',
  to = '',
) => {
  let cacheKey;
  if (from == 'NaN-NaN-NaN' || to == 'NaN-NaN-NaN' || from == '' || to == '') {
    cacheKey = `admin/meal/category/all?search=${search ?? ''}&limit=${
      limit ?? ''
    }&pageIndex=${pageIndex}&type=${type}`;
  } else {
    cacheKey = `admin/meal/category/all?search=${search ?? ''}&limit=${
      limit ?? ''
    }&pageIndex=${pageIndex}&type=BetWeen&from=${from}&to=${to}`;
  }
  const { error, ...data } = useSWR(cacheKey, fetcher, {
    revalidateOnFocus: false,
  });
  if (error) {
    console.error('An error occurred at getAllCategory:', error);
  }
  return data;
};


// ** post api for creating category
export const addCategory = async ({ ...payLoadObj }) => {
  try {
    const response = await axios.post(`/admin/meal/category/add`, {
      ...payLoadObj,
    });
    return response.data;
  } catch (error) {
    console.error('An error occurred at addCategory:', error);
  }
};
