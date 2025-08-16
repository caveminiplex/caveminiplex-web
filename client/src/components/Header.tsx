import { Link, useNavigate } from "react-router-dom";

const Header = () => {
    const navigate = useNavigate()
  return (
    <header className="flex items-center justify-between px-7 py-5 bg-white">
      {/* Left portion */}
      <div className="flex-[0.2]">
        <Link to={"/"}>
          <h1 className="text-2xl">CaveMiniplex</h1>
        </Link>
      </div>


      {/* Right portion */}
      <div className="flex-[0.6] flex items-center justify-between">
        <div className="flex items-center space-x-12 [&>a>p]:text-lg ">
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

         <div className="flex items-center space-x-7">
        <button onClick={() => {navigate("/login")}} className="px-8 py-1 rounded-lg bg-gradient-to-b from-fuchsia-500 to-blue-600 text-white focus:ring-2 focus:ring-blue-400 cursor-pointer hover:shadow-xl transition duration-200">
          Login
        </button>

        <button onClick={() => {navigate("/signup")}} className="px-8 py-1 rounded-lg border-2 border-neutral-800 text-neutral-800 cursor-pointer  hover:shadow-xl transition duration-200">
          Signip
        </button>
      </div>

      </div>

     
    </header>
  );
};

export default Header;
