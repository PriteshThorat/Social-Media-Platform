import { VerifyOTP as Verify } from "../components/index";

const VerifyOTP = () => {
    return (
        <div className="flex flex-col items-center justify-center min-h-screen px-4 bg-gray-50 dark:bg-gray-950 transition-colors">
            <div className="max-w-md w-full p-6 bg-white dark:bg-gray-900 border border-gray-200 dark:border-gray-700 rounded shadow transition-colors">
                <h1 className="text-2xl font-semibold text-center mb-2 text-gray-900 dark:text-gray-100">Verify OTP</h1>
                <p className="text-center text-gray-600 dark:text-gray-400 mb-6">
                    Check your email and enter the OTP to continue.
                </p>
                <Verify />
            </div>
        </div>
    )
}

export default VerifyOTP