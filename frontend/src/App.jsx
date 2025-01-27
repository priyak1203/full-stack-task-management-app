import { createBrowserRouter, RouterProvider } from 'react-router-dom';
import {
  Cart,
  DashboardLayout,
  HomeLayout,
  Landing,
  Login,
  MenuItems,
  Register,
} from './pages';

const router = createBrowserRouter([
  {
    path: '/',
    element: <HomeLayout />,
    children: [
      {
        index: true,
        element: <Landing />,
      },
      {
        path: 'login',
        element: <Login />,
      },
      {
        path: 'register',
        element: <Register />,
      },
      {
        path: 'dashboard',
        element: <DashboardLayout />,
        children: [
          { index: true, element: <MenuItems /> },
          {
            path: 'cart',
            element: <Cart />,
          },
        ],
      },
    ],
  },
]);

function App() {
  return (
    <>
      <RouterProvider router={router} />
    </>
  );
}

export default App;
