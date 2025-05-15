import { createBrowserRouter } from "react-router-dom";
import React from "react";
import { App } from "../App";
import { Home } from "../pages/Home";
import { SearchPage } from "../pages/SearchPage";
import { Register } from "../pages/Register";
import { Login } from "../pages/Login";
import { ForgotPassword } from "../pages/ForgotPassword";
import { OtpVerification } from "../pages/OtpVerification";
import { ResetPassword } from "../pages/ResetPassword";
import Category from "../pages/Category";
import AdminRoutes from "../components/AdminRoutes";
import AdminDashboard from "../pages/AdminDashboard";


const router = createBrowserRouter([
  {
    path: "/",
    element: <App />,
    children: [
      { path: "", element: <Home /> },
      { path: "search", element: <SearchPage /> },
      { path: "login", element: <Login /> },
      { path: "register", element: <Register /> },
      { path: "forgotpassword", element: <ForgotPassword /> },
      { path: "verifyotp", element: <OtpVerification /> },
      { path: "resetpassword", element: <ResetPassword /> },
      { 
        path: "admin",
        element: <AdminRoutes />, 
        children: [
          { path: "", element: <AdminDashboard /> },
          { path: "category", element: <Category /> },
        ],
      }
    ],
  }
]);

export default router;
