import { TextEditor } from '../components/index';
import Post from '../components/Post';
import service from '../appwrite/config';
import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useSelector } from 'react-redux';

const Home = () => {
    const [tweets, setTweets] = useState([]);
    const navigate = useNavigate();

    const status = useSelector(state => state.auth.status);

    useEffect(() => {
        
        service.getPosts()
        .then(posts => {
            if(posts){
                //Store the Data of all Posts in form of JSON
                setTweets(posts.documents);
            }
        });

        if(!status){
            navigate('/login');
        }
    }, []);

    const getImgPreview = (code) => {
        //To get the URL for Profile Image and Posted Image
        service.getProfileFilePreview(code)
        .then(url => {
            if(url){
                return url;
            }
        })
        .catch(err => {
            console.log("At src\page\Home: ", err);
            return "";
        });
    };
    
    return (
        <div 
        className='min-h-screen bg-gray-100'>
            <div 
            className='bg-white shadow-md rounded-lg p-5 mx-auto mt-5 w-full max-w-2xl'>
                <TextEditor/>
            </div>
            {
                (tweets.length > 0) ? (
                    tweets.map(tweet => (
                            <div 
                            className='bg-white p-5 rounded-lg shadow-md hover:shadow-lg transition-all duration-300'
                            key={tweet.$id}>
                                <Post 
                                src={getImgPreview(tweet.profile_code)} 
                                userName={tweet.username} 
                                userId={tweet.user_id} 
                                createdAt={tweet.$updatedAt} 
                                context={tweet.content} 
                                postImgSrc={getImgPreview(tweet.media_code)}
                                likes={tweet.likes} />
                            </div>
                    ))
                ) : (
                    <p 
                    className='text-gray-500 text-center mt-10'>
                        No posts available
                    </p>
                )
            }
            </div>
    );
};

export default Home;