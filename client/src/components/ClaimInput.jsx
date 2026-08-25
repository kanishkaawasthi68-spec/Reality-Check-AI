import { useState } from "react";

function ClaimInput({
  darkMode,
  claim,
  setClaim,
  error,
  loading,
  handleVerify,
}) {
  const [listening, setListening] = useState(false);

  const startListening = () => {
    const SpeechRecognition =
      window.SpeechRecognition || window.webkitSpeechRecognition;

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

  return (
    <div
      className={`relative overflow-hidden rounded-3xl p-6 md:p-8 shadow-xl border transition-all duration-300 ${
        darkMode
          ? "bg-slate-900 border-slate-700"
          : "bg-white border-gray-200 hover:shadow-2xl"
      }`}
    >
      {/* Top Header */}
      <div className="flex items-start justify-between gap-4 mb-6">
        <div>
          <div className="flex items-center gap-2 mb-2">
            <span className="text-2xl">🔍</span>

            <h2
              className={`text-2xl md:text-3xl font-extrabold ${
                darkMode ? "text-white" : "text-gray-900"
              }`}
            >
              Verify Any Claim
            </h2>
          </div>

          <p
            className={`text-base md:text-lg ${
              darkMode ? "text-slate-300" : "text-gray-600"
            }`}
          >
            Paste a news statement, claim or URL and let AI verify it.
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
            darkMode ? "text-slate-500" : "text-gray-400"
          }`}
        >
          {claim.length}/500
        </span>
      </div>

      {/* Bottom Controls */}
      <div className="mt-4 flex flex-col sm:flex-row sm:items-center sm:justify-between gap-3">
        <span
          className={`text-sm ${
            darkMode ? "text-slate-400" : "text-gray-500"
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
          {listening ? "🎙️ Listening..." : "🎤 Speak Claim"}
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
        } hover:-translate-y-0.5 hover:shadow-xl disabled:opacity-50 disabled:cursor-not-allowed disabled:hover:translate-y-0`}
      >
        {loading ? "⏳ Verifying..." : "🔍 Verify Claim"}
      </button>

      {/* Small Trust Text */}
      <p
        className={`mt-4 text-center text-xs ${
          darkMode ? "text-slate-500" : "text-gray-400"
        }`}
      >
        AI analyzes your claim using relevant information and trusted sources.
      </p>
    </div>
  );
}

export default ClaimInput;