import React from "react";
import { Navigate, Outlet } from "react-router-dom";
import { useSelector } from "react-redux";

const AdminRoutes = () => {
  const user = useSelector((state) => state.user?.userDetails?.user);
  const isAdmin = user?.role === "ADMIN";
  console.log(user, "User in AdminRoutes");

//   if (user === undefined) return <div>Loading...</div>;

  return isAdmin ? <Outlet /> : <Navigate to="/" replace />;
};

export default AdminRoutes;