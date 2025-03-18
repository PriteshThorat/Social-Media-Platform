import Button from './Button';

const AddProfileImg = () => {
    return (
        <div className="flex items-center justify-center min-h-screen bg-gray-100">
            <div className="bg-white p-6 rounded-lg shadow-md max-w-sm mx-auto text-center">
                <h2 className="text-lg font-semibold text-gray-800 mb-2">Add Profile Picture</h2>
                <p className="text-gray-500 mb-4">Name</p>

                <label 
                htmlFor="upload" 
                className="cursor-pointer flex flex-col items-center justify-center border-2 border-dashed border-gray-300 rounded-lg p-6 hover:border-blue-500 transition">
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
                </label>
                <span className="text-gray-600">Click to upload</span>
                <input 
                id="upload" 
                type="file" 
                className="hidden" />
            </div>
            <div className='mt-6'>
                <Button text="Go to Homepage"/>
            </div>
        </div>
    );
};

export default AddProfileImg;