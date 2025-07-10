import { TextEditor } from '../components/index';
import Post from '../components/Post';
import service from '../service/config';
import { useEffect, useState } from 'react';
import useTimeAgo from '../hooks/useTimeAgo';
import { HomeSkeleton } from '../Skeletons/index'

const Home = () => {
    const [tweets, setTweets] = useState([]);
    const [loading, setLoading] = useState(true)

    const submit = async(tweetId) => {
        try {
            await service.updateLikes({ tweetId })

            const data = await service.getPosts();
            setTweets(data?.data);
        } catch (error) {
            console.log(error)
        }
    }

    const update = async() => {
        try {
            const data = await service.getPosts();
            setTweets(data?.data);
        } catch (error) {
            console.log(error)
        }
    }

    useEffect(() => {
        (async() => {
            try {
                const data = await service.getPosts()

                setTweets(data?.data)
            } catch(error) {
                console.log(error)
            } finally {
                setLoading(false)
            }
        })();
    }, []);
    
    return (
        <div 
        className='min-h-screen bg-gray-100 dark:bg-[#1A1C22] px-4'>
            <div className='mx-auto w-full max-w-3xl'>
                <div className='bg-white dark:bg-[#3D3A50] shadow-md rounded-lg p-5 mt-5'>
                    <TextEditor onUpdate={update}/>
                </div>
            {
                !loading ? (
                    (tweets.length > 0) ? (
                        <div className="flex flex-col gap-2 p-5 mt-5">
                        {tweets.map(tweet => (
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
                                    key={tweet._id} />
                        ))}
                        </div>
                    ) : (
                        <p 
                        className='text-gray-500 dark:text-[#3A4F50] text-center mt-10'>
                            No posts available
                        </p>
                    )
                    ) : (
                        <HomeSkeleton />
                    )
            }
                </div>
            </div>
    );
};

export default Home;