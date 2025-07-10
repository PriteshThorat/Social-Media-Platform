import { Header } from './components/index';
import { Outlet, useLocation, ScrollRestoration } from 'react-router-dom';

const Layout = () => {
    const location = useLocation();

    const isProfilePage = location.pathname.startsWith("/profile/");

    return (
        <>
            {!isProfilePage && <Header/>}
            <Outlet />
            <ScrollRestoration getKey={(location) => location.pathname} />
        </>
    );
};

export default Layout;