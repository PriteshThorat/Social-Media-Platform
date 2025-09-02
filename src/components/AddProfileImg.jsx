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
     
    const user = useSelector(state => state.auth.user);
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
        <div className="flex items-center justify-center min-h-screen bg-gradient-to-br from-blue-50 via-white to-indigo-50 dark:from-gray-900 dark:via-gray-800 dark:to-gray-900 px-4">
            <form 
                onSubmit={submit}
                className="w-full max-w-md">
                
                {/* Main Card */}
                <div className="bg-white dark:bg-gray-800 p-8 rounded-2xl shadow-xl border border-gray-100 dark:border-gray-700 backdrop-blur-sm">
                    
                    {/* Header */}
                    <div className="text-center mb-6">
                        <div className="w-12 h-12 bg-gradient-to-r from-blue-500 to-indigo-600 rounded-full flex items-center justify-center mx-auto mb-4">
                            <svg className="w-6 h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
                            </svg>
                        </div>
                        <h2 className="text-2xl font-bold text-gray-800 dark:text-gray-100 mb-2">
                            Update Profile Picture
                        </h2>
                        <p className="text-gray-600 dark:text-gray-400 text-sm">
                            {fullName}
                        </p>
                    </div>
                    
                    {/* Upload Area */}
                    <div className="mb-6">
                        <label
                            htmlFor="upload"
                            className="group cursor-pointer block">
                            
                            {/* Profile Picture Container */}
                            <div className="relative flex flex-col items-center justify-center">
                                <div className="relative">
                                    {previewUrl ? (
                                        <ProfilePicture
                                            src={previewUrl}
                                            alt="Profile Preview"
                                            className="w-32 h-32 rounded-full border-4 border-white dark:border-gray-700 shadow-lg ring-4 ring-blue-100 dark:ring-blue-900/50 transition-all duration-300 group-hover:ring-blue-200 dark:group-hover:ring-blue-800/50"
                                        />
                                    ) : (
                                        <ProfilePicture
                                            src={avatar}
                                            alt="Current Profile"
                                            className="w-32 h-32 rounded-full border-4 border-white dark:border-gray-700 shadow-lg ring-4 ring-gray-100 dark:ring-gray-700 transition-all duration-300 group-hover:ring-blue-200 dark:group-hover:ring-blue-800/50"
                                        />
                                    )}
                                    
                                    {/* Overlay */}
                                    <div className="absolute inset-0 bg-opacity-0 group-hover:bg-opacity-40 rounded-full transition-all duration-300 flex items-center justify-center">
                                        <div className="opacity-0 group-hover:opacity-100 transition-all duration-300 transform scale-75 group-hover:scale-100">
                                            <div className="bg-white dark:bg-gray-800 rounded-full p-3 shadow-lg">
                                                <svg className="w-5 h-5 text-blue-600 dark:text-blue-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 9a2 2 0 012-2h.93a2 2 0 001.664-.89l.812-1.22A2 2 0 0110.07 4h3.86a2 2 0 011.664.89l.812 1.22A2 2 0 0018.07 7H19a2 2 0 012 2v9a2 2 0 01-2 2H5a2 2 0 01-2-2V9z" />
                                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 13a3 3 0 11-6 0 3 3 0 016 0z" />
                                                </svg>
                                            </div>
                                        </div>
                                    </div>
                                    
                                    {/* Plus Icon for New Upload */}
                                    <div className="absolute -bottom-2 -right-2 bg-blue-600 hover:bg-blue-700 text-white rounded-full p-2 shadow-lg transition-all duration-300 group-hover:scale-110">
                                        <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4v16m8-8H4" />
                                        </svg>
                                    </div>
                                </div>
                                
                                {/* Upload Text */}
                                <div className="mt-4 text-center">
                                    <p className="text-gray-700 dark:text-gray-300 font-medium group-hover:text-blue-600 dark:group-hover:text-blue-400 transition-colors duration-300">
                                        Click to change photo
                                    </p>
                                    <p className="text-xs text-gray-500 dark:text-gray-400 mt-1">
                                        JPG, PNG or GIF (max 5MB)
                                    </p>
                                </div>
                            </div>
                        </label>
                        
                        <input
                            id="upload"
                            type="file"
                            className="hidden"
                            accept="image/*"
                            {...register("dp", { required: false })}
                            onChange={(e) => {
                                if (e.target.files.length > 0) {
                                    const file = e.target.files[0];
                                    setPreviewUrl(URL.createObjectURL(file));
                                    setFile(file);
                                }
                            }}
                        />
                    </div>
                </div>
                
                {/* Action Button */}
                <div className="mt-6">
                    <Button
                        text="Save Profile Picture"
                        type="submit"
                        className="w-full bg-gradient-to-r from-blue-600 to-indigo-600 hover:from-blue-700 hover:to-indigo-700 dark:from-blue-500 dark:to-indigo-500 dark:hover:from-blue-600 dark:hover:to-indigo-600 text-white font-semibold py-3 px-6 rounded-xl transition-all duration-300 shadow-lg hover:shadow-xl transform hover:-translate-y-0.5 disabled:opacity-50 disabled:cursor-not-allowed disabled:transform-none"
                    />
                </div>
                
                {/* Additional Actions */}
                <div className="mt-4 flex justify-center">
                    <button
                        type="button"
                        className="text-gray-500 dark:text-gray-400 hover:text-gray-700 dark:hover:text-gray-200 text-sm font-medium transition-colors duration-300"
                        onClick={() => {
                            setPreviewUrl(null);
                            setFile(null);
                            navigate(-1)
                        }}>
                        Cancel Changes
                    </button>
                </div>
            </form>
        </div>
    );
};

export default AddProfileImg;