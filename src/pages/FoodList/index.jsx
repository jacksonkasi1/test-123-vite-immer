import React, { useEffect, useState } from 'react';

// ** import shared component
import DataTable from '@shared/DataTable';

// ** import sub pages
import { columns } from './column';

//  ** import api essential
import { getFoodList } from '@api/foodList';

// ** import utils
import { formatDate } from '@utils';
import { warningMessage } from '@utils/toastMessages';

// ** importing Options
import { availableOptions, categoryOptions } from './Options';


const FoodList = () => {
  // all states for query for api function
  const [pageIndex, setPageIndex] = useState(1);
  const [limit, setLimit] = useState(10);
  const [search, setSearchData] = useState('');
  const [dateValue, setDateValue] = useState([]);
  const [dateSelect, setDateSelect] = useState('ThisMonth');
  const [type, setType] = useState('');
  const [from, setFrom] = useState('');
  const [to, setTo] = useState('');
  const [available, setAvailable] = useState('');

  // ** stated to be consumed in multiFiler
  const [categoryFilter, setCategoryFilter] = useState('');
  const [availableFilter, setAvailableFilter] = useState('');

  // ** calling swr api imported function
 //  ** category is missing in react data table component
  const foodList = getFoodList(
    limit,
    pageIndex,
    search,
    type,
    from,
    to,
    available,
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


  // ******************* Date Range and date function starts here

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
    setType('LifeTime');
  };
  // ******************* Date Range and date function ends here


  // ******************* multiFilter function starts here
  const handleApplyMultiFilter = () => {
    if (!categoryFilter && !categoryFilter) {
      warningMessage("Please select a filter to apply")
    } else {
      if (categoryFilter && categoryFilter) {
        setSearchData(categoryFilter);
        setAvailable(availableFilter);
      } else if (categoryFilter) {
        setSearchData(categoryFilter);
      } else if (availableFilter) {
        setAvailable(availableFilter);
      }
    }
  };

  const handleMultiFilterCancel = () => {
    setSearchData("");
    setAvailable("");
    setCategoryFilter("")
    setAvailableFilter("")
     
  };

  // ******************* multiFilter function ends here


  // ** filterArray for multiFilter
  const filterArray = [
    {
      label: 'Category',
      options: categoryOptions,
      setFilterValue: setCategoryFilter,
      defaultVal:categoryFilter
    },
    {
      label: 'Available',
      options: availableOptions,
      setFilterValue: setAvailableFilter,
      defaultVal:availableFilter

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
        handleApplyMultiFilter={handleApplyMultiFilter}
        handleMultiFilterCancel={handleMultiFilterCancel}

      />
    </div>
  );
};

export default FoodList;
