import { createRef } from 'react';
import SignIn from '../../pages/auth/SignIn';
import SignUp from '@src/pages/auth/SignUp';
import Verify from '@src/pages/auth/Verify';
import ResetPassword from '@src/pages/auth/ResetPassword';
import ForgetPassword from '@src/pages/auth/ForgetPassword';

const publicRoutes = [
  {
    path: '/sign-in',
    element: <SignIn />,
    nodeRef: createRef(),
    meta: {
      publicRoute: true,
      layout: 'blank',
    },
  },
  {
    path: '/sign-up',
    element: <SignUp />,
    nodeRef: createRef(),
    meta: {
      publicRoute: true,
      layout: 'blank',
    },
  },
  {
    path: '/verify',
    element: <Verify />,
    nodeRef: createRef(),
    meta: {
      publicRoute: true,
      layout: 'blank',
    },
  },
  {
    path: '/forgot-password',
    element: <ForgetPassword />,
    nodeRef: createRef(),
    meta: {
      publicRoute: true,
      layout: 'blank',
    },
  },
  {
    path: '/reset-password',
    element: <ResetPassword />,
    nodeRef: createRef(),
    meta: {
      publicRoute: true,
      layout: 'blank',
    },
  },
];

export default publicRoutes;
