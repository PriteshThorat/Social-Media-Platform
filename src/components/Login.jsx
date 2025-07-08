import Label from './Label';
import Button from './Button';
import InputBox from './InputBox';
import { login as authLogin } from '../store/authSlice';
import { useState } from 'react';
import { useDispatch } from 'react-redux';
import authService from '../service/auth';
import { useForm } from 'react-hook-form';
import { Link, useNavigate } from 'react-router-dom';

const Login = () => {
    const navigate = useNavigate();
    const dispatch = useDispatch();
    const { register, handleSubmit } = useForm();
    const [error, setError] = useState("");

    const login = async(data) => {
        setError("");

        try{
            const { email, password } = data
           
            const user = await authService.login({ email, password });

            if(user){
                dispatch(authLogin(user));

                navigate("/");
            }
        }catch(error){
            setError(error.message);
        }
    }

    return (
        <>
            <div className='flex flex-col items-center justify-center min-h-screen bg-gray-100 dark:bg-gray-900 px-4'>
                <h1 
                className='text-xl sm:text-2xl md:text-4xl font-extrabold text-gray-800 dark:text-gray-200 mb-4 tracking-wide text-center' >
                    Get Started
                </h1>
                <p 
                className='mb-6 text-gray-600 dark:text-gray-400 text-sm sm:text-lg text-center'>
                    Not Created Account yet?   
                    <Link
                    to="/signup"
                    className='text-blue-500 dark:text-blue-400 font-semibold hover:underline cursor-pointer'>
                        Sign up
                    </Link>
                </p>
                <form
                onSubmit={handleSubmit(login)}
                className='w-full max-w-sm' >
                    <div className='bg-white dark:bg-gray-800 p-6 rounded-lg shadow-lg'>
                        <Label 
                        labelFor="email"
                        text="Email"
                        fontSize="20px" />
                        <InputBox
                        id="email"
                        autocomplete="email"
                        placeholder="Enter your Email"
                        height='20px'
                        width='20px'
                        type="email"
                        className="w-full px-4 py-2 border border-gray-300 dark:border-gray-700 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-all"
                        {
                            ...register("email", {
                                required: true,
                                validate: {
                                    matchPattern: (value) => (
                                        (/^\w+([.-]?\w+)*@\w+([.-]?\w+)*(\.\w{2,3})+$/.test(value))
                                        ||
                                        "Email address must be a valid address"
                                    )
                                }
                            })
                        } />
                        <Label 
                        labelFor="password"
                        text="Password"
                        fontSize="20px" />
                        <InputBox
                        id="password"
                        autocomplete="current-password"
                        placeholder="Enter your Password"
                        height='20px'
                        width='20px'
                        type="password"
                        className="w-full px-4 py-2 border border-gray-300 dark:border-gray-700 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-all"
                        {
                            ...register("password", {
                                required: true
                            })
                        } />
                         <div className="text-right mt-2 mb-4">
                            <Link
                                to="/forgot-password"
                                className="text-sm text-blue-500 dark:text-blue-400 hover:underline" >
                                Forgot Password?
                            </Link>
                        </div>
                        {error && <p className="text-red-500 mt-2 text-sm">{error}</p>}
                        <Button
                        text="Log in"
                        height="20px"
                        width="20px"
                        className="w-full bg-blue-600 hover:bg-blue-700 dark:bg-blue-500 dark:hover:bg-blue-600 text-white font-semibold py-2 rounded-md transition duration-300 shadow-md"
                        type="submit" />
                    </div>
                </form>
            </div>
        </>
    );
};

export default Login;