import { Editor } from '@tinymce/tinymce-react';
import conf from '../conf/conf';
import Button from './Button';
import { Controller } from 'react-hook-form';

const TinyMCE = ({control, defaultValue}) => {
    return (
        <Controller
        name='content'
        control={control}
        render={({ field: { onChange } }) => (
            <Editor
            initialValue={defaultValue}
            readOnly={false}
            onEditorChange={onChange}
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
            />
        )} />
    );
};

export default TinyMCE;