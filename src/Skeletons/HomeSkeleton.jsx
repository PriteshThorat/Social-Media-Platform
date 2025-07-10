import Skeleton from 'react-loading-skeleton';
import 'react-loading-skeleton/dist/skeleton.css';

const HomeSkeleton = () => {
    return (
        <div className="flex flex-col gap-6 items-center mt-5">
            {[...Array(3)].map((_, idx) => (
                <div
                    key={idx}
                    className='bg-white dark:bg-gray-800 p-6 rounded-lg shadow-md w-full max-w-full sm:max-w-2xl min-h-[250px]'
                >
                    <div className="flex items-center mb-4 gap-4">
                        <Skeleton circle width={50} height={50} />
                        <div className="flex flex-col flex-1">
                            <Skeleton width={140} height={18} className="mb-1" />
                            <Skeleton width={100} height={14} />
                        </div>
                    </div>
                    <Skeleton count={3} height={14} className="mb-3" />
                    <Skeleton height={200} />
                </div>
            ))}
        </div>
    )
}

export default HomeSkeleton