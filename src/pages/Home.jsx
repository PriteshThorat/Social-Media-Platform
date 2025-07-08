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
            setTweets(data.data);
        } catch (error) {
            console.log(error)
        }
    }

    const update = async() => {
        try {
            const data = await service.getPosts();
            setTweets(data.data);
        } catch (error) {
            console.log(error)
        }
    }

    useEffect(() => {
        (async() => {
            try {
                const data = await service.getPosts()

                setTweets(data.data)
            } catch(error) {
                console.log(error)
            } finally {
                setLoading(false)
            }
        })();
    }, []);
    
    return (
        <div 
        className='min-h-screen bg-gray-100 dark:bg-gray-900 px-4'>
            <div 
            className='bg-white dark:bg-gray-800 shadow-md rounded-lg p-5 mx-auto mt-5 w-full max-w-3xl'>
                <TextEditor onUpdate={update}/>
            </div>
            {
                !loading ? (
                    (tweets.length > 0) ? (
                        <div className="flex flex-col gap-6 items-center mt-5">
                        {tweets.map(tweet => (
                                <div 
                                className='bg-white dark:bg-gray-800 p-6 rounded-lg shadow-md hover:shadow-lg transition-all duration-300 w-full max-w-full sm:max-w-2xl min-h-[250px]'
                                key={tweet._id}>
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
                        <p 
                        className='text-gray-500 dark:text-gray-400 text-center mt-10'>
                            No posts available
                        </p>
                    )
                    ) : (
                        <HomeSkeleton />
                    )
            }
            </div>
    );
};

export default Home;