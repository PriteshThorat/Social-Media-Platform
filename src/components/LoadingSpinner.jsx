const LoadingSpinner = ({ 
  size = 'medium', 
  text = 'Loading...', 
  fullScreen = false,
  className = '' 
}) => {
  const sizeClasses = {
    small: 'w-4 h-4',
    medium: 'w-8 h-8',
    large: 'w-12 h-12',
    xl: 'w-16 h-16'
  };

    const spinnerSize = sizeClasses[size] || sizeClasses.medium;

    const content = (
        <div className={`flex flex-col items-center justify-center space-y-4 ${className}`}>
            {/* Modern spinner with gradient */}
            <div className="relative">
                <div className={`${spinnerSize} rounded-full bg-gradient-to-r from-blue-500 via-purple-500 to-indigo-500 animate-spin`}>
                    <div className="absolute inset-1 rounded-full bg-white dark:bg-gray-900"></div>
                </div>
                <div className={`absolute inset-0 ${spinnerSize} rounded-full bg-gradient-to-r from-blue-500/20 via-purple-500/20 to-indigo-500/20 animate-ping`}></div>
            </div>
            
            {text && (
                <div className="text-center space-y-2">
                    <p className="text-gray-700 dark:text-gray-300 font-medium">
                        {text}
                    </p>
                    <div className="flex justify-center space-x-1">
                        <div className="w-2 h-2 bg-blue-500 rounded-full animate-bounce" style={{animationDelay: '0ms'}}></div>
                        <div className="w-2 h-2 bg-purple-500 rounded-full animate-bounce" style={{animationDelay: '150ms'}}></div>
                        <div className="w-2 h-2 bg-indigo-500 rounded-full animate-bounce" style={{animationDelay: '300ms'}}></div>
                    </div>
                </div>
            )}
        </div>
    );

    if (fullScreen) {
        return (
            <div className="fixed inset-0 bg-gradient-to-br from-slate-50 via-blue-50 to-indigo-50 dark:from-gray-900 dark:via-slate-900 dark:to-indigo-950 flex items-center justify-center z-50">
                <div className="text-center">
                    {content}
                    <div className="mt-8 max-w-md mx-auto">
                        <div className="h-1 bg-gray-200 dark:bg-gray-700 rounded-full overflow-hidden">
                            <div className="h-full bg-gradient-to-r from-blue-500 to-purple-600 rounded-full animate-pulse"></div>
                        </div>
                    </div>
                </div>
            </div>
        );
    }

    return content;
};

export default LoadingSpinner;