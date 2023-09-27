import React, { useState } from 'react';

// import ** shared components
import Typography from '@shared/Typography';

// ** import ui component
import Input from '@ui/Input';
import ImageUpload from '@ui/ImageUpload';
import FormItem from '@ui/FormItem';

// ** import assets
import noImage from '@assets/Images/noImage.jpg';

// ** import from next ui
import {
  Button,
  Chip,
  Image,
  Select,
  SelectItem,
  Switch,
  Textarea,
} from '@nextui-org/react';

// ** import form redux
import { useSelector } from 'react-redux';

// ** import sub Pages

// ** import utils
import { resizeImage } from '@utils';
import { errorMessage, successMessage } from '@utils/toastMessages';

import Loader from '@ui/Loader';

// ** import from Formik
import * as Yup from 'yup';
import { Field, Form, Formik } from 'formik';
import FormikErrorFocus from 'formik-error-focus';

const dropDownData = [
  { value: 'Halal', name: 'Halal' },
  { value: 'Veg', name: 'Veg' },
  { value: 'Non veg', name: 'Non veg' },
  { value: 'Indian', name: 'Indian' },
];
const AddMeals = () => {
  const themeConfig = useSelector((state) => state.themeConfigs);

  // ** form states
  const [categoryPicUrl, setCategoryPicUrl] = useState('');
  const [errorCPic, setErrorCPic] = useState(false);
  const [isVisible, setIsVisible] = useState(true);

  // ** handle loading
  const [loader, setLoader] = useState(false);

  const handleImageUpload = async (event) => {
    try {
      const file = event?.target?.files[0];
      const resizedImage = await resizeImage(file, 500, 500);
      setCategoryPicUrl(resizedImage);
      setErrorCPic(false);
    } catch (error) {
      console.log('error--->', error);
    }
  };

  const submitHandler = async () => {
    event.preventDefault();
    // try {
    //   setLoader(true);
    //   const payLoadObj = {
    //     name: categoryName,
    //     thumbnail: categoryPicUrl,
    //   };
    //   await addCategory(payLoadObj);
    //   successMessage('Category added successfully');
    //   setErrorCName(false);
    //   setErrorCPic(false);
    //   setCategoryName('');
    //   setCategoryPicUrl('');
    //   setLoader(false);
    //   setSubmitted(true);
    // } catch (error) {
    //   setLoader(false);
    //   errorMessage('Some problem occurred');
    // }
  };

  const validationSchema = Yup.object().shape({
    name: Yup.string()
      .min(2, 'Too Short!')
      .max(50, 'Too Long!')
      .required('Name is required'),
    description: Yup.string()
      .min(5, 'Description too short!')
      .max(300, 'Description too long!')
      .required('Description is required'),
    category: Yup.string()
      .min(2, 'Category name is too short!')
      .max(50, 'Category name is too long!')
      .required('Category is required'),
    timeFrom: Yup.string().required('Start time is required'),
    timeTo: Yup.string().required('End time is required'),
    totalPrice: Yup.number()
      .min(0, 'Total price should be 0 or more')
      .required('Total price is required'),
    tag: Yup.string()
      .max(30, 'Tag name is too long.')
      .required('Tag name is required'),
  });

  return (
    <div className="py-4 px-6">
      <Loader isLoading={loader} />
      <div className="py-4">
        <Typography variant="P_Medium_H5">Add New Meal</Typography>
      </div>
      <Formik
        initialValues={{
          name: '',
          description: '',
          category: '',
          timeFrom: '',
          timeTo: '',
          totalPrice: '',
          tag: '',
        }}
        enableReinitialize
        validationSchema={validationSchema}
        onSubmit={async (values, { setSubmitting }) => {
          console.log('values', values);
        }}
      >
        {({ values, touched, errors, isSubmitting, resetForm }) => {
          return (
            <Form>
              <div className="grid grid-flow-row-dense grid-cols-2 grid-rows-4 gap-4">
                <div className=" md:row-span-2 border-[1px] shadow w-full flex flex-col rounded-lg bg-primary-white border-mid-dark p-6 gap-8">
                  <div>
                    <Typography
                      variant="P_SemiBold_H6"
                      className="text-text_light "
                    >
                      Name
                    </Typography>

                    <div className="pt-2 ">
                      <FormItem
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
                          //   onChange={(e) => {
                          //     setUserData({
                          //       ...userData,
                          //       name: e.target.value,
                          //     });
                          //   }}
                        />
                      </FormItem>
                    </div>
                  </div>
                  <div>
                    <Typography
                      variant="P_SemiBold_H6"
                      className="text-text_light"
                    >
                      Short Description
                    </Typography>

                    <Textarea
                      name="description"
                      placeholder="type description here..."
                      classNames={{
                        inputWrapper:
                          'bg-primary_white dark:bg-transparent shadow-none border-[1px] rounded-md ',
                        input:
                          ' rounded-lg bg-primary_white dark:!bg-transparent dark:text-default-600 shadow-none ',
                      }}
                    />
                  </div>
                </div>
                <div className="md:row-span-2 border-[1px] shadow w-full flex flex-col justify-center rounded-lg bg-primary-white border-mid-dark p-6 gap-3">
                  <Typography variant="P_Regular_H6">Meal Image</Typography>

                  <div className="flex w-full gap-6">
                    <div className="flex justify-center items-start flex-[1] rounded-xl">
                      <Image
                        src={categoryPicUrl ? categoryPicUrl : noImage}
                        className="flex w-36 h-36"
                        fallbackSrc={noImage}
                      />
                    </div>
                    <div className="flex flex-col w-full flex-start flex-[3] justify-end">
                      <ImageUpload uploadHandler={handleImageUpload} />
                      {errorCPic && (
                        <Typography
                          variant="P_Regular_H7"
                          className="!text-danger"
                        >
                          Please upload category Image here
                        </Typography>
                      )}
                    </div>
                  </div>
                </div>
                <div className=" border-[1px] shadow w-full flex flex-col rounded-lg bg-primary-white border-mid-dark p-6 gap-2">
                  <Typography
                    variant="P_SemiBold_H6"
                    className="text-text_light"
                  >
                    Category
                  </Typography>
                  <Select
                    className="w-full !rounded-md"
                    selectionMode="multiple"
                    items={dropDownData}
                    isMultiline={true}
                    name="category"
                    classNames={{
                      mainWrapper:
                        'dark:text-default-600 !bg-transparent border rounded-md',
                      trigger: 'rounded-md !py-0 h-10 !bg-transparent',
                      popover: 'rounded-md',
                      value: 'pb-2',
                    }}
                    renderValue={(items) => {
                      return (
                        <div className="flex flex-wrap gap-2">
                          {items.map((item, index) => (
                            <Chip key={index}>{item.props.value}</Chip>
                          ))}
                        </div>
                      );
                    }}
                  >
                    {dropDownData.map((drop) => (
                      <SelectItem
                        key={drop.name}
                        value={drop.name}
                        className="dark:text-default-600"
                      >
                        {drop.name}
                      </SelectItem>
                    ))}
                  </Select>
                </div>
                <div className="flex justify-between items-center border-[1px] shadow w-full  rounded-lg bg-primary-white border-mid-dark p-6 gap-4">
                  <Typography variant="P_Regular_H6">
                    Turning visibility off will not show this product in the
                    user app and website
                  </Typography>
                  <div className="flex gap-2">
                    <Typography variant="P_Medium_H6">Visibility</Typography>
                    <Switch isSelected={isVisible} />
                  </div>
                </div>
                <div className=" border-[1px] shadow w-full flex rounded-lg bg-primary-white border-mid-dark p-6 gap-4">
                  <div className="flex flex-col gap-2 w-1/2">
                    <Typography
                      variant="P_SemiBold_H6"
                      className="text-text_light"
                    >
                      Available From
                    </Typography>
                    <FormItem
                      invalid={errors.timeFrom && touched.timeFrom}
                      errorMessage={errors.timeFrom}
                      className="!mb-4 relative"
                    >
                      <Field
                        type="time"
                        autoComplete="off"
                        name="timeFrom"
                        placeholder="Name"
                        component={Input}
                      />
                    </FormItem>
                  </div>
                  <div className="flex flex-col gap-2 w-1/2">
                    <Typography
                      variant="P_SemiBold_H6"
                      className="text-text_light"
                    >
                      Available To
                    </Typography>
                    <FormItem
                      invalid={errors.timeTo && touched.timeTo}
                      errorMessage={errors.timeTo}
                      className="!mb-4 relative"
                    >
                      <Field
                        type="time"
                        autoComplete="off"
                        name="timeTo"
                        placeholder="Name"
                        component={Input}
                      />
                    </FormItem>
                  </div>
                </div>
                <div className=" border-[1px] shadow w-full flex flex-col rounded-lg bg-primary-white border-mid-dark p-8 ">
                  <Typography
                    variant="P_SemiBold_H6"
                    className="text-text_light"
                  >
                    Total Price
                  </Typography>
                  <FormItem
                    invalid={errors.totalPrice && touched.totalPrice}
                    errorMessage={errors.totalPrice}
                    className="!mb-4 relative pt-2"
                  >
                    <Field
                      type="text"
                      autoComplete="off"
                      name="totalPrice"
                      placeholder="eg:100"
                      component={Input}
                    />
                  </FormItem>
                </div>
                <div className=" border-[1px] shadow w-full flex flex-col rounded-lg bg-primary-white border-mid-dark p-8 ">
                  <Typography
                    variant="P_SemiBold_H6"
                    className="text-text_light"
                  >
                    Tag
                  </Typography>
                  <FormItem
                    invalid={errors.tag && touched.tag}
                    errorMessage={errors.tag}
                    className="!mb-4 relative pt-2"
                  >
                    <Field
                      type="text"
                      autoComplete="off"
                      name="tag"
                      placeholder="tag..."
                      component={Input}
                    />
                  </FormItem>
                </div>
              </div>
              <FormikErrorFocus
                offset={-90}
                align={'top'}
                focusDelay={10}
                ease={'linear'}
                duration={200}
              />
              <div className="flex justify-end gap-8 pt-8">
                <Button
                  variant="bordered"
                  className={`!rounded-[5px] flex items-center gap-x-3 text-text-light_ `}
                  type="button"
                >
                  <Typography variant="P_Regular_H6">Reset</Typography>
                </Button>
                <Button
                  variant="bordered"
                  className={`!rounded-[5px] cursor-pointer flex items-center gap-x-3 text-text-light_ !bg-${themeConfig.themeColor}-${themeConfig.colorLevel} text-${themeConfig.themeColor}-${themeConfig.colorLevel} dark:text-${themeConfig.themeColor}-${themeConfig.colorLevel} border-${themeConfig.themeColor}-${themeConfig.colorLevel}`}
                  type="submit"
                >
                  <Typography variant="P_Regular_H6">
                    {isSubmitting ? 'submitting' : 'Submit'}
                  </Typography>
                </Button>
              </div>
            </Form>
          );
        }}
      </Formik>
    </div>
  );
};

export default AddMeals;
