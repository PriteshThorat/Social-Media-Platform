const Button = ({text, className}) => {
    return (
        <>
            <button
            className={`w-full bg-blue-500 text-white py-2 px-4 rounded-lg shadow-md transition-all duration-300 ease-in-out transform hover:bg-blue-600 hover:scale-105 active:scale-95 focus:outline-none focus:ring-2 focus:ring-blue-400 ${className}`} >
                {text}
            </button>
        </>
    );
};

export default Button;