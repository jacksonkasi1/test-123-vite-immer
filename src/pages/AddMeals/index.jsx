import React, { useEffect, useState } from 'react';

// ** import shared components
import Typography from '@shared/Typography';

// ** import ui component
import Select from '@ui/Select';
import Input from '@ui/Input';
import ImageUpload from '@ui/ImageUpload';
import FormItem from '@ui/FormItem';
import Loader from '@ui/Loader';

// ** import assets
import noImage from '@assets/Images/noImage.jpg';
import VegSvg from '@icons/VegSvg';
import NonVegSvg from '@icons/NonVegSvg';

// ** import from next ui
import { Button, Chip, Image, Switch, Textarea } from '@nextui-org/react';

// ** import schema
import { validationSchema } from './schema';

// ** import utils
import { resizeImage } from '@utils';
import {toasterX } from '@utils/toastMessages';

// ** import from Formik
import { ErrorMessage, Field, Form, Formik } from 'formik';
import FormikErrorFocus from 'formik-error-focus';

// ** import apis
import { getAllCategory } from '@api/category';

// ** import third party library
import { Clock } from 'react-feather';

// ** import sub components
import AddProductVariation from './AddProductVariation';
import AddSizePriceComponent from './AddSizePriceComponent';

const tagOptions = [
  { label: 'Veg', value: 'Veg_Food', icon: <VegSvg /> },
  { label: 'Non-Veg', value: 'Non_Veg_Food', icon: <NonVegSvg /> },
  { label: 'Halal', value: 'Halal', icon: <NonVegSvg /> },
];
const AddMeals = () => {
  let limit = 10;

  const [searchValue, setSearchValue] = useState('');

  // swr api call
  const allCategory = getAllCategory(limit, 1, searchValue);

  const dropDownData = allCategory?.data?.data?.getCategory?.map((item) => ({
    value: item.name,
    label: item.name,
    id: item.category_id,
  }));

  // ** form states
  const [mealPicUrl, setMealPicUrl] = useState('');
  const [errorCPic, setErrorCPic] = useState(false);
  const [isVisible, setIsVisible] = useState(true);

  // ** state as props
  const [variations, setVariations] = useState([
    {
      name: '',
      required: '',
      selectType: '',
      options: [{ name: '', price: '' }],
    },
  ]);
  const [inputFields, setInputFields] = useState([{ size: '', price: '' }]);

  // for custom async swr+react select
  const [selectValues, setSelectValues] = useState([]);

  // ** handle loading
  const [loader, setLoader] = useState(false);

  // ** handle Image upload
  const handleImageUpload = async (event) => {
    try {
      const file = event?.target?.files[0];
      const resizedImage = await resizeImage(file, 500, 500);
      setMealPicUrl(resizedImage);
      setErrorCPic(false);
    } catch (error) {
      console.error('error at handleImageUpload addMeal.js:', error);
    }
  };

  const submitHandler = async (values, { setSubmitting }) => {
    setSubmitting(true);
    event.preventDefault();
    const sizes = JSON.stringify(inputFields);
    const addOn = JSON.stringify(variations);
    let categoryArray = [];

    selectValues.map((val) => {
      categoryArray.push(val.id);
    });

    const tagValue = values?.tag?.value;
    const payLoad = {
      ...values,
      tags: tagValue,
      thumbnail: [mealPicUrl],
      is_available: isVisible,
      category: categoryArray,
      sizes,
      addOn,
    };
    console.log('values', payLoad);
    setSubmitting(false);

    // try {
    //   setLoader(true);
    //   const payLoadObj = {
    //     name: categoryName,
    //     thumbnail: mealPicUrl,
    //   };
    //   await addCategory(payLoadObj);
    //   successMessage('Category added successfully');
    //   setErrorCName(false);
    //   setErrorCPic(false);
    //   setCategoryName('');
    //   setMealPicUrl('');
    //   setLoader(false);
    //   setSubmitted(true);
    // } catch (error) {
    //   setLoader(false);
      // toasterX.error('Some problem while add meals');
    // }
  };

  const handleChange = (selectedValues) => {
    // Handle selected values here
    console.log('Selected Values:', selectedValues);
    setSelectValues(selectedValues);
  };

  const removeItem = (selectedItem) => {
    const filteredArray = selectValues.filter(
      (item) => item.value !== selectedItem.value,
    );
    setSelectValues(filteredArray);
  };

  const handleInputChange = (inputValue) => {
    setSearchValue(inputValue);
  };

  // Define custom option component
  const CustomOption = ({ innerProps, label, data }) => (
    <div
      {...innerProps}
      style={{ display: 'flex', alignItems: 'center' }}
      className="p-2 !ps-3 hover:bg-mid_dark_ dark:hover:bg-dark_ "
    >
      {data.icon}
      <Typography variant="P_Regular_H7" className="ps-2">
        {label}
      </Typography>
    </div>
  );

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
          tags: '',
        }}
        enableReinitialize
        validationSchema={validationSchema}
        onSubmit={(values, { setSubmitting }) => {
          submitHandler(values, { setSubmitting });
          // console.log({ values });
        }}
      >
        {({ values, touched, errors, isSubmitting, resetForm }) => {
          return (
            <Form>
              <div className="grid grid-flow-row-dense grid-cols-2 grid-rows-4 gap-4">
                <div className=" md:row-span-2 border-[1px] shadow-sm w-full flex flex-col rounded-lg bg-primary-white border-mid-dark p-6 gap-8">
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

                    <Field name="description">
                      {({ field }) => (
                        <Textarea
                          {...field}
                          className="mb-1"
                          id="description"
                          placeholder="Type description here..."
                          classNames={{
                            inputWrapper:
                              'bg-primary_white dark:bg-transparent shadow-none border-[1px] rounded-md',
                            input:
                              'rounded-lg bg-primary_white dark:!bg-transparent dark:text-default-600 shadow-none',
                          }}
                        />
                      )}
                    </Field>

                    <ErrorMessage
                      name="description"
                      component="div"
                      className="text-danger"
                    />
                  </div>
                </div>
                <div className="md:row-span-2 border-[1px] shadow-sm w-full flex flex-col justify-center rounded-lg bg-primary-white border-mid-dark p-6 gap-3">
                  <Typography variant="P_Regular_H6">Meal Image</Typography>

                  <div className="flex w-full gap-6">
                    <div className="flex justify-center items-start flex-[1] rounded-xl">
                      <Image
                        src={mealPicUrl ? mealPicUrl : noImage}
                        className="flex w-36 h-36 object-cover"
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
                          Please upload meal Image here
                        </Typography>
                      )}
                    </div>
                  </div>
                </div>
                <div className=" border-[1px] shadow-sm w-full flex flex-col rounded-lg bg-primary-white border-mid-dark p-6 gap-2">
                  <div>
                    <Typography
                      variant="P_SemiBold_H6"
                      className="text-text_light"
                    >
                      Category
                    </Typography>
                    <div className="flex flex-wrap gap-2 pt-1">
                      {selectValues &&
                        selectValues.map((option, index) => (
                          <Chip
                            key={index}
                            color="primary"
                            classNames={{
                              base: '!p-1 !text-ellipsis',
                              content: 'text-[12px] !text-ellipsis',
                            }}
                            onClose={() => removeItem(option)}
                            variant="flat"
                          >
                            {option.label}
                          </Chip>
                        ))}
                    </div>
                  </div>
                  <Select
                    isMulti
                    isSearchable
                    isClearable={true}
                    cacheOptions
                    defaultOptions
                    options={dropDownData}
                    onChange={handleChange}
                    onInputChange={handleInputChange} // Handle user input changes
                    inputValue={searchValue} // Controlled input value to sync with user input
                    isLoading={allCategory?.isLoading}
                    controlShouldRenderValue={false}
                    value={selectValues}
                  />
                </div>
                <div className="flex justify-between items-center border-[1px] shadow-sm w-full  rounded-lg bg-primary-white border-mid-dark p-6 gap-4">
                  <Typography variant="P_Regular_H6">
                    Turning visibility off will not show this product in the
                    user app and website
                  </Typography>
                  <div className="flex gap-2">
                    <Typography variant="P_Medium_H6">Visibility</Typography>
                    <Switch
                      isSelected={isVisible}
                      onValueChange={setIsVisible}
                    />
                  </div>
                </div>
                <div className=" border-[1px] shadow-sm w-full flex  rounded-lg bg-primary-white border-mid-dark p-6 gap-4">
                  <div className="flex flex-col gap-2 w-1/2 ">
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
                        suffix={
                          <div className="relative left-56 pointer-events-none">
                            <Clock className="text-text_light pointer-events-none " />
                          </div>
                        }
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
                        suffix={
                          <div className="relative left-56 pointer-events-none">
                            <Clock className="text-text_light pointer-events-none " />
                          </div>
                        }
                      />
                    </FormItem>
                  </div>
                </div>
                <div className=" border-[1px] shadow-sm w-full flex flex-col rounded-lg bg-primary-white border-mid-dark p-8 ">
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
                <div className=" border-[1px] shadow-sm w-full flex flex-col rounded-lg bg-primary-white border-mid-dark p-8 ">
                  <Typography
                    variant="P_SemiBold_H6"
                    className="text-text_light !pb-2"
                  >
                    Tag
                  </Typography>

                  <Field
                    name="tags"
                    component={({ field, form }) => (
                      <Select
                        {...field}
                        isClearable
                        options={tagOptions}
                        components={{ Option: CustomOption }}
                        onChange={(selectedOptions) => {
                          form.setFieldValue('tags', selectedOptions);
                        }}
                        value={values.tags}
                      />
                    )}
                  />
                  <ErrorMessage
                    name="tags"
                    component="div"
                    className="text-danger"
                  />
                </div>
                <div className=" border-[1px] shadow-sm w-full flex flex-col rounded-lg bg-primary-white border-mid-dark p-8 ">
                  <Typography variant="P_Medium_H6">+ Add Size</Typography>
                  <AddSizePriceComponent
                    setInputFields={setInputFields}
                    inputFields={inputFields}
                  />
                </div>
              </div>
              <div className="py-4">
                <AddProductVariation
                  variations={variations}
                  setVariations={setVariations}
                />
              </div>
              <FormikErrorFocus
                offset={-90}
                align={'top'}
                focusDelay={10}
                ease={'linear'}
                duration={200}
              />
              <div className="flex justify-between gap-8 pt-8">
                <Button
                  variant="bordered"
                  className={`!rounded-[5px] flex items-center gap-x-3 text-text-light_ `}
                  type="button"
                  onClick={() => {
                    resetForm();
                    setMealPicUrl('');
                    setIsVisible(true);
                    setSelectValues([])
                    setInputFields([{ size: '', price: '' }]);
                    setVariations([
                      {
                        name: '',
                        required: '',
                        selectType: '',
                        options: [{ name: '', price: '',image:'' }],
                      },
                    ]);
                  }}
                >
                  <Typography variant="P_Regular_H6">Reset</Typography>
                </Button>
                <Button
                  variant="bordered"
                  className={`!rounded-[5px] cursor-pointer flex items-center gap-x-3 !bg-primary-600 border-none `}
                  type="submit"
                >
                  <Typography
                    variant="P_Medium_H6"
                    className="!text-primary_white"
                  >
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
