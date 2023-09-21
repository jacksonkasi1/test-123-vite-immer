import React from 'react';

// ** import redux
import { useDispatch, useSelector } from 'react-redux';
import { ChangeMode, Minimize } from '@slice/themeConfig';

// ** import sub component
import UserDropDown from '../UserDropDown';

// ** import from nextUi
import { Switch } from '@nextui-org/react';

// ** import asstes
import { MoonIcon } from '@icons/MoonIcon';
import { SunIcon } from '@icons/SunIcon';

// ** import from third party library
import { FaAlignJustify, FaAlignLeft } from 'react-icons/fa';

const Header = ({ className }) => {
  const dispatch = useDispatch();
  const themeConfig = useSelector((state) => state.themeConfigs.minimized);
  const themeConfigColor = useSelector((state) => state.themeConfigs);

  console.log('themeConfig', themeConfigColor?.themeColor);

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
          <Switch
            defaultSelected
            size="lg"
            thumbIcon={({ isSelected, className }) =>
              isSelected ? (
                <SunIcon className={className} />
              ) : (
                <MoonIcon className={className} />
              )
            }
            classNames={{
              wrapper: `bg-${themeConfigColor.themeColor}-${themeConfigColor.colorLevel} `,
            }}
            onClick={() => dispatch(ChangeMode())}
          ></Switch>

          <UserDropDown />
        </div>
      </div>
    </div>
  );
};

export default Header;
