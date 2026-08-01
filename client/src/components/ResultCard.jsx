import { useState } from "react";
function ResultCard({ result, darkMode }) {
  const [copied, setCopied] = useState(false);

  const verdict = result.verdict?.toLowerCase() || "uncertain";


  const verdictColor = {
    true: "bg-green-600",
    false: "bg-red-600",
    misleading: "bg-orange-500",
    uncertain: "bg-gray-500",
  };

  const verdictIcon = {
    true: "✅",
    false: "❌",
    misleading: "⚠️",
    uncertain: "❓",
  };

  const handleCopy = async () => {
    const text = `Reality Check AI

Verdict: ${result.verdict}

Confidence: ${result.confidence}%

Reason:
${result.reason}

Sources:
${result.sources?.join("\n") || "No sources available"}
`;

    try {
      await navigator.clipboard.writeText(text);

      setCopied(true);

      setTimeout(() => {
        setCopied(false);
      }, 2000);
    } catch (error) {
      console.error("Copy failed:", error);
    }
  };

  const handleShare = async () => {
    const text = `Reality Check AI

Verdict: ${result.verdict}

Confidence: ${result.confidence}%

Reason:
${result.reason}

Sources:
${result.sources?.join("\n") || "No sources available"}
`;

    if (navigator.share) {
      try {
        await navigator.share({
          title: "Reality Check AI Result",
          text,
        });
      } catch (err) {
        console.log(err);
      }
    } else {
      alert("Sharing is not supported on this browser.");
    }
  };

  return (
    <div
      className={`mt-10 rounded-3xl p-8 text-left transition-all duration-500 hover:scale-[1.02] hover:-translate-y-1 hover:shadow-2xl ${darkMode
        ? "bg-slate-900 border border-slate-700"
        : "bg-white/80 backdrop-blur-xl border border-white/30"
        }`}
    >
      {/* Header */}
      <div className="flex flex-col md:flex-row md:justify-between md:items-center gap-4 mb-8">
        <h2
          className={`text-3xl font-extrabold ${darkMode ? "text-white" : "text-blue-600"
            }`}
        >
          AI Verification Result
        </h2>

        <div className="flex gap-3">
          <button
            onClick={handleCopy}
            className="px-5 py-2 rounded-xl bg-blue-600 text-white font-semibold shadow-lg hover:bg-blue-700 hover:scale-105 transition-all"
          >
            {copied ? "✅ Copied!" : "📋 Copy"}
          </button>
          <button
            onClick={handleShare}
            className="px-5 py-2 rounded-xl bg-green-600 text-white font-semibold shadow-lg hover:bg-green-700 hover:scale-105 transition-all"
          >
            🔗 Share
          </button>
        </div>
      </div>

      {/* Cards */}
      <div className="grid md:grid-cols-2 gap-6">
        {/* Verdict */}
        <div
          className={`rounded-2xl border p-5 shadow-sm ${darkMode
            ? "bg-slate-800 border-slate-700"
            : "bg-white border-gray-200"
            }`}
        >
          <p
            className={`font-semibold ${darkMode ? "text-white" : "text-gray-700"
              }`}
          >
            ✅ Verdict
          </p>

          <span
            className={`inline-flex items-center gap-2 mt-3 px-6 py-2 rounded-full text-white font-bold shadow-lg ${verdictColor[verdict] || "bg-gray-500"
              }`}
          >
            <span className="text-lg">{verdictIcon[verdict]}</span>
            {result.verdict}
          </span>
        </div>

        {/* Confidence */}
        <div
          className={`rounded-2xl border p-5 shadow-sm ${darkMode
            ? "bg-slate-800 border-slate-700"
            : "bg-white border-gray-200"
            }`}
        >
          <p
            className={`font-semibold mb-3 ${darkMode ? "text-white" : "text-gray-700"
              }`}
          >
            🎯 Confidence
          </p>

          <div
            className={`w-full h-4 rounded-full overflow-hidden ${darkMode ? "bg-slate-700" : "bg-gray-200"
              }`}
          >
            <div
              className={`h-4 transition-all duration-1000 ${result.confidence >= 80
                ? "bg-green-500"
                : result.confidence >= 50
                  ? "bg-yellow-500"
                  : "bg-red-500"
                }`}
              style={{
                width: `${result.confidence || 0}%`,
              }}
            ></div>
          </div>

          <div className="mt-4 flex justify-center">
            <div
              className={`px-4 py-2 rounded-full font-bold ${darkMode
                ? "bg-slate-700 text-blue-300"
                : "bg-blue-100 text-blue-700"
                }`}
            >
              {result.confidence}% Confidence
            </div>
          </div>
        </div>

        {/* Reason */}
        <div
          className={`rounded-2xl border p-5 shadow-sm md:col-span-2 ${darkMode
            ? "bg-slate-800 border-slate-700"
            : "bg-white border-gray-200"
            }`}
        >
          <p
            className={`font-semibold mb-3 ${darkMode ? "text-white" : "text-gray-700"
              }`}
          >
            📖 Reason
          </p>

          <p
            className={`leading-7 ${darkMode ? "text-slate-300" : "text-gray-600"
              }`}
          >
            {result.reason}
          </p>
        </div>
      </div>

      {/* Sources */}
      <div
        className={`mt-6 rounded-2xl border p-5 shadow-sm ${darkMode
          ? "bg-slate-800 border-slate-700"
          : "bg-white border-gray-200"
          }`}
      >
        <p
          className={`font-semibold mb-4 ${darkMode ? "text-white" : "text-gray-700"
            }`}
        >
          🔗 Sources
        </p>

        {result.sources?.length ? (
          <ul className="space-y-3">
            {result.sources.map((source, index) => (
              <li
                key={index}
                className={`rounded-xl p-4 transition hover:shadow-md ${darkMode
                  ? "bg-slate-700 border border-slate-600"
                  : "bg-blue-50 border border-blue-100"
                  }`}
              >
                <a
                  href={source}
                  target="_blank"
                  rel="noopener noreferrer"
                  className={`font-semibold break-all ${darkMode
                    ? "text-blue-400 hover:text-cyan-300"
                    : "text-blue-700 hover:text-purple-700"
                    }`}
                >
                  {source}
                </a>
              </li>
            ))}
          </ul>
        ) : (
          <p className={darkMode ? "text-slate-400" : "text-gray-500"}>
            No sources available.
          </p>
        )}
      </div>

      <div className="mt-8 flex justify-center">
        <button
          onClick={() =>
            document
              .getElementById("verify-section")
              ?.scrollIntoView({ behavior: "smooth" })
          }
          className="px-8 py-3 rounded-xl bg-purple-600 text-white font-bold shadow-lg hover:bg-purple-700 hover:scale-105 transition-all"
        >
          🔄 Verify Another Claim
        </button>
      </div>
    </div>
  );
}

export default ResultCard;