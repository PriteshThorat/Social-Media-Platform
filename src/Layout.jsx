import { Header } from './components/index';
import { Outlet } from 'react-router-dom';

const Layout = () => {
    return (
        <>
            <Header/>
            <Outlet/>
        </>
    );
};

export default Layout;