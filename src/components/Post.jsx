import { DislikeBtn, LikeBtn, ProfilePicture } from './index';
import parse from 'html-react-parser';
import { Link } from 'react-router-dom'

const Post = ({avatar, username, fullName, createdAt, content, image, likesCount, isLikedByCurrentUser, onLikeToggle }) => {
    return (
        <>
            <div className="bg-white dark:bg-[#3D3A50] rounded-lg shadow-md p-5 w-full">
                <div className="flex flex-col sm:flex-row items-start sm:items-center gap-3">
                    <Link to={`/profile/${username}`} >
                        <ProfilePicture 
                        src={avatar} 
                        alt="" 
                        className="w-12 h-12 border border-gray-400 dark:border-gray-600 shadow-sm"/>
                    </Link>
                    <div className="w-full">
                        <div className="flex flex-wrap items-center gap-2 text-gray-700 dark:text-gray-300 text-sm">
                            <div 
                            className="font-semibold" >
                                {fullName}
                            </div>
                            <span 
                            className="text-gray-500 dark:text-gray-400" >
                                {`@${username}`}
                            </span>
                            <span 
                            className="text-gray-400 dark:text-gray-500">
                                •
                            </span>
                            <p 
                            className="text-gray-500 dark:text-gray-400">
                                {createdAt}
                            </p>
                        </div>
                        <div
                        className="text-gray-800 dark:text-gray-200 mt-1" >
                            {parse(content)}
                        </div>
                    </div>
                </div>
                {
                    image && (
                        <div className="w-full max-w-sm mx-auto">
                            <div className="aspect-square w-full rounded-md overflow-hidden">
                                <img 
                                className="w-full h-full object-cover"
                                src={image} 
                                loading="lazy"
                                alt=""/>
                            </div>
                        </div>
                    )
                }
                <div className="mt-2" onClick={onLikeToggle}>
                    {
                        !isLikedByCurrentUser ? (
                            <DislikeBtn likes={likesCount}/>
                        ) : (
                            <LikeBtn likes={likesCount}/>
                        )
                    }
                </div>
            </div>
        </>
    );
};

export default Post;