import { Link } from "react-router-dom";
import { Search, ShieldCheck, Zap, Globe2 } from "lucide-react";

function Hero({ darkMode }) {
  const scrollToVerify = () => {
    const section = document.getElementById("verify-section");
    if (section) {
      section.scrollIntoView({ behavior: "smooth", block: "start" });
    }
  };

  return (
    <section className={`relative overflow-hidden ${darkMode ? "bg-slate-950" : "bg-slate-50"}`}>
      {/* Subtle static background accent — no animation, single soft glow */}
      <div
        className={`absolute top-0 left-1/2 -translate-x-1/2 w-[600px] h-[300px] rounded-full blur-3xl pointer-events-none ${
          darkMode ? "bg-blue-700/10" : "bg-blue-200/40"
        }`}
      />

      <div className="relative max-w-4xl mx-auto px-6 py-20 md:py-24 text-center">
        <div
          className={`inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full text-xs font-semibold border ${
            darkMode ? "bg-slate-900 border-slate-800 text-blue-400" : "bg-white border-gray-200 text-blue-700"
          }`}
        >
          <ShieldCheck className="w-3.5 h-3.5" aria-hidden="true" />
          AI-Powered Fact Checker
        </div>

        <h1
          className={`mt-6 text-4xl sm:text-5xl md:text-6xl font-extrabold leading-[1.1] tracking-tight ${
            darkMode ? "text-white" : "text-gray-900"
          }`}
        >
          Verify Before You
          <span className="text-blue-600"> Trust</span>
        </h1>

        <p className={`mt-5 max-w-xl mx-auto text-base md:text-lg leading-7 ${darkMode ? "text-slate-300" : "text-gray-600"}`}>
          Check claims, articles, and images against independent evidence — with a clear verdict,
          honest confidence estimate, and the sources behind it.
        </p>

        <div className="mt-8 flex flex-col sm:flex-row justify-center gap-3">
          <button
            onClick={scrollToVerify}
            className="inline-flex items-center justify-center gap-2 px-6 py-3 rounded-xl bg-blue-600 text-white font-semibold hover:bg-blue-700 transition-colors duration-200"
          >
            <Search className="w-4 h-4" aria-hidden="true" />
            Verify Something
          </button>

          <Link
            to="/about"
            className={`inline-flex items-center justify-center px-6 py-3 rounded-xl font-semibold border transition-colors duration-200 ${
              darkMode
                ? "bg-slate-900 text-white border-slate-800 hover:bg-slate-800"
                : "bg-white text-gray-900 border-gray-200 hover:bg-gray-100"
            }`}
          >
            Learn More
          </Link>
        </div>

        <div className={`mt-10 flex flex-wrap justify-center gap-x-6 gap-y-2 text-xs font-medium ${darkMode ? "text-slate-500" : "text-gray-500"}`}>
          <span className="inline-flex items-center gap-1.5">
            <ShieldCheck className="w-3.5 h-3.5" aria-hidden="true" /> Evidence-grounded
          </span>
          <span className="inline-flex items-center gap-1.5">
            <Globe2 className="w-3.5 h-3.5" aria-hidden="true" /> Independent sources
          </span>
          <span className="inline-flex items-center gap-1.5">
            <Zap className="w-3.5 h-3.5" aria-hidden="true" /> Fast results
          </span>
        </div>
      </div>
    </section>
  );
}

export default Hero;
