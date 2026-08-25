import { useState } from "react";

function ResultCard({ result, darkMode }) {
  const [copied, setCopied] = useState(false);

  const verdict = result.verdict?.toLowerCase() || "uncertain";
  const confidence = Number(result.confidence) || 0;

  const verdictData = {
    true: {
      icon: "✅",
      label: "True",
      color: "bg-emerald-500",
      lightBg: "bg-emerald-50",
      lightText: "text-emerald-700",
      darkBg: "bg-emerald-500/10",
      darkText: "text-emerald-400",
    },

    false: {
      icon: "❌",
      label: "False",
      color: "bg-red-500",
      lightBg: "bg-red-50",
      lightText: "text-red-700",
      darkBg: "bg-red-500/10",
      darkText: "text-red-400",
    },

    misleading: {
      icon: "⚠️",
      label: "Misleading",
      color: "bg-orange-500",
      lightBg: "bg-orange-50",
      lightText: "text-orange-700",
      darkBg: "bg-orange-500/10",
      darkText: "text-orange-400",
    },

    uncertain: {
      icon: "❓",
      label: "Uncertain",
      color: "bg-gray-500",
      lightBg: "bg-gray-50",
      lightText: "text-gray-700",
      darkBg: "bg-slate-800",
      darkText: "text-slate-300",
    },
  };

  const currentVerdict =
    verdictData[verdict] || verdictData.uncertain;

  const getConfidenceColor = () => {
    if (confidence >= 80) return "bg-emerald-500";
    if (confidence >= 50) return "bg-yellow-500";
    return "bg-red-500";
  };

  const getConfidenceText = () => {
    if (confidence >= 80) return "High Confidence";
    if (confidence >= 50) return "Moderate Confidence";
    return "Low Confidence";
  };

  const shareText = `Reality Check AI

Verdict: ${result.verdict}

Confidence: ${confidence}%

Reason:
${result.reason}

Sources:
${result.sources?.join("\n") || "No sources available"}`;

  const handleCopy = async () => {
    try {
      await navigator.clipboard.writeText(shareText);

      setCopied(true);

      setTimeout(() => {
        setCopied(false);
      }, 2000);
    } catch (error) {
      console.error("Copy failed:", error);
    }
  };

  const handleShare = async () => {
    if (navigator.share) {
      try {
        await navigator.share({
          title: "Reality Check AI Result",
          text: shareText,
        });
      } catch (error) {
        console.log(error);
      }
    } else {
      await handleCopy();
    }
  };

  return (
    <div
      className={`mt-10 rounded-3xl overflow-hidden border shadow-2xl transition-all duration-500 ${
        darkMode
          ? "bg-slate-900/95 border-slate-700"
          : "bg-white/95 border-gray-200"
      }`}
    >
      {/* ================= HEADER ================= */}

      <div
        className={`px-6 md:px-8 py-6 border-b ${
          darkMode
            ? "border-slate-700"
            : "border-gray-200"
        }`}
      >
        <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
          <div>
            <p
              className={`text-sm font-semibold uppercase tracking-wider ${
                darkMode
                  ? "text-blue-400"
                  : "text-blue-600"
              }`}
            >
              AI Analysis
            </p>

            <h2
              className={`mt-1 text-2xl md:text-3xl font-black ${
                darkMode
                  ? "text-white"
                  : "text-gray-900"
              }`}
            >
              Verification Result
            </h2>
          </div>

          {/* Actions */}
          <div className="flex gap-2">
            <button
              onClick={handleCopy}
              className={`px-4 py-2.5 rounded-xl font-semibold text-sm border transition-all duration-300 ${
                darkMode
                  ? "bg-slate-800 border-slate-700 text-slate-200 hover:bg-slate-700"
                  : "bg-white border-gray-200 text-gray-700 hover:bg-gray-50"
              }`}
            >
              {copied ? "✅ Copied" : "📋 Copy"}
            </button>

            <button
              onClick={handleShare}
              className="px-4 py-2.5 rounded-xl bg-blue-600 text-white font-semibold text-sm hover:bg-blue-700 transition-all duration-300"
            >
              🔗 Share
            </button>
          </div>
        </div>
      </div>

      {/* ================= MAIN CONTENT ================= */}

      <div className="p-6 md:p-8">
        <div className="grid md:grid-cols-2 gap-6">

          {/* ================= VERDICT ================= */}

          <div
            className={`rounded-2xl p-6 border ${
              darkMode
                ? "bg-slate-800/80 border-slate-700"
                : "bg-gray-50 border-gray-200"
            }`}
          >
            <div className="flex items-center justify-between">
              <p
                className={`text-sm font-semibold uppercase tracking-wide ${
                  darkMode
                    ? "text-slate-400"
                    : "text-gray-500"
                }`}
              >
                Verdict
              </p>

              <span className="text-xl">
                {currentVerdict.icon}
              </span>
            </div>

            <div className="mt-5">
              <span
                className={`inline-flex items-center gap-2 px-5 py-2.5 rounded-full text-white font-bold shadow-md ${currentVerdict.color}`}
              >
                {currentVerdict.icon}
                {currentVerdict.label}
              </span>
            </div>

            <p
              className={`mt-4 text-sm leading-6 ${
                darkMode
                  ? "text-slate-400"
                  : "text-gray-600"
              }`}
            >
              Based on the information and sources
              analyzed by the AI.
            </p>
          </div>

          {/* ================= CONFIDENCE ================= */}

          <div
            className={`rounded-2xl p-6 border ${
              darkMode
                ? "bg-slate-800/80 border-slate-700"
                : "bg-gray-50 border-gray-200"
            }`}
          >
            <div className="flex items-center justify-between">
              <p
                className={`text-sm font-semibold uppercase tracking-wide ${
                  darkMode
                    ? "text-slate-400"
                    : "text-gray-500"
                }`}
              >
                Confidence
              </p>

              <span className="text-xl">🎯</span>
            </div>

            <div className="flex items-end gap-2 mt-4">
              <span
                className={`text-4xl font-black ${
                  darkMode
                    ? "text-white"
                    : "text-gray-900"
                }`}
              >
                {confidence}%
              </span>

              <span
                className={`mb-1 text-sm font-semibold ${
                  confidence >= 80
                    ? "text-emerald-500"
                    : confidence >= 50
                    ? "text-yellow-500"
                    : "text-red-500"
                }`}
              >
                {getConfidenceText()}
              </span>
            </div>

            <div
              className={`mt-5 h-3 rounded-full overflow-hidden ${
                darkMode
                  ? "bg-slate-700"
                  : "bg-gray-200"
              }`}
            >
              <div
                className={`h-full rounded-full transition-all duration-1000 ${getConfidenceColor()}`}
                style={{
                  width: `${Math.min(confidence, 100)}%`,
                }}
              />
            </div>
          </div>

          {/* ================= REASON ================= */}

          <div
            className={`md:col-span-2 rounded-2xl p-6 border ${
              darkMode
                ? "bg-slate-800/80 border-slate-700"
                : "bg-gray-50 border-gray-200"
            }`}
          >
            <div className="flex items-center gap-2">
              <span className="text-xl">📖</span>

              <h3
                className={`text-lg font-bold ${
                  darkMode
                    ? "text-white"
                    : "text-gray-900"
                }`}
              >
                Why this verdict?
              </h3>
            </div>

            <p
              className={`mt-4 leading-8 ${
                darkMode
                  ? "text-slate-300"
                  : "text-gray-600"
              }`}
            >
              {result.reason || "No explanation available."}
            </p>
          </div>
        </div>

        {/* ================= SOURCES ================= */}

        <div
          className={`mt-6 rounded-2xl p-6 border ${
            darkMode
              ? "bg-slate-800/80 border-slate-700"
              : "bg-gray-50 border-gray-200"
          }`}
        >
          <div className="flex items-center justify-between gap-3">
            <div className="flex items-center gap-2">
              <span className="text-xl">🔗</span>

              <h3
                className={`text-lg font-bold ${
                  darkMode
                    ? "text-white"
                    : "text-gray-900"
                }`}
              >
                Supporting Sources
              </h3>
            </div>

            <span
              className={`text-sm ${
                darkMode
                  ? "text-slate-400"
                  : "text-gray-500"
              }`}
            >
              {result.sources?.length || 0} sources
            </span>
          </div>

          {result.sources?.length ? (
            <div className="mt-5 space-y-3">
              {result.sources.map((source, index) => (
                <a
                  key={index}
                  href={source}
                  target="_blank"
                  rel="noopener noreferrer"
                  className={`group flex items-center gap-4 p-4 rounded-xl border transition-all duration-300 hover:-translate-y-0.5 ${
                    darkMode
                      ? "bg-slate-900 border-slate-700 hover:border-blue-500"
                      : "bg-white border-gray-200 hover:border-blue-300 hover:shadow-md"
                  }`}
                >
                  <span
                    className={`flex-shrink-0 w-8 h-8 rounded-lg flex items-center justify-center text-sm font-bold ${
                      darkMode
                        ? "bg-blue-500/10 text-blue-400"
                        : "bg-blue-50 text-blue-600"
                    }`}
                  >
                    {index + 1}
                  </span>

                  <span
                    className={`flex-1 text-sm font-medium break-all ${
                      darkMode
                        ? "text-slate-300 group-hover:text-blue-400"
                        : "text-gray-700 group-hover:text-blue-600"
                    }`}
                  >
                    {source}
                  </span>

                  <span
                    className={`text-lg transition-transform duration-300 group-hover:translate-x-1 ${
                      darkMode
                        ? "text-slate-500"
                        : "text-gray-400"
                    }`}
                  >
                    ↗
                  </span>
                </a>
              ))}
            </div>
          ) : (
            <p
              className={`mt-4 text-sm ${
                darkMode
                  ? "text-slate-400"
                  : "text-gray-500"
              }`}
            >
              No sources available.
            </p>
          )}
        </div>

        {/* ================= VERIFY AGAIN ================= */}

        <div className="mt-8 flex justify-center">
          <button
            onClick={() =>
              document
                .getElementById("verify-section")
                ?.scrollIntoView({
                  behavior: "smooth",
                })
            }
            className="px-7 py-3 rounded-xl bg-blue-600 text-white font-bold shadow-lg hover:bg-blue-700 hover:-translate-y-0.5 hover:shadow-xl transition-all duration-300"
          >
            🔄 Verify Another Claim
          </button>
        </div>
      </div>
    </div>
  );
}

export default ResultCard;