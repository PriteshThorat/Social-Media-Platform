import React, { useId, forwardRef, useState } from 'react';

const InputBox = forwardRef(({
    id,
    autocomplete,
    placeholder, 
    type = "text", 
    className = "",
    label = "",
    error = "",
    size = "medium",
    variant = "default",
    icon = null,
    textAlign = "left",
    ...props}, ref) => {

    const [focused, setFocused] = useState(false);
    const inputId = id || useId();

    const sizes = {
        small: "px-3 py-2 text-sm",
        medium: "px-4 py-3 text-base", 
        large: "px-5 py-4 text-lg",
    };

    const variants = {
        default: "border-gray-200 dark:border-gray-700 bg-white dark:bg-gray-800 text-gray-900 dark:text-white",
        filled: "border-transparent bg-gray-100 dark:bg-gray-700 text-gray-900 dark:text-white",
        outline: "border-2 border-gray-200 dark:border-gray-600 bg-transparent text-gray-900 dark:text-white",
    };

    const textAlignments = {
        left: "text-left",
        center: "text-center", 
        right: "text-right",
    };

    const baseClasses = "w-full rounded-xl transition-all duration-200 focus:outline-none focus:ring-4 focus:ring-blue-500/30 disabled:opacity-50 disabled:cursor-not-allowed";
    const sizeClasses = sizes[size] || sizes.medium;
    const variantClasses = variants[variant] || variants.default;
    const textAlignClasses = textAlignments[textAlign] || textAlignments.left;
    const focusClasses = focused ? "border-blue-500 dark:border-blue-400 shadow-lg" : "hover:border-gray-300 dark:hover:border-gray-600";
    const errorClasses = error ? "border-red-500 focus:ring-red-500/30" : "";
    const iconPadding = icon ? (type === "file" ? "" : "pl-12") : "";

    return (
        <div className="space-y-2">
            {label && (
                <label 
                    htmlFor={inputId}
                    className="block text-sm font-semibold text-gray-700 dark:text-gray-300"
                >
                    {label}
                    {props.required && <span className="text-red-500 ml-1">*</span>}
                </label>
            )}
            
            <div className="relative">
                {icon && type !== "file" && (
                    <div className="absolute left-4 top-1/2 transform -translate-y-1/2 text-gray-400 dark:text-gray-500">
                        {icon}
                    </div>
                )}
                
                <input
                    autoComplete={autocomplete}
                    className={`${baseClasses} ${sizeClasses} ${variantClasses} ${textAlignClasses} ${focusClasses} ${errorClasses} ${iconPadding} ${className}`}
                    type={type}
                    ref={ref}
                    id={inputId}
                    placeholder={placeholder}
                    onFocus={() => setFocused(true)}
                    onBlur={() => setFocused(false)}
                    {...props}
                />
            </div>
            
            {error && (
                <div className="flex items-center gap-2 text-sm text-red-600 dark:text-red-400">
                    <svg className="w-4 h-4 flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4m0 4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                    </svg>
                    {error}
                </div>
            )}
        </div>
    );
});

InputBox.displayName = 'InputBox';

export default InputBox;