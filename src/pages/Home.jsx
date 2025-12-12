import { TextEditor, FloatingActionButton } from '../components/index'
import Post from '../components/Post'
import service from '../service/config'
import { useEffect, useState, useRef } from 'react'
import useTimeAgo from '../hooks/useTimeAgo'
import { HomeSkeleton } from '../Skeletons/index'
import { useDispatch, useSelector } from "react-redux"
import { useToast } from '../components/Toast'
import { addTweets } from '../store/authSlice'
import { useNavigationType } from "react-router-dom";
import { setHomeScroll } from '../store/uiSlice'

const Home = () => {
    const user = useSelector((state) => state?.auth?.user)
    const tweetsData = useSelector(state => state?.auth?.tweets)
    const [tweets, setTweets] = useState([])
    const [loading, setLoading] = useState(true)
    const createPostRef = useRef(null)
    const authStatus = useSelector(state => state?.auth?.status)
    const { warning, ToastContainer } = useToast()
    const [isUpdatingPost, setIsUpdatingPost] = useState(false)
    const [isEditingContent, setIsEditingContent] = useState(false)
    const [updatingContent, setUpdatingContent] = useState("")
    const [updatingContentId, setUpdatingContentId] = useState("")
    const dispatch = useDispatch()
    const navType = useNavigationType()
    const homeScroll = useSelector((state) => state.ui.homeScroll)
    const [restored, setRestored] = useState(false)

    useEffect(() => {
        if (navType === "POP" && tweets.length > 0 && !restored) {
            window.scrollTo(0, homeScroll);
            setRestored(true);
        }
    }, [navType, homeScroll, tweets, restored]);

    useEffect(() => {
        return () => {
            dispatch(setHomeScroll(window.scrollY));
        };
    }, []);

    const toggleTextEditor = (tweetId, content) => {
        setIsUpdatingPost(true)
        setUpdatingContent(content)
        setUpdatingContentId(tweetId)
    }

    const createPost = (content, _id) => {
        setTweets(tweet => [{
            _id,
            content,
            image: "",
            owner: [
                {
                    _id: user?._id,
                    username: user?.username,
                    fullName: user?.fullName,
                    avatar: user?.avatar
                }
            ],
            createdAt: (new Date()).toISOString(),
            updatedAt: (new Date()).toISOString(),
            likesCount: 0,
            isLikedByCurrentUser: false
        }, ...tweet])

        setIsEditingContent(false)
    }

    const updatePost = (tweetId, content) => {
        setTweets(tweets.map(tweet => {
            if(tweet._id === tweetId)
                return {
                    ...tweet,
                    content
                }

            return tweet
        }))

        setIsUpdatingPost(false)
        setUpdatingContent("")
        setUpdatingContentId("")
    }

    const deletePost = async(tweetId) => {
        try {
            setTweets(tweets.filter(tweet => tweet._id !== tweetId))

            await service.deletePost({ tweetId })
        } catch (error) {
            console.log(error)
        }
    }

    const submit = async(tweetId) => {
        try {
            if(authStatus){
                setTweets(tweets.map(tweet => {
                    if(tweet._id === tweetId){
                        if(tweet.isLikedByCurrentUser)
                            return {
                                ...tweet,
                                likesCount: tweet.likesCount - 1,
                                isLikedByCurrentUser: false
                            }
                        else
                            return {
                                ...tweet,
                                likesCount: tweet.likesCount + 1,
                                isLikedByCurrentUser: true
                            }
                    }

                    return tweet
                }))

                await service.updateLikes({ tweetId })
            }else{
                warning("Please sign in to like posts", 5000);
            }
        } catch (error) {
            console.log(error)
        }
    }

    const postUpdate = (data, _id) => {
        setTweets(prevTweets => prevTweets.map(tweet => {
            if(tweet._id === _id){
                return {
                    ...tweet,
                    image: data.image,
                    _id: data._id,
                    createdAt: data.createdAt,
                    updatedAt: data.updatedAt
                }
            }

            return tweet
        }))

        console.log("Tweet _id and image get updated. Now you can delete post.")
    }

    const scrollToCreatePost = () => {
        createPostRef.current?.scrollIntoView({ 
            behavior: 'smooth',
            block: 'center'
        });
    };

    useEffect(() => {
        (async() => {
            if(!tweetsData.length){
                try {
                    const data = await service.getPosts()

                    dispatch(addTweets(data?.data))
                } catch(error) {
                    console.log(error)
                } finally {
                    setLoading(false)
                }
            }
        })()
    }, [])

    useEffect(() => {
        if(tweetsData){
            setTweets(tweetsData)
            setLoading(false)
        }
    }, [tweetsData])
    
    return (
        <>
            <ToastContainer />
            <div className='min-h-screen bg-gradient-to-br from-slate-50 via-blue-50 to-indigo-50 dark:from-gray-900 dark:via-slate-900 dark:to-indigo-950'>
            <div className='max-w-4xl mx-auto px-4 py-6'>
                {/* Create Post Section */}
                <div className='mb-8' ref={createPostRef}>
                    <div className='bg-white/80 dark:bg-gray-800/80 backdrop-blur-sm border border-white/20 dark:border-gray-700/30 shadow-sm rounded-2xl p-6 transition-all duration-300 hover:shadow-lg'>
                        <div className='flex items-center gap-4 mb-4'>
                            <div className='w-12 h-12 rounded-full bg-gradient-to-br from-blue-500 to-purple-600 flex items-center justify-center shadow-lg transform transition-transform duration-300 hover:scale-110 hover:rotate-12'>
                                <svg className="w-6 h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15.232 5.232l3.536 3.536m-2.036-5.036a2.5 2.5 0 113.536 3.536L6.5 21.036H3v-3.572L16.732 3.732z" />
                                </svg>
                            </div>
                            <div
                                onClick={() => setIsEditingContent(true)} 
                                className='flex-1 cursor-pointer group'
                            >
                                <div className='bg-gradient-to-r from-gray-50 to-blue-50 dark:from-gray-700 dark:to-gray-800 rounded-xl p-4 border-2 border-dashed border-gray-300 dark:border-gray-600 transition-all duration-300 hover:border-blue-500 dark:hover:border-blue-400 hover:shadow-md hover:scale-[1.02]'>
                                    <h2 className='text-lg font-semibold text-gray-900 dark:text-white mb-1 group-hover:text-blue-600 dark:group-hover:text-blue-400 transition-colors duration-300'>
                                        What's on your mind?
                                    </h2>
                                    <p className='text-sm text-gray-500 dark:text-gray-400 flex items-center gap-2'>
                                        <svg className="w-4 h-4 opacity-70" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4.354a4 4 0 110 5.292M15 21H3v-1a6 6 0 0112 0v1zm0 0h6v-1a6 6 0 00-9-5.197M13 7a4 4 0 11-8 0 4 4 0 018 0z" />
                                        </svg>
                                        Share your thoughts with the community
                                    </p>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>

                {isUpdatingPost && (
                    <>
                    {/* Backdrop with blur effect */}
                    <div className="fixed inset-0 bg-black/50 backdrop-blur-sm z-40 transition-all duration-300 animate-fade-in"></div>

                    {/* Modal Container */}
                    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 animate-scale-in">
                        <div className="relative w-full max-w-3xl bg-white dark:bg-gray-800 rounded-2xl shadow-2xl overflow-hidden">
                        {/* Header with X button */}
                        <div className="flex items-center justify-between px-6 py-4 border-b border-gray-200 dark:border-gray-700 bg-gradient-to-r from-blue-50 to-purple-50 dark:from-gray-800 dark:to-gray-900">
                            <h2 className="text-xl font-semibold text-gray-900 dark:text-white">
                            Update Post
                            </h2>
                            <button 
                            onClick={() => setIsUpdatingPost(false)}
                            className="p-2 rounded-full hover:bg-gray-200 dark:hover:bg-gray-700 transition-all duration-200 group">
                            <svg
                                className="w-6 h-6 text-gray-600 dark:text-gray-400 group-hover:text-gray-900 dark:group-hover:text-white transition-colors duration-200"
                                fill="none"
                                stroke="currentColor"
                                viewBox="0 0 24 24"
                            >
                                <path
                                strokeLinecap="round"
                                strokeLinejoin="round"
                                strokeWidth={2}
                                d="M6 18L18 6M6 6l12 12"
                                />
                            </svg>
                            </button>
                        </div>

                        {/* TextEditor Content */}
                        <div className="p-6 max-h-[70vh] overflow-y-auto">
                            <TextEditor 
                            onUpdate={(tweetId, content) => updatePost(tweetId, content)} 
                            content={updatingContent} 
                            contentId={updatingContentId}
                            isUpdatingPost={isUpdatingPost} />
                        </div>
                        </div>
                    </div>
                    </>
                )}
                {isEditingContent && (
                    <>
                    {/* Backdrop with blur effect */}
                    <div className="fixed inset-0 bg-black/50 backdrop-blur-sm z-40 transition-all duration-300 animate-fade-in"></div>

                    {/* Modal Container */}
                    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 animate-scale-in">
                        <div className="relative w-full max-w-3xl bg-white dark:bg-gray-800 rounded-2xl shadow-2xl overflow-hidden">
                        {/* Header with X button */}
                        <div className="flex items-center justify-between px-6 py-4 border-b border-gray-200 dark:border-gray-700 bg-gradient-to-r from-blue-50 to-purple-50 dark:from-gray-800 dark:to-gray-900">
                            <h2 className="text-xl font-semibold text-gray-900 dark:text-white">
                            Update Post
                            </h2>
                            <button 
                            onClick={() => setIsEditingContent(false)}
                            className="p-2 rounded-full hover:bg-gray-200 dark:hover:bg-gray-700 transition-all duration-200 group">
                            <svg
                                className="w-6 h-6 text-gray-600 dark:text-gray-400 group-hover:text-gray-900 dark:group-hover:text-white transition-colors duration-200"
                                fill="none"
                                stroke="currentColor"
                                viewBox="0 0 24 24"
                            >
                                <path
                                strokeLinecap="round"
                                strokeLinejoin="round"
                                strokeWidth={2}
                                d="M6 18L18 6M6 6l12 12"
                                />
                            </svg>
                            </button>
                        </div>

                        {/* TextEditor Content */}
                        <div className="p-6 max-h-[70vh] overflow-y-auto">
                            <TextEditor 
                            onUpdate={(content, _id) => createPost(content, _id)} 
                            content={updatingContent} 
                            contentId={updatingContentId}
                            isUpdatingPost={isUpdatingPost}
                            postUpdate={(tweet, _id) => postUpdate(tweet, _id)} />
                        </div>
                        </div>
                    </div>
                    </>
                )}

                {/* Posts Feed */}
                <div className='space-y-6'>
                    {/* Feed Header */}
                    <div className='flex items-center justify-between'>
                        <div className='flex items-center gap-3'>
                            <div className='w-1 h-8 bg-gradient-to-b from-blue-500 to-purple-600 rounded-full'></div>
                            <h2 className='text-2xl font-bold text-gray-900 dark:text-white'>Latest Posts</h2>
                        </div>
                        {!loading && tweets.length > 0 && (
                            <div className='flex items-center gap-2 text-sm text-gray-500 dark:text-gray-400'>
                                <div className='w-2 h-2 bg-green-500 rounded-full animate-pulse'></div>
                                <span>Live feed</span>
                            </div>
                        )}
                    </div>

                    {/* Posts Content */}
                    {!loading ? (
                        tweets.length > 0 ? (
                            <div className="space-y-6">
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
                                                avatar={tweet?.owner[0]?.avatar} 
                                                username={tweet?.owner[0]?.username} 
                                                fullName={tweet?.owner[0]?.fullName} 
                                                createdAt={useTimeAgo(tweet?.updatedAt)} 
                                                content={tweet?.content} 
                                                image={tweet?.image || ""}
                                                likesCount={tweet?.likesCount}
                                                isLikedByCurrentUser={tweet?.isLikedByCurrentUser}
                                                onLikeToggle={() => submit(tweet?._id)}
                                                onDeleteToggle={() => deletePost(tweet?._id)}
                                                onUpdateToggle={() => toggleTextEditor(tweet?._id, tweet?.content)}
                                            />
                                        </div>
                                    </div>
                                ))}
                            </div>
                        ) : (
                            <div className="text-center py-16">
                                <div className="w-32 h-32 mx-auto mb-8 rounded-full bg-gradient-to-br from-blue-100 to-purple-100 dark:from-blue-900/30 dark:to-purple-900/30 flex items-center justify-center">
                                    <svg className="w-16 h-16 text-blue-500 dark:text-blue-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M8 12h.01M12 12h.01M16 12h.01M21 12c0 4.418-4.03 8-9 8a9.863 9.863 0 01-4.255-.949L3 20l1.395-3.72C3.512 15.042 3 13.574 3 12c0-4.418 4.03-8 9-8s9 3.582 9 8z" />
                                    </svg>
                                </div>
                                <h3 className="text-2xl font-bold text-gray-900 dark:text-white mb-4">Welcome to the Community!</h3>
                                <p className="text-gray-500 dark:text-gray-400 max-w-md mx-auto text-lg leading-relaxed">
                                    Be the first to share something interesting. Your thoughts matter here.
                                </p>
                                <div className="mt-8">
                                    <div className="inline-flex items-center gap-2 px-4 py-2 bg-blue-50 dark:bg-blue-900/20 text-blue-600 dark:text-blue-400 rounded-full text-sm font-medium">
                                        <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 20 20">
                                            <path fillRule="evenodd" d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7-4a1 1 0 11-2 0 1 1 0 012 0zM9 9a1 1 0 000 2v3a1 1 0 001 1h1a1 1 0 100-2v-3a1 1 0 00-1-1H9z" clipRule="evenodd" />
                                        </svg>
                                        Start by creating your first post above
                                    </div>
                                </div>
                            </div>
                        )
                    ) : (
                        <HomeSkeleton />
                    )}
                </div>
            </div>

            {/* Floating Action Button */}
            <FloatingActionButton onClick={scrollToCreatePost} />
        </div>
        </>
    );
};

export default Home;