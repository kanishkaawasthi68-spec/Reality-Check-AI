import { useState } from "react";

import Hero from "../components/Hero";
import ClaimInput from "../components/ClaimInput";
import ResultCard from "../components/ResultCard";
import ImageResultCard from "../components/ImageResultCard";
import Features from "../components/Features";
import Footer from "../components/Footer";

function Home({ darkMode }) {
  // ================= TEXT STATES =================

  const [claim, setClaim] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [result, setResult] = useState(null);

  // ================= IMAGE STATES =================

  const [verificationType, setVerificationType] = useState("text");

  const [image, setImage] = useState(null);
  const [imageLoading, setImageLoading] = useState(false);
  const [imageResult, setImageResult] = useState(null);
  const [imageError, setImageError] = useState("");

  // =================================================
  // CHANGE VERIFICATION TYPE
  // =================================================

  const handleVerificationTypeChange = (type) => {
    setVerificationType(type);

    // Clear previous results/errors
    setError("");
    setImageError("");

    if (type === "text") {
      setImageResult(null);
    }

    if (type === "image") {
      setResult(null);
    }
  };

  // =================================================
  // TEXT CLAIM VERIFICATION
  // =================================================

  const handleVerify = async () => {
    if (!claim.trim()) {
      setError("Please enter a claim.");
      return;
    }

    setLoading(true);
    setError("");
    setResult(null);

    try {
      const response = await fetch(
        "https://reality-check-ai-2.onrender.com/verify",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            claim: claim.trim(),
          }),
        }
      );

      const data = await response.json();

      if (!response.ok) {
        throw new Error(
          data.message || "Something went wrong"
        );
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

  // =================================================
  // IMAGE VERIFICATION
  // =================================================

  const handleImageVerify = async () => {
    if (!image) {
      setImageError("Please upload an image first.");
      return;
    }

    setImageLoading(true);
    setImageError("");
    setImageResult(null);

    try {
      const formData = new FormData();

      formData.append("image", image);

      const response = await fetch(
        "https://reality-check-ai-2.onrender.com/image-verify",
        {
          method: "POST",
          body: formData,
        }
      );

      const data = await response.json();

      if (!response.ok) {
        throw new Error(
          data.message ||
            "Image verification failed."
        );
      }

      setImageResult(data);
    } catch (err) {
      console.error(
        "Image Verification Error:",
        err
      );

      setImageError(
        err.message ||
          "Unable to analyze the image. Please check whether the backend is running."
      );
    } finally {
      setImageLoading(false);
    }
  };

  return (
    <>
      {/* ================================================= */}
      {/* HERO */}
      {/* ================================================= */}

      <Hero darkMode={darkMode} />

      {/* ================================================= */}
      {/* MAIN */}
      {/* ================================================= */}

      <main
        className={`relative overflow-hidden transition-all duration-300 ${
          darkMode
            ? "bg-slate-950 text-white"
            : "bg-slate-50 text-gray-900"
        }`}
      >
        {/* ================================================= */}
        {/* MOVING BACKGROUND */}
        {/* ================================================= */}

        {/* Blue Glow */}
        <div
          className={`absolute -top-20 -left-40 w-[420px] h-[420px] rounded-full blur-3xl pointer-events-none animate-float-one ${
            darkMode
              ? "bg-blue-600/20"
              : "bg-blue-400/60"
          }`}
        />

        {/* Cyan Glow */}
        <div
          className={`absolute top-[35%] -right-40 w-[450px] h-[450px] rounded-full blur-3xl pointer-events-none animate-float-two ${
            darkMode
              ? "bg-cyan-500/15"
              : "bg-cyan-400/60"
          }`}
        />

        {/* Purple Glow */}
        <div
          className={`absolute bottom-20 left-[30%] w-[380px] h-[380px] rounded-full blur-3xl pointer-events-none animate-float-three ${
            darkMode
              ? "bg-indigo-600/15"
              : "bg-indigo-400/50"
          }`}
        />

        {/* Small Blue Glow */}
        <div
          className={`absolute top-[60%] left-10 w-56 h-56 rounded-full blur-3xl pointer-events-none animate-float-two ${
            darkMode
              ? "bg-blue-500/10"
              : "bg-blue-300/50"
          }`}
        />

        {/* ================================================= */}
        {/* CONTENT */}
        {/* ================================================= */}

        <div className="relative z-10">

          {/* ================================================= */}
          {/* VERIFICATION SECTION */}
          {/* ================================================= */}

          <section
            id="verify-section"
            className="max-w-6xl mx-auto px-4 sm:px-6 py-20"
          >

            {/* ================= HEADING ================= */}

            <div className="text-center max-w-2xl mx-auto mb-10">

              <span
                className={`inline-flex items-center px-4 py-2 rounded-full text-sm font-semibold border ${
                  darkMode
                    ? "bg-slate-900/80 border-slate-700 text-blue-400"
                    : "bg-white/80 border-gray-200 text-blue-600"
                }`}
              >
                {verificationType === "image"
                  ? "🖼️ AI Image Detection"
                  : "🔍 AI Fact Verification"}
              </span>

              <h2
                className={`mt-5 text-3xl sm:text-4xl md:text-5xl font-black tracking-tight ${
                  darkMode
                    ? "text-white"
                    : "text-gray-900"
                }`}
              >
                {verificationType === "image"
                  ? "Check if an image is "
                  : "Verify before "}

                <span
                  className={
                    verificationType === "image"
                      ? "text-purple-600"
                      : "text-blue-600"
                  }
                >
                  {verificationType === "image"
                    ? "AI Generated"
                    : "you trust."}
                </span>
              </h2>

              <p
                className={`mt-4 text-base sm:text-lg leading-8 ${
                  darkMode
                    ? "text-slate-400"
                    : "text-gray-600"
                }`}
              >
                {verificationType === "image"
                  ? "Upload an image and let AI analyze whether it is likely real or AI generated."
                  : "Enter a claim or URL and let AI analyze it using relevant information and trusted web sources."}
              </p>
            </div>

            {/* ================================================= */}
            {/* CLAIM INPUT + IMAGE INPUT */}
            {/* ================================================= */}

            <div className="max-w-4xl mx-auto">

              <ClaimInput
                darkMode={darkMode}

                // Text
                claim={claim}
                setClaim={setClaim}
                error={
                  verificationType === "image"
                    ? imageError
                    : error
                }
                loading={loading}
                handleVerify={handleVerify}

                // Verification type
                verificationType={verificationType}
                setVerificationType={
                  handleVerificationTypeChange
                }

                // Image
                image={image}
                setImage={setImage}
                handleImageVerify={
                  handleImageVerify
                }
                imageLoading={imageLoading}
              />

            </div>

            {/* ================================================= */}
            {/* TRUST BADGES */}
            {/* ================================================= */}

            <div className="flex flex-wrap justify-center gap-3 mt-8">

              {[
                "🤖 AI Powered",
                "🌐 Web Sources",
                "🖼️ Image Detection",
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

            {/* ================================================= */}
            {/* TEXT LOADING */}
            {/* ================================================= */}

            {loading &&
              verificationType === "text" && (
                <div
                  className={`max-w-4xl mx-auto mt-10 rounded-3xl p-8 border shadow-xl backdrop-blur-sm ${
                    darkMode
                      ? "bg-slate-900/90 border-slate-700"
                      : "bg-white/90 border-gray-200"
                  }`}
                >
                  <div className="flex flex-col items-center text-center">

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
                        darkMode
                          ? "text-white"
                          : "text-gray-900"
                      }`}
                    >
                      AI is analyzing your claim
                    </h3>

                    <p
                      className={`mt-2 ${
                        darkMode
                          ? "text-slate-400"
                          : "text-gray-600"
                      }`}
                    >
                      Checking relevant information and
                      trusted sources...
                    </p>

                    <div
                      className={`mt-8 w-full max-w-xl h-2 rounded-full overflow-hidden ${
                        darkMode
                          ? "bg-slate-700"
                          : "bg-gray-200"
                      }`}
                    >
                      <div className="h-full w-1/2 rounded-full bg-blue-600 animate-pulse" />
                    </div>

                  </div>
                </div>
              )}

            {/* ================================================= */}
            {/* IMAGE LOADING */}
            {/* ================================================= */}

            {imageLoading &&
              verificationType === "image" && (
                <div
                  className={`max-w-4xl mx-auto mt-10 rounded-3xl p-8 border shadow-xl backdrop-blur-sm ${
                    darkMode
                      ? "bg-slate-900/90 border-slate-700"
                      : "bg-white/90 border-gray-200"
                  }`}
                >
                  <div className="flex flex-col items-center text-center">

                    <div className="relative">

                      <div
                        className={`w-16 h-16 rounded-full border-4 ${
                          darkMode
                            ? "border-slate-700"
                            : "border-purple-100"
                        }`}
                      />

                      <div className="absolute inset-0 w-16 h-16 rounded-full border-4 border-purple-600 border-t-transparent animate-spin" />

                    </div>

                    <h3
                      className={`mt-6 text-2xl font-bold ${
                        darkMode
                          ? "text-white"
                          : "text-gray-900"
                      }`}
                    >
                      AI is analyzing your image
                    </h3>

                    <p
                      className={`mt-2 ${
                        darkMode
                          ? "text-slate-400"
                          : "text-gray-600"
                      }`}
                    >
                      Checking whether the image is
                      likely real or AI generated...
                    </p>

                    <div
                      className={`mt-8 w-full max-w-xl h-2 rounded-full overflow-hidden ${
                        darkMode
                          ? "bg-slate-700"
                          : "bg-gray-200"
                      }`}
                    >
                      <div className="h-full w-1/2 rounded-full bg-purple-600 animate-pulse" />
                    </div>

                  </div>
                </div>
              )}

            {/* ================================================= */}
            {/* TEXT RESULT */}
            {/* ================================================= */}

            {result &&
              verificationType === "text" && (
                <div className="max-w-4xl mx-auto mt-10">

                  <ResultCard
                    result={result}
                    darkMode={darkMode}
                  />

                </div>
              )}

            {/* ================================================= */}
            {/* IMAGE RESULT */}
            {/* ================================================= */}

            {imageResult &&
              verificationType === "image" && (
                <div className="max-w-4xl mx-auto mt-10">

                  <ImageResultCard
                    result={imageResult}
                    darkMode={darkMode}
                  />

                </div>
              )}

          </section>

          {/* ================================================= */}
          {/* HOW IT WORKS */}
          {/* ================================================= */}

          <section
            className={`relative border-t ${
              darkMode
                ? "border-slate-800"
                : "border-gray-200"
            }`}
          >
            <div className="max-w-6xl mx-auto px-4 sm:px-6 py-20">

              <div className="text-center max-w-2xl mx-auto">

                <span className="text-blue-600 font-semibold text-sm uppercase tracking-wider">
                  How it works
                </span>

                <h2
                  className={`mt-3 text-3xl sm:text-4xl font-black ${
                    darkMode
                      ? "text-white"
                      : "text-gray-900"
                  }`}
                >
                  Fact checking made simple
                </h2>

                <p
                  className={`mt-4 ${
                    darkMode
                      ? "text-slate-400"
                      : "text-gray-600"
                  }`}
                >
                  Get a clear understanding of a claim
                  or image in just a few simple steps.
                </p>

              </div>

              <div className="grid md:grid-cols-3 gap-6 mt-12">

                {[
                  {
                    number: "01",
                    title: "Enter or Upload",
                    text: "Enter a claim, paste a URL, or upload an image you want to verify.",
                  },
                  {
                    number: "02",
                    title: "AI Analyzes",
                    text: "Our AI analyzes the provided information and looks for relevant evidence.",
                  },
                  {
                    number: "03",
                    title: "Get Your Verdict",
                    text: "Review the result, confidence and supporting information in one place.",
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
                        darkMode
                          ? "text-white"
                          : "text-gray-900"
                      }`}
                    >
                      {step.title}
                    </h3>

                    <p
                      className={`mt-3 leading-7 ${
                        darkMode
                          ? "text-slate-400"
                          : "text-gray-600"
                      }`}
                    >
                      {step.text}
                    </p>

                  </div>
                ))}

              </div>
            </div>
          </section>

          {/* ================================================= */}
          {/* FEATURES */}
          {/* ================================================= */}

          <Features darkMode={darkMode} />

        </div>
      </main>

      {/* ================================================= */}
      {/* FOOTER */}
      {/* ================================================= */}

      <Footer darkMode={darkMode} />
    </>
  );
}

export default Home;