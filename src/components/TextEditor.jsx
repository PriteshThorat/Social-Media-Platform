import { Button, TinyMCE, InputBox } from './index';
import { useForm } from 'react-hook-form';
import service from '../service/config';
import { useState } from 'react';

const TextEditor = ({ onUpdate }) => {
    const [previewUrl, setPreviewUrl] = useState('')
    const [file, setFile] = useState(null)
    const [error, setError] = useState('')

    const { register, handleSubmit, setValue, control, getValues, reset } = useForm({
        defaultValues: {
            content: ""
        }
    });

    const postTweet = async(data) => {
        setError('')

        try {
            const { content } = data

            await service.uploadTweet({ content, image: file })

            reset({ content: "", image: "" }); 
            setValue("content", "");
            setValue("image", "")

            setPreviewUrl("");
            setError('')
            setFile(null);


            onUpdate()
        } catch (err) {
            setError(err || 'An error occurred')
            console.log(err)
        }
    }

    return (
        <form 
        onSubmit={handleSubmit(postTweet)} >
                <TinyMCE 
                    name="content"
                    control={control} 
                    defaultValue={getValues('content')} />
                {
                    previewUrl && (
                        <div className='mt-4'>
                            <img 
                            src={previewUrl} 
                            loading="lazy"
                            alt="Posted Image" 
                            className='rounded-lg w-full'/>
                        </div>
                    )
                }
                {error && <p className="text-red-500 mt-2 text-sm">{error.toString()}</p>}
                <div className='mt-4 flex flex-col sm:flex-row items-center sm:items-start space-y-4 sm:space-y-0 sm:space-x-4'>
                    <div className="w-full">
                        <label 
                            htmlFor='upload-image'
                            className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                                Upload Image
                        </label>
                        <InputBox 
                        id="upload-image"
                        autocomplete="upload-image"
                        placeholder="" 
                        type="file" 
                        className="w-full bg-gradient-to-r bg-[#FD7014] dark:bg-[#580EF6] px-5 py-2 rounded-lg shadow-md hover:shadow-lg transition-all duration-300 hover:scale-105"
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
                                setFile(file)
                            }
                
                            setValue("image", e.target.files);
                        }} />
                    </div>
                    <Button 
                    text="Post" 
                    className="w-full sm:w-auto bg-gradient-to-r bg-[#FD7014] dark:bg-[#580EF6] px-5 py-2 rounded-lg shadow-md hover:shadow-lg transition-all duration-300 hover:scale-105" type="submit"/>
                </div>
        </form>
    );
};

export default TextEditor;