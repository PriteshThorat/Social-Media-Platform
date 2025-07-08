import { Label, Button, InputBox } from '../components/index'
import { useState } from 'react';
import authService from '../service/auth';
import { useForm } from 'react-hook-form';
import { useNavigate } from 'react-router-dom';

const ForgotPassword = () => {
    const [step, setStep] = useState(1); 
    const [email, setEmail] = useState('');
    const [message, setMessage] = useState('');
    const [error, setError] = useState('');

    const navigate = useNavigate();

    const { register, handleSubmit, reset } = useForm();

    const handleEmailSubmit = async (data) => {
        setError('');
        setMessage('');
        try {
            await authService.requestOTP({ email: data.email });

            setEmail(data.email);
            setMessage('OTP sent to your email.');
            setStep(2);

            reset();
        } catch (err) {
            setError(err.message || 'Failed to send OTP. Please try again.');
        }
    };

    const handleResetSubmit = async (data) => {
        setError('');
        setMessage('');

        try {
            await authService.changePassword({
                email,
                userOTP: data.otp,
                newPassword: data.newPassword
            });

            setMessage('Password reset successful! Redirecting to login...');

            reset();
            
            navigate('/login')
        } catch (err) {
            setError(err.message || 'Failed to reset password.');
        }
    };

    return (
        <div className='flex flex-col items-center justify-center min-h-screen bg-gray-100 dark:bg-gray-900 px-4'>
            <h1 className='text-2xl sm:text-3xl font-bold text-gray-800 dark:text-gray-200 mb-4'>
                Forgot Password
            </h1>
            {step === 1 && (
                <>
                    <p className='text-gray-600 dark:text-gray-400 mb-4 text-center'>
                        Enter your registered email to receive an OTP.
                    </p>
                    <form onSubmit={handleSubmit(handleEmailSubmit)} className='w-full max-w-sm'>
                        <div className='bg-white dark:bg-gray-800 p-6 rounded-lg shadow-lg'>
                            <Label labelFor="email" text="Email" />
                            <InputBox
                                id="email"
                                placeholder="Enter your email"
                                type="email"
                                autoComplete="email"
                                {...register("email", { required: "Email is required" })}
                                className="w-full px-4 py-2 border border-gray-300 dark:border-gray-700 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                            />
                            {error && <p className="text-red-500 mt-2 text-sm">{error}</p>}
                            {message && <p className="text-green-500 mt-2 text-sm">{message}</p>}
                            <Button
                                text="Send OTP"
                                type="submit"
                                className="w-full bg-blue-600 hover:bg-blue-700 text-white font-semibold py-2 rounded-md mt-4"
                            />
                        </div>
                    </form>
                </>
            )}

            {step === 2 && (
                <>
                    <p className='text-gray-600 dark:text-gray-400 mb-4 text-center'>
                        Enter the OTP sent to <span className="font-semibold">{email}</span> and your new password.
                    </p>
                    <form onSubmit={handleSubmit(handleResetSubmit)} className='w-full max-w-sm'>
                        <div className='bg-white dark:bg-gray-800 p-6 rounded-lg shadow-lg'>
                            <Label labelFor="otp" text="OTP" />
                            <InputBox
                                id="otp"
                                placeholder="Enter OTP"
                                type="text"
                                {...register("otp", { required: "OTP is required" })}
                                className="w-full px-4 py-2 border border-gray-300 dark:border-gray-700 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                            />

                            <Label labelFor="newPassword" text="New Password" className="mt-4" />
                            <InputBox
                                id="newPassword"
                                placeholder="Enter new password"
                                type="password"
                                {...register("newPassword", { required: "New password is required" })}
                                className="w-full px-4 py-2 border border-gray-300 dark:border-gray-700 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                            />

                            {error && <p className="text-red-500 mt-2 text-sm">{error}</p>}
                            {message && <p className="text-green-500 mt-2 text-sm">{message}</p>}
                            <Button
                                text="Reset Password"
                                type="submit"
                                className="w-full bg-blue-600 hover:bg-blue-700 text-white font-semibold py-2 rounded-md mt-4"
                            />
                        </div>
                    </form>
                </>
            )}
        </div>
    );
};

export default ForgotPassword;