import { Outlet } from "react-router-dom";
import Header from "./components/Header";
import { Toaster } from "react-hot-toast";

const Layout = () => {

  return (
    <>
    <Toaster position="top-center" reverseOrder={false} />
    <div className="w-full h-screen flex flex-1 flex-col overflow-hidden relative">
      <div className="flex-[0.09] w-full h-full">
        <Header />
      </div>

      <div className="flex-[0.91] w-full h-full overflow-hidden">
        <Outlet />
      </div>
    </div>
    </>
  );
};

export default Layout;
