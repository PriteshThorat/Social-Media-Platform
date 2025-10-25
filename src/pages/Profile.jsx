import { IoMdArrowRoundBack } from "react-icons/io";
import { Profile as ProfileInfo } from '../components/index';
import Post from '../components/Post';
import service from '../service/config';
import { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { useNavigate } from 'react-router-dom';
import useTimeAgo from '../hooks/useTimeAgo';
import { ThemeBtn } from '../components/index';
import { TweetProfileSkeleton, UserProfileSkeleton } from '../Skeletons/index'
import { useSelector } from "react-redux";
import { useToast } from '../components/Toast';

const Profile = () => {
    const [tweets, setTweets] = useState([]);
    const [user, setUser] = useState({})
    const [loading, setLoading] = useState(true);

    const authStatus = useSelector(state => state?.auth?.status);
    const { warning, ToastContainer } = useToast();

    const navigate = useNavigate();

    const { username } = useParams();

    const submit = async(tweetId) => {
        if(!authStatus){
            warning("Please sign in to like posts", 5000);
            return
        }

        try {
            await service.updateLikes({ tweetId })

            const data = await service.getUserPosts({ username })
            setTweets(data.data)
        } catch (error) {
            console.log(error)
        }
    }

    useEffect(() => {
        (async() => {
            try {
                const data = await service.getUserPosts({ username })

                if(!data.data.length)
                    navigate('/')
                else {
                    setTweets(data.data)
                    setUser(data.data[0].owner[0])
                }
            } catch (error) {
                console.log(error)
            } finally {
                setLoading(false)
            }
        })()
    }, [username])

    return (
        <>
            <ToastContainer />
            <div className='min-h-screen bg-gradient-to-br from-slate-50 via-blue-50 to-indigo-50 dark:from-gray-900 dark:via-slate-900 dark:to-indigo-950'>
            {/* Enhanced Navigation Bar */}
            <div className='sticky top-0 z-10 backdrop-blur-xl bg-white/70 dark:bg-gray-900/70 border-b border-white/20 dark:border-gray-700/30 shadow-sm'>
                <div className="container mx-auto flex justify-between items-center px-6 py-4">
                    <button 
                        onClick={() => navigate(-1)} 
                        className="group flex items-center text-gray-600 dark:text-gray-300 hover:text-blue-600 dark:hover:text-blue-400 transition-all duration-200 hover:scale-105"
                    >
                        <IoMdArrowRoundBack size={22} className="mr-2 group-hover:-translate-x-1 transition-transform duration-200" />
                        <span className="font-medium">Back</span>
                    </button>
                    <ThemeBtn />
                </div>
            </div>
            
            {/* Main Content */}
            <div className='max-w-4xl mx-auto px-4 py-8'>
                {/* Profile Section */}
                <div className='mb-8'>
                    {
                        !loading ? (
                            <ProfileInfo 
                                avatar={user?.avatar} 
                                alt="Profile Img" 
                                fullName={user?.fullName} 
                                username={user?.username} 
                                key={user?._id}/>
                        ) : (
                            <UserProfileSkeleton />
                        )
                    }
                </div>

                {/* Posts Section */}
                <div className='space-y-6'>
                    {/* Section Header */}
                    <div className='flex items-center justify-between'>
                        <h2 className='text-2xl font-bold text-gray-900 dark:text-white flex items-center gap-3'>
                            <div className='w-1 h-8 bg-gradient-to-b from-blue-500 to-purple-600 rounded-full'></div>
                            Posts
                            {!loading && tweets.length > 0 && (
                                <span className='text-sm font-normal text-gray-500 dark:text-gray-400 ml-2'>
                                    ({tweets.length} {tweets.length === 1 ? 'post' : 'posts'})
                                </span>
                            )}
                        </h2>
                    </div>

                    {/* Posts Content */}
                    {
                        !loading ? (
                            tweets.length > 0 ? (
                                <div className="grid gap-6">
                                    {tweets.map((tweet, index) => (
                                        <div 
                                            key={tweet._id} 
                                            className={`group bg-white/80 dark:bg-gray-800/80 backdrop-blur-sm border border-white/20 dark:border-gray-700/30 rounded-2xl shadow-sm hover:shadow-xl transition-all duration-500 overflow-hidden animate-in fade-in slide-in-from-bottom-4`}
                                            style={{
                                                animationDelay: `${index * 100}ms`,
                                                animationFillMode: 'both'
                                            }}
                                        >
                                            {/* Subtle gradient border on hover */}
                                            <div className='absolute inset-0 rounded-2xl bg-gradient-to-r from-blue-500/20 via-purple-500/10 to-indigo-500/20 opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none'></div>
                                            
                                            <div className='relative p-6'>
                                                <Post 
                                                    avatar={tweet.owner[0].avatar} 
                                                    username={tweet.owner[0].username} 
                                                    fullName={tweet.owner[0].fullName} 
                                                    createdAt={useTimeAgo(tweet.createdAt)} 
                                                    content={tweet.content} 
                                                    image={tweet.image || ""}
                                                    likesCount={tweet.likesCount}
                                                    isLikedByCurrentUser={tweet.isLikedByCurrentUser}
                                                    onLikeToggle={() => submit(tweet._id)} 
                                                />
                                            </div>
                                        </div>
                                    ))}
                                </div>
                            ) : (
                                <div className="text-center py-16">
                                    <div className="w-24 h-24 mx-auto mb-6 rounded-full bg-gradient-to-br from-gray-100 to-gray-200 dark:from-gray-800 dark:to-gray-700 flex items-center justify-center">
                                        <svg className="w-10 h-10 text-gray-400 dark:text-gray-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M8 12h.01M12 12h.01M16 12h.01M21 12c0 4.418-4.03 8-9 8a9.863 9.863 0 01-4.255-.949L3 20l1.395-3.72C3.512 15.042 3 13.574 3 12c0-4.418 4.03-8 9-8s9 3.582 9 8z" />
                                        </svg>
                                    </div>
                                    <h3 className="text-xl font-semibold text-gray-900 dark:text-white mb-2">No posts yet</h3>
                                    <p className="text-gray-500 dark:text-gray-400 max-w-md mx-auto">
                                        This user hasn't shared any posts yet. Check back later to see their thoughts and updates.
                                    </p>
                                </div>
                            )
                        ) : (
                            <TweetProfileSkeleton />
                        )
                    }
                </div>
            </div>
        </div>
        </>
    );
};

export default Profile;