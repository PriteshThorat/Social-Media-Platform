import { Header } from "./components/index";
import { Outlet } from "react-router-dom";

const Layout = () => {
  return (
    <>
      <Header />
      {/* Add left margin for desktop sidebar */}
      <div className="lg:ml-64 xl:ml-72">
        <Outlet />
      </div>
    </>
  );
};

export default Layout;
