import { Header } from "./components/index";
import { Outlet } from "react-router-dom";
import Snowfall from "react-snowfall";

const Layout = () => {
  // Show snowfall during winter season (December and January)
  const currentMonth = new Date().getMonth() // 0 = January, 11 = December
  const isWinterSeason = currentMonth === 11 || currentMonth === 0

  return (
    <>
      {isWinterSeason && (
        <Snowfall
          snowflakeCount={50}
          style={{
            position: "fixed",
            width: "100vw",
            height: "100vh",
            zIndex: 9999,
            pointerEvents: "none",
          }}
        />
      )}
      <Header />
      <div className="lg:ml-64 xl:ml-72">
        <Outlet />
      </div>
    </>
  );
};

export default Layout;
