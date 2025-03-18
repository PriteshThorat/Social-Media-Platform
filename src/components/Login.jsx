import Label from './Label';
import Button from './Button';
import InputBox from './InputBox';
import { useState } from 'react';
import { Link, useNavigator } from 'react-router-dom';

const Login = () => {
    return (
        <>
            <div className='flex flex-col items-center justify-center min-h-screen bg-gray-100'>
                <h1 
                className='text-4xl font-extrabold text-gray-800 mb-4 tracking-wide' >
                    Get Started
                </h1>
                <p 
                className='mb-6 text-gray-600 text-lg'>
                    Not Created Account yet?   
                    <a
                    className='text-blue-500 font-semibold hover:underline cursor-pointer'>
                        Sign up
                    </a>
                </p>
                <div className='w-full max-w-xs bg-white p-6 rounded-lg shadow-lg'>
                    <Label 
                    text="Email"
                    fontSize="20px" />
                    <InputBox
                    placeholder="Enter your Email"
                    height='20px'
                    width='20px'
                    type="email"
                    className="" />
                    <Label 
                    text="Password"
                    fontSize="20px" />
                    <InputBox
                    placeholder="Enter your Password"
                    height='20px'
                    width='20px'
                    type="password"
                    className="" />
                    <Button
                    text="Log in"
                    height="20px"
                    width="20px"
                    className="" />
                </div>
            </div>
        </>
    );
};

export default Login;