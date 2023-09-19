import React from 'react';
import Select from '../ui/Select';
import Input from '../ui/Input';
import { HiOutlineSearch } from 'react-icons/hi';
import Tooltip from '../ui/Tooltip';

const TableHeader = ({ selectChange, selectValue, pageSizeOption }) => {
  return (
    <div className="flex items-center ">
      <div className="flex items-center gap-x-5 search">
        <div style={{ width: 200 }}>
          <Select
            // size="sm"
            // menuPlacement="top"
            isSearchable={false}
            value={selectValue}
            options={pageSizeOption}
            onChange={selectChange}
          />
        </div>
        <Input
          suffix={
            <Tooltip title="Search for table data">
              <HiOutlineSearch size={20} className="cursor-pointer text-lg text-text_light dark:text-text_dark" />
            </Tooltip>
          }
        />
      </div>
    </div>
  );
};

export default TableHeader;
