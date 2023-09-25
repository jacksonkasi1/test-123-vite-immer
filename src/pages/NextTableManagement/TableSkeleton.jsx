import React from 'react';

// ** import from next ui
import { Skeleton } from '@nextui-org/react';

const TableSkeleton = () => {
  // Create an empty array with a length of 10 and fill it with undefined
  const repeatedElements = Array(8).fill(0);
  console.log('repeatedElements', repeatedElements);

  return (
    <div className="w-full h-full flex flex-col gap-12 items-center">
      <div className="w-full gap-2 flex flex-col absolute top-24 ps-12">
        {repeatedElements.map((_, index) => (
          <div
            key={index}
            className="w-full h-12 border-b flex gap-12  items-center"
          >
            <div className=" w-1/4 flex justify-start gap-16  items-center">
              <Skeleton className="w-20 h-8 rounded-md dark:bg-gray-500 "></Skeleton>
              <Skeleton className="w-10 h-8 rounded-md dark:bg-gray-500 "></Skeleton>
            </div>
            <div className=" w-1/4 flex justify-start  gap-16  items-center">
              <Skeleton className="w-24 h-8 rounded-md dark:bg-gray-500 self-start text-start"></Skeleton>
              <Skeleton className="w-24 h-8 rounded-md dark:bg-gray-500 "></Skeleton>
            </div>
            <div className=" w-1/4 flex justify-center gap-16  items-center">
              <Skeleton className="w-24 h-8 rounded-md dark:bg-gray-500 "></Skeleton>
              <Skeleton className="w-24 h-8 rounded-md dark:bg-gray-500 "></Skeleton>
            </div>
            <div className=" w-1/4 flex justify-center gap-10 items-center">
              <Skeleton className="w-24 h-8 rounded-md dark:bg-gray-500 "></Skeleton>
              <Skeleton className="w-10 h-8 rounded-md dark:bg-gray-500 "></Skeleton>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default TableSkeleton;
