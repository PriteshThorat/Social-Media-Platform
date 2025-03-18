import ProfilePicture from "./ProfilePicture";
import LikeBtn from './LikeBtn';

const Post = ({profileImgSrc, userName, userId, createdAt, context, PostImgSrc}) => {
    return (
        <>
            <div className="bg-white rounded-lg shadow-md p-4 max-w-lg mx-auto my-4">
                <div className="flex items-center gap-3">
                    <ProfilePicture src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTtnvAOajH9gS4C30cRF7rD_voaTAKly2Ntaw&s" alt="" className="w-12 h-12 border border-gray-400 shadow-sm"/>
                    <div>
                        <div className="flex items-center gap-2 text-gray-700 text-sm">
                            <p className="font-semibold">Name</p>
                            <p className="text-gray-500">userid</p>
                            <span className="text-gray-400">•</span>
                            <p className="text-gray-500">time</p>
                        </div>
                        <p className="text-gray-800 mt-1">context</p>
                    </div>
                </div>
                <div className="mt-3 flex justify-center">
                    <img 
                    className="w-full max-h-96 object-cover rounded-md"
                    src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTtnvAOajH9gS4C30cRF7rD_voaTAKly2Ntaw&s" 
                    alt=""/>
                </div>
                <div className="mt-2">
                    <LikeBtn/>
                </div>
            </div>
        </>
    );
};

export default Post;