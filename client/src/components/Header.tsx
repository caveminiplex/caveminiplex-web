import { Link } from "react-router-dom";

const Header = () => {
  return (
    <header className="flex items-center justify-between px-7 py-5 bg-white">
      {/* Left portion */}
      <div>
        <Link to={"/"}>
          <h1 className="text-2xl">CaveMiniplex</h1>
        </Link>
      </div>

      {/* Right portion */}
      <div>
        <button className="px-8 py-1 rounded-lg bg-gradient-to-b from-fuchsia-500 to-blue-600 text-white focus:ring-2 focus:ring-blue-400 hover:shadow-xl transition duration-200">
          Login
        </button>
      </div>
    </header>
  );
};

export default Header;
