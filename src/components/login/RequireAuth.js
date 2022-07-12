import React from "react";
import { Navigate, Outlet, useLocation } from "react-router-dom";
import useAuth from "../../hooks/useAuth";

function RequireAuth() {
  const location = useLocation();
  const { auth } = useAuth();
  //console.log('reqauth',location);
  return auth?.authed ? (
    <Outlet />
  ) : (
    <Navigate to="/login" state={{ from: location }} replace={true} />
  );
}

export default RequireAuth;
