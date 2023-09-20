import React, { Suspense, useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Navigate } from 'react-router-dom';
import axios from '../../axios';
import { getAdminProfileApi } from '@api/admin';
import { setUser } from '@src/store/slice/userSlice';
import Spinner from '@src/components/ui/Spinner';

function PrivateRoute({ children, route }) {
  // ** Hooks & Vars
  const userToken = localStorage.getItem('userToken');
  const user = useSelector((state) => state.userSlice.user);
  const dispatch = useDispatch();
  const [loader, setLoader] = useState(false);

  const getUser = async () => {
    try {
      if (userToken) {
        if (!user?.email) {
          setLoader(true)
          const data = await axios.get('/admin/details');
          setLoader(false)
          const admin = data.data.data;
          if (admin) {
            dispatch(
              setUser({
                name: admin.full_name,
                email: admin.email,
                role: admin.roles,
              }),
            );
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

  return (
    <>
      {loader && (
        <div style={{zIndex: 99999999}} className="fixed left-0 top-0 w-full h-full bg-[#00000028] justify-center flex items-center">
          <Spinner size={50} />
        </div>
      )}
      <Suspense fallback={null}>{children}</Suspense>
    </>
  );
}

export default PrivateRoute;
