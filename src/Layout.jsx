import { Header } from './components/index';
import { Outlet, useLocation } from 'react-router-dom';

const Layout = () => {
    const location = useLocation();

    const isProfilePage = location.pathname.startsWith("/profile/");

    return (
        <>
            {!isProfilePage && <Header/>}
            <Outlet />
        </>
    );
};

export default Layout;