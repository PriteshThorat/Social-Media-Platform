import { InputBox } from './index'
import { useForm } from 'react-hook-form';
import authService from '../service/auth'
import { useDispatch, useSelector } from 'react-redux';
import { pass, login } from '../store/authSlice';
import { useNavigate } from 'react-router-dom';
import { useState, useRef, useEffect } from 'react';

const VerifyOTP = () => {
    const navigate = useNavigate()
    const dispatch = useDispatch()

    const inputRefs = useRef([]);

    const user = useSelector(state => state.auth.temp)

    const [error, setError] = useState('')
    const [isLoading, setIsLoading] = useState(false)

    const { register, handleSubmit, setValue, watch } = useForm();
    const watchParts = watch(["part1", "part2", "part3", "part4", "part5", "part6"]);

    useEffect(() => {
        inputRefs.current[0]?.focus();
    }, []);

    const verify = async(parts) => {
        setError('')
        setIsLoading(true)

        const { part1, part2, part3, part4, part5, part6 } = parts

        const userOTP = `${part1}${part2}${part3}${part4}${part5}${part6}`

        try {
            const isCorrectOTP = await authService.verifyOTP({ email: user.email, userOTP })
    
            if(isCorrectOTP){
              const userPassword = user.password
              const userEmail = user.email
    
              const loggedUser = await authService.login({ email: userEmail, password: userPassword })
              
              if(loggedUser){
                dispatch(pass(null))
                dispatch(login(loggedUser.data.user))

                setError('')
    
                navigate("/")
              }
            }
        } catch (error) {
            setError(error)
        } finally {
            setIsLoading(false)
        }
    }

    const registerOptions = (partName) => (
        register(partName, {
            required: true,
    }))

    return (
        <div className="w-full">
            <form onSubmit={handleSubmit(verify)} className="space-y-6">
                {/* OTP Input Fields */}
                <div className="flex justify-center gap-2 mb-6">
                    {["part1", "part2", "part3", "part4", "part5", "part6"].map((part, index) => (
                        <div key={part} className="relative">
                            <InputBox
                                placeholder=""
                                type="text"
                                className={`w-12 h-12 text-center text-xl font-semibold border-2 rounded-lg transition-all duration-200 bg-white dark:bg-gray-900 text-gray-900 dark:text-gray-100 focus:outline-none focus:ring-0 ${
                                    watchParts[index] 
                                        ? 'border-green-500 dark:border-green-400 bg-green-50 dark:bg-green-900/20' 
                                        : error 
                                            ? 'border-red-500 dark:border-red-400 bg-red-50 dark:bg-red-900/20' 
                                            : 'border-gray-300 dark:border-gray-600 hover:border-blue-400 dark:hover:border-blue-500 focus:border-blue-500 dark:focus:border-blue-400'
                                } transform hover:scale-105 focus:scale-105`}
                                maxLength={1}
                                inputMode="numeric"
                                pattern="\d*"
                                {...registerOptions(part)}
                                ref={(el) => (inputRefs.current[index] = el)}
                                onChange={(e) => {
                                    const value = e.target.value.replace(/\D/g, "");
                                    setValue(part, value); 
                                    if (value && index < 5) {
                                        inputRefs.current[index + 1]?.focus();
                                    }
                                }}
                                onKeyDown={(e) => {
                                    if (e.key === "Backspace" && !e.currentTarget.value && index > 0) {
                                        inputRefs.current[index - 1]?.focus();
                                    }
                                }}
                                value={watchParts[index] || ''}
                            />
                            {watchParts[index] && (
                                <div className="absolute -bottom-1 -right-1 w-3 h-3 bg-green-500 rounded-full border-2 border-white dark:border-gray-800"></div>
                            )}
                        </div>
                    ))}
                </div>

                {/* Error Message */}
                {error && (
                    <div className="bg-red-50 dark:bg-red-900/20 border border-red-200 dark:border-red-800 rounded-lg p-3 mb-4 animate-shake">
                        <div className="flex items-center">
                            <svg className="w-5 h-5 text-red-500 mr-2" fill="currentColor" viewBox="0 0 20 20">
                                <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zM8.707 7.293a1 1 0 00-1.414 1.414L8.586 10l-1.293 1.293a1 1 0 101.414 1.414L10 11.414l1.293 1.293a1 1 0 001.414-1.414L11.414 10l1.293-1.293a1 1 0 00-1.414-1.414L10 8.586 8.707 7.293z" clipRule="evenodd"/>
                            </svg>
                            <p className="text-red-700 dark:text-red-400 text-sm font-medium">{error.toString()}</p>
                        </div>
                    </div>
                )}

                {/* Submit Button */}
                <button
                    type="submit"
                    disabled={isLoading || watchParts.some(part => !part)}
                    className={`w-full py-3 px-4 rounded-lg font-semibold text-white transition-all duration-200 transform hover:scale-[1.02] focus:scale-[1.02] focus:outline-none focus:ring-4 focus:ring-blue-500/50 ${
                        isLoading || watchParts.some(part => !part)
                            ? 'bg-gray-400 dark:bg-gray-600 cursor-not-allowed'
                            : 'bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 shadow-lg hover:shadow-xl'
                    }`}
                >
                    {isLoading ? (
                        <div className="flex items-center justify-center">
                            <svg className="animate-spin -ml-1 mr-3 h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                                <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                                <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                            </svg>
                            Verifying...
                        </div>
                    ) : (
                        <span className="flex items-center justify-center">
                            <svg className="w-5 h-5 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7"/>
                            </svg>
                            Verify Email
                        </span>
                    )}
                </button>

                {/* Resend OTP */}
                <div className="text-center">
                    <p className="text-sm text-gray-600 dark:text-gray-400 mb-2">
                        Didn't receive the code?
                    </p>
                    <button
                        type="button"
                        disabled={isLoading}
                        className="text-blue-600 dark:text-blue-400 hover:text-blue-700 dark:hover:text-blue-300 font-semibold text-sm underline decoration-2 underline-offset-2 hover:decoration-blue-700 transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
                        onClick={async() => {
                            await authService.requestOTP({ email: user.email })
                        }}
                    >
                        Resend Code
                    </button>
                </div>
            </form>
        </div>
    )
}

export default VerifyOTP