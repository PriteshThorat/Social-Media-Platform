import Skeleton from 'react-loading-skeleton';
import 'react-loading-skeleton/dist/skeleton.css';

const HomeSkeleton = () => {
    return (
        <div className="space-y-6">
            {[...Array(3)].map((_, idx) => (
                <div
                    key={idx}
                    className={`bg-white/80 dark:bg-gray-800/80 backdrop-blur-sm border border-white/20 dark:border-gray-700/30 rounded-2xl shadow-sm p-6 animate-pulse`}
                >
                    {/* Header */}
                    <div className="flex items-start gap-4 mb-4">
                        <div className="flex-shrink-0">
                            <Skeleton 
                                circle 
                                width={48} 
                                height={48} 
                                className="ring-2 ring-white dark:ring-gray-700"
                            />
                        </div>
                        <div className="flex-1 min-w-0">
                            <div className="flex flex-wrap items-center gap-2 mb-2">
                                <Skeleton width={120} height={16} />
                                <Skeleton width={80} height={14} />
                                <Skeleton width={60} height={14} />
                            </div>
                            <Skeleton count={2} height={16} className="mb-1" />
                        </div>
                    </div>

                    {/* Content */}
                    <div className="mb-4">
                        <Skeleton count={3} height={14} className="mb-2" />
                    </div>

                    {/* Image placeholder */}
                    {idx % 2 === 0 && (
                        <div className="mb-4 rounded-xl overflow-hidden bg-gray-100 dark:bg-gray-800">
                            <Skeleton height={200} />
                        </div>
                    )}

                    {/* Actions */}
                    <div className="flex items-center justify-between pt-4 border-t border-gray-100 dark:border-gray-700">
                        <div className="flex items-center gap-4">
                            <Skeleton width={60} height={24} />
                        </div>
                    </div>
                </div>
            ))}
        </div>
    )
}

export default HomeSkeleton