import { Star } from "react-feather"
import { HiDotsVertical } from "react-icons/hi"
import { Badge } from "reactstrap"
import Switcher from "../../components/ui/Switcher/Switcher"
import { useState } from "react"


const ProductColumn = ({row}) => {
	return (
		<div className="flex items-center">
                <img src={'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSzHQv_th9wq3ivQ1CVk7UZRxhbPq64oQrg5Q&usqp=CAU'} className="w-[40px] h-[40px] rounded-[50%]" alt="" />
		</div>
	)
}

export const columns = [
    {
        Header: 'Customer Image',
        accessor: 'image',
        sortable: true,
        Cell: props => {
			const row = props.row.original
            return <ProductColumn row={row} />
        },
    },
    {
        Header: 'Customer Name',
        accessor: 'name',
        sortable: true,
        Cell: props => {
			const row = props.row.original
            return <span className={`ml-2 rtl:mr-2 font-semibold`}>
                Jone Deo
            </span>
        },
    },
    {
        Header: 'Email',
        accessor: 'email',
        sortable: true,
        Cell: (props) => {
            return (
                <span className="capitalize">example@gmail.com</span>
            )
        },
    },
    {
        Header: 'Mobile No',
        accessor: 'mobileNo',
        sortable: true,
        Cell: props => {
            return (
                <span>+8801680964785</span>
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
        Header: 'Status',
        accessor: 'status',
        sortable: true,
        Cell: props => {
            const [status, setStatus] = useState(false)
            return (
                <div className="flex items-center gap-2">
                    <Switcher onClick={() => {
                        setStatus(!status)
                    }} checked={status} />
                </div>
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
                    <HiDotsVertical size={20} />
                </div>
            )
        }
    }
]