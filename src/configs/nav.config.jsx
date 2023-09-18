import { Home, ShoppingCart } from "react-feather";

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
        icon: <ShoppingCart size={20} />,
        path: '/table-management'
    }
]

export default menus;