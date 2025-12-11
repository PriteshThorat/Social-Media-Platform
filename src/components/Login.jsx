import Label from './Label';
import InputBox from './InputBox';
import { login as authLogin, logout } from '../store/authSlice';
import { useState } from 'react';
import { useDispatch } from 'react-redux';
import authService from '../service/auth';
import { useForm } from 'react-hook-form';
import { pass } from '../store/authSlice';
import { Link, useNavigate } from 'react-router-dom';
import { Eye, EyeOff, Mail, Lock, ArrowRight } from 'lucide-react';

const Login = () => {
    const navigate = useNavigate();
    const dispatch = useDispatch();
    const { register, handleSubmit } = useForm();
    const [error, setError] = useState("");
    const [showPassword, setShowPassword] = useState(false)

    const login = async(data) => {
        dispatch(logout())
        setError("");

        const { email, password } = data
        try{
            const user = await authService.login({ email, password });

            if (user?.data?.user) {
                dispatch(authLogin(user.data.user))
                navigate("/")
            }
        }catch(error){
            if(`${error.toString()}` === "Error: VERIFY_EMAIL"){
                dispatch(pass({ email, password }))

                navigate('/verify-email')
            }

            setError(error);
        }
    }

    return (
        <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-blue-50 via-indigo-50 to-purple-50 dark:from-gray-900 dark:via-blue-900 dark:to-indigo-900 px-4 py-8">
            {/* Background decoration */}
            <div className="absolute inset-0 overflow-hidden pointer-events-none">
                <div className="absolute -top-40 -right-40 w-80 h-80 bg-gradient-to-br from-blue-400/20 to-purple-400/20 rounded-full blur-3xl"></div>
                <div className="absolute -bottom-40 -left-40 w-80 h-80 bg-gradient-to-tr from-indigo-400/20 to-pink-400/20 rounded-full blur-3xl"></div>
            </div>
      
            <div className="relative w-full max-w-md">
                {/* Welcome Section */}
                <div className="text-center mb-8">
                    <div className="inline-flex items-center justify-center w-16 h-16 bg-gradient-to-br from-blue-500 to-purple-600 rounded-2xl mb-6 shadow-lg">
                        <Lock className="w-8 h-8 text-white" />
                    </div>
                    <h1 className="text-3xl font-bold text-gray-900 dark:text-white mb-2">
                        Welcome back
                    </h1>
                    <p className="text-gray-600 dark:text-gray-400">
                        Sign in to your account to continue
                    </p>
                </div>

            {/* Form Card */}
            <div className="bg-white/70 dark:bg-gray-800/70 backdrop-blur-xl border border-white/20 dark:border-gray-700/20 rounded-2xl shadow-2xl p-8">
            <form onSubmit={handleSubmit(login)} className="space-y-6">
                {/* Email Field */}
                <div className="space-y-2">
                <Label labelFor="email" text="Email Address" />
                <div className="relative group">
                    <Mail className="absolute left-3 top-1/2 transform -translate-y-1/2 w-5 h-5 text-gray-400 group-focus-within:text-blue-500 transition-colors" />
                    <InputBox
                    id="email"
                    autoComplete="email"
                    placeholder="Enter your email address"
                    type="email"
                    className="w-full pl-11 pr-4 py-3 bg-gray-50 dark:bg-gray-700 border border-gray-200 dark:border-gray-600 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-200 placeholder-gray-400 dark:placeholder-gray-500"
                    {...register("email", {
                        required: true,
                        validate: {
                        matchPattern: (value) => (
                            /^\w+([.-]?\w+)*@\w+([.-]?\w+)*(\.\w{2,3})+$/.test(value) ||
                            "Email address must be a valid address"
                        )
                        }
                    })}
                    />
                </div>
                </div>

                {/* Password Field */}
                <div className="space-y-2">
                <Label labelFor="password" text="Password" />
                <div className="relative group">
                    <Lock className="absolute left-3 top-1/2 transform -translate-y-1/2 w-5 h-5 text-gray-400 group-focus-within:text-blue-500 transition-colors" />
                    <InputBox
                    id="password"
                    autoComplete="current-password"
                    placeholder="Enter your password"
                    type={showPassword ? "text" : "password"}
                    className="w-full pl-11 pr-12 py-3 bg-gray-50 dark:bg-gray-700 border border-gray-200 dark:border-gray-600 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-200 placeholder-gray-400 dark:placeholder-gray-500"
                    {...register("password", {
                        required: true
                    })}
                    />
                    <button
                    type="button"
                    onClick={() => setShowPassword(!showPassword)}
                    className="absolute right-3 top-1/2 transform -translate-y-1/2 w-5 h-5 text-gray-400 hover:text-gray-600 dark:hover:text-gray-300 transition-colors"
                    >
                    {showPassword ? <EyeOff className="w-5 h-5" /> : <Eye className="w-5 h-5" />}
                    </button>
                </div>
                </div>

                {/* Forgot Password Link */}
                <div className="flex justify-end">
                <Link
                    to="/forgot-password"
                    className="text-sm font-medium text-blue-600 dark:text-blue-400 hover:text-blue-500 dark:hover:text-blue-300 transition-colors"
                >
                    Forgot your password?
                </Link>
                </div>

                {/* Error Message */}
                {error && (
                <div className="p-3 bg-red-50 dark:bg-red-900/20 border border-red-200 dark:border-red-800 rounded-lg">
                    <p className="text-red-600 dark:text-red-400 text-sm">{error.toString().replace(/:.*?:/, ":")}</p>
                </div>
                )}

                {/* Submit Button */}
                <button
                type="submit"
                className="w-full bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 text-white font-semibold py-3 px-4 rounded-xl transition-all duration-200 shadow-lg hover:shadow-xl transform hover:scale-[1.02] flex items-center justify-center space-x-2 group"
                >
                <span>Sign In</span>
                <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
                </button>
            </form>

            {/* Sign Up Link */}
            <div className="mt-8 text-center">
                <p className="text-gray-600 dark:text-gray-400 text-sm">
                Don't have an account?{' '}
                <Link
                    to="/signup"
                    className="font-semibold text-blue-600 dark:text-blue-400 hover:text-blue-500 dark:hover:text-blue-300 transition-colors"
                >
                    Create one here
                </Link>
                </p>
            </div>
            </div>

            {/* Security Badge */}
            <div className="mt-6 text-center">
                <div className="inline-flex items-center space-x-1 text-xs text-gray-500 dark:text-gray-400">
                    <Lock className="w-3 h-3" />
                    <span>Your information is secure and encrypted</span>
                </div>
            </div>
            </div>
        </div>
    );
};

export default Login;