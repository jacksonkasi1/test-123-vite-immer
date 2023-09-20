import React, { useEffect, useState } from 'react';

// ** import shared component
import DataTable from '@shared/DataTable';

// ** import sub pages
import { columns } from './column';

//  ** import api essential
import { getFoodList } from '@api/foodList';

// ** import utils
import { formatDate } from '@src/utils';

const FoodList = () => {
  // all states
  const [pageIndex, setPageIndex] = useState(1);
  const [limit, setLimit] = useState(10);
  const [search, setSearchData] = useState('');
  const [dateValue, setDateValue] = useState([]);
  const [dateSelect, setDateSelect] = useState('ThisMonth');
  const [type, setType] = useState('');


  // formating date range
  const fromDate = new Date(dateValue[0]);
  const toDate = new Date(dateValue[dateValue?.length - 1]);
  const from = formatDate(fromDate);
  const to = formatDate(toDate);

  // ** calling swr api imported function
  const foodList = getFoodList(
    limit,
    pageIndex,
    search,
    !type?dateSelect?.split(' ')?.join(''):type, from,to,
  );

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

  console.log('dateValue', dateValue);
  // console.log("dateSelect",dateSelect.split(' ').join(''));

  const applyDateFilter = () => {
    setType("BetWeen")
  };

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
        handleApplyDateFilter={applyDateFilter}
      />
    </div>
  );
};

export default FoodList;
