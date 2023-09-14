import DataTable from "../../components/shared/DataTable";
import React, { useEffect, useState } from "react";
import { columns } from "./column";

const OrderList = () => {
  const [data, setData] = useState([]);

  const [allData, setAllData] = useState([
    { name: "T-Shirt" },
    { name: "T-Shirt" },
    { name: "T-Shirt" },
    { name: "T-Shirt" },
    { name: "T-Shirt" },
    { name: "T-Shirt" },
    { name: "T-Shirt" },
    { name: "T-Shirt" },
    { name: "T-Shirt" },
    { name: "T-Shirt" },
    { name: "T-Shirt" },
    { name: "T-Shirt" },
    { name: "T-Shirt" },
    { name: "T-Shirt" },
    { name: "T-Shirt" },
    { name: "T-Shirt" },
    { name: "T-Shirt" },
    { name: "T-Shirt" },
    { name: "T-Shirt" },
    { name: "T-Shirt" },
    { name: "T-Shirt" },
    { name: "T-Shirt" },
    { name: "T-Shirt" },
    { name: "T-Shirt" },
    { name: "T-Shirt" },
    { name: "T-Shirt" },
    { name: "T-Shirt" },
    { name: "T-Shirt" },
    { name: "T-Shirt" },
    { name: "T-Shirt" },
    { name: "T-Shirt" },
    { name: "T-Shirt" },
  ])

  const [pagingData, setPagingData] = useState({
    total: allData.length,
    pageIndex: 1,
    pageSize: 10,
  });

  const onPaginationChange = (newPageIndex) => {
    setPagingData({
      ...pagingData,
      pageIndex: newPageIndex,
    });
  };

  const onSelectChange = (value) => {

    setPagingData({
      total: allData.length,
      pageIndex: pagingData?.pageIndex,
      pageSize: value,
    });

    // Calculate the new data for the current page
    const newData = allData.slice(pagingData?.pageIndex, value);
    setData(newData);
  };

  useEffect(() => {
    const newData = allData.slice(0, pagingData?.pageSize);
    setData(newData);
  }, [])



  return (
    <div>
      <DataTable
        columns={columns}
        data={data}
        skeletonAvatarColumns={[0]}
        skeletonAvatarProps={{ className: "rounded-md" }}
        loading={false}
        onPaginationChange={onPaginationChange}
        onSelectChange={onSelectChange}
        selectable={true}
        pagingData={pagingData}
      />
    </div>
  );
};

export default OrderList;
