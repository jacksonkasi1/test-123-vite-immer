import axios from '@axios';
import useSWR, { mutate } from 'swr';

const fetcher = async (url) => {
  try {
    const response = await axios.get(url);
    return response.data;
  } catch (error) {
    throw error;
  }
};

export const getAdminProfileApi = () => {
  const cacheKey = 'admin/details';
  const { error, ...data } = useSWR(cacheKey, fetcher, {
    revalidateOnFocus: false,
    onErrorRetry: (error, key, config, revalidate, { retryCount }) => {
      // Only retry up to 10 times.
      if (retryCount >= 10) return;
      // Retry after 5 seconds.
      setTimeout(() => revalidate({ retryCount }), 5000);
    },
  });

  if (error) {
    console.error('An error occurred at getAdminProfile:', error);
  }
  return data;
};

// ** admin signUp V2
export const adminSignUp = async ({ ...payLoadObj }) => {
  try {
    const response = await axios.post(`admin/signup/v2`, {
      ...payLoadObj,
    });
    return response.data;
  } catch (error) {
    console.error('An error occurred at adminSignUp:', adminSignUp);
  }
};

// ** admin signUp V2
export const adminVerify = async (otp) => {
  try {
    const response = await axios.post(`admin/verify`, {
      otp,
    });
    return response.data;
  } catch (error) {
    console.error('An error occurred at adminVerify:', adminVerify);
  }
};

export const updateProfile = async (
  full_name,
  mobile,
  email,
  toRemoveProfilePic,
  profilePicUrl,
) => {
  try {
    const newProfilePic = profilePicUrl;
    const res = await axios.post('/admin/update', {
      full_name,
      mobile,
      email,
      toRemoveProfilePic,
      newProfilePic,
    });
    if (res.data.success) {
      mutate('admin', res.data, false); // here 'admin' is the key for the SWR cache
    }
    return res.data;
  } catch (error) {
    return {
      success: false,
      message: error.response.data.message,
    };
  }
};

export const changePassword = async (current_pass, new_pass) => {
  try {
    const res = await axios.post('/admin/change-password', {
      current_pass,
      new_pass,
    });
    if (res.data.success) {
      return res.data;
    } else {
      return res.data;
    }
  } catch (error) {
    return {
      success: false,
      message: error.response.data.message,
    };
  }
};
