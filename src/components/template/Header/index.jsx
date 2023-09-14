import React from 'react';
import { FaAlignJustify, FaAlignLeft } from 'react-icons/fa';
import { useDispatch, useSelector } from 'react-redux';
import { ChangeMode, Minimize } from '../../../store/slice/themeConfig';
import UserDropDown from '../UserDropDown';

const Header = ({ className }) => {
  const dispatch = useDispatch();
  const themeConfig = useSelector((state) => state.themeConfigs.minimized);

  return (
    <div
      className={`fixed left-0 top-[-1px] border-b-[2px] border-mid_dark_ dark:border-dark_border ${className} py-3 bg-white_ dark:bg-light_dark_ z-40 flex items-center justify-center`}
    >
      <div className="w-[95%] flex justify-between items-center">
        <div>
          {themeConfig ? (
            <FaAlignJustify
              onClick={() => dispatch(Minimize())}
              size={20}
              className="text-light_dark_ hover:text-dark_ dark:text-light_ dark:hover:text-mid_dark_ cursor-pointer"
            />
          ) : (
            <FaAlignLeft
              onClick={() => dispatch(Minimize())}
              size={20}
              className="text-light_dark_ hover:text-dark_ dark:text-light_ dark:hover:text-mid_dark_ cursor-pointer"
            />
          )}
        </div>
        <div className="flex items-center gap-x-2">
          <p onClick={() => dispatch(ChangeMode())}>mode</p>
          <UserDropDown />
        </div>
      </div>
    </div>
  );
};

export default Header;
