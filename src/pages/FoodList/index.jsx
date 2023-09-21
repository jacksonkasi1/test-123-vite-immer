import React, { useEffect, useState } from 'react';

// ** import shared component
import DataTable from '@shared/DataTable';

// ** import sub pages
import { columns } from './column';

//  ** import api essential
import { getFoodList } from '@api/foodList';

// ** import utils
import { formatDate } from '@src/utils';

const categoryOptions = [
  { value: 'Non Veg', label: 'Non Veg' },
  { value: 'Veg', label: 'Veg' },
  { value: 'Drinks', label: 'Drinks' },
  { value: 'Biriyani', label: 'Biriyani' },
  { value: 'Hot Item', label: 'Hot Item' },
];

const availableOptions = [
  { value: 'Available', label: 'Available' },
  { value: 'Not available', label: 'Not available' },
];
const FoodList = () => {
  // all states
  const [pageIndex, setPageIndex] = useState(1);
  const [limit, setLimit] = useState(10);
  const [search, setSearchData] = useState('');
  const [dateValue, setDateValue] = useState([]);
  const [dateSelect, setDateSelect] = useState('ThisMonth');
  const [type, setType] = useState('');
  const [from, setFrom] = useState('');
  const [to, setTo] = useState('');
  const [available, setAvailable] = useState('');

  // ** calling swr api imported function
  const foodList = getFoodList(limit, pageIndex, search, type, from, to,available);

  const [pagingData, setPagingData] = useState({
    total: foodList?.data?.data?.totalPages ?? 1,
    pageIndex: 1,
    pageSize: 10,
  });

  //setting total page data
  useEffect(() => {
    setPagingData({
      ...pagingData,
      total: !isNaN(parseInt(foodList?.data?.data?.totalPages))
        ? parseInt(foodList?.data?.data?.totalPages) * 10
        : 1,
    });
  }, [foodList?.data?.data?.totalPages]);

  const onPaginationChange = (newPageIndex) => {
    console.log(newPageIndex);
    setPageIndex(newPageIndex);
    setPagingData({
      ...pagingData,
      pageIndex: newPageIndex,
    });
  };

  // console.log(dateValue);
  //  console.log(dateSelect);

  const applyDateFilter = () => {
    const fromDate = new Date(dateValue[0]);
    const toDate = new Date(dateValue[dateValue?.length - 1]);
    const convertedFrom = formatDate(fromDate);
    const convertedTo = formatDate(toDate);
    if (
      convertedFrom == 'NaN-NaN-NaN' ||
      convertedTo == 'NaN-NaN-NaN' ||
      convertedFrom == '' ||
      convertedTo == ''
    ) {
      setType(dateSelect?.split(' ')?.join(''));
      setFrom('');
      setTo('');
      return;
    } else {
      setFrom(convertedFrom);
      setTo(convertedTo);
    }
    setDateValue([]);
  };

  const handleDateFilterCancel = () => {
    console.log('canceling');
  };
  
  const filterArray = [
    {
      label: 'Category',
      options: categoryOptions,
      setFilterValue: setSearchData,
    },
    {
      label: 'Available',
      options: availableOptions,
      setFilterValue: setAvailable,
    },
  ];

  return (
    <div className="px-10 pt-10 pb-12">
      <DataTable
        columns={columns}
        data={foodList?.data?.data?.meals}
        skeletonAvatarColumns={[0]}
        skeletonAvatarProps={{ className: 'rounded-md' }}
        loading={foodList?.isLoading}
        onPaginationChange={onPaginationChange}
        onSelectChange={(value) => {
          setLimit(value);
        }}
        selectable={true}
        pagingData={pagingData}
        searchAble={true}
        searchOnChange={(e) => setSearchData(e.target.value)}
        searchValue={search}
        dateValue={dateValue}
        setDateValue={setDateValue}
        activeDateSelect={dateSelect}
        setDateSelect={setDateSelect}
        isDateFilter={true}
        isMultiFilter={true}
        filterArray={filterArray}
        handleApplyDateFilter={applyDateFilter}
        handleDateFilterCancel={handleDateFilterCancel}
      />
    </div>
  );
};

export default FoodList;
