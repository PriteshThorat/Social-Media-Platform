import { VerifyOTP as Verify } from "../components/index";
import { Shield, ArrowLeft, CheckCircle } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import { useSelector } from 'react-redux';

const VerifyOTP = () => {
    const navigate = useNavigate();
    const user = useSelector(state => state.auth.temp);

    return (
        <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-blue-50 via-purple-50 to-pink-50 dark:from-gray-900 dark:via-blue-900 dark:to-purple-900 px-4 py-8">
            {/* Background decoration */}
            <div className="absolute inset-0 overflow-hidden pointer-events-none">
                <div className="absolute -top-40 -right-40 w-80 h-80 bg-gradient-to-br from-blue-400/20 to-purple-400/20 rounded-full blur-3xl"></div>
                <div className="absolute -bottom-40 -left-40 w-80 h-80 bg-gradient-to-tr from-purple-400/20 to-pink-400/20 rounded-full blur-3xl"></div>
            </div>
            
            <div className="relative w-full max-w-md">
                {/* Header Section */}
                <div className="text-center mb-8">
                    <div className="inline-flex items-center justify-center w-16 h-16 bg-gradient-to-br from-blue-500 to-purple-600 rounded-2xl mb-6 shadow-lg">
                        <Shield className="w-8 h-8 text-white" />
                    </div>
                    <h1 className="text-3xl font-bold text-gray-900 dark:text-white mb-2">
                        Email Verification
                    </h1>
                    <p className="text-gray-600 dark:text-gray-400">
                        Complete your account setup by verifying your email
                    </p>
                </div>

                {/* Progress Indicator */}
                <div className="flex items-center justify-center mb-8">
                    <div className="flex items-center space-x-4">
                        {/* Step 1 - Account Created */}
                        <div className="flex items-center">
                            <div className="w-10 h-10 rounded-full flex items-center justify-center bg-gradient-to-r from-green-500 to-blue-600 text-white shadow-lg">
                                <CheckCircle className="w-5 h-5" />
                            </div>
                            <span className="ml-2 text-sm font-medium text-gray-900 dark:text-white">
                                Signed Up
                            </span>
                        </div>

                        {/* Connector */}
                        <div className="w-8 h-px bg-blue-500"></div>

                        {/* Step 2 - Verification */}
                        <div className="flex items-center">
                            <div className="w-10 h-10 rounded-full flex items-center justify-center font-semibold text-sm bg-gradient-to-r from-blue-500 to-purple-600 text-white shadow-lg animate-pulse">
                                2
                            </div>
                            <span className="ml-2 text-sm font-medium text-gray-900 dark:text-white">
                                Verify Email
                            </span>
                        </div>
                    </div>
                </div>

                {/* Verification Card */}
                <div className="bg-white/70 dark:bg-gray-800/70 backdrop-blur-xl border border-white/20 dark:border-gray-700/20 rounded-2xl shadow-2xl p-8">
                    {/* Email Info */}
                    <div className="p-4 bg-blue-50 dark:bg-blue-900/20 rounded-xl border border-blue-200 dark:border-blue-800 mb-6">
                        <p className="text-sm text-blue-800 dark:text-blue-300 text-center">
                            We sent a 6-digit verification code to
                            <br />
                            <span className="font-semibold">{user?.email}</span>
                        </p>
                    </div>

                    {/* VerifyOTP Component */}
                    <Verify />

                    {/* Additional Info */}
                    <div className="mt-6 p-4 bg-gray-50 dark:bg-gray-700/50 rounded-xl">
                        <div className="flex items-start space-x-3">
                            <div className="w-5 h-5 rounded-full bg-yellow-100 dark:bg-yellow-900/30 flex items-center justify-center flex-shrink-0 mt-0.5">
                                <svg className="w-3 h-3 text-yellow-600 dark:text-yellow-400" fill="currentColor" viewBox="0 0 20 20">
                                    <path fillRule="evenodd" d="M8.257 3.099c.765-1.36 2.722-1.36 3.486 0l5.58 9.92c.75 1.334-.213 2.98-1.742 2.98H4.42c-1.53 0-2.493-1.646-1.743-2.98l5.58-9.92zM11 13a1 1 0 11-2 0 1 1 0 012 0zm-1-8a1 1 0 00-1 1v3a1 1 0 002 0V6a1 1 0 00-1-1z" clipRule="evenodd"/>
                                </svg>
                            </div>
                            <div>
                                <p className="text-sm font-medium text-gray-800 dark:text-gray-200 mb-1">
                                    Can't find the email?
                                </p>
                                <p className="text-xs text-gray-600 dark:text-gray-400">
                                    Check your spam folder or wait a few minutes for the email to arrive.
                                </p>
                            </div>
                        </div>
                    </div>
                </div>

                {/* Back to Sign Up */}
                <div className="mt-6 text-center">
                    <button
                        onClick={() => navigate('/signup')}
                        className="inline-flex items-center space-x-1 text-sm text-gray-600 dark:text-gray-400 hover:text-gray-800 dark:hover:text-gray-200 transition-colors"
                    >
                        <ArrowLeft className="w-3 h-3" />
                        <span>Back to Sign Up</span>
                    </button>
                </div>
            </div>
        </div>
    );
};

export default VerifyOTP;