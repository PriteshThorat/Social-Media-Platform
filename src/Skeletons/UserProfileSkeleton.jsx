import Skeleton from 'react-loading-skeleton';
import 'react-loading-skeleton/dist/skeleton.css';

const UserProfileSkeleton = () => {
    return (
        <div className='bg-gradient-to-br from-blue-50 via-white to-indigo-50 dark:from-gray-900 dark:via-gray-800 dark:to-gray-900 flex items-center justify-center p-4'>
            <div className='w-full max-w-2xl'>
                {/* Main Profile Card */}
                <div className='relative bg-white/80 dark:bg-gray-800/80 backdrop-blur-xl border border-white/20 dark:border-gray-700/30 rounded-3xl shadow-2xl overflow-hidden animate-pulse'>
                    
                    {/* Header Decoration */}
                    <div className='relative h-32 bg-gradient-to-r from-gray-200 via-gray-300 to-gray-200 dark:from-gray-700 dark:via-gray-600 dark:to-gray-700'>
                        <Skeleton height="100%" />
                    </div>
                    
                    {/* Content Container */}
                    <div className='relative px-8 pb-12 -mt-16'>
                        
                        {/* Profile Picture Section */}
                        <div className='flex justify-center mb-8'>
                            <div className='relative'>
                                <div className='w-44 h-44 rounded-full p-1 bg-gradient-to-r from-gray-200 to-gray-300 dark:from-gray-700 dark:to-gray-600'>
                                    <div className='w-full h-full rounded-full bg-white dark:bg-gray-800 p-1'>
                                        <Skeleton 
                                            circle 
                                            width="100%" 
                                            height="100%" 
                                            className="ring-4 ring-white dark:ring-gray-800" 
                                        />
                                    </div>
                                </div>
                                {/* Status Indicator */}
                                <div className='absolute bottom-4 right-4 w-6 h-6 bg-gray-300 dark:bg-gray-600 rounded-full'></div>
                            </div>
                        </div>
                        
                        {/* Profile Information */}
                        <div className='text-center space-y-6'>
                            <div>
                                <Skeleton width={200} height={32} className="mb-2 mx-auto" />
                                <div className='flex items-center justify-center gap-2'>
                                    <Skeleton width={16} height={16} />
                                    <Skeleton width={120} height={20} />
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default UserProfileSkeleton