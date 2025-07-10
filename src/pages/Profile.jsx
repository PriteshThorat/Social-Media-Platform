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

const Profile = () => {
    const [tweets, setTweets] = useState([]);
    const [user, setUser] = useState({})
    const [loading, setLoading] = useState(true);

    const navigate = useNavigate();

    const { username } = useParams();

    const submit = async(tweetId) => {
        try {
            await service.updateLikes({ tweetId })

            const data = await service.getPosts();
            setTweets(data.data);
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
        <div className='min-h-screen bg-gray-100 dark:bg-gray-900'>
            <div className='bg-white dark:bg-gray-800 shadow-md py-4'>
                <div className="container mx-auto flex justify-between items-center px-6">
                    <button onClick={() => navigate(-1)} className="flex items-center text-gray-600 dark:text-gray-300 hover:text-gray-900 dark:hover:text-white">
                        <IoMdArrowRoundBack size={24} className="mr-2" />
                        Back
                    </button>
                    <ThemeBtn />
                </div>
            </div>
            <div className='max-w-2xl mx-auto bg-white dark:bg-gray-800 mt-6 shadow-md rounded-lg p-6'>
                <div>
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
                <div className='max-w-2xl mx-auto mt-6'> 
                    {
                        !loading ? (
                            tweets.length > 0 ? (
                                <div className="flex flex-col gap-6 items-center mt-5">
                                    {tweets.map(tweet => (
                                        <div 
                                        key={tweet._id} 
                                        className='bg-white dark:bg-gray-800 p-6 rounded-lg shadow-md hover:shadow-lg transition-all duration-300 w-full max-w-2xl min-h-[250px]'>
                                            <Post 
                                            avatar={tweet.owner[0].avatar} 
                                            username={tweet.owner[0].username} 
                                            fullName={tweet.owner[0].fullName} 
                                            createdAt={useTimeAgo(tweet.createdAt)} 
                                            content={tweet.content} 
                                            image={tweet.image || ""}
                                            likesCount={tweet.likesCount}
                                            isLikedByCurrentUser={tweet.isLikedByCurrentUser}
                                            onLikeToggle={() => submit(tweet._id)} />
                                        </div>
                                    ))}
                                </div>
                            ) : (
                                <p className="text-center text-gray-500 dark:text-gray-400">No posts available</p>
                            )
                        ) : (
                            <TweetProfileSkeleton />
                        )
                    }
                </div>
            </div>
        </div>
    );
};

export default Profile;