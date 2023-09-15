import { createRef } from "react";
import Home from "../../pages/Home";
import OrderList from "../../pages/OrderList";
import Profile from "../../pages/Profile";
import Password from "../../pages/Profile/Password";
import Notification from "../../pages/Profile/Notification";

const auth = [
  {
    path: '/home',
    element: <Home />,
    nodeRef: createRef(),
    meta: {
      publicRoute: true,
    },
  },
  {
    path: '/order-list',
    element: <OrderList />,
    nodeRef: createRef(),
    meta: {
      publicRoute: true,
    },
  },
  {
    path: '/profile',
    element: <Profile />,
    nodeRef: createRef(),
    meta: {
      publicRoute: true,
    },
  },
  {
    path: '/profile/password',
    element: <Password />,
    nodeRef: createRef(),
    meta: {
      publicRoute: true,
    },
  },
  {
    path: '/profile/notification',
    element: <Notification />,
    nodeRef: createRef(),
    meta: {
      publicRoute: true,
    },
  }
];

export default auth;
