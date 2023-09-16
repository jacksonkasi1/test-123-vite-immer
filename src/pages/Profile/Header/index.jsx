import React from 'react';
import Typography from '../../../components/shared/Typography';
import { useSelector } from 'react-redux';
import { useLocation } from 'react-router-dom';

const Header = () => {
  const themeConfig = useSelector((state) => state.themeConfigs);
  const location = useLocation();

  // menus
  const menus = [
    {
      label: 'Profile',
      path: '/profile',
    },
    {
      label: 'Password',
      path: '/profile/password',
    },
    {
      label: 'Notification',
      path: '/profile/notification',
    },
    {
      label: 'Billing',
      path: '/profile/billing',
    },
  ];

  return (
    <div className="">
      <Typography variant="P_SemiBold_H4" className="dark:text-white_">
        Settings
      </Typography>

      <div className="mt-4 flex w-full border-b-[2px] border-mid_dark_ dark:border-dark_border">
        {menus.map((data) => {
          return (
            <div key={data?.path}>
              <Typography
                variant="P_SemiBold_H6"
                className={`py-2 px-5 ${
                  location.pathname === data?.path
                    ? `text-${themeConfig.themeColor}-${themeConfig.colorLevel} dark:text-white_ border-b-[2px] border-${themeConfig.themeColor}-${themeConfig.colorLevel}`
                    : `text-text_light`
                } !block dark:hover:text-white_ hover:text-${
                  themeConfig.themeColor
                }-${themeConfig.colorLevel}`}
                link={data?.path}
              >
                {data?.label}
              </Typography>
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default Header;
