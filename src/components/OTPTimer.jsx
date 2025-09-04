import { useState, useEffect } from 'react'
import { Clock } from 'lucide-react';

const OTPTimer = ({ onResend }) => {
  const [timeLeft, setTimeLeft] = useState(60);
  const [canResend, setCanResend] = useState(false);

  useEffect(() => {
    if (timeLeft > 0) {
      const timer = setTimeout(() => setTimeLeft(timeLeft - 1), 1000);
      return () => clearTimeout(timer);
    } else {
      setCanResend(true);
    }
  }, [timeLeft]);

  const handleResend = () => {
    setTimeLeft(60);
    setCanResend(false);
    onResend();
  };

  return (
    <div className="flex items-center justify-between mt-3">
      <div className="flex items-center space-x-2 text-sm text-gray-600 dark:text-gray-400">
        <Clock className="w-4 h-4" />
        <span>
          {canResend ? 'OTP expired' : `Resend OTP in ${timeLeft}s`}
        </span>
      </div>
      {canResend && (
        <button
          onClick={handleResend}
          className="text-sm font-medium text-blue-600 dark:text-blue-400 hover:text-blue-500 transition-colors"
        >
          Resend OTP
        </button>
      )}
    </div>
  );
};

export default OTPTimer