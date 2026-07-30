function Hero({ darkMode }) {
  const scrollToVerify = () => {
    const section = document.getElementById("verify-section");

    if (section) {
      section.scrollIntoView({
        behavior: "smooth",
      });
    }
  };

  return (
    <section
      className={`relative overflow-hidden transition-all duration-300 ${darkMode ? "bg-slate-950" : "bg-slate-50"
        }`}
    >
      {/* Background Glow */}
      <div
        className={`absolute top-0 left-0 w-72 h-72 rounded-full blur-3xl ${darkMode
            ? "bg-blue-700/20"
            : "bg-blue-200/30"
          }`}
      ></div>

      <div
        className={`absolute bottom-0 right-0 w-72 h-72 rounded-full blur-3xl ${darkMode
            ? "bg-cyan-700/20"
            : "bg-cyan-200/30"
          }`}
      ></div>

      <div className="relative max-w-7xl mx-auto px-6 py-28 text-center">
        {/* Tag */}
        <p className="text-blue-500 font-semibold uppercase tracking-widest">
          AI Powered Fact Checker
        </p>

        {/* Heading */}
        <h1
          className={`mt-4 text-5xl md:text-7xl font-black leading-tight ${darkMode ? "text-white" : "text-gray-900"
            }`}
        >
          Verify Before You
          <span className="text-blue-600"> Trust</span>
        </h1>

        {/* Description */}
        <p
          className={`mt-8 max-w-3xl mx-auto text-xl leading-9 ${darkMode ? "text-slate-300" : "text-gray-600"
            }`}
        >
          Detect fake news, misleading claims, and misinformation using
          Artificial Intelligence. Get reliable verification with confidence
          scores and trusted sources in seconds.
        </p>

        {/* Buttons */}
        <div className="mt-10 flex flex-wrap justify-center gap-4">
          <button
            onClick={scrollToVerify}
            className="px-8 py-4 rounded-2xl bg-blue-600 text-white font-bold shadow-xl hover:bg-blue-700 hover:scale-105 transition-all duration-300"
          >
            🔍 Verify Claim
          </button>

          <button
            className={`px-8 py-4 rounded-2xl font-bold transition-all duration-300 hover:scale-105 hover:shadow-xl ${darkMode
                ? "bg-slate-800 text-white border border-slate-700 hover:bg-slate-700"
                : "bg-white text-gray-900 border border-gray-300 hover:bg-gray-100"
              }`}
          >
            Learn More
          </button>
        </div>

        {/* Trust Badges */}
        <div className="mt-14 flex flex-wrap justify-center gap-5">
          {[
            "✅ AI Powered",
            "🌍 Trusted Sources",
            "⚡ Instant Results",
            "🔒 Secure Verification",
          ].map((badge) => (
            <span
              key={badge}
              className={`px-5 py-3 rounded-full shadow-md font-semibold transition-all duration-300 ${darkMode
                  ? "bg-slate-800 text-slate-200 border border-slate-700"
                  : "bg-white text-gray-700"
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