import React from 'react';

// import utils
import { selectThemeColors } from '@utils';

// ** import third party library 
import Select, { components } from 'react-select';

// ** import from redux
import { useSelector } from 'react-redux';

function Selects(props) {
  const { value, placeholder, className, options,onChange } = props;

  const SelectComponent = ({ data, ...props }) => {

    return (
      <components.Option {...props}>
        {data.imgPath ? (
          <div className='flex items-center'>
            <img className='w-[30px] h-[30px] rounded-[50%] mr-2' src={data.imgPath} alt="" />
            <div className="d-flex flex-wrap align-items-center">
              {data.label}
            </div>
          </div>
        ) : (
          <div className="d-flex flex-wrap align-items-center">
            {data.label}
          </div>
        )}
      </components.Option>
    );
  };

  const themeConfig = useSelector((state) => state.themeConfigs);

  return (
    <div className="flex w-full flex-wrap md:flex-nowrap gap-4">
      <Select
        id="email-bcc"
        theme={selectThemeColors(themeConfig)}
        options={options}
        placeholder={placeholder}
        classNamePrefix="my-react-select"
        className={`my-react-select-container react-select ${className}`}
        style={{ height: '20px' }}
        components={{ Option: SelectComponent }}
        value={value}
        onChange={onChange}
        {...props}
      />
    </div>
  );
}

export default Selects;
