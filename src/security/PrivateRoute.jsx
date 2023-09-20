import React, { Suspense, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Navigate } from 'react-router-dom';
import axios from '../../axios';
import { getAdminProfileApi } from '@api/admin';
import { setUser } from '@src/store/slice/userSlice';

function PrivateRoute({ children, route }) {

  // ** Hooks & Vars
  const userToken = localStorage.getItem('userToken');
  const user = useSelector(state => state.userSlice.user);
  const dispatch = useDispatch();

  const getUser = async () => {
    try {
      if (userToken) {
        if(!user?.email) {
          const data = await axios.get('/admin/details');
          const admin = data.data.data;
          if(admin) {
            dispatch(setUser({
              name: admin.full_name,
              email: admin.email,
              role: admin.roles
            }))
          }
        }
      }
    } catch (error) {
      return <Navigate to="/sign-in" />;
    }
  };

  // ** check user token is here or not
  useEffect(() => {
    if (userToken) {
      getUser();
    }
  }, [userToken]);

  if (route) {
    let restrictedRoute = false;
    if (route.meta) {
      restrictedRoute = route.meta.restricted;
    }

    if (!user?.email && !userToken) return <Navigate to="/sign-in" />;
  }

  return <Suspense fallback={null}>{children}</Suspense>;
}

export default PrivateRoute;
