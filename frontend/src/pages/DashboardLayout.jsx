import { Outlet } from 'react-router-dom';

function DashboardLayout() {
  return (
    <>
      <header>Navbar</header>
      <Outlet />
    </>
  );
}

export default DashboardLayout;
