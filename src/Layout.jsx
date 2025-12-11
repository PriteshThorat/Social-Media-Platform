import { Header } from "./components/index";
import { Outlet, useLocation } from "react-router-dom";

const Layout = () => {
  const location = useLocation();

  const isProfilePage = location.pathname.startsWith("/profile/");

  return (
    <>
      {!isProfilePage && <Header />}
      {/* Add left margin for desktop sidebar */}
      <div className="lg:ml-64 xl:ml-72">
        <Outlet />
      </div>
    </>
  );
};

export default Layout;
