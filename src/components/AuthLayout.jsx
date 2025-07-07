/*import { useState, useEffect } from 'react';
import { useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';

const AuthLayout = ({children, authentication=true}) => {
    const navigate = useNavigate();
    const [loader, setLoader] = useState(true);
    const authStatus = useSelector(state => state.auth.status);

    useEffect(() => {
        if(authentication && authStatus !== authentication){
            navigate("/login");
        }else if(!authentication && authStatus !== authentication){
            navigate("/adddp");
        }

        setLoader(false);
    }, [authStatus, navigate, authentication]);

    return loader ? (
        <h1>Loading...</h1>
    ) : (
        <>{children}</>
    );
};

export default AuthLayout;*/

import { useEffect, useState } from 'react';
import { Outlet, useNavigate } from 'react-router-dom';
import { useSelector } from 'react-redux';

const AuthLayout = ({ authentication = true }) => {
    const navigate = useNavigate();
    const [isLoading, setIsLoading] = useState(true);

    const authStatus = useSelector(state => state.auth.status);

    useEffect(() => {
        if (authentication && !authStatus) {
            // Protected page, but not logged in -> redirect to login
            navigate('/login', { replace: true });
        } else if (!authentication && authStatus) {
            // Public page, but logged in -> redirect to /adddp or home
            navigate('/adddp', { replace: true });
        } else {
            setIsLoading(false);
        }
    }, [authStatus, navigate, authentication]);

    if (isLoading) {
        return (
            <div className="flex items-center justify-center min-h-screen">
                <h1 className="text-xl font-semibold">Loading...</h1>
            </div>
        );
    }

    return <Outlet />;
};

export default AuthLayout;