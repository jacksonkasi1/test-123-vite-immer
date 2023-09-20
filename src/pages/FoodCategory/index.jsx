import React, { useEffect, useState } from 'react';

// ** import shared components
import DataTable from '@shared/DataTable';

// ** import sub components
import { columns } from './column';

// ** import api essential
import { getAllCategory } from '@api/category';

const FoodCategory = () => {

 // all states
 const [pageIndex, setPageIndex] = useState(1);
 const [limit, setLimit] = useState(10);
 const [search, setSearchData] = useState('');
 const [dateValue, setDateValue] = useState([]);
 const [dateSelect, setDateSelect] = useState('Today');

 // ** calling swr api imported function
 const getAllCategoryApi = getAllCategory(limit, pageIndex, search);

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

 console.log(dateValue);
 console.log(dateSelect);

 const applyDateFilter = () => {
   console.log('Hello world');
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
