import ProfilePicture from './ProfilePicture'
import { FaCamera } from "react-icons/fa";

const Profile = ({src, alt, name, id}) => {
    return (
        <div className='flex justify-center bg-gray-100 dark:bg-gray-900'>
            <div className='border border-gray-300 dark:border-gray-700 rounded-lg p-8 w-full max-w-2xl bg-white dark:bg-gray-800 shadow-lg'>
                <div className='flex flex-col items-center gap-4'>
                    <div className='relative w-40 h-40'>
                        <ProfilePicture 
                        src={src}
                        alt={alt}
                        className="w-40 h-40 border-4 border-blue-500 shadow-xl rounded-full object-cover" />
                    </div>
                    <div className='text-center mt-4'>
                        <p 
                        className='text-2xl font-bold text-gray-900 dark:text-gray-200'>
                            {name}
                        </p>
                        <p 
                        className='text-lg text-gray-600 dark:text-gray-400 mt-1'>
                            User ID: {id}
                        </p>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Profile;