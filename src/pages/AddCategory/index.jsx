import React, { useState } from 'react';

// import ** shared components
import Typography from '@shared/Typography';

// ** import ui component
import Input from '@ui/Input';
import ImageUpload from '@ui/ImageUpload';
import Loader from '@ui/Loader';

// ** import assets
import noImage from '@assets/Images/noImage.jpg';

// ** import from next ui
import { Button, Image } from '@nextui-org/react';

// ** import form redux
import { useSelector } from 'react-redux';

// ** import sub Pages
import NextCategory from '../NextCategory';

// ** import utils
import { resizeImage } from '@utils';
import {toasterX } from '@utils/toastMessages';

// ** import api
import { addCategory, getAllCategory } from '@api/category';

const AddCategory = () => {
  const limit = 7;
  const themeConfig = useSelector((state) => state.themeConfigs);

  const getCategory = getAllCategory(limit);
  // ** form states
  const [categoryPicUrl, setCategoryPicUrl] = useState('');
  const [categoryName, setCategoryName] = useState('');
  const [errorCName, setErrorCName] = useState(false);
  const [errorCPic, setErrorCPic] = useState(false);
  const [submitted, setSubmitted] = useState(true);

  // ** handle loading
  const [loader, setLoader] = useState(false);

  const handleImageUpload = async (event) => {
    try {
      const file = event?.target?.files[0];
      const resizedImage = await resizeImage(file, 500, 500);
      setCategoryPicUrl(resizedImage);
      setErrorCPic(false);
    } catch (error) {
      console.error('Error created at handleImageUpload', error);
    }
  };

  const submitHandler = async () => {
    event.preventDefault();

    if (categoryName == '') {
      setErrorCName(true);
      return;
    } else if (categoryPicUrl == '') {
      setErrorCPic(true);
      return;
    }
    try {
      setLoader(true);
      const payLoadObj = {
        name: categoryName,
        thumbnail: categoryPicUrl,
      };
      await addCategory(payLoadObj);
      toasterX.success('Category added successfully');
      setErrorCName(false);
      setErrorCPic(false);
      setCategoryName('');
      setCategoryPicUrl('');
      setLoader(false);
      setSubmitted(true);
      getCategory.mutate();
    } catch (error) {
      setLoader(false);
      toasterX.error('Something went wrong while add new category');
    }
  };

  const changeHandler = (e) => {
    setCategoryName(e.target.value);
    setErrorCName(false);
  };

  return (
    <div className="py-4 px-6">
      <Loader isLoading={loader} />
      <div className="py-4">
        <Typography variant="P_Medium_H5">Add New Category</Typography>
      </div>
      <form
        className="border-[1px] shadow-sm w-full flex flex-col rounded-lg bg-primary-white border-mid-dark p-8 gap-8"
        onSubmit={submitHandler}
      >
        <div>
          <Typography variant="P_Regular_H6" className="text-mid_light_dark">
            Name
          </Typography>
          <Input onChange={changeHandler} value={categoryName} />
          {errorCName && (
            <Typography variant="P_Regular_H7" className="!text-danger">
              Please enter category name here
            </Typography>
          )}
        </div>
        <div className="flex w-full gap-6">
          <div className="flex justify-center items-start flex-[1] rounded-xl">
            <Image
              src={categoryPicUrl ? categoryPicUrl : noImage}
              className="flex w-36 h-36"
              fallbackSrc={noImage}
            />
          </div>
          <div className="flex flex-col w-full flex-start flex-[7] justify-end">
            <Typography variant="P_Regular_H6" className="text-mid_light_dark">
              Category Image
            </Typography>
            <ImageUpload uploadHandler={handleImageUpload} />
            {errorCPic && (
              <Typography variant="P_Regular_H7" className="!text-danger">
                Please upload category Image here
              </Typography>
            )}
          </div>
        </div>
        <div className="flex justify-end gap-8">
          <Button
            variant="bordered"
            className={`!rounded-[5px] flex items-center gap-x-3 text-text-light_ `}
            type="button"
            onClick={() => {
              setErrorCName(false);
              setErrorCPic(false);
              setCategoryName('');
              setCategoryPicUrl('');
            }}
          >
            <Typography variant="P_Regular_H6">Reset</Typography>
          </Button>
          <Button
            variant="bordered"
            className={`!rounded-[5px] flex items-center gap-x-3 text-text-light_ !bg-${themeConfig.themeColor}-${themeConfig.colorLevel} text-${themeConfig.themeColor}-${themeConfig.colorLevel} dark:text-${themeConfig.themeColor}-${themeConfig.colorLevel} border-${themeConfig.themeColor}-${themeConfig.colorLevel}`}
            type="submit"
          >
            <Typography variant="P_Regular_H6">Submit</Typography>
          </Button>
        </div>
      </form>
      <div className="border-[1px] shadow-sm w-full flex flex-col rounded-lg bg-primary-white border-mid-dark pb-8  mt-8 ">
        <NextCategory
          lim={7}
          data={getCategory?.data?.data?.getCategory}
          noPagination={true}
          noSkeleton={true}
          submitted={submitted}
          noSearch={true}
          noDateFilter={true}
          noRowsLimit={true}
        />
      </div>
    </div>
  );
};

export default AddCategory;
