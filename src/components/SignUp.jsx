import Label from './Label';
import Button from './Button';
import InputBox from './InputBox';
import { useNavigate, Link } from 'react-router-dom';
import { useForm } from 'react-hook-form';
import { useState } from 'react';
import { login as authLogin } from '../store/authSlice';
import authService from '../appwrite/auth';
import { useDispatch } from 'react-redux';

const SignUp = ({}) => {
    const { register, handleSubmit } = useForm();
    const [error, setError] = useState("");
    const dispatch = useDispatch();
    const navigate = useNavigate();

    const signup = async(data) => {
        setError("");

        try{
            const account = await authService.createAccount(data);

            console.log(account);
            if(account){
                const userData = await authService.getCurrentUser();

                console.log(userData);
                if(userData){
                    dispatch(authLogin(userData));

                    localStorage.setItem("userData", JSON.stringify(userData));
                    navigate("/adddp");
                }
            }
        }catch(error){
            setError(error.message);
        }
    };

    return (
        <>
            <div className='flex flex-col items-center justify-center min-h-screen bg-gray-100 dark:bg-gray-900 px-4'>
                <h1 
                className='text-xl sm:text-2xl md:text-4xl font-extrabold text-gray-800 dark:text-gray-200 mb-4 tracking-wide text-center' >
                    Create Account
                </h1>
                <p 
                className='mb-6 text-gray-600 dark:text-gray-400 text-sm sm:text-lg text-center'>
                    Already have an account? 
                    <Link
                    to="/login"
                    className='text-blue-500 dark:text-blue-400 font-semibold hover:underline cursor-pointer'>
                        Sign in
                    </Link>
                </p>
                <form 
                className="w-full max-w-sm"
                onSubmit={handleSubmit(signup)}>
                    <div className='bg-white dark:bg-gray-800 p-6 rounded-lg shadow-lg'>
                        <Label 
                        text="Enter Name"
                        fontSize="20px" />
                        <InputBox
                        placeholder="Enter your Name"
                        height='20px'
                        width='20px'
                        type="text"
                        className="w-full px-4 py-2 border border-gray-300 dark:border-gray-700 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-all"
                        {
                            ...register("name", {
                                required: true
                            })
                        } />
                        <Label 
                        text="Email"
                        fontSize="20px" />
                        <InputBox
                        placeholder="Enter your Email"
                        height='20px'
                        width='20px'
                        type="email"
                        className="w-full px-4 py-2 border border-gray-300 dark:border-gray-700 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-all"
                        {
                            ...register("email", {
                                required: true,
                                validate: {
                                    matchPattern: (value) => {
                                        (/^\w+([.-]?\w+)*@\w+([.-]?\w+)*(\.\w{2,3})+$/.test(value))
                                        ||
                                        "Email address must be a valid address"
                                    }
                                }
                            })
                        } />
                        <Label 
                        text="Password"
                        fontSize="20px" />
                        <InputBox
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
                        <Button
                        type="submit"
                        text="Sign up"
                        height="20px"
                        width="20px"
                        className="w-full bg-blue-600 hover:bg-blue-700 dark:bg-blue-500 dark:hover:bg-blue-600 text-white font-semibold py-2 rounded-md transition duration-300 shadow-md" />
                    </div>
                </form>
            </div>
        </>
    );
};

export default SignUp;