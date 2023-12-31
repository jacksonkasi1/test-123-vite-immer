import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';

// ** import table data
import { columns, availableOptions, categoryOptions } from './data';

// ** import components
import NextTable from '@components/NextTable';

// ** import api
import { getFoodList, removeMeal } from '@api/foodList';

// ** import from next ui
import { Pagination } from '@nextui-org/react';

// ** import utils
import { toasterX } from '@utils/toastMessages';
import { formatDate } from '@utils';

// ** import sub pages
import TableSkeleton from './TableSkeleton';
import Loader from '@src/components/ui/Loader';

export default function NextFoodList() {
  const navigate = useNavigate();

  // ** states for query parameters
  const [pageIndex, setPageIndex] = useState(1);
  const [limit, setLimit] = useState(10);
  const [search, setSearch] = useState('');
  const [category, setCategory] = useState('');
  const [dateValue, setDateValue] = useState([]);
  const [dateSelect, setDateSelect] = useState('ThisMonth');
  const [type, setType] = useState('');
  const [from, setFrom] = useState('');
  const [to, setTo] = useState('');
  const [available, setAvailable] = useState('');

  // ** stated to be consumed in multiFiler
  const [categoryFilter, setCategoryFilter] = useState('');
  const [availableFilter, setAvailableFilter] = useState('');

  const [loader, setLoader] = useState(false);

  // ** calling api with swr
  const foodList = getFoodList(
    limit,
    pageIndex,
    search,
    category,
    type,
    from,
    to,
    available,
  );

  // ** custom classes for table
  const classNames = React.useMemo(
    () => ({
      wrapper: ['max-h-[382px]', 'max-w-3xl'],
      th: [
        '!bg-transparent',
        'text-default-500',
        '!hover:bg-transparent',
        'border-b',
        'border-divider',
      ],
      td: [
        // changing the rows border radius
        // first
        'group-data-[first=true]:first:before:rounded-none',
        'group-data-[first=true]:last:before:rounded-none',
        // middle
        'group-data-[middle=true]:before:rounded-none',
        // last
        'group-data-[last=true]:first:before:rounded-none',
        'group-data-[last=true]:last:before:rounded-none',
      ],
    }),
    [],
  );

  // ** filterArray for multiFilter
  const filterArray = [
    {
      label: 'Category',
      options: categoryOptions,
      setFilterValue: setCategoryFilter,
      selectedValue: categoryFilter,
      placeholder: 'Check for category',
    },
    {
      label: 'Available',
      options: availableOptions,
      setFilterValue: setAvailableFilter,
      selectedValue: availableFilter,
      placeholder: 'Check for availability',
    },
  ];

  // ** Action function for table

  const handleActions = async (key, id) => {
    if (key == 'edit') {
      navigate(`/edit-meal/${id}`);
      return;
    } else if (key == 'view') {
      navigate(`/view-meal/${id}`);
      return;
    } else if (key == 'delete') {
      try {
        setLoader(true);
        await removeMeal(id);
        toasterX.success('Meal deleted successfully ');
        setLoader(false);
        foodList.mutate()
      } catch (error) {
        console.error('Error at deleting meal', error);
        setLoader(false);
      }
    }
    return;
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
    if (!categoryFilter && !availableFilter) {
      toasterX.warning('Please select a filter to apply');
    } else {
      if (categoryFilter && availableFilter) {
        setCategory(categoryFilter);
        setAvailable(availableFilter);
      } else if (categoryFilter) {
        setCategory(categoryFilter);
      } else if (availableFilter) {
        setAvailable(availableFilter);
      }
    }
  };

  const handleMultiFilterCancel = () => {
    setCategory('');
    setAvailable('');
    setCategoryFilter('');
    setAvailableFilter('');
  };

  // ******************* multiFilter function ends here

  return (
    <div>
      <Loader isLoading={loader} />
      <NextTable
        classNames={classNames}
        data={foodList?.data?.data?.meals}
        columns={columns}
        page={pageIndex}
        setPage={setPageIndex}
        rowsPerPage={limit}
        setRowsPerPage={setLimit}
        totalPages={foodList?.data?.data?.totalPages}
        isLoading={foodList?.isLoading}
        isMultiFilter={true}
        isDateFilter={true}
        searchAble={true}
        tblTitle={'All Meals'}
        setSearchValue={setSearch}
        filterArray={filterArray}
        SkeletonComponent={TableSkeleton}
        handleApplyMultiFilter={handleApplyMultiFilter}
        handleMultiFilterCancel={handleMultiFilterCancel}
        handleApplyDateFilter={applyDateFilter}
        handleDateFilterCancel={handleDateFilterCancel}
        handleActions={handleActions}
        setDateSelect={setDateSelect}
        editKey={'meal_id'} //meal_id as a param
        activeDateSelect={dateSelect}
        dateValue={dateValue}
        setDateValue={setDateValue}
        bottomContent={
          foodList?.data?.data?.totalPages > 0 ? (
            <div className="py-2 px-2 flex justify-between items-center">
              <Pagination
                showControls
                classNames={{
                  cursor: 'bg-primary-600 text-background',
                }}
                color="default"
                page={pageIndex}
                total={foodList?.data?.data?.totalPages}
                onChange={(page) => setPageIndex(page)}
              />
            </div>
          ) : null
        }
      />
    </div>
  );
}
