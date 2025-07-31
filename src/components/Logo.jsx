import { useNavigate } from "react-router-dom";

const Logo = () => {
    const navigate = useNavigate();
    
    return (
        <>
            <button 
            onClick={() => navigate("/")}
            className="group relative p-2 rounded-full transition-all duration-300 hover:scale-105 hover:shadow-lg focus:outline-none">
                <img 
                className="w-16 h-16 object-cover rounded-full border-2 border-gray-300 dark:border-gray-600 shadow-md group-hover:border-blue-500 transition-all duration-300"
                src="images.png" 
                loading="lazy"
                alt="logo" />
                <span 
                className="absolute -bottom-2 left-1/2 transform -translate-x-1/2 opacity-0 group-hover:opacity-100 bg-black dark:bg-gray-800 text-white text-xs px-2 py-1 rounded-md transition-opacity duration-300" >
                    Home
                </span>
            </button>
        </>
    );
};

export default Logo;