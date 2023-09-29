import React, { useRef } from 'react';
import Header from './Header';
import Typography from '../../components/shared/Typography';
import * as Yup from 'yup';
import { Field, Form, Formik } from 'formik';
import Input from '../../components/ui/Input/Input';
import { HiOutlineLockClosed } from 'react-icons/hi';
import FormItem from '../../components/ui/FormItem';
import Button from '../../components/ui/Buttons';
import { changePassword } from '../../api/admin';
import { toasterX } from '@src/utils/toastMessages';

const validationSchema = Yup.object().shape({
  currentPassword: Yup.string().required('Current Password Required'),
  newPassword: Yup.string()
    .min(8, 'Too Short!')
    .required('New Password Required'),
  confirmPassword: Yup.string().oneOf(
    [Yup.ref('newPassword'), null],
    "Passwords don't match!",
  ),
});

const Password = () => {
  return (
    <div className="p-10">
      <Header />

      <div className="p-5 flex flex-col w-full !mb-[100px]">
        <Typography variant="P_SemiBold_H5" className="dark:text-white_">
          Password
        </Typography>
        <Typography variant="P_Regular_H7" className="text-text_light">
          Enter your current & new password to reset your password
        </Typography>

        <Formik
          initialValues={{
            currentPassword: '',
            newPassword: '',
            confirmPassword: '',
          }}
          enableReinitialize
          validationSchema={validationSchema}
          onSubmit={async (values, { setSubmitting }) => {
            const update = await changePassword(
              values.currentPassword,
              values.newPassword,
            );
            console.log(update);
            if (update.success) {
              toasterX.success('Password updated successfully');
            } else {
              toasterX.error(update.message);
            }
            setSubmitting(true);
            // setTimeout(() => {
            //   onFormSubmit(values, setSubmitting);
            // }, 1000);
          }}
        >
          {({ values, touched, errors, isSubmitting, resetForm }) => {
            return (
              <Form>
                <div className="mt-10">
                  {/* Current Password */}
                  <div className="flex w-full justify-between items-center pb-6 mt-6 border-b-[2px] border-mid_dark_ dark:border-dark_border">
                    <div className="flex w-[80%] justify-between items-center">
                      <Typography
                        variant="P_SemiBold_H6"
                        className="text-text_light"
                      >
                        Current Password
                      </Typography>

                      <div className="w-[60%] flex items-center">
                        <FormItem
                          label=""
                          invalid={
                            errors.currentPassword && touched.currentPassword
                          }
                          errorMessage={errors.currentPassword}
                          className="!mb-4 relative"
                        >
                          <Field
                            type="text"
                            autoComplete="off"
                            name="currentPassword"
                            placeholder="Current Password"
                            component={Input}
                            prefix={
                              <HiOutlineLockClosed className="text-xl ml-3 text-text_light" />
                            }
                          />
                        </FormItem>
                      </div>
                    </div>
                  </div>

                  {/* Current Password */}
                  <div className="flex w-full justify-between items-center pb-6 mt-6 border-b-[2px] border-mid_dark_ dark:border-dark_border">
                    <div className="flex w-[80%] justify-between items-center">
                      <Typography
                        variant="P_SemiBold_H6"
                        className="text-text_light"
                      >
                        New Password
                      </Typography>

                      <div className="w-[60%] flex items-center">
                        <FormItem
                          label=""
                          invalid={errors.newPassword && touched.newPassword}
                          errorMessage={errors.newPassword}
                          className="!mb-4 relative"
                        >
                          <Field
                            type="text"
                            autoComplete="off"
                            name="newPassword"
                            placeholder="New Password"
                            component={Input}
                            prefix={
                              <HiOutlineLockClosed className="text-xl ml-3 text-text_light" />
                            }
                          />
                        </FormItem>
                      </div>
                    </div>
                  </div>

                  {/* Current Password */}
                  <div className="flex w-full justify-between items-center pb-6 mt-6 border-b-[2px] border-mid_dark_ dark:border-dark_border">
                    <div className="flex w-[80%] justify-between items-center">
                      <Typography
                        variant="P_SemiBold_H6"
                        className="text-text_light"
                      >
                        Confirm Password
                      </Typography>

                      <div className="w-[60%] flex items-center">
                        <FormItem
                          label=""
                          invalid={
                            errors.confirmPassword && touched.confirmPassword
                          }
                          errorMessage={errors.confirmPassword}
                          className="!mb-4 relative"
                        >
                          <Field
                            type="text"
                            autoComplete="off"
                            name="confirmPassword"
                            placeholder="Confirm Password"
                            component={Input}
                            prefix={
                              <HiOutlineLockClosed className="text-xl ml-3 text-text_light" />
                            }
                          />
                        </FormItem>
                      </div>
                    </div>
                  </div>

                  <div className="gap-x-3 w-full justify-end flex mt-20">
                    <Button
                      className="ltr:mr-2 rtl:ml-2"
                      type="button"
                      onClick={resetForm}
                    >
                      Reset
                    </Button>
                    <Button
                      variant="solid"
                      loading={isSubmitting}
                      type="submit"
                    >
                      {isSubmitting ? 'Updating' : 'Update Password'}
                    </Button>
                  </div>
                </div>
              </Form>
            );
          }}
        </Formik>
      </div>
    </div>
  );
};

export default Password;
