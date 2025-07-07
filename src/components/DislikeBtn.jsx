import { FaRegHeart } from "react-icons/fa";

const DislikeBtn = ({likes}) => {
    return (
        <button 
        className="flex flex-row items-center gap-2 p-2 rounded-full hover:scale-110 transition-transform duration-200 ease-in-out active:scale-95 focus:outline-none" >
            <FaRegHeart className="text-2xl"/>
            <p 
            className="text-lg font-semibold text-gray-700 dark:text-gray-300">
                {likes}
            </p>
        </button>
    );
};

export default DislikeBtn;