import React from 'react';
import { useNavigate } from 'react-router-dom'; //

// ** import components
import Input from '@components/ui/Input';
import Button from '@components/ui/Buttons';
import Checkbox from '@components/ui/Checkbox';
import FormItem from '@components/ui/FormItem';

// ** import shared components
import ActionLink from '@shared/ActionLink';
import Typography from '@shared/Typography';
import PasswordInput from '@shared/PasswordInput';

// ** import third party library
import { Field, Form, Formik } from 'formik';
import * as Yup from 'yup';

// ** import assets
import Logo from '@assets/svg/Logo';

// ** import api essentials
import { login } from '@api/auth';

const validationSchema = Yup.object().shape({
  email: Yup.string().required('Please enter your email'),
  password: Yup.string().required('Please enter your password'),
  rememberMe: Yup.bool(),
});

const SignIn = (props) => {
  const navigate = useNavigate();

  const {
    disableSubmit = false,
    className,
    forgotPasswordUrl = '/forgot-password',
    signUpUrl = '/sign-up',
  } = props;

  const onSignIn = async (values, setSubmitting) => {
    const { email, password } = values;
    const uniqueID = email;
    setSubmitting(true);
    const response = await login(uniqueID, password);
    if (response.success) {
      localStorage.setItem('userToken', response.data.token);
      navigate('/home');
    }
    setSubmitting(false);
  };

  return (
    <div className="grid lg:grid-cols-3 h-full w-full">
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
              <Typography className="text-primary_white" variant='P_Regular_H6'>Brittany Hale</Typography>
              <Typography variant='P_Regular_H6' className="opacity-80 ps-2 text-primary_white">CTO, Onward</Typography>
            </div>
          </div>
          <Typography variant="P_Regular_H7" className='text-primary_white'>
            Hungry meh let you manage your restaurants needs and apply things
            effectively.
          </Typography>
        </div>
        <Typography variant='P_Regular_H7'  className="text-primary_white">
          Copyright &copy; {`${new Date().getFullYear()}`}{' '}
          <Typography variant='P_Regular_H7' className="text-primary_white">{`Hungry Meh`}</Typography>{' '}
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
                <FormItem
                  label="Email"
                  invalid={errors.email && touched.email}
                  errorMessage={errors.email}
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
                  <Typography variant='P_Regular_H7'>Don't have an account yet? </Typography>
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
