import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom'; //

// ** import ui components
import Button from '@ui/Buttons';
import Input from '@ui/Input';
import Loader from '@ui/Loader';

// ** import shared components
import Typography from '@shared/Typography';

// ** import assets
import Logo from '@assets/svg/Logo';

// ** third party library
import OtpInput from 'react-otp-input';

// ** import utils
import { toasterX } from '@utils/toastMessages';

// ** import api essentials
import { adminVerify } from '@api/admin';

const Verify = (props) => {
  const navigate = useNavigate();
  const [otp, setOtp] = useState('');
  const [isLoading, setIsLoading] = useState(false);

  const handleChange = (otp) => {
    setOtp(otp);
  };

  const handleVerify = async () => {
    if (otp.length <= 5) {
      toasterX.warning('Please enter a valid otp');
      return;
    }
    const response = await adminVerify(otp);
    console.log('response', response);

    if (response?.success) {
      console.log('response', response);
      toasterX.success('Verified successfully');
      navigate(`/sign-in`);
      resetForm();
    } else {
      console.error('Error while verifying', response);
      toasterX.error(error?.message ?? 'Error while verifying');
    }
  };

  return (
    <div className="grid lg:grid-cols-5 h-full w-full">
      <Loader isLoading={isLoading} />
      <div
        className=" col-span-3 bg-no-repeat bg-cover py-6 px-16 flex-col justify-between hidden lg:flex"
        style={{
          backgroundImage: `url('https://elstar.themenate.net/img/others/auth-side-bg.jpg')`,
        }}
      >
        <Logo width={250} />
        <div>
          <div className="mb-6 flex items-center gap-4">
            <div className="text-white">
              <Typography className="text-primary_white" variant="P_Regular_H6">
                Brittany Hale
              </Typography>
              <Typography
                variant="P_Regular_H6"
                className="opacity-80 ps-2 text-primary_white"
              >
                CTO, Onward
              </Typography>
            </div>
          </div>
          <Typography variant="P_Regular_H7" className="text-primary_white">
            Hungry meh let you manage your restaurants needs and apply things
            effectively.
          </Typography>
        </div>
        <Typography variant="P_Regular_H7" className="text-primary_white">
          Copyright &copy; {`${new Date().getFullYear()}`}{' '}
          <Typography
            variant="P_Regular_H7"
            className="text-primary_white"
          >{`Hungry Meh`}</Typography>{' '}
        </Typography>
      </div>
      <div className="col-span-2 flex flex-col justify-center items-center bg-white dark:bg-gray-800">
        <div
          className={`w-full h-[100vh] flex flex-col gap-6 justify-center items-center`}
        >
          <div className="mb-1 w-[400px]">
            <Typography variant="P_SemiBold_H4"> Verify OTP 💬</Typography>
            <Typography variant="P_Regular_H6" className="!block">
              We sent a verification code to your email. Enter the code from the
              email in the field below.
            </Typography>
          </div>
          <div className="flex flex-col gap-2">
            <Typography variant="P_Medium_H5" className="!ms-2">
              Enter Otp here
            </Typography>

            <OtpInput
              value={otp}
              onChange={handleChange}
              numInputs={6}
              renderInput={(props) => (
                <Input {...props} className="!border-2 m-1.5 !h-10 !w-10  " />
              )}
            />
            <div className="flex justify-center">
              <Button
                block
                loading={isLoading}
                variant="solid"
                className="!w-3/4"
                onClick={handleVerify}
              >
                Verify
              </Button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Verify;
