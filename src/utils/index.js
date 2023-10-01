import Resizer from 'react-image-file-resizer';

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

/**
 * Resize an image file while maintaining its aspect ratio.
 *
 * @param {File} file - The image file to be resized.
 * @param {number} maxWidth - The maximum width for the resized image.
 * @param {number} maxHeight - The maximum height for the resized image.
 * @returns {Promise<string>} A Promise that resolves to a base64-encoded resized image.
 * @throws {Error} If there is an error during the resizing process.
 */
export const resizeImage = (file, maxWidth, maxHeight) => {
  return new Promise((resolve, reject) => {
    Resizer.imageFileResizer(
      file,
      maxWidth,
      maxHeight,
      'WEBP', // output format
      70, // quality
      0, // rotation
      (uri) => {
        resolve(uri);
      },
      'base64', // output type
      maxWidth, // output width
      maxHeight, // output height
    );
  });
};


/**
 * Converts a decimal time value to a formatted time string (HH:MM).
 *
 * @param {number} decimalTime - The decimal time value to convert, e.g., 15.41666666666667.
 * @returns {string} The formatted time string in the "HH:MM" format.
 * @throws {TypeError} If the input is not a valid number.
 * @throws {RangeError} If the input is negative or exceeds 24 hours.
 * @example
 * const decimalTime = 15.41666666666667;
 * const formattedTime = convertDecimalTimeToTimeString(decimalTime);
 * // Returns: "15:25"
 */
export function convertDecimalTimeToTimeString(decimalTime) {
  console.log("decimalTime",decimalTime)

  if (decimalTime < 0 || decimalTime >= 24) {
    throw new RangeError('Input must be between 0 and 24.');
  }

  const hours = Math.floor(decimalTime);
  const minutes = Math.round((decimalTime - hours) * 60);

  const hoursString = hours < 10 ? `0${hours}` : `${hours}`;
  const minutesString = minutes < 10 ? `0${minutes}` : `${minutes}`;

  return `${hoursString}:${minutesString}`;
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
