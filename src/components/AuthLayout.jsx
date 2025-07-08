import { useEffect, useState } from 'react';
import { Outlet, useNavigate } from 'react-router-dom';
import { useSelector } from 'react-redux';
import auth from '../service/auth'
import { useDispatch } from 'react-redux';
import { login } from '../store/authSlice';

const AuthLayout = ({ authentication = true }) => {
    const navigate = useNavigate()
    const dispatch = useDispatch()

    const [isLoading, setIsLoading] = useState(true);

    const authStatus = useSelector(state => state.auth.status);

    useEffect(() => {
        (async() => {
            try {
                const user = await auth.getCurrentUser()

                if(user)
                    dispatch(login(user));
            } catch (error) {
                console.log(error)
            }
        })()
    }, [])

    useEffect(() => {
        if (authentication && !authStatus) {
            navigate('/login', { replace: true });
        } else if (!authentication && authStatus) {
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