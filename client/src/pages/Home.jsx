import { useState } from "react";
import Hero from "../components/Hero";
import ClaimInput from "../components/ClaimInput";
import ResultCard from "../components/ResultCard";
import Features from "../components/Features";
import Footer from "../components/Footer";

function Home({ darkMode }) {
  const [claim, setClaim] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [result, setResult] = useState(null);

  const handleVerify = async () => {
    if (!claim.trim()) {
      setError("Please enter a claim.");
      return;
    }

    setLoading(true);
    setError("");
    setResult(null);

    try {
      const response = await fetch("http://localhost:5000/verify", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          claim: claim.trim(),
        }),
      });

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.message || "Something went wrong");
      }

      setResult(data);
    } catch (err) {
      console.error("Verification Error:", err);

      setError(
        err.message ||
          "Unable to verify the claim. Please check whether the backend is running."
      );
    } finally {
      setLoading(false);
    }
  };

  return (
    <>
      {/* Hero */}
      <Hero darkMode={darkMode} />

      {/* Verification Section */}
      <main
        className={`relative overflow-hidden transition-all duration-300 ${
          darkMode
            ? "bg-slate-950 text-white"
            : "bg-slate-50 text-gray-900"
        }`}
      >
        {/* ================= MOVING BACKGROUND ================= */}

        {/* Blue Glow */}
        <div
          className={`absolute -top-20 -left-40 w-[420px] h-[420px] rounded-full blur-3xl pointer-events-none animate-float-one ${
            darkMode ? "bg-blue-600/20" : "bg-blue-400/60"
          }`}
        />

        {/* Cyan Glow */}
        <div
          className={`absolute top-[35%] -right-40 w-[450px] h-[450px] rounded-full blur-3xl pointer-events-none animate-float-two ${
            darkMode ? "bg-cyan-500/15" : "bg-cyan-400/60"
          }`}
        />

        {/* Purple Glow */}
        <div
          className={`absolute bottom-20 left-[30%] w-[380px] h-[380px] rounded-full blur-3xl pointer-events-none animate-float-three ${
            darkMode ? "bg-indigo-600/15" : "bg-indigo-400/50"
          }`}
        />

        {/* Small Glow */}
        <div
          className={`absolute top-[60%] left-10 w-56 h-56 rounded-full blur-3xl pointer-events-none animate-float-two ${
            darkMode ? "bg-blue-500/10" : "bg-blue-300/50"
          }`}
        />

        {/* ================= ACTUAL CONTENT ================= */}

        <div className="relative z-10">
          {/* Verification */}
          <section
            id="verify-section"
            className="max-w-6xl mx-auto px-4 sm:px-6 py-20"
          >
            {/* Heading */}
            <div className="text-center max-w-2xl mx-auto mb-10">
              <span
                className={`inline-flex items-center px-4 py-2 rounded-full text-sm font-semibold border ${
                  darkMode
                    ? "bg-slate-900/80 border-slate-700 text-blue-400"
                    : "bg-white/80 border-gray-200 text-blue-600"
                }`}
              >
                🔍 AI Fact Verification
              </span>

              <h2
                className={`mt-5 text-3xl sm:text-4xl md:text-5xl font-black tracking-tight ${
                  darkMode ? "text-white" : "text-gray-900"
                }`}
              >
                Verify before{" "}
                <span className="text-blue-600">you trust.</span>
              </h2>

              <p
                className={`mt-4 text-base sm:text-lg leading-8 ${
                  darkMode ? "text-slate-400" : "text-gray-600"
                }`}
              >
                Enter a claim and let AI analyze it using relevant information
                and trusted web sources.
              </p>
            </div>

            {/* Claim Input */}
            <div className="max-w-4xl mx-auto">
              <ClaimInput
                claim={claim}
                setClaim={setClaim}
                error={error}
                loading={loading}
                handleVerify={handleVerify}
                darkMode={darkMode}
              />
            </div>

            {/* Trust Badges */}
            <div className="flex flex-wrap justify-center gap-3 mt-8">
              {[
                "🤖 AI Powered",
                "🌐 Web Sources",
                "⚡ Fast Verification",
                "🔒 Reliable Analysis",
              ].map((item) => (
                <span
                  key={item}
                  className={`px-4 py-2 rounded-full text-sm font-medium border backdrop-blur-sm ${
                    darkMode
                      ? "bg-slate-900/70 border-slate-700 text-slate-300"
                      : "bg-white/80 border-gray-200 text-gray-600"
                  }`}
                >
                  {item}
                </span>
              ))}
            </div>

            {/* Loading */}
            {loading && (
              <div
                className={`max-w-4xl mx-auto mt-10 rounded-3xl p-8 border shadow-xl backdrop-blur-sm ${
                  darkMode
                    ? "bg-slate-900/90 border-slate-700"
                    : "bg-white/90 border-gray-200"
                }`}
              >
                <div className="flex flex-col items-center text-center">
                  {/* Spinner */}
                  <div className="relative">
                    <div
                      className={`w-16 h-16 rounded-full border-4 ${
                        darkMode
                          ? "border-slate-700"
                          : "border-blue-100"
                      }`}
                    />

                    <div className="absolute inset-0 w-16 h-16 rounded-full border-4 border-blue-600 border-t-transparent animate-spin" />
                  </div>

                  <h3
                    className={`mt-6 text-2xl font-bold ${
                      darkMode ? "text-white" : "text-gray-900"
                    }`}
                  >
                    AI is analyzing your claim
                  </h3>

                  <p
                    className={`mt-2 ${
                      darkMode ? "text-slate-400" : "text-gray-600"
                    }`}
                  >
                    Checking relevant information and trusted sources...
                  </p>

                  {/* Progress */}
                  <div
                    className={`mt-8 w-full max-w-xl h-2 rounded-full overflow-hidden ${
                      darkMode ? "bg-slate-700" : "bg-gray-200"
                    }`}
                  >
                    <div className="h-full w-1/2 rounded-full bg-blue-600 animate-pulse" />
                  </div>
                </div>
              </div>
            )}

            {/* Result */}
            {result && (
              <div className="max-w-4xl mx-auto mt-10">
                <ResultCard result={result} darkMode={darkMode} />
              </div>
            )}
          </section>
        </div>

        {/* ================= HOW IT WORKS ================= */}

        <section
          className={`relative border-t ${
            darkMode ? "border-slate-800" : "border-gray-200"
          }`}
        >
          <div className="max-w-6xl mx-auto px-4 sm:px-6 py-20">
            <div className="text-center max-w-2xl mx-auto">
              <span className="text-blue-600 font-semibold text-sm uppercase tracking-wider">
                How it works
              </span>

              <h2
                className={`mt-3 text-3xl sm:text-4xl font-black ${
                  darkMode ? "text-white" : "text-gray-900"
                }`}
              >
                Fact checking made simple
              </h2>

              <p
                className={`mt-4 ${
                  darkMode ? "text-slate-400" : "text-gray-600"
                }`}
              >
                Get a clear understanding of a claim in just a few simple
                steps.
              </p>
            </div>

            <div className="grid md:grid-cols-3 gap-6 mt-12">
              {[
                {
                  number: "01",
                  title: "Enter a Claim",
                  text: "Paste a news statement, social media claim, or information you want to verify.",
                },
                {
                  number: "02",
                  title: "AI Analyzes",
                  text: "Our AI processes the claim and looks for relevant information from available sources.",
                },
                {
                  number: "03",
                  title: "Get Your Verdict",
                  text: "Review the analysis, confidence and supporting sources in one place.",
                },
              ].map((step) => (
                <div
                  key={step.number}
                  className={`rounded-3xl border p-7 transition-all duration-300 hover:-translate-y-1 ${
                    darkMode
                      ? "bg-slate-900 border-slate-700 hover:border-blue-600"
                      : "bg-white border-gray-200 hover:border-blue-300 hover:shadow-lg"
                  }`}
                >
                  <span className="text-blue-600 text-sm font-black">
                    {step.number}
                  </span>

                  <h3
                    className={`mt-4 text-xl font-bold ${
                      darkMode ? "text-white" : "text-gray-900"
                    }`}
                  >
                    {step.title}
                  </h3>

                  <p
                    className={`mt-3 leading-7 ${
                      darkMode ? "text-slate-400" : "text-gray-600"
                    }`}
                  >
                    {step.text}
                  </p>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Features */}
        <Features darkMode={darkMode} />
      </main>

      {/* Footer */}
      <Footer darkMode={darkMode} />
    </>
  );
}

export default Home;