import { Logo, Logout } from './index';
import { useSelector } from 'react-redux';
import { useEffect } from 'react';

const Header = () => {
    const status = useSelector(state => state.auth.status);

    return (
        <div className='flex items-center justify-between p-4 bg-white shadow-md'>
            <Logo/>
            {
                status && (
                    <Logout/>
                )
            }
        </div>
    )
};

export default Header;