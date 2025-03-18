import Logo from '../components/Logo';
import { IoMdArrowRoundBack } from "react-icons/io";
import Profile from '../components/Profile';
import Post from '../components/Post';

const Profile = () => {
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
                    <Profile />
                </div>
                <div>
                    <Post/>
                </div>
            </div>
        </div>
    );
};

export default Profile;