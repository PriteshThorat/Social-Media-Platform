import { DislikeBtn, LikeBtn, ProfilePicture } from './index';
import service from '../appwrite/config';
import parse from 'html-react-parser';
import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom'

const Post = ({imgCode, userName, userId, createdAt, context, postImgSrc, likes, id}) => {
    const [countLikes, setCountLikes] = useState(likes);
    //If Not Liked = True && If Liked = False
    const [toggle, setToggle] = useState(true);
    const [imgUrl, setImgUrl] = useState('');
    const [updatedLikes, setUpdatedLikes] = useState(likes);

    const getUser = async() => {
        const email = `${userId.replace(/@/, '')}@gmail.com`;
        const user = await service.getUserByEmail(email);

        return user;
    }

    useEffect(() => {
        if(imgCode){
            //To get Profile Picture URL
            service.getProfileFilePreview(imgCode)
            .then(url => {
                if(url){
                    setImgUrl(url);
                }
            })
            .catch(err => {
                console.log("At Profile: ", err);
            })
        }
    }, []);

    useEffect(() => {
        const fetchUser = async () => {
            const email = `${userId.replace(/@/, '')}@gmail.com`;
            const user = await service.getUserByEmail(email);

            if (user) {
                let likedTweets = user.likedTweet || [];
                setToggle(likedTweets.includes(id));
            }
        };

        fetchUser();
    }, [id, userId]);

    const updateLikes = async(e) => {
        e.preventDefault();

        const email = `${userId.replace(/@/, '')}@gmail.com`;
        const user = await service.getUserByEmail(email);

        if(user){
            const userID = user.$id;
                let likedTweets = user.likedTweet || [];
                let newLikes = updatedLikes;

                if (!likedTweets.includes(id)) {
                    likedTweets.push(id);
                    newLikes += 1;
                    setToggle(true);
                } else {
                    likedTweets = likedTweets.filter(tweetId => tweetId !== id);
                    newLikes = Math.max(newLikes - 1, 0); // Prevent going below 0
                    setToggle(false);
                }

                // Update user liked tweets
                await service.updateLikedTweets(userID, { likedTweet: likedTweets });

                // Update post likes in the database
                const data = await service.updateLikes(id, { likes: newLikes });

                if (data) setUpdatedLikes(newLikes);
        }
    };

    return (
        <>
            <div className="bg-white rounded-lg shadow-md p-4 max-w-lg mx-auto my-4">
                <div className="flex items-center gap-3">
                    <Link to={`/profile/${userId}`} >
                        <ProfilePicture 
                        src={imgUrl} 
                        alt="" 
                        className="w-12 h-12 border border-gray-400 shadow-sm"/>
                    </Link>
                    <div>
                        <div className="flex items-center gap-2 text-gray-700 text-sm">
                            <div 
                            className="font-semibold" >
                                {userName}
                            </div>
                            <span 
                            className="text-gray-500" >
                                {userId}
                            </span>
                            <span 
                            className="text-gray-400">
                                •
                            </span>
                            <p 
                            className="text-gray-500">
                                {createdAt}
                            </p>
                        </div>
                        <div
                        className="text-gray-800 mt-1" >
                            {parse(context)}
                        </div>
                    </div>
                </div>
                {
                    postImgSrc && (
                        <div className="mt-3 flex justify-center">
                            <img 
                            className="w-full max-h-96 object-cover rounded-md"
                            src={postImgSrc} 
                            alt=""/>
                        </div>
                    )
                }
                <div className="mt-2">
                    <form
                    onSubmit={updateLikes} >
                        {
                            !toggle ? (
                                <DislikeBtn likes={updatedLikes}/>
                            ) : (
                                <LikeBtn likes={updatedLikes}/>
                            )
                        }
                    </form>
                </div>
            </div>
        </>
    );
};

export default Post;