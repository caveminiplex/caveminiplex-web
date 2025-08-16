import { Link } from "react-router-dom";

const Header = () => {
  return (
    <header className="flex items-center justify-between px-7 py-5 bg-white">
      {/* Left portion */}
      <div className="flex-[0.2]">
        <Link to={"/"}>
          <h1 className="text-2xl">CaveMiniplex</h1>
        </Link>
      </div>

      {/* Right portion */}
      <div className="flex-[0.6] flex items-center justify-between"></div>
    </header>
  );
};

export default Header;
