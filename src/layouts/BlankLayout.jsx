// ** React Imports
import { Outlet } from 'react-router-dom';

function BlankLayout() {
  return (
    <div className="w-full max-w-[100vw] md:max-w-4xl mx-auto h-auto p-4 ">
      <Outlet />
    </div>
  );
}

export default BlankLayout;
