import { useEffect, useState } from "react";
import { Loader2 } from "lucide-react";

/**
 * Generic staged loading indicator.
 *
 * We don't have real per-step progress events from the backend, so this
 * cycles through honest, generic status labels rather than faking a
 * percentage or claiming a specific step has completed.
 */
function VerificationLoader({ darkMode, stages, accent = "blue" }) {
  const [stageIndex, setStageIndex] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setStageIndex((prev) => (prev + 1) % stages.length);
    }, 1600);

    return () => clearInterval(interval);
  }, [stages]);

  const accentClasses = {
    blue: {
      ring: "border-t-blue-600",
      bar: "bg-blue-600",
    },
    purple: {
      ring: "border-t-purple-600",
      bar: "bg-purple-600",
    },
  }[accent];

  return (
    <div
      role="status"
      aria-live="polite"
      className={`max-w-2xl mx-auto mt-8 rounded-2xl p-8 border ${
        darkMode ? "bg-slate-900 border-slate-800" : "bg-white border-gray-200"
      }`}
    >
      <div className="flex flex-col items-center text-center">
        <div className="relative w-12 h-12">
          <div
            className={`absolute inset-0 rounded-full border-2 ${
              darkMode ? "border-slate-700" : "border-gray-200"
            }`}
          />
          <div
            className={`absolute inset-0 rounded-full border-2 border-transparent ${accentClasses.ring} animate-spin`}
          />
          <Loader2
            className={`absolute inset-0 m-auto w-5 h-5 ${
              darkMode ? "text-slate-500" : "text-gray-400"
            }`}
            aria-hidden="true"
          />
        </div>

        <p
          className={`mt-5 text-base font-semibold ${
            darkMode ? "text-white" : "text-gray-900"
          }`}
        >
          {stages[stageIndex]}
        </p>

        <div
          className={`mt-5 w-full max-w-sm h-1.5 rounded-full overflow-hidden ${
            darkMode ? "bg-slate-800" : "bg-gray-100"
          }`}
        >
          <div
            className={`h-full rounded-full ${accentClasses.bar} transition-all duration-700 ease-out`}
            style={{
              width: `${((stageIndex + 1) / stages.length) * 100}%`,
            }}
          />
        </div>

        <p
          className={`mt-3 text-xs ${
            darkMode ? "text-slate-500" : "text-gray-400"
          }`}
        >
          This usually takes a few seconds.
        </p>
      </div>
    </div>
  );
}

export default VerificationLoader;
