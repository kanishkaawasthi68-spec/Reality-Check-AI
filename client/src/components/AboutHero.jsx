import { Link } from "react-router-dom";

function AboutHero({ darkMode }) {
  return (
    <section
      className={`relative overflow-hidden py-24 transition-all duration-300 ${
        darkMode ? "bg-slate-950" : "bg-slate-50"
      }`}
    >
      {/* Background Glow */}
      <div
        className={`absolute top-0 left-0 w-72 h-72 rounded-full blur-3xl ${
          darkMode
            ? "bg-blue-700 opacity-20"
            : "bg-blue-200 opacity-30"
        }`}
      ></div>

      <div
        className={`absolute bottom-0 right-0 w-72 h-72 rounded-full blur-3xl ${
          darkMode
            ? "bg-cyan-700 opacity-20"
            : "bg-cyan-200 opacity-30"
        }`}
      ></div>

      <div className="relative max-w-7xl mx-auto px-6 text-center">
        <p className="text-blue-600 uppercase tracking-widest font-semibold">
          About Reality Check AI
        </p>

        <h1
          className={`mt-4 text-5xl md:text-6xl font-black ${
            darkMode ? "text-white" : "text-gray-900"
          }`}
        >
          Fighting Misinformation with
          <span className="text-blue-600"> Artificial Intelligence</span>
        </h1>

        <p
          className={`mt-8 max-w-3xl mx-auto text-xl leading-9 ${
            darkMode ? "text-slate-300" : "text-gray-600"
          }`}
        >
          Reality Check AI helps people verify online claims using trusted
          sources and AI-powered analysis. Our goal is to make the internet a
          more reliable place by promoting factual information.
        </p>

        <div className="mt-10 flex flex-wrap justify-center gap-4">
          <Link
            to="/"
            className="px-8 py-4 rounded-2xl bg-blue-600 text-white font-bold shadow-xl hover:bg-blue-700 hover:scale-105 transition-all duration-300"
          >
            🔍 Verify a Claim
          </Link>

          <a
            href="#mission"
            className={`px-8 py-4 rounded-2xl font-bold transition-all duration-300 hover:scale-105 ${
              darkMode
                ? "bg-slate-800 text-white border border-slate-700 hover:bg-slate-700"
                : "bg-white border border-gray-300 text-gray-900 hover:bg-gray-100"
            }`}
          >
            Learn More
          </a>
        </div>
      </div>
    </section>
  );
}

export default AboutHero;