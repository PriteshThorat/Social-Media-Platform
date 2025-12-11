import { DislikeBtn, LikeBtn, ProfilePicture } from "./index";
import parse from "html-react-parser";
import { Link } from "react-router-dom";
import { useState } from "react";
import { useSelector } from "react-redux";

const Post = ({
  avatar,
  username,
  fullName,
  createdAt,
  content,
  image,
  likesCount,
  isLikedByCurrentUser,
  onLikeToggle,
  onDeleteToggle,
  onUpdateToggle,
}) => {
  const [showOptions, setShowOptions] = useState(false)
  const user = useSelector((state) => state?.auth?.user)

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
          <div className="flex items-center justify-between mb-2">
            <div className="flex flex-wrap items-center gap-2">
              <Link
                to={`/profile/${username}`}
                className="font-bold text-gray-900 dark:text-white hover:text-blue-600 dark:hover:text-blue-400 transition-colors duration-200 truncate"
              >
                {fullName}
              </Link>
              <span className="text-gray-500 dark:text-gray-400 text-sm">
                @{username.toLowerCase()}
              </span>
              <span className="text-gray-300 dark:text-gray-600">•</span>
              <span className="text-gray-500 dark:text-gray-400 text-sm hover:text-gray-700 dark:hover:text-gray-300 transition-colors duration-200">
                {createdAt}
              </span>
            </div>

            {user?.username === username && (
              /* Three-dot Options Menu */
              <div className="relative">
                <button
                  onClick={() => setShowOptions(!showOptions)}
                  className="p-2 rounded-full hover:bg-gray-100 dark:hover:bg-gray-700 transition-colors duration-200"
                >
                  <svg
                    className="w-5 h-5 text-gray-600 dark:text-gray-400"
                    fill="currentColor"
                    viewBox="0 0 20 20"
                  >
                    <path d="M10 6a2 2 0 110-4 2 2 0 010 4zM10 12a2 2 0 110-4 2 2 0 010 4zM10 18a2 2 0 110-4 2 2 0 010 4z" />
                  </svg>
                </button>

                {/* Dropdown Menu */}
                {showOptions && (
                  <div className="absolute right-0 mt-2 w-48 bg-white dark:bg-gray-800 rounded-lg shadow-lg border border-gray-200 dark:border-gray-700 z-10">
                    <div className="py-1">
                      <button
                        onClick={onUpdateToggle}
                        className="w-full text-left px-4 py-2 text-sm text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-700 transition-colors duration-200 flex items-center gap-2"
                      >
                        <svg
                          className="w-4 h-4"
                          fill="none"
                          stroke="currentColor"
                          viewBox="0 0 24 24"
                        >
                          <path
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            strokeWidth={2}
                            d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z"
                          />
                        </svg>
                        Update
                      </button>
                      <button
                        onClick={onDeleteToggle}
                        className="w-full text-left px-4 py-2 text-sm text-red-600 dark:text-red-400 hover:bg-gray-100 dark:hover:bg-gray-700 transition-colors duration-200 flex items-center gap-2"
                      >
                        <svg
                          className="w-4 h-4"
                          fill="none"
                          stroke="currentColor"
                          viewBox="0 0 24 24"
                        >
                          <path
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            strokeWidth={2}
                            d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16"
                          />
                        </svg>
                        Delete
                      </button>
                    </div>
                  </div>
                )}
              </div>
            )}
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
              <DislikeBtn likes={likesCount} />
            ) : (
              <LikeBtn likes={likesCount} />
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Post;
