import { useState, useEffect } from 'react';
import { CheckCircle, AlertCircle, Info, X, AlertTriangle } from 'lucide-react';

const Toast = ({ 
    message, 
    type = 'info', 
    duration = 4000, 
    onClose,
    position = 'top-right'
}) => {
    const [isVisible, setIsVisible] = useState(true);
    const [isExiting, setIsExiting] = useState(false);

    const icons = {
        success: <CheckCircle className="w-5 h-5 text-green-500" />,
        error: <AlertCircle className="w-5 h-5 text-red-500" />,
        warning: <AlertTriangle className="w-5 h-5 text-yellow-500" />,
        info: <Info className="w-5 h-5 text-blue-500" />
    };

    const styles = {
        success: 'border-green-200 dark:border-green-800 bg-green-50 dark:bg-green-900/20',
        error: 'border-red-200 dark:border-red-800 bg-red-50 dark:bg-red-900/20',
        warning: 'border-yellow-200 dark:border-yellow-800 bg-yellow-50 dark:bg-yellow-900/20',
        info: 'border-blue-200 dark:border-blue-800 bg-blue-50 dark:bg-blue-900/20'
    };

    const positions = {
        'top-right': 'top-4 right-4',
        'top-left': 'top-4 left-4',
        'bottom-right': 'bottom-4 right-4',
        'bottom-left': 'bottom-4 left-4',
        'top-center': 'top-4 left-1/2 transform -translate-x-1/2',
        'bottom-center': 'bottom-4 left-1/2 transform -translate-x-1/2'
    };

    useEffect(() => {
        const timer = setTimeout(() => {
            setIsExiting(true);
            setTimeout(() => {
                setIsVisible(false);
                onClose?.();
            }, 300);
        }, duration);

        return () => clearTimeout(timer);
    }, [duration, onClose]);

    const handleClose = () => {
        setIsExiting(true);
        setTimeout(() => {
            setIsVisible(false);
            onClose?.();
        }, 300);
    };

    if (!isVisible) return null;

    return (
        <div className={`fixed z-50 ${positions[position]}`}>
            <div className={`
                flex items-center gap-3 p-4 rounded-xl border shadow-lg backdrop-blur-sm
                transition-all duration-300 transform
                ${isExiting ? 'translate-x-full opacity-0' : 'translate-x-0 opacity-100'}
                ${styles[type]}
                max-w-md
            `}>
                {/* Icon */}
                <div className="flex-shrink-0">
                    {icons[type]}
                </div>

                {/* Message */}
                <div className="flex-1 min-w-0">
                    <p className="text-sm font-medium text-gray-900 dark:text-white">
                        {message}
                    </p>
                </div>

                {/* Close Button */}
                <button
                    onClick={handleClose}
                    className="flex-shrink-0 p-1 rounded-full hover:bg-gray-200/50 dark:hover:bg-gray-700/50 transition-colors duration-200"
                    aria-label="Close notification"
                >
                    <X className="w-4 h-4 text-gray-500 dark:text-gray-400" />
                </button>

                {/* Progress Bar */}
                <div className="absolute bottom-0 left-0 h-1 bg-gray-200 dark:bg-gray-700 rounded-b-xl overflow-hidden">
                    <div 
                        className={`h-full transition-all ease-linear ${
                            type === 'success' ? 'bg-green-500' :
                            type === 'error' ? 'bg-red-500' :
                            type === 'warning' ? 'bg-yellow-500' : 'bg-blue-500'
                        }`}
                        style={{
                            width: '100%',
                            animation: `toast-progress ${duration}ms linear forwards`
                        }}
                    />
                </div>
            </div>

            <style>{`
                @keyframes toast-progress {
                    from {
                        width: 100%;
                    }
                    to {
                        width: 0%;
                    }
                }
            `}</style>
        </div>
    );
};

// Toast Container for managing multiple toasts
const ToastContainer = ({ toasts, removeToast }) => {
    return (
        <div className="fixed inset-0 pointer-events-none z-50">
            {toasts.map((toast, index) => (
                <div 
                    key={toast.id} 
                    className="pointer-events-auto"
                    style={{
                        transform: `translateY(${index * 80}px)`
                    }}
                >
                    <Toast
                        message={toast.message}
                        type={toast.type}
                        duration={toast.duration}
                        position={toast.position}
                        onClose={() => removeToast(toast.id)}
                    />
                </div>
            ))}
        </div>
    );
};

// Custom hook for using toasts
const useToast = () => {
    const [toasts, setToasts] = useState([]);

    const addToast = (message, type = 'info', duration = 4000, position = 'top-right') => {
        const id = Math.random().toString(36).substring(2);
        const newToast = { id, message, type, duration, position };
        
        setToasts(prev => [...prev, newToast]);
        
        return id;
    };

    const removeToast = (id) => {
        setToasts(prev => prev.filter(toast => toast.id !== id));
    };

    const success = (message, duration, position) => addToast(message, 'success', duration, position);
    const error = (message, duration, position) => addToast(message, 'error', duration, position);
    const warning = (message, duration, position) => addToast(message, 'warning', duration, position);
    const info = (message, duration, position) => addToast(message, 'info', duration, position);

    return {
        toasts,
        addToast,
        removeToast,
        success,
        error,
        warning,
        info,
        ToastContainer: () => <ToastContainer toasts={toasts} removeToast={removeToast} />
    };
};

export { Toast, ToastContainer, useToast };
export default Toast;
