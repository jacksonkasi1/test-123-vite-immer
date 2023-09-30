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
import { adminResetPassword, adminVerify } from '@api/admin';
import PasswordInput from '@shared/PasswordInput';

// ** import third party library
import { Field, Form, Formik } from 'formik';
import * as Yup from 'yup';
import FormItem from '@src/components/ui/FormItem';

const ResetPassword = (props) => {
  const navigate = useNavigate();
  const [otp, setOtp] = useState('');
  const [isLoading, setIsLoading] = useState(false);

  const { disableSubmit = false } = props;


  const handleChange = (otp) => {
    setOtp(otp);
  };

  const validationSchema = Yup.object().shape({
    password: Yup.string().required('Please enter your password'),
    confirmPassword: Yup.string()
      .oneOf([Yup.ref('password'), null], 'Passwords must match')
      .required('Confirm Password is required'),
  });

  const onResetPassword = async (values, setSubmitting, resetForm) => {
    if (otp.length <= 5) {
      toasterX.warning('Please enter a valid otp');
      return;
    }
    const payloadObj = { ...values, otp };

    setSubmitting(true);

    try {
      setIsLoading(true);
      const response = await adminResetPassword(payloadObj);

      if (response?.success) {
        toasterX.success('SignUp successful please check your email to verify');
        resetForm();
        navigate(`/sign-in`);
      } else {
        console.log('Error while signing up', response?.message);
        toasterX.error(response?.message ?? 'Error while signing up');
      }
      setIsLoading(false);

      setSubmitting(false);
    } catch (error) {
      console.error('Error while signing up', error);
      setSubmitting(false);
      setIsLoading(false);
    }
    setSubmitting(false);
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
            <Typography variant="P_SemiBold_H4">
              {' '}
              Reset your password{' '}
            </Typography>
            <Typography variant="P_Regular_H6" className="!block">
              We sent a verification code to your email. Enter the code from the
              email in the field below.
            </Typography>
          </div>
          <div className=" flex flex-col gap-2">
            <Typography variant="P_Medium_H6" className="">
              Enter Otp here 💬
            </Typography>

            <OtpInput
              value={otp}
              onChange={handleChange}
              numInputs={6}
              renderInput={(props) => (
                <Input {...props} className="!border-2 m-1.5 ms-0 !h-10 !w-10  " />
              )}
            />
            <div className="flex justify-center">
              <Formik
                initialValues={{
                  password: '',

                  confirmPassword: '',
                }}
                validationSchema={validationSchema}
                onSubmit={(values, { setSubmitting, resetForm }) => {
                  if (!disableSubmit) {
                    onResetPassword(values, setSubmitting, resetForm);
                  } else {
                    setSubmitting(false);
                  }
                }}
              >
                {({ touched, errors, isSubmitting }) => (
                  <Form className="w-[400px]">
                    <Typography variant="P_Medium_H6">Password</Typography>
                    <FormItem
                      invalid={errors.password && touched.password}
                      errorMessage={errors.password}
                    >
                      <Field
                        autoComplete="off"
                        name="password"
                        placeholder="Password"
                        component={PasswordInput}
                      />
                    </FormItem>

                    <Typography variant="P_Medium_H6">
                      Confirm Password
                    </Typography>
                    <FormItem
                      invalid={
                        errors.confirmPassword && touched.confirmPassword
                      }
                      errorMessage={errors.confirmPassword}
                    >
                      <Field
                        autoComplete="off"
                        name="confirmPassword"
                        placeholder="Password"
                        className="!h-9"
                        component={PasswordInput}
                      />
                    </FormItem>
                    <Button
                      block
                      loading={isSubmitting}
                      variant="solid"
                      type="submit"
                      className="!mt-2"
                    >
                      {isSubmitting ? 'Reset in process...' : 'Reset'}
                    </Button>
                  </Form>
                )}
              </Formik>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ResetPassword;
