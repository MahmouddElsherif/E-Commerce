import React from 'react'
import { RouterProvider, createBrowserRouter } from 'react-router-dom'
import Layout from './Components/Layout/Layout'
import Register from './Components/Register/Register'
import Login from './Components/Login/Login'
import Products from './Components/Products/Products'
import Categories from './Components/Categories/Categories'
import Cart from './Components/Cart/Cart'
import NotFound from './Components/NotFound/NotFound'
import { AuthContextProvider, AuthData } from './Context/AuthContext'
import ProtectedRoute from './Components/Guard/Guard'
import ProductDetails from './Components/ProductDetails/ProductDetails'
import { QueryClient, QueryClientProvider } from 'react-query'
import Brands from './Components/Brands/Brands'
import CartContextProvider from './Context/CartContext'
import { Toast } from 'bootstrap'
import { Toaster } from 'react-hot-toast'

const myRouter = createBrowserRouter([
  {path:  '/', element: <Layout /> , children:[
    { index: true, element:  <Register />} ,
    { path: 'register'  , element: <Register />} ,
    { path: 'login'  , element: <Login />} ,
    { path: 'ProductDetails/:id'  , element: <ProductDetails />} ,
    { path: 'Products'  , element: <ProtectedRoute > 
      < Products />
    </ProtectedRoute>} ,
  //   { path: 'ProductDetials ' , element: <ProtectedRoute > 
  //   < ProductDetails />
  // </ProtectedRoute>} ,
    { path: 'categories'  , element: <ProtectedRoute > 
      < Categories />
    </ProtectedRoute>} ,
    { path: 'Brands'  , element: <ProtectedRoute > 
    < Brands />
  </ProtectedRoute>} ,
    { path: 'cart'  , element: <ProtectedRoute > 
      < Cart />
    </ProtectedRoute>} ,
    { path: '*'  , element: <NotFound />} ,
  ]}
])

export default function App() {

  const myClient = new QueryClient()

  return <>

  <QueryClientProvider client={ myClient }>

    <AuthContextProvider>
    <CartContextProvider >
      <RouterProvider router={ myRouter } />

    </CartContextProvider>

    </AuthContextProvider>
  </QueryClientProvider>
  


  <Toaster /> 
  
  
  
  
  
  </>
}
