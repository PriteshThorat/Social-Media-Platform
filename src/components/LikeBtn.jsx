import { FcLike } from "react-icons/fc";

const LikeBtn = ({likes}) => {
    return (
        <div className="flex items-center gap-2 group">
            <div className="relative p-2 rounded-full bg-red-50 dark:bg-red-900/20 group-hover:bg-red-100 dark:group-hover:bg-red-900/30 transition-all duration-200">
                <FcLike className="text-xl group-hover:scale-110 transition-transform duration-200 drop-shadow-sm"/>
                <div className="absolute inset-0 rounded-full bg-red-400/20 scale-0 group-hover:scale-100 group-active:scale-75 transition-transform duration-200"></div>
            </div>
            <span className="text-sm font-semibold text-red-600 dark:text-red-400 group-hover:text-red-700 dark:group-hover:text-red-300 transition-colors duration-200 select-none">
                {likes || 0}
            </span>
        </div>
    );
};

export default LikeBtn;