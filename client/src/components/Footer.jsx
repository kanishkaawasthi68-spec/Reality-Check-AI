import { Link } from "react-router-dom";

function Footer({ darkMode }) {
  return (
    <footer
      className={`mt-16 border-t transition-all duration-300 ${darkMode
        ? "bg-slate-950 border-slate-800"
        : "bg-slate-50 border-gray-200"
        }`}
    >
      <div className="max-w-7xl mx-auto px-6 py-14 grid md:grid-cols-2 gap-20 items-start">

        {/* Left Side */}
        <div>
          <h2
            className={`text-4xl font-black ${darkMode ? "text-white" : "text-gray-900"
              }`}
          >
            🛡️ Reality Check AI
          </h2>

          <p
            className={`mt-5 text-lg leading-9 max-w-md ${darkMode ? "text-slate-400" : "text-gray-600"
              }`}
          >
            Verify news, claims and information using Artificial Intelligence.
            <br />
            Make informed decisions with confidence using trusted sources.
          </p>
        </div>

        {/* Right Side */}
        <div className="grid grid-cols-2 gap-16">

          {/* Quick Links */}
          <div>
            <h3
              className={`text-2xl font-bold mb-6 ${darkMode ? "text-white" : "text-gray-900"
                }`}
            >
              Quick Links
            </h3>

            <ul className="space-y-4">
              <li>
                <Link
                  to="/"
                  className={`text-lg ${darkMode ? "text-slate-400" : "text-gray-600"
                    } hover:text-blue-500 transition`}
                >
                  Home
                </Link>
              </li>

              <li>
                <Link
                  to="/about"
                  className={`text-lg ${darkMode ? "text-slate-400" : "text-gray-600"
                    } hover:text-blue-500 transition`}
                >
                  About
                </Link>
              </li>

              <li>
                <Link
                  to="/contact"
                  className={`text-lg ${darkMode ? "text-slate-400" : "text-gray-600"
                    } hover:text-blue-500 transition`}
                >
                  Contact
                </Link>
              </li>
            </ul>
          </div>

          {/* Connect */}
          <div>
            <h3
              className={`text-2xl font-bold mb-6 ${darkMode ? "text-white" : "text-gray-900"
                }`}
            >
              Connect
            </h3>

            <div className="space-y-4">
              <a
                href="https://github.com/kanishkaawasthi68-spec/Reality-Check-AI"
                target="_blank"
                rel="noopener noreferrer"
                className={`block text-lg ${darkMode ? "text-slate-400" : "text-gray-600"
                  } hover:text-blue-500 transition`}
              >
                GitHub
              </a>

              <a
                href="https://www.linkedin.com/in/kanishka-awasthi-81b98a291"
                target="_blank"
                rel="noopener noreferrer"
                className={`block text-lg ${darkMode ? "text-slate-400" : "text-gray-600"
                  } hover:text-blue-500 transition`}
              >
                LinkedIn
              </a>

              <a
                href="mailto:kanishkaawasthi68@gmail.com"
                className={`block text-lg ${darkMode ? "text-slate-400" : "text-gray-600"
                  } hover:text-blue-500 transition`}
              >
                Email
              </a>
            </div>
          </div>
        </div>
      </div>

      {/* Badges */}
      <div
        className={`border-t py-8 flex flex-wrap justify-center gap-6 ${darkMode ? "border-slate-800" : "border-gray-200"
          }`}
      >
        <span
          className={`px-6 py-3 rounded-2xl ${darkMode
            ? "bg-slate-800 text-slate-300"
            : "bg-white text-gray-700 shadow"
            }`}
        >
          🤖 AI Powered
        </span>

        <span
          className={`px-6 py-3 rounded-2xl ${darkMode
            ? "bg-slate-800 text-slate-300"
            : "bg-white text-gray-700 shadow"
            }`}
        >
          🔒 Secure
        </span>

        <span
          className={`px-6 py-3 rounded-2xl ${darkMode
            ? "bg-slate-800 text-slate-300"
            : "bg-white text-gray-700 shadow"
            }`}
        >
          ⚡ Fast Verification
        </span>
      </div>

      {/* Copyright */}
      <div
        className={`border-t py-8 text-center ${darkMode
          ? "border-slate-800 text-slate-500"
          : "border-gray-200 text-gray-500"
          }`}
      >
        <p className="text-base font-medium">
          © {new Date().getFullYear()} Reality Check AI. All Rights Reserved.
        </p>

        <p className="mt-2 text-sm">
          Built with ❤️ using React, Express.js, Groq AI & Serper API
        </p>
      </div>
    </footer>
  );
}

export default Footer;