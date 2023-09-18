import { HiDotsVertical, HiDownload } from "react-icons/hi"
import { Badge } from "reactstrap"
import Switcher from "../../components/ui/Switcher/Switcher"
import { useState } from "react"


const ProductColumn = ({row}) => {
	return (
		<div className="flex items-center">
                <img src={'https://images.immediate.co.uk/production/volatile/sites/30/2020/08/gnocchi-1d16725.jpg'} className="w-[40px] h-[40px] rounded-[50%]" alt="" />
		</div>
	)
}

export const columns = [
    {
        Header: 'Table No',
        accessor: 'tableNo',
        sortable: true,
        Cell: (props, index) => {
            return <p>1</p>
        },
    },
    {
        Header: 'Capacity',
        accessor: 'capacity',
        sortable: true,
        Cell: props => {
            return <span className={`ml-2 rtl:mr-2 font-semibold`}>
                10
            </span>
        },
    },
    {
        Header: 'Created Date',
        accessor: 'createdDate',
        sortable: true,
        Cell: (props) => {
            return (
                <span className="capitalize">20/05/2023</span>
            )
        },
    },
    {
        Header: 'QR code download',
        accessor: 'totalFoods',
        sortable: true,
        Cell: props => {
            return (
                <HiDownload />
            )
        },
    },
    {
        Header: 'Total Orders',
        accessor: 'totalOrders',
        sortable: true,
        Cell: props => {
            return (
                <div className="flex items-center gap-2">
                    100
                </div>
            )
        },
    },
    {
        Header: 'Table Availability',
        accessor: 'totalAvailability',
        sortable: true,
        Cell: props => {
            return (
                <div className="flex items-center gap-2">
                    Vt sir
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
        Header: 'Action',
        accessor: 'action',
        sortable: true,
        Cell: props => {
            return (
                <div className="flex items-center gap-2">
                    <HiDotsVertical />
                </div>
            )
        },
    }
]