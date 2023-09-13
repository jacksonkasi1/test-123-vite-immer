import { createRef } from "react";
import Home from "../../pages/Home";

const auth = [
  {
    path: '/home',
    element: <Home />,
    nodeRef: createRef(),
    meta: {
      publicRoute: true,
    },
  },
];

export default auth;
