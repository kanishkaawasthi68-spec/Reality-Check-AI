import { useState } from "react";
import { NavLink } from "react-router-dom";
import { Menu, X, Sun, Moon, ShieldCheck } from "lucide-react";


function Navbar({
  title = "Reality Check AI",
  darkMode,
  setDarkMode,
}) {
  const [menuOpen, setMenuOpen] = useState(false);


  const menuItems = [
    { name: "Home", path: "/" },
    { name: "About", path: "/about" },
    { name: "Contact", path: "/contact" },
  ];


  return (
    <nav
      className={`sticky top-0 z-50 backdrop-blur-xl border-b transition-all duration-300 ${darkMode
        ? "bg-slate-900/80 border-slate-700"
        : "bg-white/80 border-gray-200"
        }`}
    >
      <div className="max-w-7xl mx-auto flex justify-between items-center px-6 py-4">

        {/* Logo */}
        <NavLink to="/" className="flex items-center gap-2">
          <ShieldCheck className={`w-6 h-6 ${darkMode ? "text-blue-400" : "text-blue-600"}`} aria-hidden="true" />
          <h2
            className={`text-xl md:text-2xl font-extrabold tracking-tight ${darkMode ? "text-white" : "text-gray-900"
              }`}
          >
            {title}
          </h2>
        </NavLink>

        {/* Desktop Menu */}
        <ul className="hidden md:flex gap-8">
          {menuItems.map((item) => (
            <li key={item.name}>
              <NavLink
                to={item.path}
                className={({ isActive }) =>
                  isActive
                    ? "text-blue-600 font-semibold border-b-2 border-blue-600 pb-1"
                    : `${darkMode ? "text-slate-300" : "text-gray-700"
                    } hover:text-blue-600 transition`
                }
              >
                {item.name}
              </NavLink>
            </li>
          ))}
        </ul>
        {/* Desktop Right */}
        <div className="hidden md:flex items-center">
          <button
            onClick={() => {
              const newTheme = !darkMode;
              setDarkMode(newTheme);
              localStorage.setItem(
                "theme",
                newTheme ? "dark" : "light"
              );
            }}
            aria-label={darkMode ? "Switch to light mode" : "Switch to dark mode"}
            className="p-2.5 rounded-lg bg-slate-800 text-white hover:bg-slate-700 transition-colors duration-200"
          >
            {darkMode ? <Sun className="w-4 h-4" aria-hidden="true" /> : <Moon className="w-4 h-4" aria-hidden="true" />}
          </button>
        </div>

        {/* Mobile Right */}
        <div className="flex md:hidden items-center gap-2 ml-auto">

          <button
            onClick={() => {
              const newTheme = !darkMode;
              setDarkMode(newTheme);
              localStorage.setItem(
                "theme",
                newTheme ? "dark" : "light"
              );
            }}
            aria-label={darkMode ? "Switch to light mode" : "Switch to dark mode"}
            className="p-2 rounded-lg bg-slate-800 text-white"
          >
            {darkMode ? <Sun className="w-4 h-4" aria-hidden="true" /> : <Moon className="w-4 h-4" aria-hidden="true" />}
          </button>

          <button
            onClick={() => setMenuOpen(!menuOpen)}
            aria-label={menuOpen ? "Close menu" : "Open menu"}
            aria-expanded={menuOpen}
            className={`p-2 rounded-lg ${darkMode ? "text-white" : "text-gray-900"
              }`}
          >
            {menuOpen ? <X size={26} /> : <Menu size={26} />}
          </button>

        </div>
      </div>


      {/* Mobile Menu */}
      {menuOpen && (
        <div
          className={`md:hidden px-6 py-5 border-t ${darkMode
            ? "bg-slate-900 border-slate-700"
            : "bg-white border-gray-200"
            }`}
        >
          <ul className="flex flex-col gap-5">
            {menuItems.map((item) => (
              <li key={item.name}>
                <NavLink
                  to={item.path}
                  onClick={() => setMenuOpen(false)}
                  className={({ isActive }) =>
                    isActive
                      ? "text-blue-600 font-semibold"
                      : darkMode
                        ? "text-white"
                        : "text-gray-700"
                  }
                >
                  {item.name}
                </NavLink>
              </li>
            ))}


          </ul>
        </div>
      )}
    </nav>
  );
}

export default Navbar;