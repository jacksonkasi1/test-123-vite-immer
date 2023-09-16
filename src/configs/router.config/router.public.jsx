import { createRef } from "react";
import SignIn from "../../pages/auth/SignIn";

const publicRoutes = [
    {
        path: '/sign-in',
        element: <SignIn />,
        nodeRef: createRef(),
        meta: {
          publicRoute: true,
          layout: 'blank'
        },
      }
    ]

export default publicRoutes;
