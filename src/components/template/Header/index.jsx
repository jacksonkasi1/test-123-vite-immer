import React from 'react';
import { FaAlignJustify, FaAlignLeft } from 'react-icons/fa';
import { useDispatch, useSelector } from 'react-redux';
import { Minimize } from '../../../store/slice/themeConfig';

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
        <div className="flex items-center">
          <img
            className="w-[40px] h-[40px] rounded-[50%]"
            src="https://marketplace.canva.com/EAFXS8-cvyQ/1/0/1600w/canva-brown-and-light-brown%2C-circle-framed-instagram-profile-picture-2PE9qJLmPac.jpg"
            alt=""
          />
          <div className="ml-3 leading-5">
            <p className="m-0 text-[14px] text-light_dark_ dark:text-text_dark">
              Admin
            </p>
            <p className="m-0 text-[16px] font-semibold text-light_dark_ dark:text-text_dark">
              Emon Das
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Header;
