import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { store } from '../store';

const showToast = (type, message) => {
  const mode = store.getState('themeConfigs').themeConfigs.mode;

  return toast[type](message, {
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

export const toasterX = {
  success: (message) => showToast('success', message),
  error: (message) => showToast('error', message),
  warning: (message) => showToast('warning', message),
  info: (message) => showToast('info', message),
};
