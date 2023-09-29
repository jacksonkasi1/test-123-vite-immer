import { createRef } from "react";
import SignIn from "../../pages/auth/SignIn";
import SignUp from "@src/pages/auth/SignUp";
import Verify from "@src/pages/auth/Verify";

const publicRoutes = [
    {
        path: '/sign-in',
        element: <SignIn />,
        nodeRef: createRef(),
        meta: {
          publicRoute: true,
          layout: 'blank'
        },
      },
      {
        path: '/sign-up',
        element: <SignUp />,
        nodeRef: createRef(),
        meta: {
          publicRoute: true,
          layout: 'blank'
        },
      },
      {
        path: '/verify',
        element: <Verify/>,
        nodeRef: createRef(),
        meta: {
          publicRoute: true,
          layout: 'blank'
        },
      }
    ]

export default publicRoutes;
