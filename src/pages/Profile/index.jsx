import React, { useEffect, useRef, useState } from 'react';

// ** import sub pages
import Header from './Header';

// ** import shared components
import Typography from '@shared/Typography';

// ** import from redux
import { useDispatch, useSelector } from 'react-redux';

// ** import third party library
import * as Yup from 'yup';
import { Field, Form, Formik } from 'formik';
import {
  HiOutlineGlobeAlt,
  HiOutlineMail,
  HiOutlinePhone,
  HiOutlineUserCircle,
} from 'react-icons/hi';

// ** import components
import Input from '@components/ui/Input/Input';
import FormItem from '@components/ui/FormItem';
import Select from '@components/ui/Select';
import Button from '@components/ui/Buttons';

// ** import api essential
import { updateProfile } from '@api/admin';
import { setUser } from '@slice/userSlice';
import { toasterX } from '@utils/toastMessages';

// ** import assets
import dummyProfile from '@assets/Images/dummyProfile.png';
import { Image, Skeleton } from '@nextui-org/react';
import { resizeImage } from '@src/utils';
import cn from '@src/utils/cn';

const validationSchema = Yup.object().shape({
  name: Yup.string()
    .min(3, 'Too Short!')
    .max(12, 'Too Long!')
    .required('User Name Required'),
  email: Yup.string().email('Invalid email').required('Email Required'),
  phone: Yup.string().required('Phone Required'),
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
  const dispatch = useDispatch();

  const profilePic = useRef();

  // ** swr api function call
  const user = useSelector((state) => state.userSlice.user);

  const [userData, setUserData] = useState({
    name: user.name,
    email: user.email,
    timeZone: '',
    phone: user.phone,
  });

  const [toRemoveProfilePic, setToRemoveProfilePic] = useState('');

  const [profilePicUrl, setProfilePicUrl] = useState('');
  useEffect(() => {
    if (user?.avatar) {
      setProfilePicUrl(user?.avatar);
    }
    if (user?.email) {
      setUserData({
        ...userData,
        name: user?.name,
        email: user?.email,
        phone: user?.phone,
      });
      setToRemoveProfilePic(user?.avatar);
    }
  }, [userData.profilePic, user]);

  // ** image url for cropImage component
  const handleImageUpload = async (event) => {
    try {
      const file = event?.target?.files[0];
      const resizedImage = await resizeImage(file, 500, 500);
      setProfilePicUrl(resizedImage);
    } catch (error) {
      console.log('error->>>>>>>>>>>>>>>>>', error);
    }
  };

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
          initialValues={{
            name: userData?.name,
            email: userData?.email,
            phone: userData?.phone,
            timeZone: userData?.timeZone,
          }}
          enableReinitialize
          validationSchema={validationSchema}
          onSubmit={async (values, { setSubmitting }) => {
            const update = await updateProfile(
              values?.name,
              values?.phone,
              values?.email,
              toRemoveProfilePic,
              profilePicUrl,
            );
            if (update?.success) {
              toasterX.success('Updated profile successfully');
              dispatch(
                setUser({
                  name: update.data.full_name,
                  email: update.data.email,
                  role: update.data.roles,
                  phone: update.data.mobile,
                  avatar: update.data.profile_pic,
                }),
              );
            } else {
              toasterX.error(update?.message);
            }
            setSubmitting(true);
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

                      <div className="w-3/5 flex items-center">
                        <img
                          disableSkeleton
                          className="w-20 h-20 object-cover rounded-full"
                          src={`${
                            profilePicUrl ? profilePicUrl : dummyProfile
                          }`}
                          alt=""
                        />

                        <div className="ml-7 flex items-center gap-x-5">
                          <Typography
                            variant="P_SemiBold_H6"
                            className={cn(
                              ' dark:!text-red-600',
                              user.avatar == profilePicUrl
                                ? 'cursor-default text-red-300'
                                : 'cursor-pointer text-red-600',
                            )}
                            onClick={() => {
                              if (user.avatar == profilePicUrl) {
                                return;
                              }
                              setProfilePicUrl(user?.avatar);
                            }}
                          >
                            Remove
                          </Typography>

                          <Typography
                            variant="P_SemiBold_H6"
                            className={`cursor-pointer text-${themeConfig.themeColor}-${themeConfig.colorLevel} dark:text-${themeConfig.themeColor}-${themeConfig.colorLevel}`}
                            onClick={() => {
                              profilePic.current.click();
                            }}
                          >
                            Upload
                          </Typography>
                          <input
                            type="file"
                            ref={profilePic}
                            className="hidden"
                            onChange={handleImageUpload}
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
                            onChange={(e) => {
                              setUserData({
                                ...userData,
                                name: e.target.value,
                              });
                            }}
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
                            onChange={(e) => {
                              setUserData({
                                ...userData,
                                email: e.target.value,
                              });
                            }}
                          />
                        </FormItem>
                      </div>
                    </div>
                  </div>

                  {/* Phone */}
                  <div className="flex w-full justify-between items-center pb-6 mt-6">
                    <div className="flex w-[80%] justify-between items-center">
                      <Typography
                        variant="P_SemiBold_H6"
                        className="text-text_light"
                      >
                        Phone
                      </Typography>

                      <div className="w-[60%] flex items-center">
                        <FormItem
                          label=""
                          invalid={errors.phone && touched.phone}
                          errorMessage={errors.phone}
                          className="!mb-4 relative"
                        >
                          <Field
                            type="number"
                            autoComplete="off"
                            name="phone"
                            placeholder="Phone"
                            component={Input}
                            prefix={
                              <HiOutlinePhone className="text-xl ml-3 text-text_light" />
                            }
                            onChange={(e) => {
                              setUserData({
                                ...userData,
                                phone: e.target.value,
                              });
                            }}
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
                      disabled={
                        profilePicUrl == user?.avatar &&
                        userData?.email === user?.email &&
                        userData?.name === user?.name &&
                        userData?.phone === user?.phone
                          ? true
                          : false
                      }
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
