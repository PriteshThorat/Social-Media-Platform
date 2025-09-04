import { FaRegHeart } from "react-icons/fa";

const DislikeBtn = ({likes}) => {
    return (
        <div className="flex items-center gap-2 group">
            <div className="relative p-2 rounded-full bg-gray-50 dark:bg-gray-800 group-hover:bg-red-50 dark:group-hover:bg-red-900/20 transition-all duration-200">
                <FaRegHeart className="text-xl text-gray-500 dark:text-gray-400 group-hover:text-red-500 dark:group-hover:text-red-400 group-hover:scale-110 transition-all duration-200"/>
                <div className="absolute inset-0 rounded-full bg-red-400/20 scale-0 group-hover:scale-100 group-active:scale-75 transition-transform duration-200"></div>
            </div>
            <span className="text-sm font-semibold text-gray-600 dark:text-gray-400 group-hover:text-red-600 dark:group-hover:text-red-400 transition-colors duration-200 select-none">
                {likes || 0}
            </span>
        </div>
    );
};

export default DislikeBtn;