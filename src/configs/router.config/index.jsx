import { createRef } from "react";
import Home from "../../pages/Home";
import OrderList from "../../pages/OrderList";
import Profile from "../../pages/Profile";
import Password from "../../pages/Profile/Password";
import Notification from "../../pages/Profile/Notification";
import Billing from "../../pages/Profile/billing";

const auth = [
  {
    path: '/home',
    element: <Home />,
    nodeRef: createRef(),
    meta: {},
  },
  {
    path: '/order-list',
    element: <OrderList />,
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
  }
];

export default auth;
