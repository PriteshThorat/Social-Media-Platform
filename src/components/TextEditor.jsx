import { useNavigate } from 'react-router-dom';
import { Button, TinyMCE, InputBox } from './index';
import { useSelector } from 'react-redux';
import { useForm } from 'react-hook-form';
import service from '../appwrite/config';
import { ID } from 'appwrite';
import { useState } from 'react';

const TextEditor = () => {
    const [imgUrl, setImgUrl] = useState('');
    const [imgCode, setImgCode] = useState('');
    const [testUpload, setTestUpload] = useState(false);

    const navigate = useNavigate();
    const storedUser = JSON.parse(localStorage.getItem("userData"));
    const userData = storedUser || useSelector(state => state.auth.userData);

    const { register, handleSubmit, setValue, control, getValues, reset } = useForm({
        defaultValues: {
            content: ""
        }
    });

    const submit = async(data) => {
        const user = await service.getUserByEmail(userData.email);

        console.log(user);
        if(user){
            const dbPost = await service.createTweet({
                slug: ID.unique(),
                user_id: `@${userData.email.replace(/@(.*)/, "")}`,
                content: data.content,
                media_code: imgCode,
                username: userData.name,
                profile_code: user.profile_code
            });
            console.log(dbPost);
    
            reset({ content: "", image: "" }); 
            setValue("content", "");
            setImgCode(""); 
            setImgUrl(""); 

            navigate(0);
        }
    };

    const handleImagePreview = async(event) => {
        setImgCode("");

        const file = event.target.files[0];

        if (file) {
            const reader = new FileReader();

            reader.onloadend = () => {
                setImgUrl(reader.result);
            };

            reader.readAsDataURL(file);
        }

        const fileId = await service.uploadTweetFile(file);
        setImgCode(fileId.$id);
    };

    return (
        <form 
        onSubmit={handleSubmit(submit)}
        className='bg-white/30 dark:bg-gray-800 dark:bg-opacity-30 backdrop-blur-md shadow-lg rounded-lg p-6 w-full max-w-full sm:max-w-3xl mx-auto mt-8 border border-gray-200 dark:border-gray-700 px-4'>
            <div className='bg-white dark:bg-gray-900 rounded-lg shadow-md p-4 w-full mx-auto'>
                <TinyMCE 
                name="content"
                control={control} 
                defaultValue={getValues('content')} />
                {
                    imgUrl && (
                        <div className='mt-4'>
                            <img src={imgUrl} alt="Posted Image" className='rounded-lg w-full'/>
                        </div>
                    )
                }
                <div className='mt-4 flex flex-col sm:flex-row items-center sm:items-start space-y-4 sm:space-y-0 sm:space-x-4'>
                    <div className="w-full">
                        <label 
                        className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                            Upload Image
                        </label>
                        <InputBox 
                        placeholder="" 
                        type="file" 
                        className="w-full bg-gradient-to-r from-blue-500 to-indigo-600 text-white px-5 py-2 rounded-lg shadow-md hover:shadow-lg transition-all duration-300 hover:scale-105"
                        accept="image/png, image/jpg, image/jpeg, image/gif"
                        {
                            ...register("image", {
                                required: false
                            })
                        }
                        onChange={(e) => {
                            handleImagePreview(e); 
                            setValue("image", e.target.files);
                        }} />
                    </div>
                    <Button 
                    text="Post" 
                    className="w-full sm:w-auto bg-gradient-to-r from-blue-500 to-indigo-600 text-white px-5 py-2 rounded-lg shadow-md hover:shadow-lg transition-all duration-300 hover:scale-105" type="submit"/>
                </div>
            </div>
        </form>
    );
};

export default TextEditor;