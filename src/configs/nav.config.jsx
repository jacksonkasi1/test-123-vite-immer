import { Home, ShoppingCart } from "react-feather";

const menus = [
    {
        level: 'Home',
        icon: <Home size={20} />,
        path: '/home'
    },
    {
        level: 'Order List',
        icon: <ShoppingCart size={20} />,
        path: '/order-list'
    }
]

export default menus;