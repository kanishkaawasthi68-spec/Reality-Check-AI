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
        body: JSON.stringify({ claim }),
      });

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.message || "Something went wrong");
      }

      setResult(data);
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <>
      <Hero darkMode={darkMode} />

      <main
        className={`min-h-screen flex flex-col items-center px-4 py-12 transition-all duration-300 ${
          darkMode ? "bg-slate-950 text-white" : "bg-slate-50 text-black"
        }`}
      >
        <section
          id="verify-section"
          className="w-full max-w-3xl text-center"
        >
          <ClaimInput
            claim={claim}
            setClaim={setClaim}
            error={error}
            loading={loading}
            handleVerify={handleVerify}
            darkMode={darkMode}
          />

          {/* Loading */}
          {loading && (
            <div
              className={`mt-8 rounded-3xl p-8 shadow-2xl border transition-all duration-300 ${
                darkMode
                  ? "bg-slate-900 border-slate-700"
                  : "bg-white border-gray-200"
              }`}
            >
              <div className="flex flex-col items-center">
                <div className="w-16 h-16 border-[6px] border-blue-600 border-t-transparent rounded-full animate-spin"></div>

                <h3
                  className={`mt-6 text-2xl font-bold ${
                    darkMode ? "text-white" : "text-gray-900"
                  }`}
                >
                  🤖 AI is Verifying...
                </h3>

                <p
                  className={`mt-2 ${
                    darkMode ? "text-slate-300" : "text-gray-600"
                  }`}
                >
                  Searching trusted sources...
                </p>

                <div
                  className={`mt-8 w-full rounded-full h-2 overflow-hidden ${
                    darkMode ? "bg-slate-700" : "bg-gray-200"
                  }`}
                >
                  <div className="h-full w-1/2 bg-blue-600 animate-pulse"></div>
                </div>

                <div className="mt-6 grid grid-cols-1 gap-3 w-full">
                  <div
                    className={`h-5 rounded animate-pulse ${
                      darkMode ? "bg-slate-700" : "bg-gray-200"
                    }`}
                  ></div>

                  <div
                    className={`h-5 rounded animate-pulse ${
                      darkMode ? "bg-slate-700" : "bg-gray-200"
                    }`}
                  ></div>

                  <div
                    className={`h-5 rounded animate-pulse ${
                      darkMode ? "bg-slate-700" : "bg-gray-200"
                    }`}
                  ></div>
                </div>
              </div>
            </div>
          )}

          {/* Result */}
          {result && (
            <ResultCard
              result={result}
              darkMode={darkMode}
            />
          )}
        </section>
      </main>

      <Features darkMode={darkMode} />
      <Footer darkMode={darkMode} />
    </>
  );
}

export default Home;