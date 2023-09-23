import { createRef } from "react";
import Home from "../../pages/Home";
import FoodList from "../../pages/FoodList";
import Profile from "../../pages/Profile";
import Password from "../../pages/Profile/Password";
import Notification from "../../pages/Profile/Notification";
import Billing from "../../pages/Profile/billing";
import FoodCategory from "../../pages/FoodCategory";
import TableManagement from "../../pages/TableManagement";
import Feedbacks from "../../pages/Feedbacks";
import OrderManagement from "../../pages/OrderManagement";
import CustomerManagement from "../../pages/CustomerManagement";
import NextFoodList from "@src/pages/NextFoodList";
import NextCategory from "@src/pages/NextCategory";
import NextTable from "@src/components/NextTable";
import NextTableManagement from "@src/pages/NextTableManagement";

const auth = [
  {
    path: '/home',
    element: <Home />,
    nodeRef: createRef(),
    meta: {},
  },
  {
    path: '/food-list',
    element: <FoodList />,
    nodeRef: createRef(),
    meta: {},
  },
  {
    path: '/food-category',
    element: <FoodCategory />,
    nodeRef: createRef(),
    meta: {},
  },
  {
    path: '/table-management',
    element: <TableManagement />,
    nodeRef: createRef(),
    meta: {},
  },
  {
    path: '/feedbacks',
    element: <Feedbacks />,
    nodeRef: createRef(),
    meta: {},
  },
  {
    path: '/order-management',
    element: <OrderManagement />,
    nodeRef: createRef(),
    meta: {},
  },
  {
    path: '/customer-management',
    element: <CustomerManagement />,
    nodeRef: createRef(),
    meta: {},
  },
  {
    path: '/profile',
    element: <Profile />,
    nodeRef: createRef(),
    meta: {},
  },
  {
    path: '/profile/password',
    element: <Password />,
    nodeRef: createRef(),
    meta: {},
  },
  {
    path: '/profile/notification',
    element: <Notification />,
    nodeRef: createRef(),
    meta: {},
  },
  {
    path: '/profile/BILLING',
    element: <Billing />,
    nodeRef: createRef(),
    meta: {},
  },
  {
    path:'/next-food-list',
    element: <NextFoodList />,
    nodeRef: createRef(),
    meta: {},
  },
  {
    path:'/next-all-category',
    element: <NextCategory />,
    nodeRef: createRef(),
    meta: {},
  },
  {
    path:'/next-all-table',
    element: <NextTableManagement />,
    nodeRef: createRef(),
    meta: {},
  }
];

export default auth;
