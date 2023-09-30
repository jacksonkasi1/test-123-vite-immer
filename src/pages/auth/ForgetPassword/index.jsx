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

// ** import utils
import { toasterX } from '@utils/toastMessages';

// ** import api essentials
import { adminForgetPassword } from '@api/admin';

const ForgetPassword = (props) => {
  const navigate = useNavigate();
  const [email, setEmail] = useState('');
  const [emailError, setEmailError] = useState(false);
  const [isLoading, setIsLoading] = useState(false);

  const handleChange = (e) => {
    setEmail(e.target.value);
    setEmailError(false);
  };

  const handleSubmit = async () => {
    if (email?.length == '' || !email) {
      setEmailError(true);
      return;
    }
    try {
      setIsLoading(true);
      const response = await adminForgetPassword(email);
      console.log('response forget password', response);

      if (response?.success) {
        console.log('response', response);
        toasterX.success('Now you can reset your password');
        setIsLoading(false);

        navigate(`/reset-password`);
      } else {
        console.log('Error while verifying', response);
        toasterX.error(response?.message ?? 'Error in reset password');
        setIsLoading(false);
      }
    } catch (error) {
      console.error('Error in reset password', error);
      setIsLoading(false);
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
            <Typography variant="P_SemiBold_H4">Enter your Email</Typography>
            <Typography variant="P_Regular_H6" className="!block">
              We will send you a verification code to your email. Enter the
              email in the field below.
            </Typography>
          </div>
          <div className="flex flex-col w-[400px] gap-2">
            <Typography variant="P_Medium_H6" className="!ms-2">
              Email
            </Typography>

            <Input type="email" onChange={handleChange} />
            {emailError && (
              <Typography variant="P_Regular_H7" className="!text-danger">
                Please enter a valid email here
              </Typography>
            )}

            <div className="flex justify-center mt-3">
              <Button
                block
                loading={isLoading}
                variant="solid"
                onClick={handleSubmit}
              >
                Submit
              </Button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ForgetPassword;
