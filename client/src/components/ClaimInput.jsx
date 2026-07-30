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
      className={`relative overflow-hidden rounded-3xl p-8 shadow-2xl transition-all duration-300 hover:-translate-y-1 ${darkMode
          ? "bg-slate-900 border border-slate-700"
          : "bg-white/80 backdrop-blur-xl border border-white/20 hover:shadow-blue-200"
        }`}
    >
      {/* AI Badge */}
      <div
        className={`absolute top-3 right-4 md:top-6 md:right-6 px-3 py-1 text-xs md:text-sm font-semibold rounded-full ${darkMode
          ? "bg-slate-800 text-blue-400"
          : "bg-blue-100 text-blue-700"
          }`}
      >
        🤖 AI Powered
      </div>

      {/* Heading */}
      <h2
        className={`text-3xl font-extrabold mb-2 ${darkMode ? "text-white" : "text-blue-700"
          }`}
      >
        Verify Any Claim
      </h2>

      {/* Description */}
      <p
        className={`text-lg mb-8 ${darkMode ? "text-slate-300" : "text-gray-600"
          }`}
      >
        Paste any news, statement or URL and let AI verify it.
      </p>

      {/* Textarea */}
      <textarea
        rows={5}
        maxLength={500}
        value={claim}
        onChange={(e) => setClaim(e.target.value)}
        placeholder="Example: The Taj Mahal is located in Delhi."
        className={`w-full rounded-2xl p-5 text-lg resize-none outline-none transition-all duration-300 ${darkMode
            ? "bg-slate-800 border border-slate-700 text-white placeholder-slate-400"
            : "bg-gray-50 border border-gray-200 text-gray-900 placeholder-gray-400"
          } focus:border-blue-500 focus:ring-4 focus:ring-blue-200`}
      />

      {/* Counter */}
      <div className="mt-2 flex justify-between items-center">
        <span
          className={`text-sm ${darkMode ? "text-slate-400" : "text-gray-500"
            }`}
        >
          Enter your claim or paste a URL
        </span>

        <span
          className={`text-sm ${darkMode ? "text-slate-400" : "text-gray-500"
            }`}
        >
          {claim.length}/500
        </span>
      </div>

      {/* Voice Button */}
      <div className="mt-4 flex justify-end">
        <button
          onClick={startListening}
          disabled={listening}
          className={`px-4 py-2 rounded-xl text-white shadow-md transition-all duration-300 hover:scale-105 ${listening
              ? "bg-red-500"
              : "bg-purple-600 hover:bg-purple-700"
            }`}
        >
          {listening ? "🎙️ Listening..." : "🎤 Start Speaking"}
        </button>
      </div>

      {/* Error */}
      {error && (
        <p
          className={`mt-4 font-medium ${darkMode ? "text-red-400" : "text-red-600"
            }`}
        >
          {error}
        </p>
      )}

      {/* Verify Button */}
      <button
        onClick={handleVerify}
        disabled={loading}
        className={`w-full mt-8 rounded-2xl py-4 text-lg font-bold text-white shadow-lg transition-all duration-300 hover:scale-[1.02] hover:shadow-xl disabled:opacity-50 ${darkMode
            ? "bg-blue-500 hover:bg-blue-600"
            : "bg-blue-600 hover:bg-blue-700"
          }`}
      >
        {loading ? "⏳ Verifying..." : "🔍 Verify Claim"}
      </button>
    </div>
  );
}

export default ClaimInput;