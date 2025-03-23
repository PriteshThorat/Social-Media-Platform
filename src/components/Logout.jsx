import { Button } from './index';
import { logout } from '../store/authSlice';
import { useDispatch } from 'react-redux';
import authService from '../appwrite/auth';
import { useNavigate } from 'react-router-dom';

const Logout = () => {
    const dispatch = useDispatch();
    const navigate = useNavigate();

    const logoutSession = (e) => {
        e.preventDefault();

        authService.logout().then(() => {
            dispatch(logout());
            navigate('/login');
        });

        localStorage.removeItem("fileCode"); 
        localStorage.removeItem("userData"); 
    };

    return (
        <form 
        className='ml-auto'
        onSubmit={logoutSession}>
            <Button 
            text="Logout" 
            className='bg-red-500 dark:bg-red-600 text-white py-2 px-4 rounded-md hover:bg-red-600 dark:hover:bg-red-700 transition duration-300 shadow-md' 
            type="submit"/>
        </form>
    );
};

export default Logout;