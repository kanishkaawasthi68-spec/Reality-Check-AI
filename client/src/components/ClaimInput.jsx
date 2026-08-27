import { useState } from "react";

function ClaimInput({
  darkMode,
  claim,
  setClaim,
  error,
  loading,
  handleVerify,

  // Image verification props
  verificationType,
  setVerificationType,
  image,
  setImage,
  handleImageVerify,
  imageLoading,
}) {
  const [listening, setListening] = useState(false);

  const startListening = () => {
    const SpeechRecognition =
      window.SpeechRecognition ||
      window.webkitSpeechRecognition;

    if (!SpeechRecognition) {
      alert("Speech Recognition is not supported in this browser.");
      return;
    }

    const recognition = new SpeechRecognition();

    recognition.lang = "en-US";
    recognition.interimResults = false;
    recognition.maxAlternatives = 1;

    setListening(true);
    recognition.start();

    recognition.onresult = (event) => {
      setClaim(event.results[0][0].transcript);
    };

    recognition.onend = () => {
      setListening(false);
    };

    recognition.onerror = () => {
      setListening(false);
    };
  };

  const handleImageChange = (event) => {
    const selectedFile = event.target.files?.[0];

    if (!selectedFile) return;

    // Only allow images
    if (!selectedFile.type.startsWith("image/")) {
      alert("Please upload a valid image.");
      return;
    }

    // 10 MB limit
    if (selectedFile.size > 10 * 1024 * 1024) {
      alert("Image size should be less than 10 MB.");
      return;
    }

    setImage(selectedFile);
  };

  return (
    <div
      className={`relative overflow-hidden rounded-3xl p-6 md:p-8 shadow-xl border transition-all duration-300 ${
        darkMode
          ? "bg-slate-900 border-slate-700"
          : "bg-white border-gray-200 hover:shadow-2xl"
      }`}
    >
      {/* ================= TOP HEADER ================= */}

      <div className="flex items-start justify-between gap-4 mb-6">
        <div>
          <div className="flex items-center gap-2 mb-2">
            <span className="text-2xl">
              {verificationType === "image" ? "🖼️" : "🔍"}
            </span>

            <h2
              className={`text-2xl md:text-3xl font-extrabold ${
                darkMode
                  ? "text-white"
                  : "text-gray-900"
              }`}
            >
              {verificationType === "image"
                ? "Verify Any Image"
                : "Verify Any Claim"}
            </h2>
          </div>

          <p
            className={`text-base md:text-lg ${
              darkMode
                ? "text-slate-300"
                : "text-gray-600"
            }`}
          >
            {verificationType === "image"
              ? "Upload an image and let AI check whether it is real or AI generated."
              : "Paste a news statement, claim or URL and let AI verify it."}
          </p>
        </div>

        {/* AI Badge */}
        <span
          className={`hidden sm:inline-flex items-center whitespace-nowrap px-3 py-1.5 rounded-full text-sm font-semibold ${
            darkMode
              ? "bg-blue-500/10 text-blue-400 border border-blue-500/20"
              : "bg-blue-50 text-blue-700 border border-blue-100"
          }`}
        >
          🤖 AI Powered
        </span>
      </div>

      {/* ================= TYPE SWITCH ================= */}

      <div className="flex justify-center mb-6">
        <div
          className={`inline-flex p-1 rounded-xl border ${
            darkMode
              ? "bg-slate-800 border-slate-700"
              : "bg-gray-100 border-gray-200"
          }`}
        >
          {/* Text Button */}
          <button
            type="button"
            onClick={() => {
              setVerificationType("text");
              setImage(null);
            }}
            className={`px-5 sm:px-7 py-2.5 rounded-lg font-semibold transition-all duration-300 ${
              verificationType === "text"
                ? "bg-blue-600 text-white shadow-md"
                : darkMode
                ? "text-slate-300 hover:bg-slate-700"
                : "text-gray-600 hover:bg-white"
            }`}
          >
            📝 Text Claim
          </button>

          {/* Image Button */}
          <button
            type="button"
            onClick={() => {
              setVerificationType("image");
              setClaim("");
            }}
            className={`px-5 sm:px-7 py-2.5 rounded-lg font-semibold transition-all duration-300 ${
              verificationType === "image"
                ? "bg-blue-600 text-white shadow-md"
                : darkMode
                ? "text-slate-300 hover:bg-slate-700"
                : "text-gray-600 hover:bg-white"
            }`}
          >
            🖼️ Image
          </button>
        </div>
      </div>

      {/* ================================================= */}
      {/* TEXT VERIFICATION */}
      {/* ================================================= */}

      {verificationType === "text" && (
        <>
          {/* Textarea */}
          <div className="relative">
            <textarea
              rows={6}
              maxLength={500}
              value={claim}
              onChange={(e) => setClaim(e.target.value)}
              placeholder="Example: The Taj Mahal is located in Delhi."
              className={`w-full rounded-2xl p-5 pb-12 text-base md:text-lg resize-none outline-none transition-all duration-300 ${
                darkMode
                  ? "bg-slate-800 border border-slate-700 text-white placeholder-slate-500"
                  : "bg-gray-50 border border-gray-200 text-gray-900 placeholder-gray-400"
              } focus:border-blue-500 focus:ring-4 focus:ring-blue-500/10`}
            />

            {/* Character Counter */}
            <span
              className={`absolute bottom-4 right-4 text-sm ${
                darkMode
                  ? "text-slate-500"
                  : "text-gray-400"
              }`}
            >
              {claim.length}/500
            </span>
          </div>

          {/* Bottom Controls */}
          <div className="mt-4 flex flex-col sm:flex-row sm:items-center sm:justify-between gap-3">
            <span
              className={`text-sm ${
                darkMode
                  ? "text-slate-400"
                  : "text-gray-500"
              }`}
            >
              💡 Enter your claim or paste a URL
            </span>

            {/* Voice Button */}
            <button
              type="button"
              onClick={startListening}
              disabled={listening || loading}
              className={`px-4 py-2.5 rounded-xl font-semibold transition-all duration-300 ${
                listening
                  ? "bg-red-500 text-white"
                  : darkMode
                  ? "bg-slate-800 text-purple-400 border border-slate-700 hover:bg-slate-700"
                  : "bg-purple-50 text-purple-700 border border-purple-100 hover:bg-purple-100"
              } disabled:opacity-50 disabled:cursor-not-allowed`}
            >
              {listening
                ? "🎙️ Listening..."
                : "🎤 Speak Claim"}
            </button>
          </div>

          {/* Error */}
          {error && (
            <div
              className={`mt-5 px-4 py-3 rounded-xl text-sm font-medium ${
                darkMode
                  ? "bg-red-500/10 text-red-400 border border-red-500/20"
                  : "bg-red-50 text-red-600 border border-red-100"
              }`}
            >
              ⚠️ {error}
            </div>
          )}

          {/* Verify Button */}
          <button
            type="button"
            onClick={handleVerify}
            disabled={loading}
            className={`w-full mt-6 rounded-2xl py-4 text-lg font-bold text-white shadow-lg transition-all duration-300 ${
              darkMode
                ? "bg-blue-500 hover:bg-blue-600"
                : "bg-blue-600 hover:bg-blue-700"
            } hover:-translate-y-0.5 hover:shadow-xl disabled:opacity-50 disabled:cursor-not-allowed`}
          >
            {loading
              ? "⏳ Verifying..."
              : "🔍 Verify Claim"}
          </button>

          {/* Trust Text */}
          <p
            className={`mt-4 text-center text-xs ${
              darkMode
                ? "text-slate-500"
                : "text-gray-400"
            }`}
          >
            AI analyzes your claim using relevant information
            and trusted sources.
          </p>
        </>
      )}

      {/* ================================================= */}
      {/* IMAGE VERIFICATION */}
      {/* ================================================= */}

      {verificationType === "image" && (
        <>
          {/* Upload Area */}
          <label
            htmlFor="image-upload"
            className={`block w-full rounded-2xl border-2 border-dashed p-8 md:p-12 text-center cursor-pointer transition-all duration-300 ${
              darkMode
                ? "bg-slate-800/70 border-slate-600 hover:border-blue-500 hover:bg-slate-800"
                : "bg-gray-50 border-gray-300 hover:border-blue-500 hover:bg-blue-50/40"
            }`}
          >
            <input
              id="image-upload"
              type="file"
              accept="image/png,image/jpeg,image/jpg,image/webp"
              onChange={handleImageChange}
              className="hidden"
            />

            {!image ? (
              <>
                <div className="text-5xl mb-4">
                  🖼️
                </div>

                <h3
                  className={`text-xl font-bold ${
                    darkMode
                      ? "text-white"
                      : "text-gray-900"
                  }`}
                >
                  Upload an Image
                </h3>

                <p
                  className={`mt-2 text-sm ${
                    darkMode
                      ? "text-slate-400"
                      : "text-gray-500"
                  }`}
                >
                  Click to browse or choose an image
                </p>

                <p
                  className={`mt-3 text-xs ${
                    darkMode
                      ? "text-slate-500"
                      : "text-gray-400"
                  }`}
                >
                  PNG, JPG, JPEG or WEBP • Max 10 MB
                </p>
              </>
            ) : (
              <>
                <div className="text-4xl mb-3">
                  ✅
                </div>

                <h3
                  className={`text-lg font-bold break-all ${
                    darkMode
                      ? "text-white"
                      : "text-gray-900"
                  }`}
                >
                  {image.name}
                </h3>

                <p
                  className={`mt-2 text-sm ${
                    darkMode
                      ? "text-slate-400"
                      : "text-gray-500"
                  }`}
                >
                  Image selected successfully
                </p>
              </>
            )}
          </label>

          {/* Selected Image Preview */}
          {image && (
            <div
              className={`mt-5 rounded-2xl overflow-hidden border ${
                darkMode
                  ? "border-slate-700 bg-slate-800"
                  : "border-gray-200 bg-gray-50"
              }`}
            >
              <img
                src={URL.createObjectURL(image)}
                alt="Selected"
                className="w-full max-h-80 object-contain"
              />
            </div>
          )}

          {/* Analyze Image Button */}
          <button
            type="button"
            onClick={handleImageVerify}
            disabled={!image || imageLoading}
            className={`w-full mt-6 rounded-2xl py-4 text-lg font-bold text-white shadow-lg transition-all duration-300 ${
              darkMode
                ? "bg-blue-500 hover:bg-blue-600"
                : "bg-blue-600 hover:bg-blue-700"
            } hover:-translate-y-0.5 hover:shadow-xl disabled:opacity-50 disabled:cursor-not-allowed`}
          >
            {imageLoading
              ? "⏳ Analyzing Image..."
              : "🖼️ Analyze Image"}
          </button>

          {/* Image Trust Text */}
          <p
            className={`mt-4 text-center text-xs ${
              darkMode
                ? "text-slate-500"
                : "text-gray-400"
            }`}
          >
            AI will analyze the uploaded image for signs of
            AI generation.
          </p>
        </>
      )}
    </div>
  );
}

export default ClaimInput;