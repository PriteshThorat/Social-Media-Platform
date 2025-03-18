import { FcLike } from "react-icons/fc";

const LikeBtn = ({}) => {
    return (
        <button className="flex flex-row items-center gap-2 p-2 rounded-full 
            hover:scale-110 transition-transform duration-200 ease-in-out
            active:scale-95 focus:outline-none" >
            <FcLike className="text-2xl"/>
            <p 
            className="text-lg font-semibold text-gray-700">
                1k
            </p>
        </button>
    );
};

export default LikeBtn;