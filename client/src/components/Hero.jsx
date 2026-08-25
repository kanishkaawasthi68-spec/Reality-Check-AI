import { Link } from "react-router-dom";

function Hero({ darkMode }) {
  const scrollToVerify = () => {
    const section = document.getElementById("verify-section");

    if (section) {
      section.scrollIntoView({
        behavior: "smooth",
        block: "start",
      });
    }
  };

  return (
    <section
      className={`relative overflow-hidden transition-all duration-300 ${
        darkMode
          ? "bg-slate-950"
          : "bg-slate-50"
      }`}
    >
      {/* Background Glow */}
      <div
        className={`absolute -top-24 -left-24 w-72 h-72 rounded-full blur-3xl pointer-events-none ${
          darkMode ? "bg-blue-700/10" : "bg-blue-200/30"
        }`}
      />

      <div
        className={`absolute -bottom-24 -right-24 w-72 h-72 rounded-full blur-3xl pointer-events-none ${
          darkMode ? "bg-cyan-700/10" : "bg-cyan-200/30"
        }`}
      />

      {/* Hero Content */}
      <div className="relative max-w-6xl mx-auto px-6 py-20 md:py-24 text-center">

        {/* Small Label */}
        <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-blue-100 text-blue-700 text-sm font-semibold">
          🤖 AI Powered Fact Checker
        </div>

        {/* Heading */}
        <h1
          className={`mt-6 text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-black leading-tight tracking-tight ${
            darkMode ? "text-white" : "text-gray-900"
          }`}
        >
          Verify Before You
          <span className="text-blue-600"> Trust</span>
        </h1>

        {/* Description */}
        <p
          className={`mt-6 max-w-2xl mx-auto text-lg md:text-xl leading-8 ${
            darkMode ? "text-slate-300" : "text-gray-600"
          }`}
        >
          Detect fake news, misleading claims, and misinformation using
          Artificial Intelligence. Get reliable verification with confidence
          scores and trusted sources in seconds.
        </p>

        {/* Buttons */}
        <div className="mt-8 flex flex-col sm:flex-row justify-center gap-4">
          <button
            onClick={scrollToVerify}
            className="px-7 py-3.5 rounded-xl bg-blue-600 text-white font-bold shadow-lg hover:bg-blue-700 hover:-translate-y-0.5 transition-all duration-300"
          >
            🔍 Verify a Claim
          </button>

          <Link
            to="/about"
            className={`px-7 py-3.5 rounded-xl font-bold border transition-all duration-300 hover:-translate-y-0.5 ${
              darkMode
                ? "bg-slate-900 text-white border-slate-700 hover:bg-slate-800"
                : "bg-white text-gray-900 border-gray-200 hover:bg-gray-100"
            }`}
          >
            Learn More
          </Link>
        </div>

        {/* Trust Indicators */}
        <div className="mt-10 flex flex-wrap justify-center gap-3">
          {[
            "✓ AI Powered",
            "✓ Trusted Sources",
            "✓ Fast Results",
            "✓ Reliable Analysis",
          ].map((badge) => (
            <span
              key={badge}
              className={`px-4 py-2 rounded-full text-sm font-medium border ${
                darkMode
                  ? "bg-slate-900 border-slate-700 text-slate-300"
                  : "bg-white border-gray-200 text-gray-600"
              }`}
            >
              {badge}
            </span>
          ))}
        </div>

      </div>
    </section>
  );
}

export default Hero;