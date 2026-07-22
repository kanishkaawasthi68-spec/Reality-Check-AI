import { NavLink } from "react-router-dom";

function Navbar({ title = "Reality Check AI", buttonText = "Verify Now" }) {
  const menuItems = [
    { name: "Home", path: "/" },
    { name: "About", path: "/about" },
    { name: "Features", path: "/features" },
    { name: "Contact", path: "/contact" },
    { name: "Login", path: "/login" },
  ];

  return (
    <nav className="sticky top-0 z-50 bg-white/80 backdrop-blur-md shadow-sm">
      <div className="max-w-7xl mx-auto flex justify-between items-center px-8 py-4">

        {/* Logo */}
        <h2 className="text-2xl font-bold text-blue-600">
          {title}
        </h2>

        {/* Menu */}
        <ul className="hidden md:flex gap-8">
          {menuItems.map((item) => (
            <li key={item.name}>
              <NavLink
                to={item.path}
                className={({ isActive }) =>
                  isActive
                    ? "text-blue-600 font-semibold border-b-2 border-blue-600 pb-1"
                    : "text-gray-700 hover:text-blue-600 transition"
                }
              >
                {item.name}
              </NavLink>
            </li>
          ))}
        </ul>

        {/* Button */}
        <button className="bg-blue-600 text-white px-5 py-2 rounded-lg hover:bg-blue-700 transition duration-300">
          {buttonText}
        </button>

      </div>
    </nav>
  );
}

export default Navbar;