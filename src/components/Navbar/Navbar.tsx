import { Link } from "react-router";

const Navbar = () => {
  return (
    <nav className="bg-gray-800 fixed top-0 left-1/2 transform -translate-x-1/2 text-white py-4 px-2 w-60 rounded-xl rounded-t-none z-10 shadow-lg">
      <div className="flex items-center justify-around">
        <Link to="/" className="hover:text-gray-300">
          Ekip Diyagramı
        </Link>
        <Link to="/charts" className="hover:text-gray-300">
          Grafikler
        </Link>
      </div>
    </nav>
  );
};

export default Navbar;
