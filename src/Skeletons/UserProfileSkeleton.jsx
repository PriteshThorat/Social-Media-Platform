import Skeleton from 'react-loading-skeleton';
import 'react-loading-skeleton/dist/skeleton.css';

const UserProfileSkeleton = () => {
    return (
        <div className="flex items-center gap-4">
            <Skeleton circle width={64} height={64} />
            <div>
              <Skeleton width={160} height={24} className="mb-2" />
              <Skeleton width={120} height={20} />
            </div>
        </div>
    )
}

export default UserProfileSkeleton