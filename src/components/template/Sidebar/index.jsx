import React, { useState } from 'react';
import Logo from '../../../assets/svg/Logo';
import { useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import menus from '../../../configs/nav.config'


const Sidebar = () => {
  const themeConfig = useSelector((state) => state.themeConfigs);

  // list of menus
  const items = menus;

  // navigate
  const navigate = useNavigate();

  const [active, setActive] = useState(themeConfig?.root);

  return (
    <div className="fixed left-0 top-0 h-full w-[15%] bg-light_ dark:bg-dark_ border-r-[2px] border-mid_dark_ flex items-center flex-col">
      <div className="py-2 px-2">
        <Logo width={220} />
      </div>
      <div className="flex flex-col items-center w-full gap-y-1 overflow-y-auto px-2">
        {items.map((data) => {
          return (
            <div
              onClick={() => {
                setActive(data?.path);
                navigate(data?.path);
              }}
              className={`${
                active === data?.path &&
                `!bg-${themeConfig.themeColor}-${themeConfig.colorLevel} !text-white_`
              } flex py-2 cursor-pointer w-[90%] hover:bg-${
                themeConfig.themeColor
              }-300 dark:hover:text-white_ rounded-[5px] pl-3 items-center peer dark:text-white_`}
            >
              {
                data?.icon
              }
              <p className={`ml-3 ${active === data?.path && 'text-white_'} dark:text-white_`}>{data?.level}</p>
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default Sidebar;
