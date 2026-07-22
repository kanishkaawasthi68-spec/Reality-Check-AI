function Hero() {
  const scrollToVerify = () => {
    const section = document.getElementById("verify-section");

    if (section) {
      section.scrollIntoView({
        behavior: "smooth",
      });
    }
  };

  return (
    <section className="bg-gradient-to-b from-blue-50 to-white">
      <div className="max-w-7xl mx-auto px-6 py-24 text-center">

        {/* Tag */}
        <p className="text-blue-600 font-semibold uppercase tracking-widest">
          AI Powered Fact Checker
        </p>

        {/* Heading */}
        <h1 className="mt-4 text-5xl md:text-6xl font-extrabold leading-tight text-gray-900">
          Verify Before You
          <span className="text-blue-600"> Trust</span>
        </h1>

        {/* Description */}
        <p className="mt-6 max-w-3xl mx-auto text-lg text-gray-600 leading-8">
          Detect fake news, misleading claims, and misinformation using
          Artificial Intelligence. Get reliable verification with confidence
          scores and trusted sources in seconds.
        </p>

        {/* Buttons */}
        <div className="mt-10 flex flex-wrap justify-center gap-4">
          <button
            onClick={scrollToVerify}
            className="bg-blue-600 text-white px-8 py-3 rounded-xl font-semibold hover:bg-blue-700 shadow-lg transition duration-300"
          >
            🔍 Verify Claim
          </button>

          <button className="border border-gray-300 bg-white px-8 py-3 rounded-xl font-semibold hover:bg-gray-100 transition duration-300">
            Learn More
          </button>
        </div>

        {/* Trust Badges */}
        <div className="mt-10 flex flex-wrap justify-center gap-6 text-gray-500 text-sm font-medium">
          <span>✅ AI Powered</span>
          <span>🌍 Trusted Sources</span>
          <span>⚡ Instant Results</span>
          <span>🔒 Secure Verification</span>
        </div>

      </div>
    </section>
  );
}

export default Hero;