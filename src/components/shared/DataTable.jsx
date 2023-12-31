import React, { forwardRef, useMemo, useRef, useEffect } from 'react';
import PropTypes from 'prop-types';
import Table from '../../components/ui/Table';
import Pagination from '../../components/ui/Pagination';
import Checkbox from '../../components/ui/Checkbox';
import Select from '../../components/ui/Select';
import TableRowSkeleton from './loaders/TableRowSkeleton';
import Loading from './Loading';
import { useTable, usePagination, useSortBy, useRowSelect } from 'react-table';
import TableHeader from './TableHeader';
import Typography from './Typography';

const { Tr, Th, Td, THead, TBody, Sorter } = Table;

const IndeterminateCheckbox = forwardRef((props, ref) => {
  const {
    indeterminate,
    onChange,
    onCheckBoxChange,
    onIndeterminateCheckBoxChange,
    ...rest
  } = props;

  const defaultRef = useRef();
  const resolvedRef = ref || defaultRef;

  useEffect(() => {
    resolvedRef.current.indeterminate = indeterminate;
  }, [resolvedRef, indeterminate]);

  const handleChange = (e) => {
    onChange(e);
    onCheckBoxChange?.(e);
    onIndeterminateCheckBoxChange?.(e);
  };

  return (
    <Checkbox
      className="mb-0"
      ref={resolvedRef}
      onChange={(_, e) => handleChange(e)}
      {...rest}
    />
  );
});

const DataTable = (props) => {
  const {
    skeletonAvatarColumns,
    columns,
    data,
    loading,
    onCheckBoxChange,
    onIndeterminateCheckBoxChange,
    onPaginationChange,
    onSelectChange,
    onSort,
    pageSizes,
    selectable,
    skeletonAvatarProps,
    pagingData,
    searchValue,
    searchOnChange,
    searchAble,
    setDateSelect,
    activeDateSelect,
    isDateFilter,
    dateValue,
    setDateValue,
    isMultiFilter,
    filterArray,
    handleApplyDateFilter,
    handleDateFilterCancel,
    handleApplyMultiFilter,
    handleMultiFilterCancel
  } = props;

  const { pageSize, pageIndex, total } = pagingData;

  const pageSizeOption = useMemo(
    () =>
      pageSizes.map((number) => ({ value: number, label: `${number} / page` })),
    [pageSizes],
  );

  const handleCheckBoxChange = (checked, row) => {
    if (!loading) {
      onCheckBoxChange?.(checked, row);
    }
  };

  const handleIndeterminateCheckBoxChange = (checked, rows) => {
    if (!loading) {
      onIndeterminateCheckBoxChange?.(checked, rows);
    }
  };

  const { getTableProps, getTableBodyProps, headerGroups, prepareRow, page } =
    useTable(
      {
        columns,
        data,
        manualPagination: true,
        manualSortBy: true,
        autoResetSelectedRows: false,
        autoResetSelectedCell: false,
        autoResetSelectedColumn: false,
      },
      useSortBy,
      usePagination,
      useRowSelect,
      (hooks) => {
        if (selectable) {
          hooks.visibleColumns.push((columns) => [
            {
              id: 'selection',
              Header: (props) => (
                <div>
                  <IndeterminateCheckbox
                    {...props.getToggleAllRowsSelectedProps()}
                    onIndeterminateCheckBoxChange={(e) =>
                      handleIndeterminateCheckBoxChange(
                        e.target.checked,
                        props.rows,
                      )
                    }
                  />
                </div>
              ),
              Cell: ({ row }) => (
                <div>
                  <IndeterminateCheckbox
                    {...row.getToggleRowSelectedProps()}
                    onCheckBoxChange={(e) =>
                      handleCheckBoxChange(e.target.checked, row.original)
                    }
                  />
                </div>
              ),
              sortable: false,
            },
            ...columns,
          ]);
        }
      },
    );

  const handlePaginationChange = (page) => {
    if (!loading) {
      onPaginationChange?.(page);
    }
  };

  const handleSelectChange = (value) => {
    if (!loading) {
      onSelectChange?.(Number(value));
    }
  };

  const handleSort = (column) => {
    if (!loading) {
      const { id, isSortedDesc, toggleSortBy, clearSortBy } = column;
      const sortOrder = isSortedDesc ? 'desc' : 'asc';
      toggleSortBy(!isSortedDesc);
      onSort?.({ order: sortOrder, key: id }, { id, clearSortBy });
    }
  };

  // select change

  return (
    <Loading loading={loading && data.length !== 0} type="cover">
      <div className="mb-2">
        <TableHeader
          selectChange={(option) => handleSelectChange(option.value)}
          pageSizeOption={pageSizeOption}
          selectValue={pageSizeOption.filter(
            (option) => option.value === pageSize,
          )}
          searchOnChange={searchOnChange}
          searchValue={searchValue}
          searchAble={searchAble}
          setDateSelect={setDateSelect}
          activeDateSelect={activeDateSelect}
          isDateFilter={isDateFilter}
          dateValue={dateValue}
          setDateValue={setDateValue}
          isMultiFilter={isMultiFilter}
          filterArray={filterArray}
          handleApplyDateFilter={handleApplyDateFilter}
          handleDateFilterCancel={handleDateFilterCancel}
          handleApplyMultiFilter={handleApplyMultiFilter}
          handleMultiFilterCancel={handleMultiFilterCancel}
        />
      </div>

      <Table {...getTableProps()}>
        <THead>
          {headerGroups.map((headerGroup) => (
            <Tr {...headerGroup.getHeaderGroupProps()}>
              {headerGroup.headers.map((column) => (
                <Th {...column.getHeaderProps()}>
                  {column.render('Header') &&
                    (column.sortable ? (
                      <div
                        className="cursor-pointer"
                        onClick={() => handleSort(column)}
                      >
                        {column.render('Header')}
                        <span>
                          <Sorter sort={column.isSortedDesc} />
                        </span>
                      </div>
                    ) : (
                      <div>{column.render('Header')}</div>
                    ))}
                </Th>
              ))}
            </Tr>
          ))}
        </THead>

        {loading && data.length === 0 ? (
          <TableRowSkeleton
            columns={columns.length}
            rows={pagingData.pageSize}
            avatarInColumns={skeletonAvatarColumns}
            avatarProps={skeletonAvatarProps}
          />
        ) : (
          <TBody {...getTableBodyProps()}>
            {page.map((row, i) => {
              prepareRow(row);
              return (
                <Tr {...row.getRowProps()}>
                  {row.cells.map((cell) => {
                    return (
                      <Td {...cell.getCellProps()}>{cell.render('Cell')}</Td>
                    );
                  })}
                </Tr>
              );
            })}
          </TBody>
        )}
      </Table>
      {data.length === 0 && !loading && (
        <div className="w-full flex justify-center items-center py-5">
          <Typography variant="P_SemiBold_H6">
            Do not have any data to show
          </Typography>
        </div>
      )}
      <div className="mt-4">
        <Pagination
          pageSize={pageSize}
          currentPage={pageIndex}
          total={total}
          onChange={handlePaginationChange}
        />
      </div>
    </Loading>
  );
};

DataTable.propTypes = {
  columns: PropTypes.array,
  data: PropTypes.array,
  loading: PropTypes.bool,
  onCheckBoxChange: PropTypes.func,
  onIndeterminateCheckBoxChange: PropTypes.func,
  onPaginationChange: PropTypes.func,
  onSelectChange: PropTypes.func,
  onSort: PropTypes.func,
  pageSizes: PropTypes.arrayOf(PropTypes.number),
  selectable: PropTypes.bool,
  skeletonAvatarColumns: PropTypes.arrayOf(PropTypes.number),
  skeletonAvatarProps: PropTypes.object,
  pagingData: PropTypes.shape({
    total: PropTypes.number,
    pageIndex: PropTypes.number,
    pageSize: PropTypes.number,
  }),
};

DataTable.defaultProps = {
  pageSizes: [10, 25, 50, 100],
  pagingData: {
    total: 0,
    pageIndex: 1,
    pageSize: 10,
  },
  data: [],
  columns: [],
  selectable: false,
  loading: false,
};

export default DataTable;
