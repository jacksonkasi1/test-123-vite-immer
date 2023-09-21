import { useSelector } from 'react-redux';
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { store } from '../store';

export const errorMessage = (message) => {
  const mode = store.getState('themeConfigs').themeConfigs.mode;

  return toast.error(message, {
    position: 'top-right',
    autoClose: 4000,
    hideProgressBar: false,
    closeOnClick: true,
    pauseOnHover: true,
    draggable: true,
    progress: undefined,
    theme: mode,
  });
};

export const successMessage = (message) => {
  const mode = store.getState('themeConfigs').themeConfigs.mode;

  return toast.success(message, {
    position: 'top-right',
    autoClose: 4000,
    hideProgressBar: false,
    closeOnClick: true,
    pauseOnHover: true,
    draggable: true,
    progress: undefined,
    theme: mode,
  });
};

export const warningMessage = (message) => {
  const mode = store.getState('themeConfigs').themeConfigs.mode;

  return toast.warning(message, {
    position: 'top-right',
    autoClose: 4000,
    hideProgressBar: false,
    closeOnClick: true,
    pauseOnHover: true,
    draggable: true,
    progress: undefined,
    theme: mode,
  });
};
