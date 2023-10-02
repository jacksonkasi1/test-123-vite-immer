import Input from '@src/components/ui/Input';
import React, { useEffect, useState } from 'react';

const AddSizePriceComponent = ({ inputFields, setInputFields }) => {
  


  return (
    <div className="pt-2">
      {inputFields?.map((inputField, index) => (
        <div key={`${inputField}-${index}`} className="flex items-center mb-3">
          <Input
            type="text"
            name="size"
            value={inputField.size}
            className="border p-2 mr-2"
            placeholder="Size"
            disabled

          />
          <Input
            type="text"
            name="price"
            value={inputField.price}
            className="border-2 mr-2 "
            placeholder="Price"
            disabled
          />
  
        
        </div>
      ))}
    </div>
  );
};
export default AddSizePriceComponent;
