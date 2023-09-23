import React, { useState } from 'react';

// ** import table data
import { columns, statusOptions } from './data';

// ** import components
import NextTable from '@components/NextTable';

// ** import api
import { getAllTable } from '@api/table';

// ** import from next ui
import { Pagination } from '@nextui-org/react';

export default function NextTableManagement() {
  // ** states for query parameters
  const [pageIndex, setPageIndex] = useState(1);
  const [limit, setLimit] = useState(10);
  const [search, setSearch] = useState('');

  // ** calling api with swr
  const allTable = getAllTable(limit, pageIndex, search);

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

  return (
    <div>
      <NextTable
        classNames={classNames}
        data={allTable?.data?.data?.isTableExist}
        columns={columns}
        statusOptions={statusOptions}
        page={pageIndex}
        setPage={setPageIndex}
        rowsPerPage={limit}
        setRowsPerPage={setLimit}
        totalPages={allTable?.data?.data?.totalPages}
        isLoading={allTable?.isLoading}
        isDateFilter={true}
        bottomContent={
          allTable?.data?.data?.totalPages > 0 ? (
            <div className="py-2 px-2 flex justify-between items-center">
              <Pagination
                showControls
                classNames={{
                  cursor: 'bg-primary-600 text-background',
                }}
                color="default"
                page={pageIndex}
                total={allTable?.data?.data?.totalPages}
                onChange={(page) => setPageIndex(page)}
              />
            </div>
          ) : null
        }
        searchAble={true}
        setSearchValue={setSearch}
        tblTitle={'All Tables'}
      />
    </div>
  );
}
