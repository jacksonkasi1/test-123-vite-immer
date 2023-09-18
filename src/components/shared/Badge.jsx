import React from 'react';
import { Button } from '@nextui-org/react';
import { useSelector } from 'react-redux';

const Badge = ({children}) => {
  const themeColor = useSelector((state) => state.themeConfigs);

  return (
    <Button className={`bg-${themeColor.themeColor}-100 dark:!text-white_ dark:!bg-[#1C425B] !py-[13px] !h-0 !rounded-[7px] !px-3 text-${themeColor.themeColor}-${themeColor.colorLevel}`} variant="flat">
      {children}
    </Button>
  );
};


export default Badge;
