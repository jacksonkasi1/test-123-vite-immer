import DataTable from "../../components/shared/DataTable";
import React, { useEffect, useState } from "react";
import { columns } from "./column";

const TableManagement = () => {
  const [data, setData] = useState([]);
  
  const [allData, setAllData] = useState([
    { name: "T-Shirt1" },
    { name: "T-Shirt2" },
    { name: "T-Shirt3" },
    { name: "T-Shirt4" },
    { name: "T-Shirt5" },
    { name: "T-Shirt6" },
    { name: "T-Shirt7" },
    { name: "T-Shirt8" },
    { name: "T-Shirt9" },
    { name: "T-Shirt10" },
    { name: "T-Shirt11" },
    { name: "T-Shirt12" },
    { name: "T-Shirt13" },
    { name: "T-Shirt14" },
    { name: "T-Shirt15" },
    { name: "T-Shirt16" },
    { name: "T-Shirt17" },
    { name: "T-Shirt18" },
    { name: "T-Shirt19" },
    { name: "T-Shirt20" },
    { name: "T-Shirt21" },
    { name: "T-Shirt22" },
    { name: "T-Shirt23" },
    { name: "T-Shirt24" },
    { name: "T-Shirt25" },
    { name: "T-Shirt26" },
    { name: "T-Shirt27" },
    { name: "T-Shirt28" },
    { name: "T-Shirt29" },
    { name: "T-Shirt30" },
    { name: "T-Shirt31" },
    { name: "T-Shirt32" },
  ])

  const [pagingData, setPagingData] = useState({
    total: allData.length,
    pageIndex: 1,
    pageSize: 10,
  });

  console.log(data);

  const onPaginationChange = (newPageIndex) => {
    console.log(newPageIndex);
    setPagingData({
      ...pagingData,
      pageIndex: newPageIndex,
    });

    const temp = pagingData.pageSize * (newPageIndex-1);
    const newData = allData.slice( temp, (temp + pagingData.pageSize));
    console.log(newData);
    setData(newData);
  };

  const onSelectChange = (value) => {
    setPagingData({
      total: allData.length,
      pageIndex: 1,
      pageSize: value,
    });

    // Calculate the new data for the current page
    const newData = allData.slice( 0, value);
    setData(newData);
  };

  useEffect(() => {
    const newData = allData.slice(0, pagingData?.pageSize);
    setData(newData);
  }, [])



  return (
    <div className="px-10 pt-10 pb-12">
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

export default TableManagement;
