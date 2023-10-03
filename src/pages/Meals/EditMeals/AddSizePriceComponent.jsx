import Typography from '@src/components/shared/Typography';
import Button from '@src/components/ui/Buttons';
import Input from '@src/components/ui/Input';
import React, { useState } from 'react';

const AddSizePriceComponent = ({inputFields,setInputFields}) => {

  const handleInputChange = (index, event) => {
    const values = [...inputFields];
    values[index][event.target.name] = event.target.value;
    setInputFields(values);
  };

  const handleAddFields = () => {
    setInputFields([...inputFields, { size: '', price: '' }]);
  };

  const handleRemoveFields = (index) => {
    if (inputFields.length > 1) {
      // Only remove when there are more than 1 input pairs
      const values = [...inputFields];
      values.splice(index, 1);
      setInputFields(values);
    }
  };

  return (
    <div className='pt-2'>
      {inputFields?.map((inputField, index) => (
        <div key={`${inputField}-${index}`} className="flex items-center mb-3">
          <Input
            type="text"
            name="size"
            value={inputField.size}
            onChange={(event) => handleInputChange(index, event)}
            className="border p-2 mr-2 w-44"
            placeholder="Size"
          />
          <Input
            type="text"
            name="price"
            value={inputField.price}
            onChange={(event) => handleInputChange(index, event)}
            className="border-2 mr-2 w-44"
            placeholder="Price"
          />
          <Button
            onClick={() => handleRemoveFields(index)}
            className={`mr-2 !border-none  rounded ${
              inputFields.length > 1
                ? '!bg-red-500 !text-primary_white'
                : '!bg-text_dark !text-primary_white cursor-not-allowed'
            } !px-2 !py-1`}
            disabled={inputFields.length <= 1} // Disable button when there's only 1 input pair
            type="button"
          >
            <Typography variant="P_Regular_H7" className="!text-primary_white">
              Remove
            </Typography>
          </Button>
          <Button
            type="button"
            onClick={() => handleAddFields()}
            className="!bg-green-500 !border-none !text-primary_white !px-6 !py-1 rounded"
          >
            <Typography variant="P_Regular_H7" className="!text-primary_white">
              Add
            </Typography>
          </Button>
        </div>
      ))}
    </div>
  );
};
export default AddSizePriceComponent;
