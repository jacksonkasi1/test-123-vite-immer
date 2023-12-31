// ** React Imports
import { Fragment } from 'react';
import { useLocation } from 'react-router-dom';

// ** Route Components
import PublicRoute from '../../security/PublicRoute';

import PrivateRoute from '../../security/PrivateRoute';

// ** import Route Pages
import { isObjEmpty } from '../../utils/index';

import publicRoutes from '../../configs/router.config/router.public';
import authRoute from '../../configs/router.config';

// ** Layouts
import BlankLayout from '../../layouts/BlankLayout';
import VerticalLayout from '../../layouts/VerticalLayout';

// ** import the animation library
import { CSSTransition, SwitchTransition } from 'react-transition-group';


const getLayout = {
  blank: <BlankLayout />,
  vertical: <VerticalLayout />,
};

// ** Merge Routes
const Routes = [...authRoute, ...publicRoutes];

const getRouteMeta = (route) => {
  if (isObjEmpty(route.element.props)) {
    if (route.meta) {
      return { routeMeta: route.meta };
    }
    return {};
  }
};

// ** Return Filtered Array of Routes & Paths
const MergeLayoutRoutes = (layout, defaultLayout) => {
  const location = useLocation();
  const { nodeRef } =
    Routes.find((route) => route.path === location.pathname) ?? {};
  const LayoutRoutes = [];

  if (Routes) {
    Routes.filter((route) => {
      let isBlank = false;
      // ** Checks if Route layout or Default layout matches current layout
      if (
        (route.meta && route.meta.layout && route.meta.layout === layout) ||
        ((route.meta === undefined || route.meta.layout === undefined) &&
          defaultLayout === layout)
      ) {
        let RouteTag = PrivateRoute;

        // ** Check for public or private route
        if (route.meta) {
          route.meta?.layout === 'blank' ? (isBlank = true) : (isBlank = false);
          RouteTag = route.meta?.publicRoute ? PublicRoute : PrivateRoute;
        //   : PrivateRoute
        }
        if (route.element) {
          const Wrapper =
            // eslint-disable-next-line multiline-ternary
            isObjEmpty(route.element.props) && isBlank === false
              ? // eslint-disable-next-line multiline-ternary
                Fragment
              : Fragment;

          route.element = (
            <Wrapper {...(isBlank === false ? getRouteMeta(route) : {})}>
              <SwitchTransition>
                <CSSTransition
                  key={location.pathname}
                  nodeRef={nodeRef}
                  timeout={300}
                  classNames="page"
                  unmountOnExit
                >
                  <RouteTag route={route}>
                    <div ref={nodeRef}>{route.element}</div>
                  </RouteTag>
                </CSSTransition>
              </SwitchTransition>
            </Wrapper>
          );
        }

        // Push route to LayoutRoutes
        LayoutRoutes.push(route);
      }
      return LayoutRoutes;
    });
  }
  return LayoutRoutes;
};

const getRoutes = () => {
  const defaultLayout = 'vertical';
  const layouts = ['vertical', 'blank'];

  const AllRoutes = [];

  layouts.forEach((layoutItem) => {
    const LayoutRoutes = MergeLayoutRoutes(layoutItem, defaultLayout);

    AllRoutes.push({
      path: '/',
      element: getLayout[layoutItem] || getLayout[defaultLayout],
      children: LayoutRoutes,
    });
  });
  return AllRoutes;
};

export { Routes, getRoutes };
