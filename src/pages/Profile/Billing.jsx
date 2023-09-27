import React, { useState } from 'react';

// ** import sub components
import Header from './Header';

// ** import shared and ui components
import Typography from '@shared/Typography';
import Tag from '@shared/Tag';
import Button from '@ui/Buttons';
import EditCard from '@shared/Models/Billing';

const Billing = () => {
  // visa popup
  const [openModal, setOpenModal] = useState(null);

  const handleOpenModal = () => {
    if (openModal === null) {
      setOpenModal(true);
    } else {
      setOpenModal(!openModal);
    }
  };

  // master card popup
  const [openMasterCardModal, setMasterCardOpenModal] = useState(null);
  const handleMasterCardOpenModal = () => {
    if (openMasterCardModal === null) {
      setMasterCardOpenModal(true);
    } else {
      setMasterCardOpenModal(!openMasterCardModal);
    }
  };

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

        <div className="flex w-full justify-between pb-6 border-b-[2px] border-mid_dark_ dark:border-dark_border mt-10">
          <div className="flex w-[80%] justify-between">
            <Typography variant="P_SemiBold_H6" className="text-text_light">
              Credit Cards
            </Typography>

            <div className="w-[60%] border-[2px] border-mid_dark_ dark:border-dark_border rounded-[5px]">
              <div className="w-full py-4 px-4 flex justify-between items-center">
                <div className="px-4 flex items-center">
                  <img
                    src="https://elstar.themenate.net/img/others/img-8.png"
                    alt=""
                  />
                  <div className="flex flex-col ml-3">
                    <div className="flex items-center gap-x-3">
                      <Typography
                        variant="P_SemiBold_H7"
                        className="text-dark_ dark:!text-white_"
                      >
                        Ron Vargas •••• 0392
                      </Typography>

                      <Tag className="bg-sky-100 text-sky-600 dark:bg-sky-500/20 dark:text-sky-100 rounded-md border-0 mx-2">
                        <Typography
                          variant="P_Medium_H7"
                          className="capitalize"
                        >
                          {' '}
                          Primary{' '}
                        </Typography>
                      </Tag>
                    </div>
                    <Typography
                      variant="P_Regular_H7"
                      className="text-text_light"
                    >
                      Expired Dec 2025
                    </Typography>
                  </div>
                </div>
                <EditCard openModal={openModal} />
                <Button onClick={handleOpenModal} className="!py-1 !px-5">
                  Edit
                </Button>
              </div>
              <div className="w-full py-4 px-4 flex justify-between items-center border-t-[2px] border-mid_dark_ dark:border-dark_border">
                <div className="px-4 flex items-center">
                  <img
                    src="https://elstar.themenate.net/img/others/img-9.png"
                    alt=""
                  />
                  <div className="flex flex-col ml-3">
                    <div className="flex items-center gap-x-3">
                      <Typography
                        variant="P_SemiBold_H7"
                        className="text-dark_ dark:!text-white_"
                      >
                        Ron Vargas •••• 0392
                      </Typography>
                    </div>
                    <Typography
                      variant="P_Regular_H7"
                      className="text-text_light"
                    >
                      Expired Dec 2025
                    </Typography>
                  </div>
                </div>
                <EditCard openModal={openMasterCardModal} />
                <Button
                  onClick={handleMasterCardOpenModal}
                  className="!py-1 !px-5"
                >
                  Edit
                </Button>
              </div>
            </div>
          </div>
        </div>

        <div className="flex w-full justify-between pb-6 mt-10">
          <div className="flex w-[80%] justify-between">
            <Typography variant="P_SemiBold_H6" className="text-text_light">
              Other payment methods
            </Typography>

            <div className="w-[60%] border-[2px] border-mid_dark_ dark:border-dark_border rounded-[5px]">
              <div className="w-full py-4 px-4 flex justify-between items-center">
                <div className="px-4 flex items-center">
                  <img
                    src="https://elstar.themenate.net/img/others/img-10.png"
                    alt=""
                  />
                  <div className="ml-3">
                    <Typography
                      variant="P_SemiBold_H7"
                      className="text-dark_ dark:!text-white_"
                    >
                      ronnie_vergas@infotech.io
                    </Typography>
                  </div>
                </div>
                <EditCard openModal={openModal} />
                <Button
                  onClick={() => {
                    window.open('https://www.paypal.com/bd/home', '_blank');
                  }}
                  className="!py-1 !px-5"
                >
                  Edit
                </Button>
              </div>
            </div>
          </div>
        </div>

        <div className="gap-x-3 w-full justify-end flex mt-10">
          <Button className="ltr:mr-2 rtl:ml-2" type="button">
            Reset
          </Button>
          <Button variant="solid" type="submit">
            Update
          </Button>
        </div>
      </div>
    </div>
  );
};

export default Billing;
