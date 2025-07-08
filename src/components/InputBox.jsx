import React, { useId, forwardRef } from 'react';

const InputBox = forwardRef(({
    id,
    autocomplete,
    placeholder, 
    type, 
    className = "mb-4 w-full p-3 border border-gray-300 dark:border-gray-700 rounded focus:outline-none focus:ring-2 focus:ring-blue-500 dark:focus:ring-blue-400", 
    ...props}, ref) => {

    return (
        <>
            <input
                autoComplete={autocomplete}
                className={className}
                type={type}
                ref={ref}
                id={id}
                placeholder={placeholder}
                {...props} />
        </>
    );
});

export default InputBox;