import React, { Suspense, useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Navigate } from 'react-router-dom';
import axios from '../../axios';
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
      console.log("In private route............................")
      if (userToken) {
        if (!user?.email) {
          setLoader(true);
          axios
            .get('/admin/details')
            .then((data) => {
              if (data.data.success) {
                if (data.data.data?.email) {
                  dispatch(
                    setUser({
                      name: data.data.data.full_name,
                      email: data.data.data.email,
                      role: data.data.data.roles,
                      phone: data.data.data.mobile,
                      avatar:data?.data?.data?.profile_pic
                    }),
                  );
                }
              }
            })
            .finally(() => setLoader(false));
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

  const [progress, setProgress] = useState(true);

  useEffect(() => {
    const element = document.querySelectorAll('.loader');
    if (element.length > 1) {
      setProgress(false);
    }
  });

  console.log(progress);

  return (
    <>
      {loader && (
        <div
          style={{ zIndex: 99999999 }}
          className="fixed left-0 top-0 w-full h-full bg-[#00000028] justify-center flex items-center loader"
        >
          <Spinner size={50} />
        </div>
      )}
      <Suspense fallback={null}>{children}</Suspense>
    </>
  );
}

export default PrivateRoute;
