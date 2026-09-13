import { CheckCircle2, XCircle, HelpCircle, ImageIcon, Info } from "lucide-react";

function ImageResultCard({ result, darkMode }) {
  const rawVerdict = result?.verdict || "uncertain";
  const verdict = rawVerdict.toString().toLowerCase().replace(/\s+/g, "_");

  const confidence = Math.max(0, Math.min(100, Number(result?.confidence) || 0));
  const reason = result?.reason || "No detailed analysis available.";
  const indicators = Array.isArray(result?.indicators) ? result.indicators : [];

  const verdictConfig = {
    ai_generated: {
      icon: XCircle,
      text: "Likely AI Generated",
      classes: darkMode
        ? "bg-red-500/10 border-red-500/30 text-red-400"
        : "bg-red-50 border-red-200 text-red-700",
    },
    real: {
      icon: CheckCircle2,
      text: "Likely Real",
      classes: darkMode
        ? "bg-emerald-500/10 border-emerald-500/30 text-emerald-400"
        : "bg-emerald-50 border-emerald-200 text-emerald-700",
    },
    likely_real: {
      icon: CheckCircle2,
      text: "Likely Real",
      classes: darkMode
        ? "bg-emerald-500/10 border-emerald-500/30 text-emerald-400"
        : "bg-emerald-50 border-emerald-200 text-emerald-700",
    },
  };

  const config =
    verdictConfig[verdict] || {
      icon: HelpCircle,
      text: "Uncertain",
      classes: darkMode
        ? "bg-amber-500/10 border-amber-500/30 text-amber-400"
        : "bg-amber-50 border-amber-200 text-amber-700",
    };

  const VerdictIcon = config.icon;

  return (
    <div className={`rounded-2xl border p-6 md:p-8 ${darkMode ? "bg-slate-900 border-slate-800" : "bg-white border-gray-200 shadow-sm"}`}>
      {/* ================= HEADER ================= */}

      <div className="flex items-center justify-between gap-4">
        <div>
          <h2 className={`text-xl md:text-2xl font-bold ${darkMode ? "text-white" : "text-gray-900"}`}>
            Image Analysis Result
          </h2>
          <p className={`mt-1 text-sm ${darkMode ? "text-slate-400" : "text-gray-500"}`}>
            AI-based image authenticity analysis
          </p>
        </div>

        <ImageIcon className={`w-7 h-7 flex-shrink-0 ${darkMode ? "text-slate-600" : "text-gray-300"}`} aria-hidden="true" />
      </div>

      {/* ================= VERDICT ================= */}

      <div className={`mt-6 rounded-xl border p-5 ${config.classes}`}>
        <div className="flex items-center justify-between gap-4">
          <div className="flex items-center gap-2">
            <VerdictIcon className="w-5 h-5 flex-shrink-0" aria-hidden="true" />
            <div>
              <p className="text-xs font-medium opacity-80">Verdict</p>
              <h3 className="text-xl font-bold">{config.text}</h3>
            </div>
          </div>

          <div className="text-right">
            <p className="text-xs opacity-80">Confidence</p>
            <p className="text-xl font-bold">{confidence}%</p>
          </div>
        </div>
      </div>

      {/* ================= REASON ================= */}

      <div className="mt-6">
        <h3 className={`text-sm font-semibold uppercase tracking-wide ${darkMode ? "text-slate-400" : "text-gray-500"}`}>
          Analysis
        </h3>
        <p className={`mt-2 leading-relaxed text-sm ${darkMode ? "text-slate-300" : "text-gray-600"}`}>{reason}</p>
      </div>

      {/* ================= INDICATORS ================= */}

      {indicators.length > 0 && (
        <div className="mt-6">
          <h3 className={`text-sm font-semibold uppercase tracking-wide ${darkMode ? "text-slate-400" : "text-gray-500"}`}>
            Detection Indicators
          </h3>

          <div className="mt-3 grid sm:grid-cols-2 gap-3">
            {indicators.map((indicator, index) => {
              const isObject = typeof indicator === "object" && indicator !== null;

              return (
                <div key={index} className={`rounded-lg border p-3.5 ${darkMode ? "bg-slate-800/60 border-slate-700" : "bg-gray-50 border-gray-200"}`}>
                  {isObject ? (
                    <>
                      <p className={`text-sm font-semibold ${darkMode ? "text-white" : "text-gray-900"}`}>
                        {indicator.name || "Indicator"}
                      </p>
                      <p className={`mt-0.5 text-sm ${darkMode ? "text-slate-400" : "text-gray-600"}`}>
                        {indicator.value ?? ""}
                      </p>
                    </>
                  ) : (
                    <p className={`text-sm ${darkMode ? "text-slate-300" : "text-gray-600"}`}>{indicator}</p>
                  )}
                </div>
              );
            })}
          </div>
        </div>
      )}

      {/* ================= DISCLAIMER ================= */}

      <div className={`mt-6 flex items-start gap-2 rounded-lg p-4 text-xs leading-relaxed ${darkMode ? "bg-slate-800/60 text-slate-400" : "bg-gray-50 text-gray-500"}`}>
        <Info className="w-4 h-4 mt-0.5 flex-shrink-0" aria-hidden="true" />
        <span>
          AI image detection is probabilistic, not proof. It estimates the likelihood that an
          image was generated or heavily altered by AI — it cannot guarantee an image is real
          or fake, and a screenshot containing AI-generated content is not the same as the
          screenshot itself being AI-generated.
        </span>
      </div>
    </div>
  );
}

export default ImageResultCard;
