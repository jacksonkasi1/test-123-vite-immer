import { createRef } from "react";
import Home from "../../pages/Home";

const AuthRoutes = [
  {
    path: '/',
    element: <Home />,
    nodeRef: createRef(),
    meta: {
      publicRoute: true,
    },
  },
];

export default AuthRoutes;
