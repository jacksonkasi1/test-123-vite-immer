import React, {useState } from 'react';

// ** import table data
import { columns, availableOptions, categoryOptions } from './data';

// ** import components
import NextTable from '@components/NextTable';

// ** import api
import { getFoodList } from '@api/foodList';

// ** import from next ui
import { Pagination } from '@nextui-org/react';
import SkeletonFoodList from './SkeletonFoodList';

export default function NextFoodList() {
  // ** states for query parameters
  const [pageIndex, setPageIndex] = useState(1);
  const [limit, setLimit] = useState(10);
  const [search, setSearch] = useState('');

  // ** stated to be consumed in multiFiler
  const [categoryFilter, setCategoryFilter] = useState('');
  const [availableFilter, setAvailableFilter] = useState('');

  // ** calling api with swr
  const foodList = getFoodList(limit, pageIndex, search);

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
      defaultVal: categoryFilter,
      placeholder: 'Check for category',
    },
    {
      label: 'Available',
      options: availableOptions,
      setFilterValue: setAvailableFilter,
      defaultVal: availableFilter,
      placeholder: 'Check for availability',
    },
  ];

  return (
    <div>
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
        SkeletonComponent={SkeletonFoodList}
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
