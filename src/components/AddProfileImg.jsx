import { ProfilePicture, Button } from './index';
import { useNavigate } from 'react-router-dom';
import { useForm } from 'react-hook-form';
import config from '../appwrite/config';
import authSlice from '../store/authSlice';
import { set } from '../store/authSlice';
import { useDispatch, useSelector } from 'react-redux';
import { useState } from 'react';
import { ID } from 'appwrite';

const AddProfileImg = () => {
    const navigate = useNavigate();

    const storedUser = JSON.parse(localStorage.getItem("userData"));
    const fileCode = JSON.parse(localStorage.getItem("fileCode"));

    const userData = storedUser || useSelector(state => state.auth.userData);
    const dispatch = useDispatch();

    const [previewUrl, setPreviewUrl] = useState('');

    const { register } = useForm();

    const add = async(e) => {
        e.preventDefault();

        try{
            const account = await config.createUsers({
                slug: ID.unique(),
                username: userData.name,
                email: userData.email,
                profile_code: fileCode.$id
            });

            if(account){
                dispatch(set({
                    username: userData.name,
                    email: userData.email,
                    profiel_code: fileCode.$id
                }));
                navigate("/");
            }
        }catch(error){
            console.log(error);
        }
    };

    const previewImg = async(e) => {
        if (e.target.files.length > 0) {
            const file = e.target.files[0];
            const fileData = await config.uploadProfileFile(file);

            localStorage.setItem("fileCode", JSON.stringify(fileData));
        }
    };

    return (
        <div className="flex items-center justify-center min-h-screen bg-gray-100">
            <form onSubmit={add}>
                <div className="bg-white p-6 rounded-lg shadow-md max-w-sm mx-auto text-center">
                    <h2 className="text-lg font-semibold text-gray-800 mb-2">Add Profile Picture</h2>
                    <p 
                    className="text-gray-500 mb-4">
                        {userData.name}
                    </p>

                    <label 
                    htmlFor="upload" 
                    className="cursor-pointer flex flex-col items-center justify-center border-2 border-dashed border-gray-300 rounded-lg p-6 hover:border-blue-500 transition">
                        {
                            previewUrl ? (
                                <ProfilePicture 
                                src={previewUrl} 
                                alt="Add DP" 
                                className="w-26 h-26 border-4 border-blue-500 shadow-lg"/>
                            ) : (
                                <svg 
                                className="w-12 h-12 text-gray-400 mb-2" 
                                fill="none" stroke="currentColor" 
                                strokeWidth="2" 
                                viewBox="0 0 24 24" 
                                xmlns="http://www.w3.org/2000/svg" >
                                    <path 
                                    strokeLinecap="round" 
                                    strokeLinejoin="round" 
                                    d="M12 4v12m0 0l-3-3m3 3l3-3m-6 3h6M4 12a8 8 0 1116 0 8 8 0 01-16 0z" >
                                    </path>
                                </svg>
                            )
                        }
                    </label>
                    <span className="text-gray-600">Click to upload</span>
                    <input 
                    id="upload" 
                    type="file" 
                    className="hidden"
                    {
                        ...register("dp", {
                            required: true
                        })
                    }
                    onChange={(e) => {
                        if (e.target.files.length > 0) {
                            const file = e.target.files[0];
                            setPreviewUrl(URL.createObjectURL(file));
                        }

                        previewImg(e);
                    }} />
                </div>
                <div className='mt-6'>
                    <Button text="Go to Homepage" type="submit"/>
                </div>
            </form>
        </div>
    );
};

export default AddProfileImg;