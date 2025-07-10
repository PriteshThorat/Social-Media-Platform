import { Logo, ThemeBtn } from './index'
import { useSelector } from 'react-redux'
import { useState } from 'react'
import { IoSettings } from "react-icons/io5"
import { logout } from '../store/authSlice'
import { useDispatch } from 'react-redux'
import { useNavigate, useLocation } from 'react-router-dom'
import authService from '../service/auth';

const Header = () => {
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const location = useLocation();

    const [open, setOpen] = useState(false)

    const status = useSelector(state => state.auth.status);

    const logoutSession = async(e) => {
        e.preventDefault()
        
        try {
            await authService.logout()

            dispatch(logout())
            navigate('/login')
        } catch (error) {
            console.log(error)
        } finally {
            setOpen(false)
        }
    };

    return (
        <div className='flex items-center justify-between px-4 sm:px-6 py-3 bg-gradient-to-r bg-white dark:bg-[#1A1C22] transition-all duration-300 relative'>
            <Logo/>
            <div className='flex items-center space-x-4'>
                <ThemeBtn />
                {
                    status && (
                        <button 
                            onClick={() => setOpen(!open)}
                            aria-label="Settings"
                            className="p-2 rounded-full transition hover:bg-gray-100 dark:hover:bg-gray-800 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 dark:focus:ring-indigo-400 text-gray-700 dark:text-gray-200">
                            <IoSettings size={22}/>
                        </button>
                    )
                }
                {
                    open && (
                        <div className="absolute right-4 top-14 w-52 border border-gray-200 dark:border-gray-700 bg-[#FD7014] dark:bg-[#580EF6] rounded-lg shadow-xl z-50 overflow-hidden animate-fade-in">
                            {
                                location.pathname !== '/change-avatar' && (
                                    <p
                                        onClick={() => {
                                            setOpen(false)
                                            navigate('/change-avatar')
                                        }}
                                        className="px-4 py-2 cursor-pointer hover:bg-gray-100 dark:hover:bg-gray-700 transition-colors" >
                                        Change Profile Picture
                                    </p>
                                )
                            }
                            <p
                                onClick={logoutSession}
                                className="px-4 py-2 cursor-pointer hover:bg-gray-100 dark:hover:bg-gray-700 transition-colors" >
                                Logout
                            </p>
                        </div>
                    )
                }
            </div>
        </div>
    )
};

export default Header;