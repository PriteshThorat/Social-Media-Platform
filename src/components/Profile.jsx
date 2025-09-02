import ProfilePicture from './ProfilePicture'

const Profile = ({avatar, alt, fullName, username}) => {
    return (
        <div className='bg-gradient-to-br from-blue-50 via-white to-indigo-50 dark:from-gray-900 dark:via-gray-800 dark:to-gray-900 flex items-center justify-center p-4'>
    <div className='w-full max-w-2xl'>
        
        {/* Main Profile Card */}
        <div className='relative bg-white/80 dark:bg-gray-800/80 backdrop-blur-xl border border-white/20 dark:border-gray-700/30 rounded-3xl shadow-2xl overflow-hidden'>
            
            {/* Background Pattern */}
            <div className='absolute inset-0 bg-gradient-to-br from-blue-500/10 via-purple-500/5 to-indigo-500/10 dark:from-blue-600/20 dark:via-purple-600/10 dark:to-indigo-600/20'></div>
            <div className='absolute inset-0 bg-[radial-gradient(circle_at_1px_1px,rgba(255,255,255,0.4)_1px,transparent_0)] dark:bg-[radial-gradient(circle_at_1px_1px,rgba(255,255,255,0.1)_1px,transparent_0)] bg-[length:20px_20px]'></div>
            
            {/* Header Decoration */}
            <div className='relative h-32 bg-gradient-to-r from-blue-600 via-purple-600 to-indigo-600 dark:from-blue-500 dark:via-purple-500 dark:to-indigo-500'>
                <div className='absolute inset-0 bg-black/20'></div>
                <div className='absolute inset-0 bg-gradient-to-b from-transparent to-white/10'></div>
                
                {/* Floating Elements */}
                <div className='absolute top-4 right-4 w-16 h-16 bg-white/10 rounded-full blur-xl'></div>
                <div className='absolute bottom-2 left-8 w-12 h-12 bg-white/5 rounded-full blur-lg'></div>
            </div>
            
            {/* Content Container */}
            <div className='relative px-8 pb-12 -mt-16'>
                
                {/* Profile Picture Section */}
                <div className='flex justify-center'>
                    <div className='relative group'>
                        <div className='w-44 h-44 rounded-full p-1 bg-gradient-to-r from-blue-500 via-purple-500 to-indigo-500 shadow-2xl'>
                            <div className='w-full h-full rounded-full bg-white dark:bg-gray-800 p-1'>
                                <ProfilePicture
                                    src={avatar}
                                    alt={alt}
                                    className="w-full h-full rounded-full object-cover shadow-lg ring-4 ring-white dark:ring-gray-800"
                                />
                            </div>
                        </div>
                        
                        {/* Status Indicator */}
                        <div className='absolute bottom-4 right-4 w-6 h-6 bg-green-500 border-4 border-white dark:border-gray-800 rounded-full shadow-lg animate-pulse'></div>
                        
                        {/* Hover Effect Ring */}
                        <div className='absolute inset-0 rounded-full ring-0 ring-blue-400/50 group-hover:ring-8 transition-all duration-500 ease-out'></div>
                    </div>
                </div>
                
                {/* Profile Information */}
                <div className='text-center mt-8 space-y-4'>
                    <div>
                        <h1 className='text-3xl font-bold text-gray-900 dark:text-white mb-2 tracking-tight'>
                            {fullName}
                        </h1>
                        <p className='text-lg text-blue-600 dark:text-blue-400 font-medium flex items-center justify-center gap-2'>
                            <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 20 20">
                                <path d="M2.003 5.884L10 9.882l7.997-3.998A2 2 0 0016 4H4a2 2 0 00-1.997 1.884z"></path>
                                <path d="M18 8.118l-8 4-8-4V14a2 2 0 002 2h12a2 2 0 002-2V8.118z"></path>
                            </svg>
                            @{username}
                        </p>
                    </div>
                </div>
            </div>
        </div>
    </div>
</div>
    );
};

export default Profile;