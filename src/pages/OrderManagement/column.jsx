import { HiDotsVertical, HiDownload } from "react-icons/hi"
import { Badge } from "reactstrap"
import Switcher from "../../components/ui/Switcher/Switcher"
import { useState } from "react"


export const columns = [
    {
        Header: 'Order ID',
        accessor: 'orderId',
        sortable: true,
        Cell: (props, index) => {
            return <p>1</p>
        },
    },
    {
        Header: 'Token No',
        accessor: 'tokenNo',
        sortable: true,
        Cell: props => {
            return <span className={`ml-2 rtl:mr-2 font-semibold`}>
                10
            </span>
        },
    },
    {
        Header: 'Order Date',
        accessor: 'orderDate',
        sortable: true,
        Cell: (props) => {
            return (
                <span className="capitalize">20/05/2023</span>
            )
        },
    },
    {
        Header: 'Customer Info',
        accessor: 'customerInfo',
        sortable: true,
        Cell: props => {
            return (
                <Badge color="secondary" >Info</Badge>
            )
        },
    },
    {
        Header: 'Total Orders',
        accessor: 'totalOrders',
        sortable: true,
        Cell: props => {
            return (
                <Badge color="secondary" >Orders</Badge>
            )
        },
    },
    {
        Header: 'Total Price',
        accessor: 'total Price',
        sortable: true,
        Cell: props => {
            return (
                <div className="flex items-center gap-2">
                    $200
                </div>
            )
        },
    },
    {
        Header: 'Order Status',
        accessor: 'orderStatus',
        sortable: true,
        Cell: props => {
            return (
                <div className="flex items-center gap-2">
                   <Badge color="danger" >Canceled</Badge>
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