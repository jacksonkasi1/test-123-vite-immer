

/**
 * Checks if an object is empty.
 *
 * @param {Object} obj - The object to check.
 * @returns {boolean} True if the object is empty; otherwise, false.
 */
export const isObjEmpty = (obj) => Object.keys(obj).length === 0;

export const selectThemeColors = theme => ({
    ...theme,
    colors: {
      ...theme.colors,
      primary25: '#7367f01a', // for option hover bg-color
      primary: '#7367f0', // for selected option bg-color
      neutral10: '#7367f0', // for tags bg-color
      neutral20: '#ededed', // for input border-color
      neutral30: '#ededed' // for input hover border-color
    }
  })
  


