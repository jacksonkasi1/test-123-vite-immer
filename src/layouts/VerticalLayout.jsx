// ** React Imports
import { useState, useEffect } from 'react';
import { Outlet, useLocation } from 'react-router-dom';
import { Routes as metaData } from '../Router/routes';
import Sidebar from '../components/template/Sidebar';
import Header from '../components/template/Header';
import { useSelector } from 'react-redux';

// ** import components
// import Navbar from '@components/Navbar';

function VerticalLayout() {
  // ** get location
  const location = useLocation(); // it's really important for get updated metaData

  const themeConfig = useSelector((state) => state.themeConfigs);

  // ** States
  const [meta, setMeta] = useState({});

  const handleSetMeta = () => {
    const matchedItems = metaData.filter(
      (item) => location.pathname === item.path,
    );
    if (matchedItems.length > 0) {
      const { meta } = matchedItems[0];
      setMeta(meta);
    } else {
      setMeta({}); // or set it to some default value
    }
  };

  //* * ComponentDidMount
  useEffect(() => {
    handleSetMeta();
  }, [location]);

  return (
    <div className="">
      {(meta?.layout !== 'blank' || meta?.layout === undefined) && meta && (
        <div>
          {meta?.isNotSidebar === true ? null : <Sidebar />}
          {meta?.isNotHeader === true ? null : <Header className={`transition-all duration-300 ${!meta?.isNotSidebar ? `${themeConfig.minimized ? 'left-[5%] w-[95%]' : 'left-[15%] w-[85%]'}` : 'left-0 w-full'}`} />}
          <div className={`transition-all duration-300 dark:bg-light_dark_ min-h-[93vh] ${!meta?.isNotSidebar ? `mt-0 ${themeConfig.minimized ? 'ml-[5%] w-[95%]' : 'ml-[15%] w-[85%]'}` : 'w-full'} ${!meta?.isNotHeader && 'mt-[3.5%]'}`}>
            <Outlet />
          </div>
          {/* {meta?.isNotFooter === true ? null : <Footer />} */}
        </div>
      )}
    </div>
  );
}

export default VerticalLayout;
