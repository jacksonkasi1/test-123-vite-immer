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
import { toasterX } from '@utils/toastMessages';

// ** import from Formik
import { ErrorMessage, Field, Form, Formik } from 'formik';
import FormikErrorFocus from 'formik-error-focus';

// ** import third party library
import { Clock, XCircle } from 'react-feather';

// ** import sub components
import AddProductVariation from './AddProductVariation';
import AddSizePriceComponent from './AddSizePriceComponent';

// ** import apis
import { addMeal, getMealById } from '@api/foodList';
import { getAllCategory } from '@api/category';
import { getRestaurants } from '@api/restaurants';
import { useParams } from 'react-router-dom';
import { convertDecimalTimeToTimeString } from '@src/utils';

const tagOptions = [
  { label: 'Veg', value: 'Veg_Food', icon: <VegSvg /> },
  { label: 'Non-Veg', value: 'Non_Veg_Food', icon: <NonVegSvg /> },
  { label: 'Halal', value: 'Halal', icon: <NonVegSvg /> },
];
const ViewMeals = () => {
  let limit = 10;

  const [searchValue, setSearchValue] = useState('');

  // swr api call
  const allCategory = getAllCategory(limit, 1, searchValue);
  const restaurantDetail = getRestaurants();
  const { id } = useParams();
  const mealDetails = getMealById(id);
  console.log(
    'mealDetails.data------->',
    mealDetails?.data?.data,
  );

  const dropDownData = allCategory?.data?.data?.getCategory?.map((item) => ({
    value: item.name,
    label: item.name,
    id: item.category_id,
  }));

  // ** form states
  const [errorCPic, setErrorCPic] = useState(false);
  const [isVisible, setIsVisible] = useState(
    mealDetails?.data?.data?.is_available ?? true,
  );
  const [mealPicUrls, setMealPicUrls] = useState([]); // state to store multiple images

  // ** state as props
  const [variations, setVariations] = useState([
    {
      title: '',
      required: true,
      type: '',
      options: [{ name: '', price: '', thumbnail: '' }],
    },
  ]);
  // const [inputFields, setInputFields] = useState([{ size: '', price: '' }]);
  const [inputFields, setInputFields] = useState([{ size: '', price: '' }]);

  useEffect(() => {
    setInputFields(mealDetails?.data?.data?.tbl_meals_size?.[0]?.size);
  }, [mealDetails?.data?.data?.tbl_meals_size?.[0]?.size]);

  useEffect(() => {
    setVariations(
      mealDetails?.data?.data?.tbl_meals_variant?.map((variant) => {
        return {
          title: variant.title,
          required: variant.is_required,
          type: variant.variant_type,
          options: variant.variant.map((option) => {
            return {
              name: option?.name,
              price: option?.price,
              thumbnail: option?.thumbnail,
              id: option?.id,
            };
          }),
        };
      }),
    );
  }, [mealDetails?.data?.data?.tbl_meals_variant]);

  useEffect(() => {
    setMealPicUrls(mealDetails?.data?.data?.thumbnail);
  }, [mealDetails?.data?.data?.thumbnail]);


  // for custom async swr+react select
  const [selectValues, setSelectValues] = useState([]);

  
  useEffect(() => {

    setSelectValues(mealDetails?.data?.data?.tbl_category)
  }, [mealDetails?.data?.data?.tbl_category]);


  // ** handle loading
  const [loader, setLoader] = useState(false);

  // ** handle Image upload

  const handleImageUpload = async (event) => {
    if (mealPicUrls.length == 5) {
      toasterX.info('Please remove one image to upload more');
      return;
    }
    try {
      const files = event?.target?.files;
      let imageUrls = [...mealPicUrls]; // Spread current images into a new array to avoid losing previous uploads

      for (let i = 0; i < files.length; i++) {
        const resizedImage = await resizeImage(files[i], 500, 500);
        imageUrls.push(resizedImage); // Add each new upload to the array
      }

      setMealPicUrls(imageUrls);
      setErrorCPic(false);
    } catch (error) {
      console.error('error at handleImageUpload:', error);
    }
  };

  const handleImageDelete = (urlToDelete) => {
    const imageUrls = mealPicUrls?.filter((url) => url !== urlToDelete);
    setMealPicUrls(imageUrls);
  };

  const submitHandler = async (values, { setSubmitting, resetForm }) => {
    setSubmitting(true);
    event.preventDefault();

    resetForm();

    if (!restaurantDetail?.data?.data?.data?.[0]?.restaurant_id) {
      toasterX.warning('No restaurants associated with your id');
      return;
    }

    if (mealPicUrls?.length == 0) {
      setErrorCPic(true);
      window.scrollTo({ top: 0, behavior: 'smooth' });
      return;
    }

    let categoryArray = [];

    selectValues.map((val) => {
      categoryArray.push(val.id);
    });

    const time_availablity = values.timeFrom && values.timeTo ? true : false;

    const tagValue = values?.tags?.value;
    const payLoadObj = {
      ...values,
      start_hour: values.timeFrom,
      end_hour: values.timeTo,
      tags: tagValue,
      thumbnail: mealPicUrls,
      is_available: isVisible,
      category: categoryArray,
      sizes: inputFields,
      variations,
      time_availablity,
      restaurant_id: restaurantDetail?.data?.data?.data?.[0]?.restaurant_id,
    };
    console.log('values', payLoadObj);
    try {
      setLoader(true);
      await addMeal(payLoadObj);
      toasterX.success('Meal added successfully');
      setErrorCPic(false);
      setMealPicUrls('');
      setLoader(false);
      setSubmitting(false);
      resetForm();
      setIsVisible(true);
      setSelectValues([]);
      setInputFields([{ size: '', price: '' }]);
      setVariations([
        {
          title: '',
          required: '',
          type: '',
          options: [{ name: '', price: '', thumbnail: '' }],
        },
      ]);
    } catch (error) {
      setLoader(false);
      toasterX.error('Some problem while adding meal');
    }
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
      <Loader isLoading={mealDetails?.isLoading} />
      <div className="py-4">
        <Typography variant="P_Medium_H5">Add New Meal</Typography>
      </div>
      <Formik
        initialValues={{
          name: mealDetails?.data?.data?.name ?? '',
          description: mealDetails?.data?.data?.description ?? '',
          category: '',
          timeFrom:
            convertDecimalTimeToTimeString(
              mealDetails?.data?.data?.tbl_available_time?.[0]?.start_hour,
            ) ?? '',
          timeTo:
            convertDecimalTimeToTimeString(
              mealDetails?.data?.data?.tbl_available_time?.[0]?.end_hour,
            ) ?? '',
          price: mealDetails?.data?.data?.price ?? '',
          tags: '',
        }}
        enableReinitialize
        validationSchema={validationSchema}
        onSubmit={(values, { setSubmitting, resetForm }) => {
          submitHandler(values, { setSubmitting, resetForm });
          // console.log({ values });
        }}
      >
        {({ values, touched, errors, isSubmitting }) => {
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

                  <div className="flex flex-col w-full gap-6">
                    <div className="flex gap-3  items-start">
                      {mealPicUrls?.length == 0 ? (
                        <div className="flex justify-center items-start flex-[1] rounded-xl">
                          <Image
                            src={noImage}
                            className="flex w-36 h-36 object-cover"
                            fallbackSrc={noImage}
                          />
                        </div>
                      ) : (
                        mealPicUrls?.map((url, index) => (
                          <div
                            key={index}
                            className="relative w-max flex   justify-center items-start flex-[1] rounded-xl"
                          >
                            <div className="relative">
                              {' '}
                              {/* Add relative div here */}
                              <Image
                                src={url ? url : noImage}
                                className="flex w-36 h-36 object-cover"
                                fallbackSrc={noImage}
                              />
                              <XCircle
                                className="absolute top-1 cursor-pointer right-1 fill-primary_white text-danger z-10"
                                onClick={() => handleImageDelete(url)}
                              />{' '}
                              {/* Button to delete image */}
                            </div>
                          </div>
                        ))
                      )}
                    </div>

                    <div className="flex flex-col w-full flex-start flex-[3] justify-end">
                      <ImageUpload uploadHandler={handleImageUpload} multiple />
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
                            {option.label??option.name}
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
                    isDisabled
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
                      isDisabled
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
                    invalid={errors.price && touched.price}
                    errorMessage={errors.price}
                    className="!mb-4 relative pt-2"
                  >
                    <Field
                      type="text"
                      autoComplete="off"
                      name="price"
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
                        isDisabled
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
              {/* <div className="flex justify-between gap-8 pt-8">
                <Button
                  variant="bordered"
                  className={`!rounded-[5px] flex items-center gap-x-3 text-text-light_ `}
                  type="button"
                  onClick={() => {
                    resetForm();
                    setMealPicUrls([]);
                    setIsVisible(true);
                    setSelectValues([]);
                    setInputFields([{ size: '', price: '' }]);
                    setVariations([
                      {
                        title: '',
                        required: true,
                        type: '',
                        options: [{ name: '', price: '', thumbnail: '' }],
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
              </div> */}
            </Form>
          );
        }}
      </Formik>
    </div>
  );
};

export default ViewMeals;
