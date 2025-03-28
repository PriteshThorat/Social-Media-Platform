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
    }, [userId, id]);

    const updateLikes = async(e) => {
        e.preventDefault();
        const email = `${userId.replace(/@/, '')}@gmail.com`;
        const user = await service.getUserByEmail(email);
        if (user) {
            // Assume you've fetched the post's current likes count in updatedLikes.
            let newGlobalLikes;
            let likedTo = user.likedTweet || [];

            if (!likedTo.includes(id)) {
                // User likes the post.
                likedTo.push(id);
                newGlobalLikes = updatedLikes + 1;
                setToggle(true);
            } else {
                // User unlikes the post.
                likedTo = likedTo.filter(uid => uid !== id);
                newGlobalLikes = Math.max(updatedLikes - 1, 0);
                setToggle(false);
            }

            // Update the user's liked tweets list in their profile if needed.
            await service.updateLikedTweets(user.$id, { likedTweet: likedTo });
            // Update the global likes field for the post.
            const data = await service.updateLikes(id, { likes: newGlobalLikes });
            if (data) setUpdatedLikes(newGlobalLikes);
        }
        /*e.preventDefault();

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
        }*/
    };

    return (
        <>
            <div className="bg-white dark:bg-gray-800 rounded-lg shadow-md p-3 sm:p-4 w-full max-w-xl mx-auto my-4">
                <div className="flex flex-col sm:flex-row items-start sm:items-center gap-3">
                    <Link to={`/profile/${userId}`} >
                        <ProfilePicture 
                        src={imgUrl} 
                        alt="" 
                        className="w-12 h-12 border border-gray-400 dark:border-gray-600 shadow-sm"/>
                    </Link>
                    <div className="w-full">
                        <div className="flex flex-wrap items-center gap-2 text-gray-700 dark:text-gray-300 text-sm">
                            <div 
                            className="font-semibold" >
                                {userName}
                            </div>
                            <span 
                            className="text-gray-500 dark:text-gray-400" >
                                {userId}
                            </span>
                            <span 
                            className="text-gray-400 dark:text-gray-500">
                                •
                            </span>
                            <p 
                            className="text-gray-500 dark:text-gray-400">
                                {createdAt}
                            </p>
                        </div>
                        <div
                        className="text-gray-800 dark:text-gray-200 mt-1" >
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