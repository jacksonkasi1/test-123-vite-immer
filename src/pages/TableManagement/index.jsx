import React, { useEffect, useState } from 'react';

// ** import shared component
import DataTable from '@shared/DataTable';

// ** import sub pages
import { columns } from './column';

// ** import api essential
import { getAllTable } from '@api/table';

// ** import from utils
import { formatDate } from '@src/utils';

const TableManagement = () => {
  // all states
  const [pageIndex, setPageIndex] = useState(1);
  const [limit, setLimit] = useState(10);
  const [search, setSearchData] = useState('');
  const [dateValue, setDateValue] = useState([]);
  const [filterValue, setFilterValue] = useState([]);

  const [dateSelect, setDateSelect] = useState('ThisMonth');
  const [type, setType] = useState('');

     // formating date range
     const fromDate = new Date(dateValue[0]);
     const toDate = new Date(dateValue[dateValue?.length - 1]);
     const from = formatDate(fromDate);
     const to = formatDate(toDate);

  // ** calling get all table swr
  const allTable = getAllTable(limit, pageIndex,search, dateSelect?.split(' ')?.join(''), from,to);

  console.log(allTable);

  const [pagingData, setPagingData] = useState({
    total: allTable?.data?.data?.totalPages ?? 1,
    pageIndex: 1,
    pageSize: 10,
  });

  //setting total page data
  useEffect(() => {
    setPagingData({
      ...pagingData,
      total: !isNaN(parseInt(allTable?.data?.data?.totalPages))
        ? parseInt(allTable?.data?.data?.totalPages) * 10
        : 1,
    });
  }, [allTable?.data?.data?.totalPages]);

  const onPaginationChange = (newPageIndex) => {
    console.log(newPageIndex);
    setPageIndex(newPageIndex);
    setPagingData({
      ...pagingData,
      pageIndex: newPageIndex,
    });
  };

  // console.log(dateValue);
  // console.log(dateSelect.split(' ').join(''));


  const applyDateFilter = () => {
    console.log("Hii")
  };

  return (
    <div className="px-10 pt-10 pb-12">
      <DataTable
        columns={columns}
        data={allTable?.data?.data?.isTableExist}
        skeletonAvatarColumns={[0]}
        skeletonAvatarProps={{ className: 'rounded-md' }}
        loading={allTable?.isLoading}
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
        filterValue={filterValue}
        setFilterValue={setFilterValue}
        isDateFilter={true}
        handleApplyDateFilter={applyDateFilter}
      />
    </div>
  );
};

export default TableManagement;
