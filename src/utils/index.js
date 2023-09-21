import { useSelector } from "react-redux";

/**
 * Checks if an object is empty.
 *
 * @param {Object} obj - The object to check.
 * @returns {boolean} True if the object is empty; otherwise, false.
 */
export const isObjEmpty = (obj) => Object.keys(obj).length === 0;

// ** formatting date mm-dd-yyyy
export const formatDate = (date) => {
  const day = String(date.getDate()).padStart(2, '0');
  const month = String(date.getMonth() + 1).padStart(2, '0');
  const year = date.getFullYear();
  return `${month}-${day}-${year}`;
};

// ** to capitalize
export function capitalize(str) {
  return str.charAt(0).toUpperCase() + str.slice(1);
}

const darkModeSelectTheme = {
    colors: {
      primary25: '#7367f01a', // for option hover bg-color
      primary: '#7367f0', // for selected option bg-color
      neutral10: '#7367f0', // for tags bg-color
      neutral20: '#1f2937', // for input border-color in dark mode
      neutral30: '#1f2937', // for input hover border-color in dark mode
    },
  };
  
  const lightModeSelectTheme = {
    colors: {
      primary25: '#7367f01a', // for option hover bg-color
      primary: '#7367f0', // for selected option bg-color
      neutral10: '#7367f0', // for tags bg-color
      neutral20: '#ededed', // for input border-color in light mode
      neutral30: '#ededed', // for input hover border-color in light mode
    },
  };
  

export const selectThemeColors = (themConfig) => {
    return themConfig.mode === 'dark' ? darkModeSelectTheme : lightModeSelectTheme;
};
