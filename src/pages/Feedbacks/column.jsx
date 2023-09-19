import { Star } from "react-feather"
import { HiDotsVertical } from "react-icons/hi"
import { Badge } from "reactstrap"


const ProductColumn = ({row}) => {
	return (
		<div className="flex items-center">
                <img src={'https://images.immediate.co.uk/production/volatile/sites/30/2020/08/gnocchi-1d16725.jpg'} className="w-[40px] h-[40px] rounded-[50%]" alt="" />
		</div>
	)
}

export const columns = [
    {
        Header: 'Food Image',
        accessor: 'image',
        sortable: true,
        Cell: props => {
			const row = props.row.original
            return <ProductColumn row={row} />
        },
    },
    {
        Header: 'Food Name',
        accessor: 'name',
        sortable: true,
        Cell: props => {
			const row = props.row.original
            return <span className={`ml-2 rtl:mr-2 font-semibold`}>
                {row.name}
            </span>
        },
    },
    {
        Header: 'Review Given Date',
        accessor: 'reviewGivenDate',
        sortable: true,
        Cell: (props) => {
            return (
                <span className="capitalize">22/10/2023</span>
            )
        },
    },
    {
        Header: 'Price',
        accessor: 'price',
        sortable: true,
        Cell: props => {
            const { price } = props.row.original
            return (
                <span>$20</span>
            )
        },
    },
    {
        Header: 'Customer Info',
        accessor: 'customerInfo',
        sortable: true,
        Cell: props => {
            return (
                <div className="flex items-center gap-2">
                    <Badge color="secondary" pill className="cursor-pointer">view</Badge>
                </div>
            )
        },
    },
    {
        Header: 'Star Rating',
        accessor: 'starRating',
        sortable: true,
        Cell: props => {
            return (
                <p className="flex items-center"><Star size={20} /> 5</p>
            )
        },
    },
    {
        Header: 'Status',
        id: 'status',
        accessor: (row) => row,
        Cell: props => {
            return (
                <div>
                    <Badge color="">Rejected</Badge>
                </div>
            )
        }
    },
    {
        Header: '',
        id: 'action',
        accessor: (row) => row,
        Cell: props => {
            return (
                <div>
                    <HiDotsVertical size={20} />
                </div>
            )
        }
    }
]