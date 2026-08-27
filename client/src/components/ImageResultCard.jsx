function ImageResultCard({ result, darkMode }) {
  const rawVerdict = result?.verdict || "uncertain";

  // Backend verdict ko normalize karna
  const verdict = rawVerdict
    .toString()
    .toLowerCase()
    .replace(/\s+/g, "_");

  const confidence = result?.confidence ?? 0;

  const reason =
    result?.reason || "No detailed analysis available.";

  const indicators = Array.isArray(result?.indicators)
    ? result.indicators
    : [];

  // ==========================================
  // VERDICT STYLE
  // ==========================================

  const getVerdictStyle = () => {
    if (verdict === "ai_generated") {
      return darkMode
        ? "bg-red-500/10 border-red-500/30 text-red-400"
        : "bg-red-50 border-red-200 text-red-700";
    }

    if (
      verdict === "real" ||
      verdict === "likely_real"
    ) {
      return darkMode
        ? "bg-green-500/10 border-green-500/30 text-green-400"
        : "bg-green-50 border-green-200 text-green-700";
    }

    return darkMode
      ? "bg-yellow-500/10 border-yellow-500/30 text-yellow-400"
      : "bg-yellow-50 border-yellow-200 text-yellow-700";
  };

  // ==========================================
  // VERDICT TEXT
  // ==========================================

  const getVerdictText = () => {
    if (verdict === "ai_generated") {
      return "Likely AI Generated";
    }

    if (
      verdict === "real" ||
      verdict === "likely_real"
    ) {
      return "Likely Real";
    }

    return "Uncertain";
  };

  return (
    <div
      className={`rounded-3xl border p-6 md:p-8 shadow-xl ${
        darkMode
          ? "bg-slate-900 border-slate-700"
          : "bg-white border-gray-200"
      }`}
    >
      {/* ================= HEADER ================= */}

      <div className="flex items-center justify-between gap-4">
        <div>
          <h2
            className={`text-2xl md:text-3xl font-extrabold ${
              darkMode
                ? "text-white"
                : "text-gray-900"
            }`}
          >
            Image Analysis Result
          </h2>

          <p
            className={`mt-1 text-sm ${
              darkMode
                ? "text-slate-400"
                : "text-gray-500"
            }`}
          >
            AI-based image authenticity analysis
          </p>
        </div>

        <span className="text-3xl">
          🖼️
        </span>
      </div>

      {/* ================= VERDICT ================= */}

      <div
        className={`mt-6 rounded-2xl border p-5 ${getVerdictStyle()}`}
      >
        <div className="flex items-center justify-between gap-4">
          <div>
            <p className="text-sm font-medium opacity-80">
              Verdict
            </p>

            <h3 className="mt-1 text-2xl font-black">
              {getVerdictText()}
            </h3>
          </div>

          <div className="text-right">
            <p className="text-sm opacity-80">
              Confidence
            </p>

            <p className="text-2xl font-black">
              {confidence}%
            </p>
          </div>
        </div>
      </div>

      {/* ================= REASON ================= */}

      <div className="mt-6">
        <h3
          className={`text-lg font-bold ${
            darkMode
              ? "text-white"
              : "text-gray-900"
          }`}
        >
          🔎 Analysis
        </h3>

        <p
          className={`mt-2 leading-7 ${
            darkMode
              ? "text-slate-300"
              : "text-gray-600"
          }`}
        >
          {reason}
        </p>
      </div>

      {/* ================= INDICATORS ================= */}

      {indicators.length > 0 && (
        <div className="mt-6">
          <h3
            className={`text-lg font-bold ${
              darkMode
                ? "text-white"
                : "text-gray-900"
            }`}
          >
            📊 Detection Indicators
          </h3>

          <div className="mt-3 space-y-3">
            {indicators.map((indicator, index) => {
              // Backend object
              if (
                typeof indicator === "object" &&
                indicator !== null
              ) {
                return (
                  <div
                    key={index}
                    className={`rounded-xl border p-4 ${
                      darkMode
                        ? "bg-slate-800 border-slate-700"
                        : "bg-gray-50 border-gray-200"
                    }`}
                  >
                    <p
                      className={`font-semibold ${
                        darkMode
                          ? "text-white"
                          : "text-gray-900"
                      }`}
                    >
                      {indicator.name || "Indicator"}
                    </p>

                    <p
                      className={`mt-1 text-sm ${
                        darkMode
                          ? "text-slate-400"
                          : "text-gray-600"
                      }`}
                    >
                      {indicator.value ?? ""}
                    </p>
                  </div>
                );
              }

              // Backend string
              return (
                <div
                  key={index}
                  className={`rounded-xl border p-4 ${
                    darkMode
                      ? "bg-slate-800 border-slate-700 text-slate-300"
                      : "bg-gray-50 border-gray-200 text-gray-600"
                  }`}
                >
                  {indicator}
                </div>
              );
            })}
          </div>
        </div>
      )}

      {/* ================= DISCLAIMER ================= */}

      <div
        className={`mt-6 rounded-xl p-4 text-sm ${
          darkMode
            ? "bg-slate-800 text-slate-400"
            : "bg-gray-50 text-gray-500"
        }`}
      >
        ⚠️ AI detection is probabilistic. The result should
        not be treated as absolute proof that an image is
        real or AI generated.
      </div>
    </div>
  );
}

export default ImageResultCard;