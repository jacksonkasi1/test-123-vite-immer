import React, { useEffect, useState } from 'react';

// ** import shared components
import DataTable from '@shared/DataTable';

// ** import sub components
import { columns } from './column';

// ** import api essential
import { getAllCategory } from '@api/category';

// ** import utils
import { formatDate } from '@src/utils';

const FoodCategory = () => {
  // all states
  const [pageIndex, setPageIndex] = useState(1);
  const [limit, setLimit] = useState(10);
  const [search, setSearchData] = useState('');
  const [dateValue, setDateValue] = useState([]);
  const [dateSelect, setDateSelect] = useState('ThisMonth');
  const [type, setType] = useState('');
  const [from, setFrom] = useState('');
  const [to, setTo] = useState('');

  // ** calling swr api imported function
  const getAllCategoryApi = getAllCategory(
    limit,
    pageIndex,
    search,
    type,
    from,
    to,
  );

  const [pagingData, setPagingData] = useState({
    total: getAllCategoryApi?.data?.data?.totalPages ?? 1,
    pageIndex: 1,
    pageSize: 10,
  });

  //setting total page data
  useEffect(() => {
    setPagingData({
      ...pagingData,
      total: !isNaN(parseInt(getAllCategoryApi?.data?.data?.totalPages))
        ? parseInt(getAllCategoryApi?.data?.data?.totalPages) * 10
        : 1,
    });
  }, [getAllCategoryApi?.data?.data?.totalPages]);

  const onPaginationChange = (newPageIndex) => {
    console.log(newPageIndex);
    setPageIndex(newPageIndex);
    setPagingData({
      ...pagingData,
      pageIndex: newPageIndex,
    });
  };

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

  return (
    <div className="px-10 pt-10 pb-12">
      <DataTable
        columns={columns}
        data={getAllCategoryApi?.data?.data?.getCategory}
        skeletonAvatarColumns={[0]}
        skeletonAvatarProps={{ className: 'rounded-md' }}
        loading={getAllCategoryApi?.isLoading}
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

export default FoodCategory;
