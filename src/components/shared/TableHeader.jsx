import React, { useEffect, useState } from 'react';
import Select from '../ui/Select';
import Input from '../ui/Input';
import { HiOutlineSearch } from 'react-icons/hi';
import Tooltip from '../ui/Tooltip';
import { Button } from '@nextui-org/react';
import { Calendar, Filter } from 'react-feather';
import Typography from './Typography';
import Flatpickr from 'react-flatpickr';
import 'flatpickr/dist/themes/material_blue.css';

const TableHeader = ({
  selectChange,
  selectValue,
  pageSizeOption,
  searchValue,
  searchOnChange,
  searchAble,
}) => {
  const [filter, setFilter] = useState(false);
  const [dateStatus, setDateStatus] = useState(false);

  useEffect(() => {
    window.addEventListener('click', () => {
      setFilter(false);
    });
  }, []);

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
        {searchAble && (
          <Input
            value={searchValue}
            onChange={searchOnChange}
            placeholder={'Search'}
            suffix={
              <Tooltip title="Search for table data">
                <HiOutlineSearch
                  size={20}
                  className="text-lg text-text_light dark:text-text_dark"
                />
              </Tooltip>
            }
          />
        )}
      </div>
      <div className="flex items-center justify-end w-full relative">
        <div className="flex items-center gap-x-5">
          <Button
            onClick={() => {
              setFilter(!filter)
              setDateStatus(false)
            }}
            variant="bordered"
            className="!rounded-[5px] flex items-center gap-x-3 text-text-light_ dark:text-text_dark"
          >
            <Filter size={20} className="text-text_light" />
            Filter
          </Button>

          <Button
            onClick={() => {
              setDateStatus(!dateStatus);
              setFilter(false);
            }}
            variant="bordered"
            className="!rounded-[5px] flex items-center gap-x-3 text-text-light_ dark:text-text_dark"
          >
            <Calendar size={20} className="text-text_light" />
            Select Date
          </Button>
        </div>

        {/* filter */}
        {filter && (
          <div
            onClick={(e) => {
              e.stopPropagation();
              setFilter(true);
            }}
            style={{
              boxShadow:
                '0px 2.6263864040374756px 4.4648566246032715px 0px #dddcdc',
            }}
            className="absolute right-20 top-12 w-[400px] bg-white_ dark:bg-mid_light_dark p-5  border-[1px] border-[#dfdfdf] dark:border-dark_border !rounded-[10px] dark:!shadow-none"
          >
            <div>
              <Typography variant="P_Regular_H7">User Country</Typography>
              <Select
                options={[
                  { value: 'france', label: 'France' },
                  { value: 'india', label: 'India' },
                  { value: 'russia', label: 'Russia' },
                ]}
              />
            </div>
          </div>
        )}

        {dateStatus && (
          <div
            onClick={(e) => {
              e.stopPropagation();
              setFilter(true);
            }}
            style={{
              boxShadow:
                '0px 2.6263864040374756px 4.4648566246032715px 0px #dddcdc',
            }}
            className="absolute right-20 top-12 w-[400px] bg-white_ dark:bg-mid_light_dark p-5  border-[1px] border-[#dfdfdf] dark:border-dark_border !rounded-[10px] dark:!shadow-none"
          >
             <Typography variant='P_SemiBold_H5' >Time Period</Typography>

             <Flatpickr
							// onClick={() =>
							// 	setDateType({
							// 		label: 'Date Range',
							// 		value: 'DATE_RANGE',
							// 	})
							// }
							value={new Date()}
							id="range-picker"
							className="form-control input mt-1"
							// onChange={(date) => {
							// 	setDateValue(date);
							// }}
							options={{
								mode: 'range',
							}}
						/>

            <div className='flex items-center'>
              <Typography variant='P_Regular_H6' >Today</Typography>
            </div>
          </div>
        )}
        {/* <Dropdown className="dark:bg-light_dark_">
          <DropdownTrigger>
            <Button
              variant="bordered"
              className="!rounded-[5px] flex items-center gap-x-3 text-text-light_ dark:text-text_dark"
            >
              <Filter size={20} />
              Filter
            </Button>
          </DropdownTrigger>
          <DropdownMenu
            aria-label="Dynamic Actions"
            className="!rounded-[5px] !w-[400px]"
            closeOnSelect={false}
          >
            <DropdownItem
              color={'default'}
              className={
                'dark:text-text_dark hover:!bg-transparent !cursor-default z-[999] py-20'
              }
            >
              <Select
                // size="sm"
                // menuPlacement="top"
                isSearchable={false}
                value={selectValue}
                options={pageSizeOption}
                onChange={selectChange}
              />
            </DropdownItem>
          </DropdownMenu>
        </Dropdown> */}
      </div>
    </div>
  );
};

export default TableHeader;
