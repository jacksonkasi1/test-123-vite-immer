import React, { useState, useEffect } from 'react';
import { Checkbox, Image } from '@nextui-org/react';
import noImage from '@assets/Images/noImage.jpg';
import Typography from '@shared/Typography';
import Button from '@ui/Buttons';
import ImageUpload from '@ui/ImageUpload';
import Input from '@ui/Input';
import { resizeImage } from '@utils';

const OptionComponent = ({
  index,
  optionData,
  handleOptionChange,
  deleteOption,
}) => {
  const [picUrl, setPicUrl] = useState(optionData?.thumbnail??"");
  useEffect(() => {
    handleOptionChange(index, optionData);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const handleChange = (e) => {
    const { name, value } = e.target;
    const option = { ...optionData, [name]: value };
    handleOptionChange(index, option);
  };

  const handleImageUpload = async (event) => {
    try {
      const file = event?.target?.files[0];
      const resizedImage = await resizeImage(file, 500, 500);
      setPicUrl(resizedImage);

      // Optionally, you can also update the optionData with the image information
      const optionWithImage = { ...optionData, thumbnail: resizedImage };
      handleOptionChange(index, optionWithImage);
    } catch (error) {
      console.error('Error created at handleImageUpload', error);
    }
  };

  return (
    <div className="mt-2 flex  gap-3  ">
      <div className="flex gap-3">
        <Image
          alt=""
          className="w-12 h-12 rounded-lg object-cover"
          src={picUrl ? picUrl : noImage}
        />
        <ImageUpload uploadHandler={handleImageUpload} className="!w-60" />
      </div>
      <Input
        className="border p-1 px-3 h-10 mr-2 w-40"
        placeholder="Option"
        name="name"
        value={optionData.name}
        onChange={handleChange}
      />

      <Input
        className="border p-1 px-3 h-10 mr-2 w-40"
        placeholder="Price"
        name="price"
        value={optionData.price}
        onChange={handleChange}
      />

      <Button
        className="border p-1 ml-2 !h-10 !text-primary_white !bg-red-500 !border-none"
        variant="danger"
        danger
        onClick={() => deleteOption(index)}
        type="button"
      >
        Remove
      </Button>
    </div>
  );
};

const VariationComponent = ({
  index,
  variationData,
  handleVariationChange,
  deleteVariation,
}) => {
  useEffect(() => {
    handleVariationChange(index, variationData);
  }, []);

  const [required, setRequired] = useState(true);
  const [selectionType, setSelectionType] = useState(variationData?.type??"");

  const handleChange = (e) => {
    const { name, value } = e.target;
    console.log(name, e.target);
    const variation = { ...variationData, [name]: value };
    handleVariationChange(index, variation);
  };

  const handleOptionChange = (optionIndex, option) => {
    const options = [...variationData.options];
    options[optionIndex] = option;
    handleVariationChange(index, { ...variationData, options });
  };

  const addOption = () => {
    const options = [...variationData.options, { name: '', price: '' ,thumbnail:'' }];
    handleVariationChange(index, { ...variationData, options });
  };

  const deleteOption = (optionIndex) => {
    const options = [...variationData.options];
    options.splice(optionIndex, 1);
    handleVariationChange(index, { ...variationData, options });
  };

  const handleCheckedChange = (e) => {
    const { name } = e.target;
    if (name == 'required') {
      setRequired(!required);
      const variation = { ...variationData, [name]: !required };
      handleVariationChange(index, variation);
    } else {
      console.log('name:', name);
      setSelectionType(name);
      const variation = { ...variationData, type: name };
      handleVariationChange(index, variation);
    }
  };

  return (
    <div className=" mt-4 p-8 border-[1px] shadow-sm rounded-lg">
      <div className="grid grid-cols-3 gap-4">
        <Input
          className="border p-1 px-3 mr-2"
          name="title"
          placeholder="Name"
          value={variationData.title}
          onChange={handleChange}
        />
        <div className="flex justify-evenly items-center border rounded-lg">
          <Typography variant="P_Medium_H7">Selection Type</Typography>

          <Checkbox
            name="Multi"
            isSelected={selectionType == 'Multi'}
            onChange={handleCheckedChange}
            color="primary"
          >
            Multiple
          </Checkbox>

          <Checkbox
            name="Single"
            isSelected={selectionType == 'Single'}
            onChange={handleCheckedChange}
            color="primary"
          >
            Single
          </Checkbox>
        </div>
        <div className="flex justify-end items-center gap-6">
          <Checkbox
            onChange={handleCheckedChange}
            isSelected={required}
            name="required"
          >
            Required
          </Checkbox>

          <Button
            type="button"
            className="border p-1 !text-primary_white !bg-red-500 !border-none"
            onClick={() => deleteVariation(index)}
          >
            Delete
          </Button>
        </div>
      </div>
      <div className="pt-2">
        {variationData.options.map((option, optionIndex) => (
          <OptionComponent
            key={optionIndex}
            index={optionIndex}
            optionData={option}
            handleOptionChange={handleOptionChange}
            deleteOption={deleteOption}
          />
        ))}
      </div>
      <Button
        type="button"
        className="border p-1 mr-2 my-2 w-max"
        onClick={addOption}
      >
        Add New Option
      </Button>
    </div>
  );
};

// ... (rest of the code remains the same)

const AddProductVariation = ({ variations, setVariations }) => {
  const handleVariationChange = (index, variation) => {
    let updatedVariations = [...variations];
    updatedVariations[index] = variation;
    setVariations(updatedVariations);
  };

  const deleteVariation = (index) => {
    let newVariations = [...variations];
    newVariations.splice(index, 1);
    setVariations(newVariations);
  };

  const addVariation = () => {
    setVariations([
      ...variations,
      {
        title: '',
        required: true,
        type: '',
        options: [{ name: '', price: '',thumbnail:"" }],
      },
    ]);
  };

  console.log(variations);

  return (
    <div>
      <Typography variant="P_Bold_H6" className="mb-2 pe-3">
        Add Product Variation
      </Typography>

      {variations.map((variation, index) => (
        <VariationComponent
          key={index}
          index={index}
          variationData={variation}
          handleVariationChange={handleVariationChange}
          deleteVariation={deleteVariation}
        />
      ))}

      <Button type="button" className="px-42 mt-2 " onClick={addVariation}>
        + Add Variation
      </Button>
    </div>
  );
};

export default AddProductVariation;
