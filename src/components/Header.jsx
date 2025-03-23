import { Logo, Logout, ThemeBtn } from './index';
import { useSelector } from 'react-redux';

const Header = () => {
    const status = useSelector(state => state.auth.status);

    return (
        <div className='flex items-center justify-between px-4 py-3 sm:py-4 bg-white dark:bg-gray-900 shadow-md dark:shadow-lg transition-all duration-300'>
            <Logo/>
            <div className='flex items-center space-x-4'>
                <ThemeBtn />
                {
                    status && (
                        <Logout/>
                    )
                }
            </div>
        </div>
    )
};

export default Header;