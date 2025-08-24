import { Link} from "react-router-dom";

const Header = () => {

    const logout = () => {
      
    }

  return (
    <header className="flex items-center justify-between px-7 py-5 bg-white">
      {/* Left portion */}
      <div className="">
        <Link to={"/"}>
          <h1 className="text-2xl">CaveMiniplex</h1>
        </Link>
      </div>

      {/* Right portion */}
      <div className="">
        <button className="px-8 py-1 rounded-lg bg-red-400 text-white cursor-pointer hover:shadow-xl transition duration-200" onClick={() => logout()}>Logout</button>
      </div>
    </header>
  );
};

export default Header;
