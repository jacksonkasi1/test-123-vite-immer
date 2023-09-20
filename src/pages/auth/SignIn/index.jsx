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
  userName: Yup.string().required('Please enter your user name'),
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
    const { userName, password } = values;
    const uniqueID = userName;
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
            {/* <Avatar
              className="border-2 border-white"
              shape="circle"
              src="/img/avatars/thumb-10.jpg"
            /> */}
            <div className="text-white">
              <div className="font-semibold text-base">Brittany Hale</div>
              <span className="opacity-80">CTO, Onward</span>
            </div>
          </div>
          <p className="text-lg text-white opacity-80">
            Elstar comes with a complete set of UI components crafted with
            Tailwind CSS, it fulfilled most of the use case to create modern and
            beautiful UI and application
          </p>
        </div>
        <span className="text-white">
          Copyright &copy; {`${new Date().getFullYear()}`}{' '}
          <span className="font-semibold">{`Hungry Meh`}</span>{' '}
        </span>
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
                  label="User Name"
                  invalid={errors.userName && touched.userName}
                  errorMessage={errors.userName}
                >
                  <Field
                    type="text"
                    autoComplete="off"
                    name="userName"
                    placeholder="User Name"
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
                  <span>Don't have an account yet? </span>
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
