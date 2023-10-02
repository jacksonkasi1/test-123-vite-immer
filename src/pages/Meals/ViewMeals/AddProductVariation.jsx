import React, { useState, useEffect } from 'react';
import { Checkbox, Image } from '@nextui-org/react';
import noImage from '@assets/Images/noImage.jpg';
import Typography from '@shared/Typography';
import Input from '@ui/Input';

const OptionComponent = ({ index, optionData }) => {
  const [picUrl, setPicUrl] = useState(optionData?.thumbnail ?? '');

  return (
    <div className="mt-2 flex  gap-3  ">
      <div className="flex gap-3">
        <Image
          alt=""
          className="w-12 h-12 rounded-lg object-cover"
          src={picUrl ? picUrl : noImage}
        />
      </div>
      <Input
        className="border p-1 px-3 h-10 mr-2 w-40"
        placeholder="Option"
        name="name"
        value={optionData.name}
        disabled
      />

      <Input
        className="border p-1 px-3 h-10 mr-2 w-40"
        placeholder="Price"
        name="price"
        value={optionData.price}
        disabled
      />
    </div>
  );
};

const VariationComponent = ({ index, variationData }) => {
  const [required, setRequired] = useState(true);
  const [selectionType, setSelectionType] = useState(variationData?.type ?? '');

  return (
    <div className=" mt-4 p-8 border-[1px] shadow-sm rounded-lg">
      <div className="grid grid-cols-3 gap-4">
        <Input
          className="border p-1 px-3 mr-2"
          name="title"
          placeholder="Name"
          value={variationData.title}
          disabled
        />
        <div className="flex justify-evenly items-center border rounded-lg">
          <Typography variant="P_Medium_H7">Selection Type</Typography>

          <Checkbox
            disabled
            name="Multi"
            isSelected={selectionType == 'Multi'}
            color="primary"
          >
            Multiple
          </Checkbox>

          <Checkbox
            disabled
            name="Single"
            isSelected={selectionType == 'Single'}
            color="primary"
          >
            Single
          </Checkbox>
        </div>
        <div className="flex justify-end items-center gap-6">
          <Checkbox disabled isSelected={required} name="required">
            Required
          </Checkbox>
        </div>
      </div>
      <div className="pt-2">
        {variationData?.options?.map((option, optionIndex) => (
          <OptionComponent
            key={optionIndex}
            index={optionIndex}
            optionData={option}
          />
        ))}
      </div>
    </div>
  );
};

// ... (rest of the code remains the same)

const AddProductVariation = ({ variations }) => {
  console.log(variations);

  return (
    <div>
      <Typography variant="P_Bold_H6" className="mb-2 pe-3">
        Add Product Variation
      </Typography>

      {variations?.map((variation, index) => (
        <VariationComponent
          key={index}
          index={index}
          variationData={variation}
        />
      ))}
    </div>
  );
};

export default AddProductVariation;
