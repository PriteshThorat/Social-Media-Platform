import { useNavigate } from 'react-router-dom';
import { Button, TinyMCE, InputBox } from './index';
import { useSelector } from 'react-redux';
import { useForm } from 'react-hook-form';
import service from '../appwrite/config';
import { ID } from 'appwrite';
import { useState } from 'react';

const TextEditor = ({ postTweet, handleImagePreview }) => {
    const [previewUrl, setPreviewUrl] = useState('')

    const navigate = useNavigate();
    const storedUser = JSON.parse(localStorage.getItem("userData"));

    const { register, handleSubmit, setValue, control, getValues, reset } = useForm({
        defaultValues: {
            content: ""
        }
    });

    /*
            reset({ content: "", image: "" }); 
            setValue("content", "");

    */

    return (
        <form 
        onSubmit={handleSubmit(postTweet)}
        className='bg-white/30 dark:bg-gray-800 dark:bg-opacity-30 backdrop-blur-md shadow-lg rounded-lg p-6 w-full max-w-full sm:max-w-3xl mx-auto mt-8 border border-gray-200 dark:border-gray-700 px-4'>
            <div className='bg-white dark:bg-gray-900 rounded-lg shadow-md p-4 w-full mx-auto'>
                <TinyMCE 
                    name="content"
                    control={control} 
                    defaultValue={getValues('content')} />
                {
                    previewUrl && (
                        <div className='mt-4'>
                            <img src={previewUrl} alt="Posted Image" className='rounded-lg w-full'/>
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
                            if (e.target.files.length > 0) {
                                const file = e.target.files[0];

                                setPreviewUrl(URL.createObjectURL(file));
                            }
                
                            setValue("image", e.target.files);
                            
                            return handleImagePreview(e); 
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