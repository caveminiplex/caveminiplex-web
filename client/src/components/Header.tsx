import { Link, useNavigate } from "react-router-dom";
import { useLocation } from "../contexts/LocationContext";
import { IoIosArrowDropdown } from "react-icons/io";

const Header = () => {
  const navigate = useNavigate();
  const { selectedLocation, setSelectedLocation } = useLocation();

  return (
    <header className="flex items-center justify-between px-4 lg:px-7 py-3 md:py-5 bg-white">
      {/* Left portion */}
      <div className="md:flex-[0.2] flex items-center space-x-5">
        <Link to={"/"}>
          <h1 className="text-lg md:text-2xl">CaveMiniplex</h1>
        </Link>

        <div className="lg:block hidden">
          <select
            name="locationFilter"
            className="px-2 text-neutral-600 cursor-pointer outline-none text-xs lg:text-base"
            onChange={(e) => setSelectedLocation(e.target.value)}
            value={selectedLocation}
          >
            <option value="Sadar Bazar, Agra">Sadar Bazar, Agra</option>
            <option value="Fatehbad Road, Agra">Fatehbad Road, Agra</option>
          </select>
        </div>
      </div>

      {/* Right portion */}

      <div className="md:hidden flex items-center space-x-5">
        <IoIosArrowDropdown className="text-2xl" />
      </div>

      <div className="hidden md:flex lg:flex-[0.7] xl:flex-[0.6] items-center justify-between">
        <div className="flex items-center space-x-7 lg:space-x-12 [&>a>p]:text-sm [&>a>p]:lg:text-base [&>a>p]:xl:text-lg">
          <Link to={"/browse"}>
            <p>Browse movies</p>
          </Link>

          <Link to={"/about"}>
            <p>About</p>
          </Link>

          <Link to={"/movies"}>
            <p>All Movies</p>
          </Link>
        </div>

        <div className="flex items-center space-x-4 lg:space-x-7 ml-4">
          <button
            onClick={() => {
              navigate("/login");
            }}
            className="px-6 lg:px-8 py-1 text-sm lg:text-base  rounded-lg bg-gradient-to-b from-fuchsia-500 to-blue-600 text-white focus:ring-2 focus:ring-blue-400 cursor-pointer hover:shadow-xl transition duration-200"
          >
            Login
          </button>

          <button
            onClick={() => {
              navigate("/signup");
            }}
            className="px-6 lg:px-8 py-1 text-sm lg:text-base rounded-lg border-2 border-neutral-800 text-neutral-800 cursor-pointer  hover:shadow-xl transition duration-200"
          >
            Signup
          </button>
        </div>
      </div>
    </header>
  );
};

export default Header;
