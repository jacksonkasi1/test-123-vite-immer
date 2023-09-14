import { createRef } from "react";
import Home from "../../pages/Home";
import OrderList from "../../pages/OrderList";

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
  }
];

export default auth;
