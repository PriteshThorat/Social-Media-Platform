import { TextEditor } from '../components/index';
import Post from '../components/Post';
import service from '../appwrite/config';
import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useSelector } from 'react-redux';
import useTimeAgo from '../hooks/useTimeAgo';

const Home = () => {
    const [tweets, setTweets] = useState([]);
    const [imgCode, setImgCode] = useState('');
    const [postImgUrls, setPostImgUrls] = useState({});

    const navigate = useNavigate();

    const status = useSelector(state => state.auth.status);
    const userData = useSelector(state => state.auth.userData);

    const data = async(email) => {
        return await service.getUserByEmail(email);
    }

    useEffect(() => {
        if(!status){
            navigate('/login');
        }

        service.getPosts()
        .then(posts => {
            if(posts){
                //Store the Data of all Posts in form of JSON
                const userTweets = posts.documents
                .sort((a, b) => new Date(b.$createdAt) - new Date(a.$createdAt));

                setTweets(userTweets);
            }
        });

        if(userData){
            (async () => {
                try {
                    const user = await data(userData.email);

                    if (user) {
                        setImgCode(user.profile_code);
                    }
                } catch (err) {
                    console.error("Error fetching user data:", err);
                }
            })();
        }
    }, []);

    useEffect(() => {
        const fetchPostImages = async () => {
            const urls = {};
            for (let tweet of tweets) {
                if (tweet.media_code) {
                    urls[tweet.$id] = await getPostImgPreview(tweet.media_code);
                }
            }
            setPostImgUrls(urls);
        };
    
        if (tweets.length > 0) {
            fetchPostImages();
        }
    }, [tweets]);

    const getPostImgPreview = async(code) => {
        //To get the URL for Posted Image
        try {
            const url = await service.getTweetFilePreview(code);
            return url || "";
        } catch (err) {
            console.log("Error fetching post image:", err);
            return "";
        }
    };
    
    return (
        <div 
        className='min-h-screen bg-gray-100 dark:bg-gray-900 px-4'>
            <div 
            className='bg-white dark:bg-gray-800 shadow-md rounded-lg p-5 mx-auto mt-5 w-full max-w-3xl'>
                <TextEditor/>
            </div>
            {
                (tweets.length > 0) ? (
                    <div className="flex flex-col gap-6 items-center mt-5">
                    {tweets.map(tweet => (
                            <div 
                            className='bg-white dark:bg-gray-800 p-6 rounded-lg shadow-md hover:shadow-lg transition-all duration-300 w-full max-w-full sm:max-w-2xl min-h-[250px]'
                            key={tweet.$id}>
                                <Post 
                                imgCode={tweet.profile_code} 
                                userName={tweet.username} 
                                userId={tweet.user_id} 
                                createdAt={useTimeAgo(tweet.$updatedAt)} 
                                context={tweet.content} 
                                postImgSrc={postImgUrls[tweet.$id] || ""}
                                likes={tweet.likes}
                                id={tweet.$id} />
                            </div>
                    ))}
                    </div>
                ) : (
                    <p 
                    className='text-gray-500 dark:text-gray-400 text-center mt-10'>
                        No posts available
                    </p>
                )
            }
            </div>
    );
};

export default Home;