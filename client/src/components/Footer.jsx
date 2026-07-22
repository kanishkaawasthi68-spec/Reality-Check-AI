import { Link } from "react-router-dom";

function Footer() {
  return (
    <footer className="bg-gray-900 text-white mt-20">
      <div className="max-w-7xl mx-auto px-6 py-12 grid md:grid-cols-3 gap-10">

        {/* Logo */}
        <div>
          <h2 className="text-2xl font-bold text-blue-400">
            Reality Check AI
          </h2>

          <p className="mt-4 text-gray-400 leading-7">
            Verify news, claims and information using AI.
            Make informed decisions with confidence.
          </p>
        </div>

        {/* Quick Links */}
        <div>
          <h3 className="text-xl font-semibold mb-4">
            Quick Links
          </h3>

          <ul className="space-y-3">
            <li>
              <Link to="/" className="hover:text-blue-400 transition">
                Home
              </Link>
            </li>

            <li>
              <Link to="/about" className="hover:text-blue-400 transition">
                About
              </Link>
            </li>

            <li>
              <Link to="/contact" className="hover:text-blue-400 transition">
                Contact
              </Link>
            </li>

            <li>
              <Link to="/login" className="hover:text-blue-400 transition">
                Login
              </Link>
            </li>
          </ul>
        </div>

        {/* Connect */}
        <div>
          <h3 className="text-xl font-semibold mb-4">
            Connect
          </h3>

          <div className="space-y-3">
            <a
              href="https://github.com/"
              target="_blank"
              rel="noopener noreferrer"
              className="block hover:text-blue-400 transition"
            >
              GitHub
            </a>

            <a
              href="https://linkedin.com/"
              target="_blank"
              rel="noopener noreferrer"
              className="block hover:text-blue-400 transition"
            >
              LinkedIn
            </a>

            <a
              href="mailto:your@email.com"
              className="block hover:text-blue-400 transition"
            >
              Email
            </a>
          </div>
        </div>

      </div>

      <div className="border-t border-gray-700 py-5 text-center text-gray-400">
        © 2026 Reality Check AI. All Rights Reserved.
      </div>
    </footer>
  );
}

export default Footer;