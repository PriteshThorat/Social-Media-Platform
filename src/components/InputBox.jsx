import React, { useId, forwardRef } from 'react';

const InputBox = forwardRef(({
    placeholder, 
    type, 
    className = "mb-4 w-full p-3 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-blue-500", 
    ...props}, ref) => {
    const id = useId();

    return (
        <>
            <input
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