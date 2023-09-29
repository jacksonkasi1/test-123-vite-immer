import Typography from '@shared/Typography';
import React, { useRef } from 'react';

/**
 * ImageUpload component for handling file uploads.
 *
 * @param {object} props - The component's props.
 * @param {string} props.className - Additional CSS class names for styling.
 * @param {function} props.uploadHandler - Callback function to handle file upload changes.
 * @returns {JSX.Element} The ImageUpload component.
 */
const ImageUpload = ({ className, uploadHandler }) => {
  const imgUploadElement = useRef();

  return (
    <div>
      <input
        className="hidden"
        name="imgUpload"
        id="imgUpload"
        type="file"
        onChange={uploadHandler}
        ref={imgUploadElement}
        accept="image/*"
      />
      <div
        className={`group w-full px-2 flex justify-between items-center border-[1px] rounded-md hover:border-[2px] hover:border-primary-600 cursor-pointer ${className}`}
        onClick={() => {
          imgUploadElement?.current?.click();
        }}
      >
        <Typography variant="P_Regular_H7" className='cursor-pointer'>Choose File</Typography>

        <Typography
          variant="P_Regular_H6"
          className="border-l px-2 py-2 group-hover:border-l-primary-600 group-hover:border-l-[2px] cursor-pointer"
        >
          Browse
        </Typography>
      </div>
    </div>
  );
};

export default ImageUpload;
