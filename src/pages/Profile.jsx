import Logo from '../components/Logo';
import { IoMdArrowRoundBack } from "react-icons/io";
import { Profile as ProfileInfo } from '../components/index';
import Post from '../components/Post';
import service from '../appwrite/config';
import { useEffect, useState } from 'react';
import { useSelector } from 'react-redux';

const Profile = () => {
    const [tweets, setTweets] = useState([]);
    const [profileImgCode, setProfileImgCode] = useState('');
    const [mediaImgCode, setMediaImgCode] = useState('');
    const [profileUrl, setProfileUrl] = useState('');
    const [mediaUrl, setMediaUrl] = useState('');

    //For Storing User Unique ID to Show Specific Data
    const loginID = useSelector(state => state.auth.userData.$id);

    useEffect(() => {
        service.getPosts()
        .then(posts => {
            if(posts && (posts.documents.$id == loginID)){
                //Store the Data of all Posts in form of JSON
                setTweets(posts.documents);
                //To get Profile Pictur Code
                setProfileImgCode(posts.documents.profile_code);
                //To get Posted Image Code
                setMediaImgCode(posts.documents.media_code);
            }
        });
    }, []);

    useEffect(() => {
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

        //To get Posted Image URL
        service.getProfileFilePreview(mediaImgCode)
        .then(url => {
            if(url){
                setMediaUrl(url);
            }
        })
        .catch(err => {
            console.log("At Profile: ", err);
        })
    }, [profileUrl, mediaUrl]);

    return (
        <div>
            <div>
                <Logo/>
            </div>
            <div>
                <div>
                    <button>
                        <IoMdArrowRoundBack />
                    </button>
                </div>
                <div>
                    {
                        tweets.map(tweet => tweet.$id == loginID ? (
                            <ProfileInfo src={profileUrl} alt="Profile Img" name={tweet.username} id={tweet.user_id} key={tweet.$id}/>
                        ) : "")
                    }
                </div>
                <div>
                    {
                        tweets.map(tweet => (
                            <div key={tweet.$id}>
                                <Post 
                                src={profileUrl} 
                                userName={tweet.username} 
                                userId={tweet.user_id} 
                                createdAt={tweet.$updatedAt} 
                                context={tweet.content} 
                                postImgSrc={mediaUrl}
                                likes={tweet.likes} />
                            </div>
                        ))
                    }
                </div>
            </div>
        </div>
    );
};

export default Profile;