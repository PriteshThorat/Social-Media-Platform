import { DislikeBtn, LikeBtn, ProfilePicture } from './index';
import parse from 'html-react-parser';
import { Link } from 'react-router-dom'
import { useEffect } from 'react'

const Post = ({avatar, username, fullName, createdAt, content, image, likesCount, isLikedByCurrentUser, onLikeToggle }) => {
    return (
        <div className="group w-full">
            {/* Header Section */}
            <div className="flex items-start gap-4 mb-4">
                <Link 
                    to={`/profile/${username}`} 
                    className="flex-shrink-0 group/avatar transition-transform duration-200 hover:scale-105"
                >
                    <div className="relative">
                        <ProfilePicture 
                            src={avatar} 
                            alt={`${fullName}'s avatar`} 
                            className="w-12 h-12 ring-2 ring-white dark:ring-gray-700 shadow-lg transition-all duration-200 group-hover/avatar:ring-blue-500 dark:group-hover/avatar:ring-blue-400"
                        />
                        <div className="absolute inset-0 rounded-full bg-gradient-to-br from-blue-500/20 to-purple-500/20 opacity-0 group-hover/avatar:opacity-100 transition-opacity duration-200"></div>
                    </div>
                </Link>
                
                <div className="flex-1 min-w-0">
                    <div className="flex flex-wrap items-center gap-2 mb-2">
                        <Link 
                            to={`/profile/${username}`}
                            className="font-bold text-gray-900 dark:text-white hover:text-blue-600 dark:hover:text-blue-400 transition-colors duration-200 truncate"
                        >
                            {fullName}
                        </Link>
                        <span className="text-gray-500 dark:text-gray-400 text-sm">@{username}</span>
                        <span className="text-gray-300 dark:text-gray-600">•</span>
                        <span className="text-gray-500 dark:text-gray-400 text-sm hover:text-gray-700 dark:hover:text-gray-300 transition-colors duration-200">
                            {createdAt}
                        </span>
                    </div>
                    
                    {/* Content */}
                    <div className="text-gray-800 dark:text-gray-200 leading-relaxed prose prose-sm max-w-none dark:prose-invert">
                        {parse(content)}
                    </div>
                </div>
            </div>

            {/* Image Section */}
            {image && (
                <div className="mb-4 rounded-xl overflow-hidden bg-gray-100 dark:bg-gray-800">
                    <div className="relative group/image">
                        <img 
                            className="w-full h-auto max-h-96 object-cover transition-transform duration-300 group-hover/image:scale-[1.02]"
                            src={image} 
                            loading="lazy"
                            alt="Post content"
                        />
                        <div className="absolute inset-0 bg-black/5 group-hover/image:bg-black/0 transition-colors duration-300"></div>
                    </div>
                </div>
            )}

            {/* Actions Section */}
            <div className="flex items-center justify-between pt-4 border-t border-gray-100 dark:border-gray-700">
                <div className="flex items-center gap-1">
                    {/* Like Button */}
                    <div 
                        className="cursor-pointer group/like transition-all duration-200"
                        onClick={onLikeToggle}
                    >
                        {!isLikedByCurrentUser ? (
                            <DislikeBtn likes={likesCount}/>
                        ) : (
                            <LikeBtn likes={likesCount}/>
                        )}
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Post;