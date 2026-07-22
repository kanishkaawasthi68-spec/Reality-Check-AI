import Hero from "../components/Hero";
import ClaimInput from "../components/ClaimInput";
import Features from "../components/Features";
import Footer from "../components/Footer";
import ResultCard from "../components/ResultCard";
import { useState } from "react";

function Home() {
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
      <Hero />

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

          {loading && (
            <div className="flex justify-center mt-6">
              <div className="w-10 h-10 border-4 border-blue-600 border-t-transparent rounded-full animate-spin"></div>
            </div>
          )}

          {result && <ResultCard result={result} />}
        </section>
      </main>

      <Features />
      <Footer />
    </>
  );
}

export default Home;