import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom'; //

// ** import components
import Input from '@ui/Input';
import Button from '@ui/Buttons';
import Checkbox from '@ui/Checkbox';
import FormItem from '@ui/FormItem';
import Loader from '@ui/Loader';

// ** import shared components
import ActionLink from '@shared/ActionLink';
import Typography from '@shared/Typography';
import PasswordInput from '@shared/PasswordInput';

// ** import third party library
import { Field, Form, Formik } from 'formik';
import * as Yup from 'yup';

// ** import assets
import Logo from '@assets/svg/Logo';

// ** import utils
import { toasterX } from '@utils/toastMessages';

// ** import api essentials
import { login } from '@api/auth';
import { adminResendOtp } from '@api/admin';

const validationSchema = Yup.object().shape({
  email: Yup.string().required('Please enter your email'),
  password: Yup.string().required('Please enter your password'),
  rememberMe: Yup.bool(),
});

const SignIn = (props) => {
  const navigate = useNavigate();
  const [verify, setVerify] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [userEmail, setUserEmail] = useState('');

  const {
    disableSubmit = false,
    className,
    forgotPasswordUrl = '/forgot-password',
    signUpUrl = '/sign-up',
  } = props;

  const [isBlinking, setIsBlinking] = useState(true);

  useEffect(() => {
    const timer = setTimeout(() => {
      setIsBlinking(false);
    }, 10000);
    return () => clearTimeout(timer); // This will clear TimeOut if React unmounts the component
  }, [verify]);

  const onSignIn = async (values, setSubmitting) => {
    const { email, password } = values;
    setUserEmail(email);
    const uniqueID = email;
    setSubmitting(true);
    const response = await login(uniqueID, password);
    if (response.success) {
      localStorage.setItem('userToken', response.data.token);
      navigate('/home');
    } else {
      console.log(response);
      if (response?.message == 'Request failed with status code 400') {
        setVerify(true);
      }
      toasterX.error(
        response?.message == 'Request failed with status code 401'
          ? 'Wrong credentials'
          : response?.message == 'Request failed with status code 400'
          ? 'Please verify your email'
          : 'Some problem while signing in ',
      );
      setVerify(true);
    }
    setSubmitting(false);
  };

  const handleVerify = async () => {
    if (userEmail?.length == '' || !userEmail) {
      toasterX.warning('Enter correct email and try to login again');
      return;
    }
    try {
      setIsLoading(true);
      const response = await adminResendOtp(userEmail);
      console.log('response forget password', response);

      if (response?.success) {
        console.log('response', response);
        toasterX.success('Now you verify');
        setIsLoading(false);

        navigate(`/verify`);
      } else {
        console.log('Error while verifying', response);
        toasterX.error(response?.message ?? 'Error in verify');
        setIsLoading(false);
      }
    } catch (error) {
      console.error('Error in verify', error);
      setIsLoading(false);
    }
  };

  return (
    <div className="grid lg:grid-cols-3 h-full w-full">
      <Loader isLoading={isLoading} />
      <div
        className="bg-no-repeat bg-cover py-6 px-16 flex-col justify-between hidden lg:flex"
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
          className={`${className} w-full h-[100vh] flex flex-col justify-center items-center`}
        >
          <div className="mb-2 w-[400px]">
            <Typography variant="P_SemiBold_H4">Welcome back!</Typography>
            <Typography variant="P_Regular_H6" className="!block">
              Please enter your credentials to sign in!
            </Typography>
          </div>

          <Formik
            initialValues={{
              userName: '',
              password: '',
              rememberMe: true,
            }}
            validationSchema={validationSchema}
            onSubmit={(values, { setSubmitting }) => {
              if (!disableSubmit) {
                onSignIn(values, setSubmitting);
              } else {
                setSubmitting(false);
              }
            }}
          >
            {({ touched, errors, isSubmitting }) => (
              <Form className="w-[400px]">
                <div className=" flex justify-between items-center">
                  <Typography variant="P_Medium_H6">Email:</Typography>
                  {verify && (
                    <Typography
                      onClick={handleVerify}
                      variant="P_Medium_H6"
                      className={`${
                        isBlinking ? 'blink' : 'stop-blink'
                      } text-primary hover:underline hover:scale-110 duration-500 cursor-pointer`}
                    >
                      Verify yourself
                    </Typography>
                  )}
                </div>
                <FormItem
                  invalid={errors.email && touched.email}
                  errorMessage={errors.email}
                  className="!mt-2"
                >
                  <Field
                    type="email"
                    autoComplete="off"
                    name="email"
                    placeholder="Email"
                    component={Input}
                  />
                </FormItem>
                <FormItem
                  label="Password"
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
                <div className="flex justify-between mb-6 rememberMe">
                  <Field
                    className="mb-0"
                    name="rememberMe"
                    component={Checkbox}
                    children="Remember Me"
                  />
                  <ActionLink to={forgotPasswordUrl}>
                    Forgot Password?
                  </ActionLink>
                </div>
                <Button
                  block
                  loading={isSubmitting}
                  variant="solid"
                  type="submit"
                >
                  {isSubmitting ? 'Signing in...' : 'Sign In'}
                </Button>
                <div className="mt-4 text-center">
                  <Typography variant="P_Regular_H7">
                    Don't have an account yet?{' '}
                  </Typography>
                  <ActionLink to={signUpUrl}>Sign up</ActionLink>
                </div>
              </Form>
            )}
          </Formik>
        </div>
      </div>
    </div>
  );
};

export default SignIn;
