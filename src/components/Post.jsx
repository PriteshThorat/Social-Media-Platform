import ProfilePicture from "./ProfilePicture";
import LikeBtn from './LikeBtn';

const Post = ({profileImgSrc, userName, userId, createdAt, context, postImgSrc, likes}) => {
    return (
        <>
            <div className="bg-white rounded-lg shadow-md p-4 max-w-lg mx-auto my-4">
                <div className="flex items-center gap-3">
                    <ProfilePicture 
                    src={profileImgSrc} 
                    alt="" 
                    className="w-12 h-12 border border-gray-400 shadow-sm"/>
                    <div>
                        <div className="flex items-center gap-2 text-gray-700 text-sm">
                            <p 
                            className="font-semibold">
                                {userName}
                            </p>
                            <p 
                            className="text-gray-500">
                                {userId}
                            </p>
                            <span 
                            className="text-gray-400">
                                •
                            </span>
                            <p 
                            className="text-gray-500">
                                {createdAt}
                            </p>
                        </div>
                        <p 
                        className="text-gray-800 mt-1">
                            {context}
                        </p>
                    </div>
                </div>
                {
                    postImgSrc && (
                        <div className="mt-3 flex justify-center">
                            <img 
                            className="w-full max-h-96 object-cover rounded-md"
                            src={postImgSrc} 
                            alt=""/>
                        </div>
                    )
                }
                <div className="mt-2">
                    <LikeBtn likes={likes}/>
                </div>
            </div>
        </>
    );
};

export default Post;