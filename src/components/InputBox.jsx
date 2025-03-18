const InputBox = ({placeholder, type, className}) => {
    return (
        <>
            <input
                className={`mb-4 w-full p-3 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-blue-500 ${className}`}
                type={type}
                placeholder={placeholder} />
        </>
    );
};

export default InputBox;