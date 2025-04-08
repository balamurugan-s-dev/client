import React, { useState, useEffect } from "react";
import { Navigate } from "react-router-dom";
import { checkAuthStatus } from "../authenticator/Auth";

const ProtectedRoute = ({ element }) => {
    const [auth, setAuth] = useState(null);
    const [admin, setAdmin] = useState(false);

    useEffect(() => {
        const checkUserAuth = async () => {
            const data = await checkAuthStatus();
            if (data.userId) {
                setAuth(true);
                setAdmin(data.isAdmin || false);
            } else {
                setAuth(false);
            }
        };

        checkUserAuth();
    }, []);

    if (auth === null) return <div><span className="loading loading-spinner loading-xl"></span></div>;

    return auth ? React.cloneElement(element, { admin }) : <Navigate to="/" />;
};

export default ProtectedRoute;
