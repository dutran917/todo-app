import React from "react";
import { RootStateOrAny, useSelector } from "react-redux";
import { Redirect } from "react-router-dom";
import { Route } from "react-router-dom";

interface ProtectedRouteProps {
    isAuthRoute: Boolean;
    isProtectedRoute: Boolean;
    path: string;
    Component: any;
}
const ProtectedRoute = ({
    isAuthRoute,
    isProtectedRoute,
    Component,
    path,
}: ProtectedRouteProps) => {
    const isAuth = useSelector((state: RootStateOrAny) => state.auth);
    return (
        <Route
            path={path}
            render={(props) => {
                if (isAuth && isAuthRoute) {
                    return <Redirect to="/"></Redirect>;
                }
                if (!isAuth && isProtectedRoute) {
                    return <Redirect to="/login"></Redirect>;
                }
                return <Component {...props}></Component>;
            }}
        ></Route>
    );
};

export default ProtectedRoute;
