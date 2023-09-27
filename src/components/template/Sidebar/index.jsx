import React, { useEffect, useState } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';

// ** import assets
import Logo from '@assets/svg/Logo';

// ** import redux
import { useSelector } from 'react-redux';

// ** import navConfig
import menus from '../../../configs/nav.config';

const Sidebar = () => {
  const themeConfig = useSelector((state) => state.themeConfigs);

  const location = useLocation();

  // list of menus
  const items = menus;

  // navigate
  const navigate = useNavigate();

  const [active, setActive] = useState('');

  useEffect(() => {
    if (location.pathname) {
      setActive(location.pathname);
    }
  }, [location.pathname]);

  return (
    <div
      className={`${
        themeConfig?.minimized ? 'w-[5%]' : 'w-[15%]'
      } transition-all duration-300 fixed left-0 top-0 h-full z-50  bg-light_ dark:bg-dark_ border-r-[2px] border-mid_dark_ dark:border-dark_border flex items-center flex-col`}
    >
      <div className={`py-2 px-2 ${themeConfig?.minimized && 'mb-3'}`}>
        <Logo minimized={themeConfig?.minimized} width={220} />
      </div>
      <div className="flex flex-col items-center w-full gap-y-1 overflow-y-auto px-2">
        {items.map((data) => {
          return (
            <div
              onClick={() => {
                setActive(data?.path);
                navigate(data?.path);
              }}
              key={data?.path}
              className={`${
                active === data?.path &&
                `bg-${themeConfig.themeColor}-${themeConfig.colorLevel} text-white_`
              } flex py-2 cursor-pointer w-[90%] hover:bg-${
                themeConfig.themeColor
              }-300 dark:hover:text-white_ hover:text-white rounded-[5px] items-center ${
                themeConfig?.minimized ? 'justify-center' : 'pl-3'
              } peer dark:text-white_`}
            >
              {data?.icon}
              {!themeConfig.minimized && (
                <p
                  className={`ml-3 ${
                    active === data?.path
                      ? 'text-white_ dark:text-white_'
                      : 'dark:text-text_dark dark:hover:text-white_'
                  }`}
                >
                  {data?.level}
                </p>
              )}
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default Sidebar;
