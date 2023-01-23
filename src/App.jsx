import React from 'react';
import {
  createBrowserRouter,
  Navigate,
  RouterProvider,
} from "react-router-dom";
import DashboardScreen from './components/DashboardScreen/DashboardScreen';
import LoginScreen from './components/LoginScreen/LoginScreen';
import RegisterScreen from './components/RegisterScreen/RegisterScreen';
import InventoryScreen from './components/InventoryScreen/InventoryScreen';
import AddBookScreen from './components/AddBookScreen/AddBookScreen';
import { useSelector } from 'react-redux';
import EditBookScreen from './components/EditBookScreen/EditBookScreen';

function App() {

  const state_token = useSelector((state) => state.auth.token);
  const state_token_val = JSON.stringify(state_token);
  
  const token = localStorage.getItem('@jwt-token');

  const router = createBrowserRouter([
    {
      path: "/dashboard",
      element: state_token_val !== null ? <DashboardScreen /> : <Navigate to='/login' replace />
    },
    {
      path: "/inventory",
      element: token ? <InventoryScreen /> : <Navigate to='/login' replace />
    },
    {
      path: "/addBook",
      element: token ? <AddBookScreen /> : <Navigate to='/login' replace />
    },
    {
      path: "/editBook",
      element: token ? <EditBookScreen /> : <Navigate to='/login' replace />
    },
    {
      path: "/login",
      element: <LoginScreen />
    },
    {
      path: "/register",
      element: <RegisterScreen />
    },
    {
      path: "/",
      element: <RegisterScreen />
    },
  ]);

  return (
    <RouterProvider router={router}>
    </RouterProvider>
  )
}

export default App
