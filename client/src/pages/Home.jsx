import { useState, useEffect } from "react";
import Hero from "../components/Hero";
import ClaimInput from "../components/ClaimInput";
import ResultCard from "../components/ResultCard";
import Features from "../components/Features";
import Footer from "../components/Footer";

function Home() {
  const [claim, setClaim] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [result, setResult] = useState(null);

  useEffect(() => {
    console.log("Reality Check AI Loaded");
  }, []);

  const handleVerify = async () => {
    if (!claim.trim()) {
      setError("Please enter a claim.");
      return;
    }

    setError("");
    setResult(null);
    setLoading(true);

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
    } catch (error) {
      console.error(error);
      setError(error.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <>
      {/* Hero Section */}
      <Hero />

      {/* Verify Section */}
      <main className="flex flex-col items-center px-4 py-12">
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
          />

          {/* Loading */}
          {loading && (
            <div className="flex flex-col items-center mt-8">
              <div className="w-10 h-10 border-4 border-blue-600 border-t-transparent rounded-full animate-spin"></div>

              <p className="mt-4 text-blue-600 font-medium">
                AI is verifying your claim...
              </p>
            </div>
          )}

          {/* Result */}
          {result && <ResultCard result={result} />}
        </section>
      </main>

      {/* Features */}
      <Features />

      {/* Footer */}
      <Footer />
    </>
  );
}

export default Home;