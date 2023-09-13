import { useEffect } from 'react';
import { useLocation, useRoutes } from 'react-router-dom';

import { getRoutes } from './routes';

const Router = () => {
  const location = useLocation();

  useEffect(() => {
    window.scrollTo(0, 0);
  }, [location.pathname]);

  const allRoutes = getRoutes();

  const routes = useRoutes([...allRoutes]);

  return routes;
};

export default Router;