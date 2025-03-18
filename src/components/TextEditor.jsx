import { Editor } from '@tinymce/tinymce-react';
import conf from '../conf/conf';
import Button from './Button';

const TextEditor = () => {
    return (
        <div className='bg-white rounded-lg shadow-md p-4 w-full max-w-xl mx-auto'>
            <Editor
            apiKey={conf.tinyMceApiKey}
            init={{
                height: 200,
                menubar: false, 
                branding: false, 
                toolbar: 'bold italic underline | link | emoticons | removeformat', 
                plugins: 'autolink link emoticons',
                placeholder: "What's happening?",
                content_style: "body { font-size: 16px; font-family: Arial, sans-serif; }",
            }}
            initialValue=""
            />
            <div className='mt-4 flex justify-end'>
                <Button text="Post" className=""/>
            </div>
        </div>
    );
};

export default TextEditor;