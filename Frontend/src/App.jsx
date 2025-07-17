import React from 'react'
import {createBrowserRouter, RouterProvider} from 'react-router-dom'
import Default from './Pages/Default'
import Register from './Pages/Register'
import Login from './Pages/Login'
import Home from './Pages/Home'
import { PrivateRoute, PublicRoute } from './components/RouteGuard'
import Lending from './components/Lending'
import Products from './Pages/Products'
import AddProduct from './Pages/AddProduct'
import UpdateProduct from './Pages/UpdateProduct'

const router = createBrowserRouter([
  {
    path: '/',
    element: <Default />,
    children: [
      {
        path: '/',
        element: <Lending/>
      },
      {
        path: '/home',
        element: (
          <PrivateRoute>
            <Home />
          </PrivateRoute>
        )
      },
      {
        path: '/login',
        element: (
          <PublicRoute>
            <Login />
          </PublicRoute>
        )
      },
      {
        path: '/register',
        element: (
          <PublicRoute>
            <Register />
          </PublicRoute>
        )
      },
      {
        path: '/products',
        element: (
          <PrivateRoute>
            <Products />
          </PrivateRoute>
        )
      },,
      {
        path: '/products/add',
        element: (
          <PrivateRoute>
            <AddProduct />
          </PrivateRoute>
        )
      },,
      {
        path: '/products/edit/:id',
        element: (
          <PrivateRoute>
            <UpdateProduct />
          </PrivateRoute>
        )
      },
    ]
  }
]);

function App() {
  return (
    <div>
      <RouterProvider router={router}/>
    </div>
  )
}

export default App