import { useState } from 'react';
import { Link } from 'react-router-dom';

// ** import from third party ui
import { HiDotsVertical, HiDownload } from 'react-icons/hi';
import Switcher from '@components/ui/Switcher/Switcher';

export const columns = [
  {
    Header: 'Table No',
    accessor: 'tableNo',
    sortable: true,
    Cell: (props, index) => {
      const row = props.row.original;
      return <p>{row?.tbl_name}</p>;
    },
  },
  {
    Header: 'Capacity',
    accessor: 'capacity',
    sortable: true,
    Cell: (props) => {
      const row = props.row.original;
      return (
        <span className={`ml-2 rtl:mr-2 font-semibold`}>{row?.capacity}</span>
      );
    },
  },
  {
    Header: 'Created Date',
    accessor: 'createdDate',
    sortable: true,
    Cell: (props) => {
      const row = props.row.original;
      return (
        <span className="capitalize">{row?.createdAt?.split('T')?.[0]}</span>
      );
    },
  },
  {
    Header: 'QR code download',
    accessor: 'totalFoods',
    sortable: true,
    Cell: (props) => {
      const row = props.row.original;
      return (
        <Link target="_blank" to={`${row?.qr_code}`}>
          <HiDownload />
        </Link>
      );
    },
  },
  {
    Header: 'Total Orders',
    accessor: 'totalOrders',
    sortable: true,
    Cell: (props) => {
      const row = props.row.original;
      return (
        <div className="flex items-center gap-2">{row?._count?.tbl_orders}</div>
      );
    },
  },
  {
    Header: 'Table Availability',
    accessor: 'totalAvailability',
    sortable: true,
    Cell: (props) => {
      const row = props.row.original;
      return <div className="flex items-center gap-2">Vt sir</div>;
    },
  },
  {
    Header: 'Status',
    accessor: 'status',
    sortable: true,
    Cell: (props) => {
      const row = props.row.original;

      const [status, setStatus] = useState(false);
      return (
        <div className="flex items-center gap-2">
          <Switcher onClick={() => setStatus(!status)} checked={row?.status} />
        </div>
      );
    },
  },
  {
    Header: 'Action',
    accessor: 'action',
    sortable: true,
    Cell: (props) => {
      return (
        <div className="flex items-center gap-2">
          <HiDotsVertical />
        </div>
      );
    },
  },
];
