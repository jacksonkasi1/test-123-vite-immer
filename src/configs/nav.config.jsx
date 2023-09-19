import { Home, ShoppingCart, Table, Users } from "react-feather";

const menus = [
    {
        level: 'Home',
        icon: <Home size={20} />,
        path: '/home'
    },
    {
        level: 'Food List',
        icon: <ShoppingCart size={20} />,
        path: '/food-list'
    },
    {
        level: 'Food Category',
        icon: <ShoppingCart size={20} />,
        path: '/food-category'
    },
    {
        level: 'Table Management',
        icon: <Table size={20} />,
        path: '/table-management'
    },
    {
        level: 'Feedbacks',
        icon: <ShoppingCart size={20} />,
        path: '/feedbacks'
    },
    {
        level: 'Order Management',
        icon: <ShoppingCart size={20} />,
        path: '/order-management'
    },
    {
        level: 'Customer Management',
        icon: <Users size={20} />,
        path: '/customer-management'
    }
]

export default menus;