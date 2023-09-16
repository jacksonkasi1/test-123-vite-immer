import React from 'react';
import Header from './Header';
import Typography from '../../components/shared/Typography';

const Billing = () => {
  return (
    <div className="!p-10">
      <Header />

      <div className="p-5 flex flex-col w-full !mb-[100px]">
        <Typography variant="P_SemiBold_H5" className="dark:text-white_">
          Payment Method
        </Typography>
        <Typography variant="P_Regular_H7" className="text-text_light">
          You can update your cards information here
        </Typography>
      </div>
    </div>
  );
};

export default Billing;
