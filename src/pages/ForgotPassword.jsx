import { Label, Button, InputBox, OTPTimer } from '../components/index'
import { useState } from 'react';
import authService from '../service/auth';
import { useForm } from 'react-hook-form';
import { useNavigate } from 'react-router-dom';
import { Mail, Lock, Shield, ArrowLeft, CheckCircle, Eye, EyeOff } from 'lucide-react';

const getPasswordStrength = (password) => {
  if (!password) return { score: 0, label: '', color: '' };
  
  let score = 0;
  const checks = {
    length: password.length >= 8,
    lowercase: /[a-z]/.test(password),
    uppercase: /[A-Z]/.test(password),
    number: /\d/.test(password),
    special: /[!@#$%^&*(),.?":{}|<>]/.test(password)
  };
  
  Object.values(checks).forEach(check => check && score++);
  
  if (score <= 2) return { score, label: 'Weak', color: 'bg-red-500' };
  if (score <= 3) return { score, label: 'Fair', color: 'bg-yellow-500' };
  if (score <= 4) return { score, label: 'Good', color: 'bg-blue-500' };
  return { score, label: 'Strong', color: 'bg-green-500' };
};

const ForgotPassword = () => {
    const [showPassword, setShowPassword] = useState(false);
    const [newPassword, setNewPassword] = useState('');
    const [step, setStep] = useState(1); 
    const [email, setEmail] = useState('');
    const [message, setMessage] = useState('');
    const [error, setError] = useState('');

    const navigate = useNavigate();

    const { register, handleSubmit, reset } = useForm();

    const passwordStrength = getPasswordStrength(newPassword);

    const handleResendOTP = async() => {
        try {
            await authService.requestOTP({ email });

            console.log('Resending OTP...');
            setMessage('New OTP sent to your email');

            setTimeout(() => setMessage(''), 3000);

            reset();
        } catch (err) {
            setError(err.message || 'Failed to send OTP. Please try again.');
        }
    };

    const handleEmailSubmit = async(data) => {
        setError('');
        setMessage('');
        try {
            await authService.requestOTP({ email: data.email });

            console.log('Email submitted:', data);
            setEmail(data.email);
            setMessage('OTP sent to your email address');

            setTimeout(() => {
                setStep(2);
                setMessage('');
            }, 1500);

            reset();
        } catch (err) {
            setError(err.message || 'Failed to send OTP. Please try again.');
        }
    };

    const handleResetSubmit = async(data) => {
        setError('');
        setMessage('');

        try {
            await authService.changePassword({
                email,
                userOTP: data.otp,
                newPassword: data.newPassword
            });

            console.log('Reset submitted:', data);
            setMessage('Password reset successfully!');

            setTimeout(() => {
                // Navigate to login
                console.log('Redirecting to login...');
            }, 2000);

            reset();
            
            navigate('/login')
        } catch (err) {
            setError(err.message || 'Failed to reset password.');
        }
    };

    const goBack = () => {
        setStep(1);
        setError('');
        setMessage('');
    };

    return (
        <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-green-50 via-blue-50 to-purple-50 dark:from-gray-900 dark:via-green-900 dark:to-blue-900 px-4 py-8">
      {/* Background decoration */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className="absolute -top-40 -right-40 w-80 h-80 bg-gradient-to-br from-green-400/20 to-blue-400/20 rounded-full blur-3xl"></div>
        <div className="absolute -bottom-40 -left-40 w-80 h-80 bg-gradient-to-tr from-blue-400/20 to-purple-400/20 rounded-full blur-3xl"></div>
      </div>
      
      <div className="relative w-full max-w-md">
        {/* Header Section */}
        <div className="text-center mb-8">
          <div className="inline-flex items-center justify-center w-16 h-16 bg-gradient-to-br from-green-500 to-blue-600 rounded-2xl mb-6 shadow-lg">
            <Shield className="w-8 h-8 text-white" />
          </div>
          <h1 className="text-3xl font-bold text-gray-900 dark:text-white mb-2">
            {step === 1 ? 'Forgot Password' : 'Reset Password'}
          </h1>
          <p className="text-gray-600 dark:text-gray-400">
            {step === 1 
              ? 'Enter your email to receive a reset code' 
              : 'Enter the code and create a new password'
            }
          </p>
        </div>

        {/* Progress Indicator */}
        <div className="flex items-center justify-center mb-8">
          <div className="flex items-center space-x-4">
            {/* Step 1 */}
            <div className="flex items-center">
              <div className={`w-10 h-10 rounded-full flex items-center justify-center font-semibold text-sm transition-all duration-300 ${
                step >= 1 
                  ? 'bg-gradient-to-r from-green-500 to-blue-600 text-white shadow-lg' 
                  : 'bg-gray-200 dark:bg-gray-700 text-gray-500'
              }`}>
                {step > 1 ? <CheckCircle className="w-5 h-5" /> : '1'}
              </div>
              <span className={`ml-2 text-sm font-medium ${
                step >= 1 ? 'text-gray-900 dark:text-white' : 'text-gray-500 dark:text-gray-400'
              }`}>
                Email
              </span>
            </div>

            {/* Connector */}
            <div className={`w-8 h-px transition-colors duration-300 ${
              step > 1 ? 'bg-green-500' : 'bg-gray-300 dark:bg-gray-600'
            }`}></div>

            {/* Step 2 */}
            <div className="flex items-center">
              <div className={`w-10 h-10 rounded-full flex items-center justify-center font-semibold text-sm transition-all duration-300 ${
                step >= 2 
                  ? 'bg-gradient-to-r from-green-500 to-blue-600 text-white shadow-lg' 
                  : 'bg-gray-200 dark:bg-gray-700 text-gray-500'
              }`}>
                2
              </div>
              <span className={`ml-2 text-sm font-medium ${
                step >= 2 ? 'text-gray-900 dark:text-white' : 'text-gray-500 dark:text-gray-400'
              }`}>
                Reset
              </span>
            </div>
          </div>
        </div>

        {/* Form Card */}
        <div className="bg-white/70 dark:bg-gray-800/70 backdrop-blur-xl border border-white/20 dark:border-gray-700/20 rounded-2xl shadow-2xl p-8">
          
          {/* Step 1: Email Input */}
          {step === 1 && (
            <form onSubmit={handleSubmit(handleEmailSubmit)} className="space-y-6">
              <div className="space-y-2">
                <Label labelFor="email" text="Email Address" />
                <div className="relative group">
                  <Mail className="absolute left-3 top-1/2 transform -translate-y-1/2 w-5 h-5 text-gray-400 group-focus-within:text-green-500 transition-colors" />
                  <InputBox
                    id="email"
                    placeholder="Enter your registered email"
                    type="email"
                    autoComplete="email"
                    className="w-full pl-11 pr-4 py-3 bg-gray-50 dark:bg-gray-700 border border-gray-200 dark:border-gray-600 rounded-xl focus:outline-none focus:ring-2 focus:ring-green-500 focus:border-transparent transition-all duration-200 placeholder-gray-400 dark:placeholder-gray-500"
                    {...register("email", { required: "Email is required" })}
                  />
                </div>
              </div>

              {/* Messages */}
              {error && (
                <div className="p-3 bg-red-50 dark:bg-red-900/20 border border-red-200 dark:border-red-800 rounded-lg">
                  <p className="text-red-600 dark:text-red-400 text-sm">{error.toString()}</p>
                </div>
              )}
              {message && (
                <div className="p-3 bg-green-50 dark:bg-green-900/20 border border-green-200 dark:border-green-800 rounded-lg">
                  <p className="text-green-600 dark:text-green-400 text-sm">{message}</p>
                </div>
              )}

              <button
                type="submit"
                className="w-full bg-gradient-to-r from-green-600 to-blue-600 hover:from-green-700 hover:to-blue-700 text-white font-semibold py-3 px-4 rounded-xl transition-all duration-200 shadow-lg hover:shadow-xl transform hover:scale-[1.02] flex items-center justify-center space-x-2 group"
              >
                <Mail className="w-4 h-4" />
                <span>Send Reset Code</span>
              </button>
            </form>
          )}

          {/* Step 2: OTP and New Password */}
          {step === 2 && (
            <form onSubmit={handleSubmit(handleResetSubmit)} className="space-y-6">
              {/* Back Button */}
              <button
                onClick={goBack}
                className="flex items-center space-x-2 text-gray-600 dark:text-gray-400 hover:text-gray-800 dark:hover:text-gray-200 transition-colors"
              >
                <ArrowLeft className="w-4 h-4" />
                <span className="text-sm">Back to email</span>
              </button>

              <div className="p-4 bg-blue-50 dark:bg-blue-900/20 rounded-xl border border-blue-200 dark:border-blue-800">
                <p className="text-sm text-blue-800 dark:text-blue-300">
                  We sent a verification code to <span className="font-semibold">{email}</span>
                </p>
              </div>

              {/* OTP Input */}
              <div className="space-y-2">
                <Label labelFor="otp" text="Verification Code" />
                <div className="relative group">
                  <Shield className="absolute left-3 top-1/2 transform -translate-y-1/2 w-5 h-5 text-gray-400 group-focus-within:text-green-500 transition-colors" />
                  <InputBox
                    id="otp"
                    placeholder="Enter 6-digit code"
                    type="text"
                    maxLength="6"
                    textAlign="left"
                    className="w-full pl-11 pr-4 py-3 bg-gray-50 dark:bg-gray-700 border border-gray-200 dark:border-gray-600 rounded-xl focus:outline-none focus:ring-2 focus:ring-green-500 focus:border-transparent transition-all duration-200 placeholder-gray-400 dark:placeholder-gray-500 text-lg font-mono tracking-wider"
                    {...register("otp", { required: "OTP is required" })}
                  />
                </div>
                <OTPTimer onResend={handleResendOTP} />
              </div>

              {/* New Password Input */}
              <div className="space-y-2">
                <Label labelFor="newPassword" text="New Password" />
                <div className="relative group">
                  <Lock className="absolute left-3 top-1/2 transform -translate-y-1/2 w-5 h-5 text-gray-400 group-focus-within:text-green-500 transition-colors" />
                  <InputBox
                    id="newPassword"
                    placeholder="Create a strong password"
                    type={showPassword ? "text" : "password"}
                    className="w-full pl-11 pr-12 py-3 bg-gray-50 dark:bg-gray-700 border border-gray-200 dark:border-gray-600 rounded-xl focus:outline-none focus:ring-2 focus:ring-green-500 focus:border-transparent transition-all duration-200 placeholder-gray-400 dark:placeholder-gray-500"
                    {...register("newPassword", { required: "New password is required" })}
                    onChange={(e) => setNewPassword(e.target.value)}
                  />
                  <button
                    type="button"
                    onClick={() => setShowPassword(!showPassword)}
                    className="absolute right-3 top-1/2 transform -translate-y-1/2 w-5 h-5 text-gray-400 hover:text-gray-600 dark:hover:text-gray-300 transition-colors"
                  >
                    {showPassword ? <EyeOff className="w-5 h-5" /> : <Eye className="w-5 h-5" />}
                  </button>
                </div>
                
                {/* Password Strength Indicator */}
                {newPassword && (
                  <div className="mt-2">
                    <div className="flex items-center justify-between text-xs mb-1">
                      <span className="text-gray-600 dark:text-gray-400">Password strength:</span>
                      <span className={`font-semibold ${
                        passwordStrength.label === 'Strong' ? 'text-green-600 dark:text-green-400' :
                        passwordStrength.label === 'Good' ? 'text-blue-600 dark:text-blue-400' :
                        passwordStrength.label === 'Fair' ? 'text-yellow-600 dark:text-yellow-400' :
                        'text-red-600 dark:text-red-400'
                      }`}>
                        {passwordStrength.label}
                      </span>
                    </div>
                    <div className="w-full bg-gray-200 dark:bg-gray-600 rounded-full h-2">
                      <div 
                        className={`h-2 rounded-full transition-all duration-300 ${passwordStrength.color}`}
                        style={{ width: `${(passwordStrength.score / 5) * 100}%` }}
                      ></div>
                    </div>
                  </div>
                )}
              </div>

              {/* Messages */}
              {error && (
                <div className="p-3 bg-red-50 dark:bg-red-900/20 border border-red-200 dark:border-red-800 rounded-lg">
                  <p className="text-red-600 dark:text-red-400 text-sm">{error.toString()}</p>
                </div>
              )}
              {message && (
                <div className="p-3 bg-green-50 dark:bg-green-900/20 border border-green-200 dark:border-green-800 rounded-lg">
                  <p className="text-green-600 dark:text-green-400 text-sm">{message}</p>
                </div>
              )}

              <button
                type="submit"
                className="w-full bg-gradient-to-r from-green-600 to-blue-600 hover:from-green-700 hover:to-blue-700 text-white font-semibold py-3 px-4 rounded-xl transition-all duration-200 shadow-lg hover:shadow-xl transform hover:scale-[1.02] flex items-center justify-center space-x-2 group"
              >
                <Lock className="w-4 h-4" />
                <span>Reset Password</span>
              </button>
            </form>
          )}
        </div>

        {/* Back to Login */}
        <div className="mt-6 text-center">
          <button
            onClick={() => { navigate(-1) }}
            className="inline-flex items-center space-x-1 text-sm text-gray-600 dark:text-gray-400 hover:text-gray-800 dark:hover:text-gray-200 transition-colors"
          >
            <ArrowLeft className="w-3 h-3" />
            <span>Back to Login</span>
          </button>
        </div>
      </div>
    </div>
    );
};

export default ForgotPassword;