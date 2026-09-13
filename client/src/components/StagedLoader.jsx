import { useEffect, useState } from "react";

/**
 * A generic multi-stage loading indicator.
 *
 * IMPORTANT: this does not track real backend progress (the API does not
 * stream step-by-step status), so it never claims a specific step has
 * completed. It simply rotates through honest, generic phase labels while
 * the single request is in flight.
 */
function StagedLoader({ darkMode, steps, accentClass = "bg-blue-600" }) {
  const [stepIndex, setStepIndex] = useState(0);

  useEffect(() => {
    // Note: this component is only ever mounted while its parent's
    // loading state is true, so state naturally starts fresh — no
    // reset-on-effect needed here.
    const interval = setInterval(() => {
      setStepIndex((prev) => (prev + 1 < steps.length ? prev + 1 : prev));
    }, 1600);

    return () => clearInterval(interval);
  }, [steps]);

  return (
    <div className="flex flex-col items-center text-center">
      <div className="relative w-14 h-14">
        <div
          className={`w-14 h-14 rounded-full border-4 ${
            darkMode ? "border-slate-700" : "border-gray-200"
          }`}
        />
        <div
          className={`absolute inset-0 w-14 h-14 rounded-full border-4 border-t-transparent animate-spin ${
            darkMode ? "border-blue-500" : "border-blue-600"
          }`}
        />
      </div>

      <ul className="mt-6 space-y-2" aria-live="polite">
        {steps.map((step, index) => (
          <li
            key={step}
            className={`text-sm font-medium transition-opacity duration-300 ${
              index === stepIndex
                ? darkMode
                  ? "text-white opacity-100"
                  : "text-gray-900 opacity-100"
                : index < stepIndex
                ? darkMode
                  ? "text-slate-500 opacity-70"
                  : "text-gray-400 opacity-70"
                : "opacity-30"
            }`}
          >
            {index < stepIndex ? "✓ " : index === stepIndex ? "› " : ""}
            {step}
          </li>
        ))}
      </ul>

      <div
        className={`mt-6 w-full max-w-xs h-1.5 rounded-full overflow-hidden ${
          darkMode ? "bg-slate-700" : "bg-gray-200"
        }`}
      >
        <div
          className={`h-full rounded-full transition-all duration-700 ${accentClass}`}
          style={{
            width: `${Math.min(
              100,
              ((stepIndex + 1) / steps.length) * 100
            )}%`,
          }}
        />
      </div>
    </div>
  );
}

export default StagedLoader;
