// ** import third party library
import { HiDotsVertical } from 'react-icons/hi';
import { Badge } from 'reactstrap';

const ProductColumn = ({ row }) => {
  return (
    <div className="flex items-center">
      <img
        src={row?.thumbnail?.[0]}
        className="w-[40px] h-[40px] rounded-[50%]"
        alt=""
      />
    </div>
  );
};

export const columns = [
  {
    Header: 'Food Image',
    accessor: 'image',
    sortable: true,
    Cell: (props) => {
      const row = props.row.original;
      return <ProductColumn row={row} />;
    },
  },
  {
    Header: 'Food Name',
    accessor: 'name',
    sortable: true,
    Cell: (props) => {
      const row = props.row.original;
      return <span className={`ml-2 rtl:mr-2 font-semibold`}>{row?.name}</span>;
    },
  },
  {
    Header: 'Category',
    accessor: 'category',
    sortable: true,
    Cell: (props) => {
      const row = props.row.original;

      return (
        <span className="capitalize">{row?.category?.[0]?.name ?? 'N/A'}</span>
      );
    },
  },
  {
    Header: 'Price',
    accessor: 'price',
    sortable: true,
    Cell: (props) => {
      const row = props.row.original;

      return <span>{row?.price + '₹'}</span>;
    },
  },
  {
    Header: 'Status',
    accessor: 'status',
    sortable: true,
    Cell: (props) => {
      return (
        <div className="flex items-center gap-2">
          <Badge color="danger">Canceled</Badge>
        </div>
      );
    },
  },
  {
    Header: 'Report to',
    accessor: 'reportTo',
    sortable: true,
    Cell: (props) => {
      return <p>Roxanne Justina</p>;
    },
  },
  {
    Header: '',
    id: 'action',
    accessor: (row) => row,
    Cell: (props) => {
      return (
        <div>
          <HiDotsVertical size={20} />
        </div>
      );
    },
  },
];
