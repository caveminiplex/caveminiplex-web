import { Outlet, useLocation, useNavigate } from "react-router-dom";
import Header from "./components/Header";
import { useEffect, useState } from "react";

const TABS = ["Bookings", "Movies", "Users", "Snacks"];

const AdminLayout = () => {
  const location = useLocation();
  const navigate = useNavigate()

  const [subRoute, setSubRoute] = useState<string>("");

  useEffect(() => {
    const path = location.pathname;
    const parts = path.split("/");
    const v1Index = parts.indexOf("v1");

    if (v1Index !== -1 && parts[v1Index + 1]) {
      setSubRoute(parts[v1Index + 1]); // "bookings"
    } else {
      setSubRoute("");
    }
  }, [location]);

  return (
    <div className="w-full h-screen flex flex-1 flex-col overflow-hidden relative">
      <div className="flex-[0.09] w-full h-full">
        <Header />
      </div>

      <div className="flex-[0.91] w-full h-full overflow-hidden">
        <div className="w-full h-full flex flex-1">
          {/* Tabs */}
          <div className="flex-[0.2] w-full h-full border-r border-t border-neutral-400 bg-white flex flex-col">
            {TABS.map((tab, index) => (
              <div
                onClick={() => {
                    navigate(`/admin/control/v1/${tab.toLowerCase()}`)
                }}
                key={index}
                className={`text-center py-7 ${
                  subRoute === tab.toLowerCase()
                    ? "bg-gradient-to-b from-fuchsia-500 to-blue-600 text-white"
                    : " hover:bg-neutral-200"
                }  text-lg  cursor-pointer`}
              >
                <p>{tab}</p>
              </div>
            ))}
          </div>

          <div className="flex-[0.8] w-full h-full px-7 py-8">
            <Outlet />
          </div>
        </div>
      </div>
    </div>
  );
};

export default AdminLayout;
