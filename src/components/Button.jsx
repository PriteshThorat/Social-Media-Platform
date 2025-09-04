const Button = ({
    text, 
    className = "", 
    variant = "primary",
    size = "medium",
    loading = false,
    disabled = false,
    icon = null,
    ...props
}) => {
    const variants = {
        primary: "bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 text-white shadow-lg hover:shadow-xl",
        secondary: "bg-white dark:bg-gray-800 border-2 border-gray-200 dark:border-gray-600 text-gray-700 dark:text-gray-300 hover:border-blue-500 dark:hover:border-blue-400 hover:text-blue-600 dark:hover:text-blue-400",
        outline: "border-2 border-blue-600 text-blue-600 hover:bg-blue-600 hover:text-white dark:border-blue-400 dark:text-blue-400 dark:hover:bg-blue-400",
        ghost: "text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-800",
        danger: "bg-gradient-to-r from-red-500 to-red-600 hover:from-red-600 hover:to-red-700 text-white shadow-lg hover:shadow-xl",
    };

    const sizes = {
        small: "px-3 py-2 text-sm",
        medium: "px-4 py-2.5 text-base",
        large: "px-6 py-3 text-lg",
    };

    const baseClasses = "inline-flex items-center justify-center gap-2 rounded-xl font-semibold transition-all duration-300 focus:outline-none focus:ring-4 focus:ring-blue-500/30 disabled:opacity-50 disabled:cursor-not-allowed disabled:transform-none";
    
    const variantClasses = variants[variant] || variants.primary;
    const sizeClasses = sizes[size] || sizes.medium;
    
    const hoverScale = !loading && !disabled ? "hover:scale-105 active:scale-95" : "";

    return (
        <button
            {...props}
            disabled={disabled || loading}
            className={`${baseClasses} ${variantClasses} ${sizeClasses} ${hoverScale} ${className}`}
        >
            {loading && (
                <div className="w-4 h-4 border-2 border-current border-r-transparent rounded-full animate-spin"></div>
            )}
            {icon && !loading && (
                <span className="w-4 h-4">{icon}</span>
            )}
            <span className={loading ? "opacity-70" : ""}>{text}</span>
        </button>
    );
};

export default Button;