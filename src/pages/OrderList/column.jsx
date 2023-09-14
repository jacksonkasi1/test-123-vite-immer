

const ProductColumn = ({row}) => {
	return (
		<div className="flex items-center">
			<span className={`ml-2 rtl:mr-2 font-semibold`}>
                {row?.name}
			</span>
		</div>
	)
}

export const columns = [
    {
        Header: 'Name',
        accessor: 'name',
        sortable: true,
        Cell: props => {
			const row = props.row.original
            return <ProductColumn row={row} />
        },
    },
    {
        Header: 'Category',
        accessor: 'category',
        sortable: true,
        Cell: (props) => {
            console.log(props)
            return (
                <span className="capitalize">Fashion</span>
            )
        },
    },
    {
        Header: 'Quantity',
        accessor: 'stock',
        sortable: true,
        Cell: props => {
            return (
                <span className="capitalize">10</span>
            )
        },
    },
    {
        Header: 'Status',
        accessor: 'status',
        sortable: true,
        Cell: props => {
            return (
                <div className="flex items-center gap-2">
                    <span className={`capitalize font-semibold`}>
                        Canceled
                    </span>
                </div>
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
        Header: '',
        id: 'action',
        accessor: (row) => row,
        Cell: props => {
            return (
                <div>
                    world
                </div>
            )
        }
    },
]