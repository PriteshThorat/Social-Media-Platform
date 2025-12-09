import { Button, TinyMCE, InputBox } from './index';
import { useForm } from 'react-hook-form';
import service from '../service/config';
import { useState } from 'react';
import imageCompression from "browser-image-compression";
import { useSelector } from "react-redux";
import { useToast } from './Toast';

const defaultFn = () => {}

const TextEditor = ({ onUpdate, content = "", contentId = "", isUpdatingPost = false, postUpdate = defaultFn}) => {
    const [previewUrl, setPreviewUrl] = useState('')
    const [file, setFile] = useState(null)
    const [error, setError] = useState('')

    const authStatus = useSelector(state => state?.auth?.status);
    const { warning, ToastContainer } = useToast();

    const { register, handleSubmit, setValue, control, getValues, reset } = useForm({
        defaultValues: {
            content
        }
    });

    const updateTweet = async(data) => {
        setError('')

        try {
            const { content } = data

            onUpdate(contentId, content)

            await service.updatePost({ content, tweetId: contentId })

            reset({ content: ""}); 
            setValue("content", "");

            setError('')
        } catch (err) {
            setError(err || 'An error occurred')
            console.log(err)
        }
    }

    const postTweet = async(data) => {
        if(!authStatus){
            warning("Please sign in to share your post", 5000);
            return;
        }
        setError('')

         const options = {
            maxSizeMB: 1,              // target max file size (in MB)
            maxWidthOrHeight: 1024,    // resize if image is too large
            initialQuality: 0.7,       // set quality (0.1 - 1.0)
            useWebWorker: true
        };

        try {
            let compressedFile
            if(file){
                compressedFile = await imageCompression(file, options);
            
                const compressedBlob = URL.createObjectURL(compressedFile);
                setPreviewUrl(compressedBlob);
            }

            const { content } = data

            const _id = `temp-${Date.now()}-${Math.random()}`

            onUpdate(content, previewUrl, _id)

            const tweet = await service.uploadTweet({ content, image: compressedFile })

            postUpdate(tweet.data, _id)

            reset({ content: "", image: "" }); 
            setValue("content", "");
            setValue("image", "")

            setPreviewUrl("");
            setError('')
            setFile(null);
        } catch (err) {
            setError(err || 'An error occurred')
            console.log(err)
        }
    }

    return (
        <>
            <ToastContainer />
            <form onSubmit={handleSubmit(isUpdatingPost ? updateTweet: postTweet)} className="space-y-4">
            {/* Text Editor */}
            <div className="relative">
                <TinyMCE 
                    name="content"
                    control={control} 
                    defaultValue={getValues('content')} 
                />
            </div>
            
            {/* Image Preview */}
            {previewUrl && (
                <div className='relative group'>
                    <div className="rounded-xl overflow-hidden bg-gray-100 dark:bg-gray-800 border-2 border-dashed border-gray-200 dark:border-gray-700">
                        <img 
                            src={previewUrl} 
                            loading="lazy"
                            alt="Preview" 
                            className='w-full max-h-80 object-cover'
                        />
                    </div>
                    <button
                        type="button"
                        onClick={() => {
                            setPreviewUrl("");
                            setFile(null);
                            setValue("image", "");
                        }}
                        className="absolute top-2 right-2 p-1 bg-red-500 text-white rounded-full hover:bg-red-600 transition-colors duration-200 opacity-80 hover:opacity-100"
                    >
                        <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                        </svg>
                    </button>
                </div>
            )}
            
            {/* Error Message */}
            {error && (
                <div className="flex items-center gap-2 p-3 bg-red-50 dark:bg-red-900/20 border border-red-200 dark:border-red-800 rounded-lg">
                    <svg className="w-4 h-4 text-red-500 flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4m0 4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                    </svg>
                    <p className="text-red-600 dark:text-red-400 text-sm">{error.toString()}</p>
                </div>
            )}
            
            {/* Actions Bar */}
            <div className='flex items-center justify-between pt-4 border-t border-gray-100 dark:border-gray-700'>
                {
                    !isUpdatingPost && (
                        /* Upload Section */
                        <div className="flex items-center gap-3">
                            <label 
                                htmlFor='upload-image'
                                className="group flex items-center gap-2 px-4 py-2 text-sm font-medium text-gray-700 dark:text-gray-300 bg-gray-100 dark:bg-gray-700 hover:bg-gray-200 dark:hover:bg-gray-600 rounded-lg transition-all duration-200 cursor-pointer hover:scale-105"
                            >
                                <svg className="w-4 h-4 group-hover:scale-110 transition-transform duration-200" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z" />
                                </svg>
                                Add Photo
                            </label>
                            <InputBox 
                                id="upload-image"
                                autocomplete="upload-image"
                                type="file" 
                                className="hidden"
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
                                }} 
                            />
                            
                            {previewUrl && (
                                <span className="text-xs text-green-600 dark:text-green-400 bg-green-50 dark:bg-green-900/20 px-2 py-1 rounded-full">
                                    Image ready
                                </span>
                            )}
                        </div>
                    )
                }
                
                {/* Post Button */}
                <Button 
                    text={isUpdatingPost ? "Update Post" : "Share Post"}
                    variant="primary"
                    size="medium"
                    icon={
                        <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 19l9 2-9-18-9 18 9-2zm0 0v-8" />
                        </svg>
                    }
                    type="submit"
                />
            </div>
        </form>
        </>
    );
};

export default TextEditor;