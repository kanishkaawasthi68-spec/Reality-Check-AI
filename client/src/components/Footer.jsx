import { Link } from "react-router-dom";

function Footer({ darkMode }) {
  return (
    <footer
      className={`mt-24 border-t transition-all duration-300 ${
        darkMode
          ? "bg-slate-950 border-slate-800"
          : "bg-white border-gray-200"
      }`}
    >
      <div className="max-w-7xl mx-auto px-6 py-16 grid grid-cols-2 lg:grid-cols-3 gap-10">
        {/* Logo */}
        <div className="col-span-2 lg:col-span-1">
          <h2
            className={`text-3xl font-black ${
              darkMode ? "text-white" : "text-gray-900"
            }`}
          >
            🛡️ Reality Check AI
          </h2>

          <p
            className={`mt-5 leading-8 max-w-sm ${
              darkMode ? "text-slate-400" : "text-gray-600"
            }`}
          >
            Verify news, claims and information using AI.
            <br />
            Make informed decisions with confidence.
          </p>
        </div>

        {/* Quick Links */}
        <div>
          <h3
            className={`text-xl font-bold mb-5 ${
              darkMode ? "text-white" : "text-gray-900"
            }`}
          >
            Quick Links
          </h3>

          <ul className="space-y-3">
            <li>
              <Link
                to="/"
                className={`${
                  darkMode ? "text-slate-400" : "text-gray-600"
                } hover:text-blue-500 transition-all duration-300 hover:translate-x-1 inline-block`}
              >
                Home
              </Link>
            </li>

            <li>
              <Link
                to="/about"
                className={`${
                  darkMode ? "text-slate-400" : "text-gray-600"
                } hover:text-blue-500 transition-all duration-300 hover:translate-x-1 inline-block`}
              >
                About
              </Link>
            </li>

            <li>
              <Link
                to="/contact"
                className={`${
                  darkMode ? "text-slate-400" : "text-gray-600"
                } hover:text-blue-500 transition-all duration-300 hover:translate-x-1 inline-block`}
              >
                Contact
              </Link>
            </li>

            <li>
              <Link
                to="/login"
                className={`${
                  darkMode ? "text-slate-400" : "text-gray-600"
                } hover:text-blue-500 transition-all duration-300 hover:translate-x-1 inline-block`}
              >
                Login
              </Link>
            </li>
          </ul>
        </div>

        {/* Connect */}
        <div>
          <h3
            className={`text-xl font-bold mb-5 ${
              darkMode ? "text-white" : "text-gray-900"
            }`}
          >
            Connect
          </h3>

          <div className="space-y-3">
            <a
              href="https://github.com/kanishkaawasthi68-spec"
              target="_blank"
              rel="noopener noreferrer"
              className={`block ${
                darkMode ? "text-slate-400" : "text-gray-600"
              } hover:text-blue-500 transition-all duration-300 hover:translate-x-1`}
            >
              GitHub
            </a>

            <a
              href="https://www.linkedin.com/in/kanishka-awasthi-81b98a291"
              target="_blank"
              rel="noopener noreferrer"
              className={`block ${
                darkMode ? "text-slate-400" : "text-gray-600"
              } hover:text-blue-500 transition-all duration-300 hover:translate-x-1`}
            >
              LinkedIn
            </a>

            <a
              href="mailto:kanishkaawasthi68@gmail.com"
              className={`block ${
                darkMode ? "text-slate-400" : "text-gray-600"
              } hover:text-blue-500 transition-all duration-300 hover:translate-x-1`}
            >
              Email
            </a>
          </div>
        </div>
      </div>

      {/* Badges */}
      <div
        className={`border-t mt-10 pt-8 flex flex-wrap justify-center gap-4 ${
          darkMode ? "border-slate-800" : "border-gray-200"
        }`}
      >
        <span
          className={`px-4 py-2 rounded-full transition-all duration-300 hover:scale-105 cursor-default ${
            darkMode
              ? "bg-slate-800 text-slate-300 hover:bg-slate-700"
              : "bg-gray-100 text-gray-700 hover:bg-gray-200"
          }`}
        >
          🤖 AI Powered
        </span>

        <span
          className={`px-4 py-2 rounded-full transition-all duration-300 hover:scale-105 cursor-default ${
            darkMode
              ? "bg-slate-800 text-slate-300 hover:bg-slate-700"
              : "bg-gray-100 text-gray-700 hover:bg-gray-200"
          }`}
        >
          🔒 Secure
        </span>

        <span
          className={`px-4 py-2 rounded-full transition-all duration-300 hover:scale-105 cursor-default ${
            darkMode
              ? "bg-slate-800 text-slate-300 hover:bg-slate-700"
              : "bg-gray-100 text-gray-700 hover:bg-gray-200"
          }`}
        >
          ⚡ Fast Verification
        </span>
      </div>

      {/* Copyright */}
      <div
        className={`border-t py-6 text-center ${
          darkMode
            ? "border-slate-800 text-slate-500"
            : "border-gray-200 text-gray-500"
        }`}
      >
        © 2026 Reality Check AI. All Rights Reserved.
      </div>
    </footer>
  );
}

export default Footer;