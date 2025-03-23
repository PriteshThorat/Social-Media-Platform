import { IoMdArrowRoundBack } from "react-icons/io";
import { Profile as ProfileInfo } from '../components/index';
import Post from '../components/Post';
import service from '../appwrite/config';
import { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { useNavigate } from 'react-router-dom';
import useTimeAgo from '../hooks/useTimeAgo';
import { ThemeBtn } from '../components/index';

const Profile = () => {
    const [tweets, setTweets] = useState([]);
    const [profileImgCode, setProfileImgCode] = useState('');
    const [profileUrl, setProfileUrl] = useState('');
    const [postImgUrls, setPostImgUrls] = useState({});
    const [personalInfo, setPerrsonalInfo] = useState([]);

    const navigate = useNavigate();

    const { userId } = useParams();

    useEffect(() => {
        (
            async() => {
                try{
                    const data = await service.getPosts();
                    if(data){
                        const userTweets = data.documents
                        .filter(tweet => tweet.user_id === userId)
                        .sort((a, b) => new Date(b.$createdAt) - new Date(a.$createdAt));

                        setTweets(userTweets);
                    }

                    const email = `${userId.replace(/@/, '')}@gmail.com`;

                    const user = await service.getUserByEmail(email);
                    if(user){
                        setPerrsonalInfo(user);
                        setProfileImgCode(user.profile_code);
                    }
                }catch(error){
                    console.log(error);
                }
            }
        )()
    }, []);

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

        //To get Profile Picture URL
        service.getProfileFilePreview(profileImgCode)
        .then(url => {
            if(url){
                setProfileUrl(url);
            }
        })
        .catch(err => {
            console.log("At Profile: ", err);
        })
    }, [profileImgCode]);

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
                    <ProfileInfo src={profileUrl} alt="Profile Img" name={personalInfo.username} id={userId} key={personalInfo.$id}/>
                </div>
                <div className='max-w-2xl mx-auto mt-6'> 
                    {
                        tweets.length > 0 ? (
                            <div className="flex flex-col gap-6 items-center mt-5">
                                {tweets.map(tweet => tweet.user_id == userId ? (
                                    <div 
                                    key={tweet.$id} 
                                    className='bg-white dark:bg-gray-800 p-6 rounded-lg shadow-md hover:shadow-lg transition-all duration-300 w-full max-w-2xl min-h-[250px]'>
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
                                ) : "")}
                            </div>
                        ) : (
                            <p className="text-center text-gray-500 dark:text-gray-400">No posts available</p>
                        )
                    }
                </div>
            </div>
        </div>
    );
};

export default Profile;