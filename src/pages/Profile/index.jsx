import React, { useRef } from 'react';
import Header from './Header';
import Typography from '../../components/shared/Typography';
import { useSelector } from 'react-redux';
import * as Yup from 'yup';
import { Field, Form, Formik } from 'formik';
import Input from '../../components/ui/Input/Input';
import {
  HiOutlineGlobeAlt,
  HiOutlineMail,
  HiOutlineUserCircle,
} from 'react-icons/hi';
import FormItem from '../../components/ui/FormItem';
import Select from '../../components/ui/Select';
import Button from '../../components/ui/Buttons'

const validationSchema = Yup.object().shape({
  name: Yup.string()
    .min(3, 'Too Short!')
    .max(12, 'Too Long!')
    .required('User Name Required'),
  email: Yup.string().email('Invalid email').required('Email Required'),
  timeZone: Yup.string(),
});

const countryOption = [
  {
    value: 'en',
    label: 'English (US)',
    imgPath:
      'https://cdn.vectorstock.com/i/preview-1x/55/74/usa-uk-flags-combined-english-language-icon-vector-45465574.jpg',
  },
  {
    value: 'ch',
    label: '中文',
    imgPath: 'https://elstar.themenate.net/img/countries/cn.png',
  },
  {
    value: 'jp',
    label: '日本语',
    imgPath: 'https://elstar.themenate.net/img/countries/jp.png',
  },
  {
    value: 'fr',
    label: 'French',
    imgPath: 'https://elstar.themenate.net/img/countries/fr.png',
  },
];

const Profile = () => {
  const themeConfig = useSelector((state) => state.themeConfigs);

  const profilePic = useRef();

  return (
    <div className="p-10">
      <Header />

      <div className="p-5 flex flex-col w-full !mb-[100px]">
        <Typography variant="P_SemiBold_H5" className="dark:text-white_">
          General
        </Typography>
        <Typography variant="P_Regular_H7" className="text-text_light">
          Basic info, like your name and address that will displayed in public
        </Typography>

        <Formik
          initialValues={{ name: '', email: '', timeZone: '' }}
          enableReinitialize
          validationSchema={validationSchema}
          onSubmit={(values, { setSubmitting }) => {
            setSubmitting(true);
            setTimeout(() => {
              onFormSubmit(values, setSubmitting);
            }, 1000);
          }}
        >
          {({ values, touched, errors, isSubmitting, resetForm }) => {
            return (
              <Form>
                <div className="mt-10">
                  {/* profile picture */}
                  <div className="flex w-full justify-between items-center pb-6 border-b-[2px] border-mid_dark_ dark:border-dark_border">
                    <div className="flex w-[80%] justify-between items-center">
                      <Typography
                        variant="P_SemiBold_H6"
                        className="text-text_light"
                      >
                        Avatar
                      </Typography>

                      <div className="w-[60%] flex items-center">
                        <img
                          className="w-[50px] h-[50px] rounded-[50%]"
                          src="https://images.unsplash.com/photo-1594751543129-6701ad444259?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8Mnx8ZGFyayUyMHByb2ZpbGV8ZW58MHx8MHx8fDA%3D&w=1000&q=80"
                          alt=""
                        />

                        <div className="ml-7 flex items-center gap-x-5">
                          <Typography
                            variant="P_SemiBold_H6"
                            className="cursor-pointer text-red-600 dark:!text-red-600"
                          >
                            Remove
                          </Typography>

                          <Typography
                            onClick={() => {
                              profilePic.current.click();
                            }}
                            variant="P_SemiBold_H6"
                            className={`cursor-pointer text-${themeConfig.themeColor}-${themeConfig.colorLevel} dark:text-${themeConfig.themeColor}-${themeConfig.colorLevel}`}
                          >
                            Upload
                          </Typography>
                          <input
                            type="file"
                            ref={profilePic}
                            className="hidden"
                          />
                        </div>
                      </div>
                    </div>
                  </div>

                  {/* name */}
                  <div className="flex w-full justify-between items-center pb-6 mt-6 border-b-[2px] border-mid_dark_ dark:border-dark_border">
                    <div className="flex w-[80%] justify-between items-center">
                      <Typography
                        variant="P_SemiBold_H6"
                        className="text-text_light"
                      >
                        Name
                      </Typography>

                      <div className="w-[60%] flex items-center">
                        <FormItem
                          label=""
                          invalid={errors.name && touched.name}
                          errorMessage={errors.name}
                          className="!mb-4 relative"
                        >
                          <Field
                            type="text"
                            autoComplete="off"
                            name="name"
                            placeholder="Name"
                            component={Input}
                            prefix={
                              <HiOutlineUserCircle className="text-xl ml-3 text-text_light" />
                            }
                          />
                        </FormItem>
                      </div>
                    </div>
                  </div>

                  {/* email */}
                  <div className="flex w-full justify-between items-center pb-6 mt-6">
                    <div className="flex w-[80%] justify-between items-center">
                      <Typography
                        variant="P_SemiBold_H6"
                        className="text-text_light"
                      >
                        Email
                      </Typography>

                      <div className="w-[60%] flex items-center">
                        <FormItem
                          label=""
                          invalid={errors.email && touched.email}
                          errorMessage={errors.email}
                          className="!mb-4 relative"
                        >
                          <Field
                            type="email"
                            autoComplete="off"
                            name="email"
                            placeholder="Email"
                            component={Input}
                            prefix={
                              <HiOutlineMail className="text-xl ml-3 text-text_light" />
                            }
                          />
                        </FormItem>
                      </div>
                    </div>
                  </div>

                  {/* Preferences */}
                  <div className="flex flex-col">
                    <Typography
                      variant="P_SemiBold_H5"
                      className="dark:text-white_ mt-5"
                    >
                      Preferences
                    </Typography>
                    <Typography
                      variant="P_Regular_H7"
                      className="text-text_light"
                    >
                      Your personalized preference displayed in your account
                    </Typography>
                  </div>

                  {/* time */}
                  <div className="flex w-full justify-between items-center mt-10 pb-6 border-b-[2px] border-mid_dark_ dark:border-dark_border">
                    <div className="flex w-[80%] justify-between items-center">
                      <Typography
                        variant="P_SemiBold_H6"
                        className="text-text_light"
                      >
                        Time Zone
                      </Typography>

                      <div className="w-[60%] flex items-center">
                        <FormItem
                          label=""
                          invalid={errors.timeZone && touched.timeZone}
                          errorMessage={errors.timeZone}
                          className="!mb-4 relative"
                        >
                          <Field
                            type="text"
                            autoComplete="off"
                            placeholder="Time Zone"
                            name="timeZone"
                            component={Input}
                            prefix={
                              <HiOutlineGlobeAlt className="text-xl ml-3 text-text_light" />
                            }
                          />
                        </FormItem>
                      </div>
                    </div>
                  </div>

                  <div className="flex w-full justify-between items-center mt-10">
                    <div className="flex w-[80%] justify-between items-center">
                      <Typography
                        variant="P_SemiBold_H6"
                        className="text-text_light"
                      >
                        Language
                      </Typography>

                      <div className="w-[60%] flex items-center">
                        <Select
                          isSearchable={false}
                          options={countryOption}
                          placeholder="Select Language"
                        />
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
                      {isSubmitting ? 'Updating' : 'Update'}
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

export default Profile;
