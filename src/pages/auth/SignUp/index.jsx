import React from 'react';
import { useNavigate } from 'react-router-dom'; //

// ** import components
import Input from '@components/ui/Input';
import Button from '@components/ui/Buttons';
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
import { adminSignUp } from '@src/api/admin';
import { toasterX } from '@src/utils/toastMessages';

const validationSchema = Yup.object().shape({
  org_name: Yup.string().required('Please enter your organization name'),
  password: Yup.string().required('Please enter your password'),
  full_name: Yup.string().required('Please enter your full name'),
  email: Yup.string()
    .required('Please enter your email')
    .email('Must be a valid email'),
  mobile: Yup.string().required('Please enter your mobile number'),
  confirmPassword: Yup.string()
    .oneOf([Yup.ref('password'), null], 'Passwords must match')
    .required('Confirm Password is required'),
});

const SignUp = (props) => {
  const navigate = useNavigate();

  const { disableSubmit = false, className, signInUrl = '/sign-in' } = props;

  const onSignUp = async (values, setSubmitting, resetForm) => {
    const payloadObj = { ...values };
    setSubmitting(true);

    const response = await adminSignUp(payloadObj);
    setSubmitting(false);

    if (response?.success) {
      //   localStorage.setItem('userToken', response.data.token);
      console.log('response', response);
      toasterX.success('SignUp successful please check your email to verify');
      resetForm()
      navigate(`/verify?=${response?.data?.org_id}`);
    } else {
      console.error('Error while signing up', response?.message);
      toasterX.error(error?.message ?? 'Error while signing up');
    }

  };

  return (
    <div className="grid lg:grid-cols-5 h-full w-full">
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
          className={`${className} w-full h-[100vh] flex flex-col justify-center items-center`}
        >
          <div className="mb-1 w-[400px]">
            <Typography variant="P_SemiBold_H4">Welcome back!</Typography>
            <Typography variant="P_Regular_H6" className="!block">
              Please enter your details to sign up!
            </Typography>
          </div>

          <Formik
            initialValues={{
              org_name: '',
              password: '',
              full_name: '',
              email: '',
              mobile: '',
              confirmPassword: '',
            }}
            validationSchema={validationSchema}
            onSubmit={(values, { setSubmitting, resetForm }) => {
              if (!disableSubmit) {
                onSignUp(values, setSubmitting, resetForm);
              } else {
                setSubmitting(false);
              }
            }}
          >
            {({ touched, errors, isSubmitting }) => (
              <Form className="w-[400px]">
                <Typography variant="P_Medium_H7">Organization Name</Typography>
                <FormItem
                  invalid={errors.org_name && touched.org_name}
                  errorMessage={errors.org_name}
                  className="mb-4 mt-1"
                  errorClassName="!text-sm"
                >
                  <Field
                    type="text"
                    autoComplete="off"
                    name="org_name"
                    placeholder="Organization Name"
                    component={Input}
                    className="!h-9"
                  />
                </FormItem>

                <Typography variant="P_Medium_H7">Full name</Typography>
                <FormItem
                  invalid={errors.full_name && touched.full_name}
                  errorMessage={errors.full_name}
                  className="mb-4 mt-1"
                  errorClassName="!text-sm"
                >
                  <Field
                    type="text"
                    autoComplete="off"
                    name="full_name"
                    placeholder="Full name"
                    component={Input}
                    className="!h-9"
                  />
                </FormItem>

                <Typography variant="P_Medium_H7">Email</Typography>
                <FormItem
                  invalid={errors.email && touched.email}
                  errorMessage={errors.email}
                  className="mb-4 mt-1"
                  errorClassName="!text-sm"
                >
                  <Field
                    type="email"
                    autoComplete="off"
                    name="email"
                    placeholder="Email"
                    component={Input}
                    className="!h-9"
                  />
                </FormItem>

                <Typography variant="P_Medium_H7">Mobile</Typography>
                <FormItem
                  invalid={errors.mobile && touched.mobile}
                  errorMessage={errors.mobile}
                  className="mb-4 mt-1"
                  errorClassName="!text-sm"
                >
                  <Field
                    type="text"
                    autoComplete="off"
                    name="mobile"
                    placeholder="Phone no."
                    className="!h-9"
                    component={Input}
                  />
                </FormItem>

                <Typography variant="P_Medium_H7">Password</Typography>
                <FormItem
                  invalid={errors.password && touched.password}
                  errorMessage={errors.password}
                  className="mb-4 mt-1"
                  errorClassName="!text-sm"
                >
                  <Field
                    autoComplete="off"
                    name="password"
                    placeholder="Password"
                    component={PasswordInput}
                    className="!h-9"
                  />
                </FormItem>

                <Typography variant="P_Medium_H7">Confirm Password</Typography>
                <FormItem
                  invalid={errors.confirmPassword && touched.confirmPassword}
                  errorMessage={errors.confirmPassword}
                  className="mb-8 mt-1"
                  errorClassName="!text-sm"
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
                >
                  {isSubmitting ? 'Signing Up...' : 'Sign Up'}
                </Button>
                <div className="mt-4 text-center ">
                  <Typography variant="P_Regular_H7" className="pe-2">
                    Already have an account ?
                  </Typography>
                  <ActionLink to={signInUrl} className="cursor-pointer">
                    Sign In
                  </ActionLink>
                </div>
              </Form>
            )}
          </Formik>
        </div>
      </div>
    </div>
  );
};

export default SignUp;
