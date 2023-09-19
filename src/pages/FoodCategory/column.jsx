import { HiDotsVertical } from 'react-icons/hi';
import { Badge } from 'reactstrap';

const ProductColumn = ({ row }) => {
  return (
    <div className="flex items-center">
      <img
        src={row?.thumbnail}
        className="w-[40px] h-[40px] rounded-[50%]"
        alt=""
      />
    </div>
  );
};

export const columns = [
  {
    Header: 'Image',
    accessor: 'image',
    sortable: true,
    Cell: (props) => {
      const row = props.row.original;
      return <ProductColumn row={row} />;
    },
  },
  {
    Header: 'Category Name',
    accessor: 'name',
    sortable: true,
    Cell: (props) => {
      const row = props.row.original;
      return <span className={`ml-2 rtl:mr-2 font-semibold`}>{row?.name}</span>;
    },
  },
  {
    Header: 'Category Date',
    accessor: 'categoryDate',
    sortable: true,
    Cell: (props) => {
      console.log(props);
      return <span className="capitalize">20/05/2023</span>;
    },
  },
  {
    Header: 'Total Foods',
    accessor: 'totalFoods',
    sortable: true,
    Cell: (props) => {
      const row = props.row.original;
      return <span>{row?._count?.tbl_meals}</span>;
    },
  },
  {
    Header: 'View Foods',
    accessor: 'viewFoods',
    sortable: true,
    Cell: (props) => {
      return (
        <div className="flex items-center gap-2">
          <Badge color="primary">View</Badge>
        </div>
      );
    },
  },
];
