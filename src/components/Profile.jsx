import ProfilePicture from './ProfilePicture'
import { FaCamera } from "react-icons/fa";

const Profile = ({src, alt}) => {
    return (
        <div className='flex justify-center'>
            <div className='border border-gray-300 rounded-lg p-4 w-full max-w-sm bg-white shadow-md'>
                <div className='flex flex-col items-start gap-2'>
                    <div className='relative w-24 h-24'>
                        <ProfilePicture 
                        src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTtnvAOajH9gS4C30cRF7rD_voaTAKly2Ntaw&s" 
                        alt="" 
                        className="w-24 h-24 border-4 border-blue-500 shadow-lg" />
                        <button className='absolute bottom-1 right-1 bg-blue-500 hover:bg-blue-600 text-white p-2 rounded-full shadow-md transition-all duration-200 ease-in-out'>
                            <FaCamera className='w-5 h-5'/>
                        </button>
                    </div>
                    <p className='text-lg font-semibold text-gray-800 mt-2'>Name</p>
                    <p className='text-gray-600'>@id</p>
                </div>
            </div>
        </div>
    );
};

export default Profile;