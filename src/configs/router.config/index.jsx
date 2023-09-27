import { createRef } from "react";
import Home from "@pages/Home";
import Profile from "@pages/Profile";
import Password from "@pages/Profile/Password";
import Notification from "@pages/Profile/Notification";
import Billing from "@pages/Profile/billing";
import Feedbacks from "@pages/Feedbacks";
import OrderManagement from "@pages/OrderManagement";
import CustomerManagement from "@pages/CustomerManagement";
import NextFoodList from "@pages/NextFoodList";
import NextCategory from "@pages/NextCategory";
import NextTableManagement from "@pages/NextTableManagement";
import AddCategory from "@pages/AddCategory";
import AddMeals from "@pages/AddMeals";

const auth = [
  {
    path: '/home',
    element: <Home />,
    nodeRef: createRef(),
    meta: {},
  },
  {
    path: '/food-list',
    element: <NextFoodList />,
    nodeRef: createRef(),
    meta: {},
  },
  {
    path: '/add-meal',
    element: <AddMeals />,
    nodeRef: createRef(),
    meta: {},
  },
  {
    path: '/food-category',
    element: <NextCategory />,
    nodeRef: createRef(),
    meta: {},
  },
  {
    path: '/add-food-category',
    element: <AddCategory />,
    nodeRef: createRef(),
    meta: {},
  },
  {
    path: '/table-management',
    element: <NextTableManagement />,
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
];

export default auth;
