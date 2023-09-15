import React from 'react';
import Select, { components } from 'react-select';
import { selectThemeColors } from '../../../utils';

function Selects(props) {
  const SelectComponent = ({ data, ...props }) => {
    return (
      <components.Option {...props}>
        <div className="d-flex flex-wrap align-items-center">{data.label}</div>
      </components.Option>
    );
  };

  const { value, placeholder, className, options } = props;

  return (
    <div className="flex w-full flex-wrap md:flex-nowrap gap-4">
      <Select
        id="email-bcc"
        theme={selectThemeColors}
        options={options}
        placeholder={placeholder}
        className={`react-select history-select mr-1 ${className}`}
        style={{ height: '20px' }}
        classNamePrefix="select"
        components={{ Option: SelectComponent }}
        value={value}
        {...props}
      />
    </div>
  );
}

export default Selects;
