import React, { useState, useEffect } from 'react';
import {
  Table,
  TableHeader,
  TableColumn,
  TableBody,
  TableRow,
  TableCell,
  Input,
  Image,
  Button,
  DropdownTrigger,
  Dropdown,
  DropdownMenu,
  DropdownItem,
  Chip,
  Pagination,
  Select,
  SelectItem,
  Popover,
  Spinner,
  Skeleton,
  Card,
} from '@nextui-org/react';

// ** import icons
import { VerticalDotsIcon } from '@icons/VerticalDotsIcon';
import { SearchIcon } from '@icons/SearchIcon';
import { HiDownload } from 'react-icons/hi';
import { Calendar, Filter } from 'react-feather';

// ** import shared components
import Typography from '@shared/Typography';

// ** import redux
import { useSelector } from 'react-redux';

// ** import helping data
import { INITIAL_VISIBLE_COLUMNS, dateFilter, rowCount } from './data';

// ** import third party library
import Flatpickr from 'react-flatpickr';
import 'flatpickr/dist/themes/material_orange.css';

const NextTable = (props) => {
  const themeConfig = useSelector((state) => state.themeConfigs);

  const {
    classNames,
    data,
    columns,
    page,
    setPage,
    totalPages,
    statusOptions,
    rowsPerPage,
    setRowsPerPage,
    isLoading,
    tblTitle,
    searchValue,
    setSearchValue,
    searchOnChange,
    searchAble,
    setDateSelect,
    activeDateSelect,
    isDateFilter,
    dateValue,
    setDateValue,
    isMultiFilter,
    SkeletonComponent,
    filterArray,
    bottomContent,
    handleApplyDateFilter,
    handleDateFilterCancel,
    handleApplyMultiFilter,
    handleMultiFilterCancel,
  } = props;

  const [filterValue, setFilterValue] = React.useState('');
  const [selectedKeys, setSelectedKeys] = React.useState(new Set([]));
  const [visibleColumns, setVisibleColumns] = React.useState(
    new Set(INITIAL_VISIBLE_COLUMNS),
  );
  const [statusFilter, setStatusFilter] = React.useState('all');
  const [sortDescriptor, setSortDescriptor] = React.useState({
    column: 'price',
    direction: 'ascending',
  });
  const [dateStatus, setDateStatus] = useState(false);
  const [isOpen, setIsOpen] = useState(false);

  useEffect(() => {
    window.addEventListener('click', () => {
      setDateStatus(false);
    });
  }, []);

  const [value, setValue] = React.useState(new Set([]));

  const loadingState = isLoading || data?.length === 0 ? 'loading' : 'idle';

  const hasSearchFilter = Boolean(filterValue);

  // ** we can send these from parent components *******************//

  const headerColumns = React.useMemo(() => {
    if (visibleColumns === 'all') return columns;

    return columns?.filter((column) =>
      Array.from(visibleColumns).includes(column.uid),
    );
  }, [visibleColumns]);

  // ** handle filter here
  const filteredItems = React.useMemo(() => {
    let filteredUsers = data?.length > 0 && [...data];

    if (hasSearchFilter) {
      filteredUsers = filteredUsers.filter((user) =>
        user?.foodName?.toLowerCase()?.includes(filterValue?.toLowerCase()),
      );
    }
    if (
      statusFilter !== 'all' &&
      Array.from(statusFilter).length !== statusOptions.length
    ) {
      filteredUsers = filteredUsers.filter((user) =>
        Array.from(statusFilter).includes(user.status),
      );
    }

    return filteredUsers;
  }, [data, filterValue, statusFilter, page]);

  // ** making an array from filteredItems data
  const items = React.useMemo(() => {
    if (filteredItems.length) {
      return filteredItems;
    }
  }, [page, filteredItems, rowsPerPage, data]);

  // ** handle sorting here
  const sortedItems = React.useMemo(() => {
    if (items?.length <= 0 || !items) {
      return;
    }
    return [...items].sort((a, b) => {
      const first = a[sortDescriptor.column];
      const second = b[sortDescriptor.column];
      const cmp = first < second ? -1 : first > second ? 1 : 0;

      return sortDescriptor.direction === 'descending' ? -cmp : cmp;
    });
  }, [sortDescriptor, items]);

  // ** selectedDetails
  const selectedDetails = React.useMemo(() => {
    return (
      <Typography
        variant="P_Medium_H7"
        className="flex justify-end !text-default-400"
      >
        {selectedKeys === 'all'
          ? 'All items selected'
          : `${selectedKeys?.size ?? 0} of ${items?.length ?? 0} selected`}
      </Typography>
    );
  }, [page, filteredItems, rowsPerPage, data, selectedKeys]);

  // ** set cell data here
  const renderCell = React.useCallback(
    (item, columnKey) => {
      const cellValue = item[columnKey];

      switch (columnKey) {
        case 'thumbnail':
          return (
            <div>
              <Image
                src={typeof cellValue == 'string' ? cellValue : cellValue?.[0]}
                className="w-10 h-10 !rounded-full"
              />
            </div>
          );

        case 'name':
          return (
            <div className="flex flex-col">
              <Typography
                variant="P_Regular_H6"
                className="capitalize text-default-600"
              >
                {cellValue}
              </Typography>
            </div>
          );
        case 'category':
          return (
            <div className="flex flex-col">
              <Typography
                variant="P_Regular_H6"
                className="capitalize text-default-600"
              >
                {cellValue ?? 'N/A'}
              </Typography>
            </div>
          );
        case 'price':
          return (
            <div className="flex flex-col">
              <Typography
                variant="P_Regular_H6"
                className="capitalize text-default-600"
              >
                {cellValue}
              </Typography>
            </div>
          );
        case 'is_available':
          return (
            <Chip
              className="capitalize border-none gap-1 text-default-600"
              color={cellValue ? 'success' : 'warning'}
              size="sm"
              variant="dot"
            >
              {cellValue ? 'Available' : 'Unavailable'}
            </Chip>
          );
        case 'status':
          return (
            <Chip
              className="capitalize border-none gap-1 text-default-600"
              color={cellValue ? 'success' : 'warning'}
              size="sm"
              variant="dot"
            >
              {cellValue ? 'Available' : 'Unavailable'}
            </Chip>
          );
        case 'tbl_name':
          return (
            <div className="flex flex-col">
              <Typography
                variant="P_Regular_H6"
                className="capitalize text-default-600"
              >
                {cellValue}
              </Typography>
            </div>
          );

        case 'capacity':
          return (
            <div className="flex flex-col">
              <Typography
                variant="P_Regular_H6"
                className="capitalize text-default-600"
              >
                {cellValue}
              </Typography>
            </div>
          );
        case 'createdAt':
          return (
            <div className="flex flex-col">
              <Typography
                variant="P_Regular_H6"
                className="capitalize text-default-600"
              >
                {cellValue?.split('T')?.[0] ?? ''}
              </Typography>
            </div>
          );
        case '_count':
          return (
            <div className="flex flex-col">
              <Typography
                variant="P_Regular_H6"
                className="capitalize text-default-600"
              >
                {cellValue?.tbl_orders ?? cellValue?.tbl_meals ?? ''}
              </Typography>
            </div>
          );
        case 'totalAvailability':
          return (
            <div className="flex flex-col">
              <Typography
                variant="P_Regular_H6"
                className="capitalize text-default-600"
              >
                {cellValue ?? 'N/A'}
              </Typography>
            </div>
          );
        case 'qr_code':
          return (
            <div className="flex flex-col">
              <Typography
                variant="P_Regular_H6"
                className="capitalize text-default-600 flex justify-center items-center"
                target="_blank"
                link={`${cellValue}`}
              >
                <HiDownload />
                Download
              </Typography>
            </div>
          );
        case 'totalOrders':
          return (
            <div className="flex flex-col">
              <Typography
                variant="P_Regular_H6"
                className="capitalize text-default-600"
              >
                {cellValue ?? ''}
              </Typography>
            </div>
          );
        case 'actions':
          return (
            <div className="relative flex justify-end items-center gap-2">
              <Dropdown className="bg-background border-1 border-default-200">
                <DropdownTrigger>
                  <Button isIconOnly radius="full" size="sm" variant="light">
                    <VerticalDotsIcon className="text-default-400" />
                  </Button>
                </DropdownTrigger>
                <DropdownMenu>
                  <DropdownItem>
                    <Typography variant="P_Regular_H6">View</Typography>
                  </DropdownItem>
                  <DropdownItem>
                    <Typography variant="P_Regular_H6">Edit</Typography>
                  </DropdownItem>
                  <DropdownItem>
                    <Typography variant="P_Regular_H6">Delete</Typography>
                  </DropdownItem>
                </DropdownMenu>
              </Dropdown>
            </div>
          );
        default:
          return cellValue;
      }
    },
    [data?.length, page, totalPages, data, searchValue],
  );

  // **************************************** Functions starts here *******************************************//
  // ** set row per page limit here
  const onRowsPerPageChange = React.useCallback((value) => {
    setRowsPerPage(Number(value));
    setPage(1);
  }, []);

  const onSearchChange = React.useCallback((value) => {
    if (value) {
      setSearchValue(value);
      setPage(1);
    } else {
      setFilterValue('');
      setSearchValue('');
    }
  }, []);

  // **************************************** Functions ends here *******************************************//

  // ** header content goes here
  const topContent = React.useMemo(() => {
    return (
      <div className="flex w-full justify-between items-center">
        <div className="flex w-1/2 gap-4">
          <div className="flex justify-between  items-center">
            <Dropdown backdrop="blur" className="!rounded-md">
              <DropdownTrigger>
                <Button
                  className="!border !rounded-lg !p-2.5"
                  variant="bordered"
                >
                  <Typography variant="P_Regular_H6">
                    {rowsPerPage + ' Rows/Page'}
                  </Typography>
                </Button>
              </DropdownTrigger>
              <DropdownMenu variant="faded" aria-label="Static Actions">
                {rowCount.map((row) => (
                  <DropdownItem
                    key={row.value}
                    value={row.value}
                    onClick={() => onRowsPerPageChange(row.value)}
                  >
                    <Typography variant="P_Regular_H6">{row.label}</Typography>
                  </DropdownItem>
                ))}
              </DropdownMenu>
            </Dropdown>
          </div>
          {searchAble && (
            <div className="flex flex-auto  justify-between gap-3 items-end">
              <Input
                isClearable
                classNames={{
                  base: 'w-full sm:max-w-[44%] ',
                  inputWrapper: 'border-1 py-1 box-content',
                  input: `text-text-light_  dark:text-default-600`,
                }}
                placeholder="Search"
                size="sm"
                startContent={<SearchIcon className="text-default-300" />}
                value={searchValue}
                variant="bordered"
                onClear={() => setSearchValue('')}
                onValueChange={onSearchChange}
              />
            </div>
          )}
        </div>
        <div className="flex w-1/2 justify-end gap-4">
          {/* <Button onClick={()=>setIsOpen(true)}>hiii</Button> */}
          {isMultiFilter && (
            <div className="flex justify-between  items-center">
              <Dropdown
                isOpen={isOpen}
                onOpenChange={(open) => setIsOpen(open)}
                backdrop="blur"
                className="flex w-80 rounded-md hover:!bg-white dark:hover:!bg-gray-900 hover:!outline-none hover:!ring-0 hover:!border-none "
              >
                <DropdownTrigger>
                  <Button
                    className="!border !rounded-lg !p-2.5"
                    variant="bordered"
                  >
                    <Typography
                      variant="P_Regular_H6"
                      className="flex gap-1 px-1"
                    >
                      <Filter size={20} className="text-text_light" />
                      Filter
                    </Typography>
                  </Button>
                </DropdownTrigger>
                <DropdownMenu
                  variant="faded"
                  aria-label="Static Actions"
                  closeOnSelect={false}
                  itemClasses={{
                    base: 'hover:!bg-white dark:hover:!bg-gray-900 hover:!outline-none hover:!ring-0 hover:!border-none',
                  }}
                >
                  <DropdownItem closeOnSelect={false}>
                    <div className="flex flex-col w-full gap-4">
                      {filterArray &&
                        filterArray?.map((filter, index) => (
                          <div className="flex flex-col gap-1">
                            <Typography variant="P_Medium_H6" className="">
                              {filter?.label}
                            </Typography>
                            <Select
                              key={index}
                              className="max-w-xs !rounded-md"
                              onChange={(e) =>
                                filter.setFilterValue(e.target.value)
                              }
                              selectedKeys={[filter.selectedValue]}
                              placeholder={filter.placeholder}
                              variant="bordered"
                              classNames={{
                                mainWrapper: 'dark:text-default-600',
                                trigger: 'rounded-md !py-0 h-10',
                                popover: 'rounded-md',
                              }}
                            >
                              {filter?.options?.map((item) => (
                                <SelectItem key={item.value} value={item.value}>
                                  {item.label}
                                </SelectItem>
                              ))}
                            </Select>
                          </div>
                        ))}

                      <div className="mt-3 w-full flex  gap-4">
                        <Button
                          variant="bordered"
                          className={`!rounded-[5px] flex items-center gap-x-3  flex-1`}
                          onClick={() => {
                            handleMultiFilterCancel();
                            setIsOpen(false);
                          }}
                        >
                          <Typography
                            variant="P_Regular_H6"
                            className=" text-text-light_ dark:text-default-600"
                          >
                            Cancel
                          </Typography>
                        </Button>
                        <Button
                          variant="bordered"
                          className={`!rounded-[5px] flex items-center gap-x-3 flex-1 `}
                          onClick={() => {
                            handleApplyMultiFilter();
                            setIsOpen(false);
                          }}
                        >
                          <Typography
                            variant="P_Regular_H6"
                            className=" text-text-light_ dark:text-default-600"
                          >
                            Apply
                          </Typography>
                        </Button>
                      </div>
                    </div>
                  </DropdownItem>
                </DropdownMenu>
              </Dropdown>
            </div>
          )}
          {isDateFilter && (
            <div className="flex justify-between  items-center">
              <Button
                className="!border !rounded-lg !p-2.5"
                variant="bordered"
                onClick={(e) => {
                  e.stopPropagation();
                  setDateStatus(true);
                }}
              >
                <Typography variant="P_Regular_H6" className="flex gap-1 px-1">
                  <Calendar size={20} className="text-text_light" />
                  Select Date
                </Typography>
              </Button>
              {dateStatus && (
                <div
                  onClick={(e) => {
                    e.stopPropagation();
                    setDateStatus(true);
                  }}
                  style={{
                    boxShadow:
                      '0px 2.6263864040374756px 4.4648566246032715px 0px #dddcdc',
                  }}
                  className="absolute right-20 z-50 top-12 w-[450px] bg-white_ dark:bg-mid_light_dark p-5  border-[1px] border-[#dfdfdf] dark:border-dark_border !rounded-[10px] dark:!shadow-none"
                >
                  <Typography variant="P_SemiBold_H5">Time Period</Typography>

                  <Flatpickr
                    value={dateValue}
                    id="range-picker"
                    className="form-control input mt-1"
                    options={{
                      mode: 'range',
                    }}
                    onChange={(date) => {
                      setDateValue(date);
                    }}
                  />

                  <div className="flex items-center gap-3 flex-wrap py-3 mt-3">
                    {dateFilter.map((data) => {
                      return (
                        <div
                          onClick={() => setDateSelect(data)}
                          className={`${
                            activeDateSelect === data &&
                            `bg-${themeConfig.themeColor}-${themeConfig.colorLevel} border-${themeConfig.themeColor}-${themeConfig.colorLevel}`
                          } border-[1px] border-[#dfdfdf] dark:border-dark_border py-1 px-5 rounded-[50px] cursor-pointer`}
                        >
                          <Typography
                            className={`${
                              activeDateSelect === data && `!text-white_`
                            }`}
                            variant="P_Regular_H6"
                          >
                            {data}
                          </Typography>
                        </div>
                      );
                    })}
                  </div>

                  <div className="mt-3 w-full flex justify-between">
                    <Button
                      variant="bordered"
                      className={`!rounded-[5px] flex items-center gap-x-3 text-text-light_ w-[48%]`}
                      onClick={(e) => {
                        setDateValue([]);
                        setDateSelect('');
                        setDateStatus(false);
                        handleDateFilterCancel(e);
                      }}
                    >
                      <Typography variant="P_Regular_H6">Cancel</Typography>
                    </Button>
                    <Button
                      variant="bordered"
                      className={`!rounded-[5px] w-[48%] flex items-center gap-x-3 text-text-light_`}
                      onClick={(e) => {
                        handleApplyDateFilter(e);
                        setDateStatus(false);
                      }}
                    >
                      <Typography variant="P_Regular_H6">Apply</Typography>
                    </Button>
                  </div>
                </div>
              )}
            </div>
          )}
        </div>
      </div>
    );
  }, [
    filterValue,
    statusFilter,
    visibleColumns,
    onRowsPerPageChange,
    rowsPerPage,
    data?.length,
    hasSearchFilter,
    filterArray,
    isOpen,
    dateStatus,
    dateValue,
    activeDateSelect,
  ]);

  return (
    <div className="pt-8 mx-10">
      <Typography variant="P_Bold_H4">{tblTitle}</Typography>
      <Table
        isCompact
        removeWrapper
        aria-label="Example table with custom cells, pagination and sorting"
        bottomContent={bottomContent}
        bottomContentPlacement="outside"
        checkboxesProps={{
          classNames: {
            wrapper: [
              'after:bg-foreground',
              'after:bg-primary-600',
              'text-background',
            ],
          },
        }}
        classNames={classNames}
        selectedKeys={selectedKeys}
        selectionMode="multiple"
        sortDescriptor={sortDescriptor}
        topContent={topContent}
        topContentPlacement="outside"
        onSelectionChange={setSelectedKeys}
        onSortChange={setSortDescriptor}
      >
        <TableHeader columns={headerColumns}>
          {(column) => (
            <TableColumn
              key={column.uid}
              align={column.uid === 'actions' ? 'center' : 'start'}
              allowsSorting={column.sortable}
            >
              <Typography variant="P_Medium_H6">{column.name}</Typography>
            </TableColumn>
          )}
        </TableHeader>
        <TableBody
          emptyContent={isLoading ? '' : 'No data found'}
          items={sortedItems ?? []}
          loadingContent={SkeletonComponent && <SkeletonComponent />}
          loadingState={loadingState}
          isLoading={isLoading}
        >
          {(item) => (
            <TableRow key={item.id}>
              {(columnKey) => (
                <TableCell className="p-1 border-b">
                  {renderCell(item, columnKey)}
                </TableCell>
              )}
            </TableRow>
          )}
        </TableBody>
      </Table>
      {sortedItems?.length && <div>{selectedDetails}</div>}
    </div>
  );
};

export default NextTable;
