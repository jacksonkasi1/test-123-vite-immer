import React from 'react';
import {
  HiOutlineDeviceMobile,
  HiOutlineGlobeAlt,
  HiOutlineMail,
} from 'react-icons/hi';
import { useSelector } from 'react-redux';

const NotificationCheckBoxGroup = ({
  className,
  setEmail,
  setBrowser,
  setApp,
  email,
  browser,
  app,
}) => {
  const themeConfig = useSelector((state) => state.themeConfigs);
  return (
    <ul
      className={`${className} items-center w-full text-sm font-medium text-gray-900 bg-white border border-gray-200 rounded-lg sm:flex dark:bg-gray-700 dark:border-gray-600 dark:text-white`}
    >
      <li
        className={`relative ${
          email && `bg-${themeConfig.themeColor}-${themeConfig.colorLevel}`
        } w-full border-b border-gray-200 sm:border-b-0 sm:border-r dark:border-gray-600`}
      >
        <div
          onClick={() => setEmail()}
          className="absolute left-0 top-0 w-full h-full !cursor-pointer"
        ></div>
        <div className="flex items-center pl-3 !cursor-pointer">
          <label
            for="horizontal-list-radio-license"
            className={`${
              email && 'text-white_'
            } w-full overflow-hidden !cursor-pointer py-3 ml-2 text-sm font-medium text-gray-900 dark:text-gray-300 flex justify-center gap-x-2`}
          >
            <HiOutlineMail className="" size={20} />
            Email{' '}
          </label>
        </div>
      </li>
      <li className={`relative  ${
          browser && `bg-${themeConfig.themeColor}-${themeConfig.colorLevel}`
        } w-full overflow-hidden border-b border-gray-200 sm:border-b-0 sm:border-r dark:border-gray-600`}>
        <div
          onClick={() => setBrowser()}
          className="absolute left-0 top-0 w-full h-full !cursor-pointer"
        ></div>
        <div className="flex items-center pl-3">
          <label
            for="horizontal-list-radio-id"
            className={`${
              browser && 'text-white_'
            } w-full py-3 ml-2 text-sm font-medium text-gray-900 dark:text-gray-300 flex justify-center gap-x-2`}
          >
            <HiOutlineGlobeAlt className="" size={20} />
            Browser
          </label>
        </div>
      </li>
      <li className={`relative  ${
          app && `bg-${themeConfig.themeColor}-${themeConfig.colorLevel}`
        } w-full overflow-hidden dark:border-gray-600`}>
        <div
          onClick={() => setApp()}
          className="absolute left-0 top-0 w-full h-full !cursor-pointer"
        ></div>
        <div className="flex items-center pl-3 justify-center">
          <label
            for="horizontal-list-radio-passport"
            className={`${
                app && 'text-white_'
              } w-full py-3 ml-2 text-sm font-medium text-gray-900 dark:text-gray-300 flex justify-center gap-x-2`}
          >
            <HiOutlineDeviceMobile className="" size={20} />
            App
          </label>
        </div>
      </li>
    </ul>
  );
};

export default NotificationCheckBoxGroup;
