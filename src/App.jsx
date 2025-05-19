import { createBrowserRouter, RouterProvider } from 'react-router-dom';
import Layout from './components/Layout/Layout';
import Products from './components/Products/Products';
import Login from './components/Login/Login';
import Register from './components/Register/Register';
import Brands from './components/Brands/Brands';
import Carts from './components/Carts/Carts';
import Notfound from './components/Notfound/Notfound';
import UserContextProvider from './context/userContext';
import ProtectedRoutes from './components/ProductedRoutes/ProductedRoutes';
import ProductDetails from './components/ProductDetails/ProductDetails'; // ✅ FIXED
import CartContextProvider from './context/cartContext';
import { Toaster } from 'react-hot-toast';
import Checkout from './components/Checkout/Checkout';
import AllOrders from './components/Allorders/Allorders';

let routers = createBrowserRouter([
  {
    path: '',
    element: <Layout />,
    children: [
{ path: '/', element: <ProtectedRoutes><Products /></ProtectedRoutes> },
      { path: 'login', element: <Login /> },
      { path: 'register', element: <Register /> },
      { path: 'brands', element: <ProtectedRoutes><Brands /></ProtectedRoutes> },
      { path: 'carts', element: <ProtectedRoutes><Carts /></ProtectedRoutes> },
      { path: 'productDetails/:id', element: <ProtectedRoutes><ProductDetails /></ProtectedRoutes> },
      { path: 'checkout/:cartId', element: <ProtectedRoutes><Checkout /></ProtectedRoutes> },
      {path:'AllOrders',element:<ProtectedRoutes><AllOrders/></ProtectedRoutes>},
      { path: '*', element: <Notfound /> },
    ]
  }
]);

function App() {
  return (
    <>
      <CartContextProvider>
        <UserContextProvider>
          <RouterProvider router={routers} />
          <Toaster />
        </UserContextProvider>
      </CartContextProvider>
    </>
  );
}

export default App;
