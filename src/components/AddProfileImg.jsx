import { ProfilePicture, Button } from './index';
import { useNavigate } from 'react-router-dom';
import { useForm } from 'react-hook-form';
import auth from '../service/auth'
import { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { login as authLogin } from '../store/authSlice';

const AddProfileImg = () => {
    const navigate = useNavigate();
    const dispatch = useDispatch()

    const [file, setFile] = useState(null)
    const [previewUrl, setPreviewUrl] = useState('');
     
    const user = useSelector(state => state?.auth?.user);
    const fullName = user?.data?.fullName
    const avatar = user?.data?.avatar

    const { register } = useForm();

    const submit = async(e) => {
        e.preventDefault();

        try {
            const userData = await auth.updateAvatar({ avatar: file })

            if(userData){
                dispatch(authLogin(userData))

                navigate("/")
            }
        } catch (error) {
            console.log(error);
        }
    };

    return (
        <div className="flex items-center justify-center min-h-screen bg-gray-100 dark:bg-gray-900 px-4">
            <form 
            onSubmit={submit} 
            className="w-full max-w-sm">
                <div className="bg-white dark:bg-gray-800 p-6 rounded-lg shadow-md text-center">
                    <h2 className="text-lg font-semibold text-gray-800 dark:text-gray-200 mb-2">Add Profile Picture</h2>
                    <p 
                    className="text-gray-500 dark:text-gray-400 mb-4">
                        {fullName}
                    </p>

                    <label 
                    htmlFor="upload" 
                    className="cursor-pointer flex flex-col items-center justify-center border-2 border-dashed border-gray-300 dark:border-gray-600 rounded-lg p-6 hover:border-blue-500 transition">
                        {
                            previewUrl ? (
                                <ProfilePicture 
                                src={previewUrl} 
                                alt="Add DP" 
                                className="w-24 h-24 border-4 border-blue-500 shadow-lg"/>
                            ) : (
                                <ProfilePicture 
                                src={avatar}
                                alt="Add DP" 
                                className="w-24 h-24 border-4 border-blue-500 shadow-lg"/>
                            )
                        }
                    </label>
                    <span className="text-gray-600 dark:text-gray-400 block mt-2">Click to upload</span>
                    <input 
                    id="upload" 
                    type="file" 
                    className="hidden"
                    {
                        ...register("dp", {
                            required: false
                        })
                    }
                    onChange={(e) => {
                        if (e.target.files.length > 0) {
                            const file = e.target.files[0];
                            setPreviewUrl(URL.createObjectURL(file));
                            setFile(file)
                        }
                    }} />
                </div>
                <div className='mt-6'>
                    <Button 
                    text="Update Profile Picture" 
                    type="submit" className='w-full bg-blue-600 hover:bg-blue-700 dark:bg-blue-500 dark:hover:bg-blue-600 text-white font-semibold py-2 rounded-md transition duration-300 shadow-md'/>
                </div>
            </form>
        </div>
    );
};

export default AddProfileImg;