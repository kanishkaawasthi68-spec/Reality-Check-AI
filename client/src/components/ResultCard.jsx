import { useState } from "react";
import {
  Copy,
  Share2,
  RotateCcw,
  CheckCircle2,
  XCircle,
  AlertTriangle,
  HelpCircle,
  ExternalLink,
  ThumbsUp,
  ThumbsDown,
  Link2,
} from "lucide-react";

const VERDICT_STYLES = {
  TRUE: {
    label: "True",
    icon: CheckCircle2,
    badge: "bg-emerald-600 text-white",
    soft: { dark: "bg-emerald-500/10 text-emerald-400", light: "bg-emerald-50 text-emerald-700" },
  },
  MOSTLY_TRUE: {
    label: "Mostly True",
    icon: CheckCircle2,
    badge: "bg-emerald-600 text-white",
    soft: { dark: "bg-emerald-500/10 text-emerald-400", light: "bg-emerald-50 text-emerald-700" },
  },
  PARTIALLY_TRUE: {
    label: "Partially True",
    icon: AlertTriangle,
    badge: "bg-amber-500 text-white",
    soft: { dark: "bg-amber-500/10 text-amber-400", light: "bg-amber-50 text-amber-700" },
  },
  MOSTLY_FALSE: {
    label: "Mostly False",
    icon: XCircle,
    badge: "bg-red-600 text-white",
    soft: { dark: "bg-red-500/10 text-red-400", light: "bg-red-50 text-red-700" },
  },
  FALSE: {
    label: "False",
    icon: XCircle,
    badge: "bg-red-600 text-white",
    soft: { dark: "bg-red-500/10 text-red-400", light: "bg-red-50 text-red-700" },
  },
  UNCERTAIN: {
    label: "Uncertain",
    icon: HelpCircle,
    badge: "bg-gray-500 text-white",
    soft: { dark: "bg-slate-800 text-slate-300", light: "bg-gray-100 text-gray-600" },
  },
};

// Backward-compatible mapping for older lowercase verdict values.
const LEGACY_VERDICT_MAP = {
  true: "TRUE",
  false: "FALSE",
  misleading: "PARTIALLY_TRUE",
  uncertain: "UNCERTAIN",
};

function resolveVerdict(rawVerdict) {
  if (!rawVerdict) return "UNCERTAIN";

  const upper = rawVerdict.toString().toUpperCase().replace(/\s+/g, "_");

  if (VERDICT_STYLES[upper]) return upper;

  const legacy = LEGACY_VERDICT_MAP[rawVerdict.toString().toLowerCase()];
  return legacy || "UNCERTAIN";
}

function ResultCard({ result, darkMode }) {
  const [copied, setCopied] = useState(false);

  const verdictKey = resolveVerdict(result.verdict);
  const verdictData = VERDICT_STYLES[verdictKey];
  const VerdictIcon = verdictData.icon;

  const confidence = Math.max(0, Math.min(100, Number(result.confidence) || 0));

  const sources = Array.isArray(result.sources) ? result.sources : [];
  const supportingEvidence = Array.isArray(result.supportingEvidence)
    ? result.supportingEvidence
    : [];
  const contradictingEvidence = Array.isArray(result.contradictingEvidence)
    ? result.contradictingEvidence
    : [];

  const getConfidenceColor = () => {
    if (confidence >= 75) return "bg-emerald-500";
    if (confidence >= 45) return "bg-amber-500";
    return "bg-red-500";
  };

  const getConfidenceText = () => {
    if (confidence >= 75) return "High";
    if (confidence >= 45) return "Moderate";
    return "Low";
  };

  const shareText = [
    "Reality Check AI",
    "",
    result.articleTitle ? `Article: ${result.articleTitle}` : null,
    result.extractedClaim ? `Claim checked: ${result.extractedClaim}` : null,
    `Verdict: ${verdictData.label}`,
    `Confidence: ${confidence}%`,
    "",
    result.summary || result.reason,
    "",
    "Sources:",
    sources.length
      ? sources.map((s) => (typeof s === "string" ? s : s.link)).join("\n")
      : "No sources available",
  ]
    .filter(Boolean)
    .join("\n");

  const handleCopy = async () => {
    try {
      await navigator.clipboard.writeText(shareText);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    } catch (error) {
      console.error("Copy failed:", error);
    }
  };

  const handleShare = async () => {
    if (navigator.share) {
      try {
        await navigator.share({ title: "Reality Check AI Result", text: shareText });
      } catch (error) {
        console.log(error);
      }
    } else {
      await handleCopy();
    }
  };

  return (
    <div
      className={`mt-8 rounded-2xl overflow-hidden border ${
        darkMode ? "bg-slate-900 border-slate-800" : "bg-white border-gray-200 shadow-sm"
      }`}
    >
      {/* ================= HEADER ================= */}

      <div
        className={`px-6 md:px-8 py-5 border-b flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 ${
          darkMode ? "border-slate-800" : "border-gray-200"
        }`}
      >
        <div>
          <p className={`text-xs font-semibold uppercase tracking-wider ${darkMode ? "text-blue-400" : "text-blue-600"}`}>
            Verification Report
          </p>

          {result.articleTitle ? (
            <>
              <h2 className={`mt-1 text-lg md:text-xl font-bold ${darkMode ? "text-white" : "text-gray-900"}`}>
                {result.articleTitle}
              </h2>
              {result.sourceUrl && (
                <a
                  href={result.sourceUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className={`mt-1 inline-flex items-center gap-1 text-xs ${
                    darkMode ? "text-slate-400 hover:text-blue-400" : "text-gray-500 hover:text-blue-600"
                  }`}
                >
                  <Link2 className="w-3 h-3" aria-hidden="true" />
                  {result.sourceUrl}
                </a>
              )}
            </>
          ) : (
            <h2 className={`mt-1 text-xl md:text-2xl font-bold ${darkMode ? "text-white" : "text-gray-900"}`}>
              Claim Verification
            </h2>
          )}
        </div>

        <div className="flex gap-2 flex-shrink-0">
          <button
            onClick={handleCopy}
            aria-label="Copy result to clipboard"
            className={`inline-flex items-center gap-1.5 px-3.5 py-2 rounded-lg font-medium text-sm border transition-colors duration-200 ${
              darkMode
                ? "bg-slate-800 border-slate-700 text-slate-200 hover:bg-slate-700"
                : "bg-white border-gray-200 text-gray-700 hover:bg-gray-50"
            }`}
          >
            {copied ? <CheckCircle2 className="w-4 h-4" aria-hidden="true" /> : <Copy className="w-4 h-4" aria-hidden="true" />}
            {copied ? "Copied" : "Copy"}
          </button>

          <button
            onClick={handleShare}
            aria-label="Share result"
            className="inline-flex items-center gap-1.5 px-3.5 py-2 rounded-lg bg-blue-600 text-white font-medium text-sm hover:bg-blue-700 transition-colors duration-200"
          >
            <Share2 className="w-4 h-4" aria-hidden="true" />
            Share
          </button>
        </div>
      </div>

      <div className="p-6 md:p-8">
        {result.extractedClaim && (
          <div
            className={`mb-6 rounded-xl p-4 border text-sm ${
              darkMode ? "bg-slate-800/60 border-slate-700 text-slate-300" : "bg-gray-50 border-gray-200 text-gray-700"
            }`}
          >
            <span className={`font-semibold ${darkMode ? "text-white" : "text-gray-900"}`}>Claim checked: </span>
            {result.extractedClaim}
          </div>
        )}

        {/* ================= VERDICT + CONFIDENCE ================= */}

        <div className="grid md:grid-cols-2 gap-4">
          <div className={`rounded-xl p-5 border ${darkMode ? "bg-slate-800/60 border-slate-700" : "bg-gray-50 border-gray-200"}`}>
            <p className={`text-xs font-semibold uppercase tracking-wide ${darkMode ? "text-slate-400" : "text-gray-500"}`}>
              Verdict
            </p>

            <div className="mt-3">
              <span className={`inline-flex items-center gap-2 px-4 py-2 rounded-full font-bold text-sm ${verdictData.badge}`}>
                <VerdictIcon className="w-4 h-4" aria-hidden="true" />
                {verdictData.label}
              </span>
            </div>
          </div>

          <div className={`rounded-xl p-5 border ${darkMode ? "bg-slate-800/60 border-slate-700" : "bg-gray-50 border-gray-200"}`}>
            <div className="flex items-center justify-between">
              <p className={`text-xs font-semibold uppercase tracking-wide ${darkMode ? "text-slate-400" : "text-gray-500"}`}>
                Confidence
              </p>
              <span className={`text-xs font-semibold ${darkMode ? "text-slate-400" : "text-gray-500"}`}>
                {getConfidenceText()}
              </span>
            </div>

            <p className={`mt-2 text-3xl font-bold ${darkMode ? "text-white" : "text-gray-900"}`}>{confidence}%</p>

            <div className={`mt-3 h-2 rounded-full overflow-hidden ${darkMode ? "bg-slate-700" : "bg-gray-200"}`}>
              <div
                className={`h-full rounded-full ${getConfidenceColor()} transition-all duration-700`}
                style={{ width: `${confidence}%` }}
              />
            </div>
            <p className={`mt-2 text-xs ${darkMode ? "text-slate-500" : "text-gray-400"}`}>
              Estimated, not a mathematical guarantee.
            </p>
          </div>
        </div>

        {/* ================= SUMMARY / REASON ================= */}

        <div className={`mt-4 rounded-xl p-5 border ${darkMode ? "bg-slate-800/60 border-slate-700" : "bg-gray-50 border-gray-200"}`}>
          <h3 className={`text-sm font-semibold uppercase tracking-wide ${darkMode ? "text-slate-400" : "text-gray-500"}`}>
            Why this verdict?
          </h3>

          {result.summary && (
            <p className={`mt-2 font-medium ${darkMode ? "text-white" : "text-gray-900"}`}>{result.summary}</p>
          )}

          <p className={`mt-2 leading-relaxed text-sm ${darkMode ? "text-slate-300" : "text-gray-600"}`}>
            {result.reason || "No explanation available."}
          </p>
        </div>

        {/* ================= SUPPORTING / CONTRADICTING EVIDENCE ================= */}

        {(supportingEvidence.length > 0 || contradictingEvidence.length > 0) && (
          <div className="mt-4 grid md:grid-cols-2 gap-4">
            <div className={`rounded-xl p-5 border ${darkMode ? "bg-emerald-500/5 border-emerald-500/20" : "bg-emerald-50 border-emerald-100"}`}>
              <h3 className={`flex items-center gap-2 text-sm font-semibold ${darkMode ? "text-emerald-400" : "text-emerald-700"}`}>
                <ThumbsUp className="w-4 h-4" aria-hidden="true" />
                Supporting Evidence
              </h3>

              {supportingEvidence.length ? (
                <ul className="mt-3 space-y-2">
                  {supportingEvidence.map((point, index) => (
                    <li key={index} className={`text-sm leading-relaxed ${darkMode ? "text-slate-300" : "text-gray-700"}`}>
                      • {point}
                    </li>
                  ))}
                </ul>
              ) : (
                <p className={`mt-3 text-sm ${darkMode ? "text-slate-500" : "text-gray-500"}`}>None found.</p>
              )}
            </div>

            <div className={`rounded-xl p-5 border ${darkMode ? "bg-red-500/5 border-red-500/20" : "bg-red-50 border-red-100"}`}>
              <h3 className={`flex items-center gap-2 text-sm font-semibold ${darkMode ? "text-red-400" : "text-red-700"}`}>
                <ThumbsDown className="w-4 h-4" aria-hidden="true" />
                Contradicting Evidence
              </h3>

              {contradictingEvidence.length ? (
                <ul className="mt-3 space-y-2">
                  {contradictingEvidence.map((point, index) => (
                    <li key={index} className={`text-sm leading-relaxed ${darkMode ? "text-slate-300" : "text-gray-700"}`}>
                      • {point}
                    </li>
                  ))}
                </ul>
              ) : (
                <p className={`mt-3 text-sm ${darkMode ? "text-slate-500" : "text-gray-500"}`}>None found.</p>
              )}
            </div>
          </div>
        )}

        {/* ================= SOURCES ================= */}

        <div className={`mt-4 rounded-xl p-5 border ${darkMode ? "bg-slate-800/60 border-slate-700" : "bg-gray-50 border-gray-200"}`}>
          <div className="flex items-center justify-between">
            <h3 className={`text-sm font-semibold uppercase tracking-wide ${darkMode ? "text-slate-400" : "text-gray-500"}`}>
              Sources
            </h3>
            <span className={`text-xs ${darkMode ? "text-slate-500" : "text-gray-400"}`}>
              {sources.length} {sources.length === 1 ? "source" : "sources"}
            </span>
          </div>

          {sources.length ? (
            <div className="mt-3 space-y-2">
              {sources.map((source, index) => {
                const link = typeof source === "string" ? source : source.link;
                const title = typeof source === "string" ? source : source.title || source.domain;
                const domain = typeof source === "string" ? "" : source.domain;
                const date = typeof source === "string" ? "" : source.date;
                const tierLabel = typeof source === "string" ? "" : source.tierLabel;

                return (
                  <a
                    key={index}
                    href={link}
                    target="_blank"
                    rel="noopener noreferrer"
                    className={`group flex items-start gap-3 p-3.5 rounded-lg border transition-colors duration-200 ${
                      darkMode ? "bg-slate-900 border-slate-700 hover:border-blue-500" : "bg-white border-gray-200 hover:border-blue-300"
                    }`}
                  >
                    <span
                      className={`flex-shrink-0 w-6 h-6 rounded-md flex items-center justify-center text-xs font-bold ${
                        darkMode ? "bg-blue-500/10 text-blue-400" : "bg-blue-50 text-blue-600"
                      }`}
                    >
                      {index + 1}
                    </span>

                    <div className="flex-1 min-w-0">
                      <p className={`text-sm font-medium truncate ${darkMode ? "text-slate-200 group-hover:text-blue-400" : "text-gray-800 group-hover:text-blue-600"}`}>
                        {title}
                      </p>
                      <div className={`mt-0.5 flex flex-wrap items-center gap-x-2 text-xs ${darkMode ? "text-slate-500" : "text-gray-400"}`}>
                        {domain && <span>{domain}</span>}
                        {tierLabel && <span>· {tierLabel}</span>}
                        {date && <span>· {date}</span>}
                      </div>
                    </div>

                    <ExternalLink className={`w-4 h-4 mt-0.5 flex-shrink-0 ${darkMode ? "text-slate-600" : "text-gray-300"}`} aria-hidden="true" />
                  </a>
                );
              })}
            </div>
          ) : (
            <p className={`mt-3 text-sm ${darkMode ? "text-slate-400" : "text-gray-500"}`}>No sources available.</p>
          )}
        </div>

        {/* ================= VERIFY AGAIN ================= */}

        <div className="mt-6 flex justify-center">
          <button
            onClick={() =>
              document.getElementById("verify-section")?.scrollIntoView({ behavior: "smooth" })
            }
            className="inline-flex items-center gap-2 px-5 py-2.5 rounded-lg bg-blue-600 text-white font-semibold text-sm hover:bg-blue-700 transition-colors duration-200"
          >
            <RotateCcw className="w-4 h-4" aria-hidden="true" />
            Verify Another
          </button>
        </div>
      </div>
    </div>
  );
}

export default ResultCard;
