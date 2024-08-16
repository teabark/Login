import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './pages/App';
import { createBrowserRouter, RouterProvider} from "react-router-dom";
import Register from './pages/Register';
import Login from './pages/Login';
import DashBoard from './pages/DashBoard';

const router = createBrowserRouter([
  {
    path: "/",
    element: <App/>,
  },
  {
    path: "/register",
    element: <Register/>,
  },
  {
    path: "/login",
    element: <Login/>,
  },
  {
    path: "/dashboard",
    element: <DashBoard/>
  }
]);


const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
    <RouterProvider router={router} />
  </React.StrictMode>
);
