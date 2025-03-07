import React, { useContext } from "react";
import { Navigate, Outlet } from "react-router-dom";
import { AuthContext } from "../auth/AuthContext.js";

const PrivateRoute = () => {
    const { isLoggedIn } = useContext(AuthContext);

    // if (!isLoggedIn) {
    //     alert('로그인이 필요한 접근입니다.');
    // }

    return isLoggedIn ? <Outlet /> : <Navigate to="/admin/login" />;
}

export default PrivateRoute;