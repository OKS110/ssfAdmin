import React, { useContext } from "react";
import { Navigate, Outlet } from "react-router-dom";
import { AuthContext } from "../auth/AuthContext.js";

const PrivateRoute = () => {
    const { isLoggedIn } = useContext(AuthContext);



    return isLoggedIn ? <Outlet /> : <Navigate to="/admin/login" />;
}

export default PrivateRoute;