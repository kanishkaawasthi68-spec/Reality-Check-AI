import { useState } from "react";
import {
  FileText,
  Link2,
  ImagePlus,
  Mic,
  Square,
  Search,
  Loader2,
  AlertTriangle,
  CheckCircle2,
} from "lucide-react";

const MAX_CLAIM_LENGTH = 500;

function ClaimInput({
  darkMode,

  // Text
  claim,
  setClaim,
  error,
  loading,
  handleVerify,

  // URL
  url,
  setUrl,
  urlError,
  urlLoading,
  handleUrlVerify,

  // Verification type
  verificationType,
  setVerificationType,

  // Image
  image,
  setImage,
  handleImageVerify,
  imageLoading,
  imageError,
}) {
  const [listening, setListening] = useState(false);

  const startListening = () => {
    const SpeechRecognition =
      window.SpeechRecognition || window.webkitSpeechRecognition;

    if (!SpeechRecognition) {
      alert("Speech recognition is not supported in this browser.");
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

    recognition.onend = () => setListening(false);
    recognition.onerror = () => setListening(false);
  };

  const handleImageChange = (event) => {
    const selectedFile = event.target.files?.[0];

    if (!selectedFile) return;

    if (!selectedFile.type.startsWith("image/")) {
      alert("Please upload a valid image.");
      return;
    }

    if (selectedFile.size > 10 * 1024 * 1024) {
      alert("Image size should be less than 10 MB.");
      return;
    }

    setImage(selectedFile);
  };

  const tabs = [
    { id: "text", label: "Claim", icon: FileText },
    { id: "url", label: "URL", icon: Link2 },
    { id: "image", label: "Image", icon: ImagePlus },
  ];

  return (
    <div
      className={`rounded-2xl p-6 md:p-8 border ${
        darkMode
          ? "bg-slate-900 border-slate-800"
          : "bg-white border-gray-200 shadow-sm"
      }`}
    >
      {/* ================= TABS ================= */}

      <div
        role="tablist"
        aria-label="Verification type"
        className={`inline-flex p-1 rounded-xl border gap-1 ${
          darkMode ? "bg-slate-800/60 border-slate-700" : "bg-gray-100 border-gray-200"
        }`}
      >
        {tabs.map((tab) => {
          const Icon = tab.icon;
          const isActive = verificationType === tab.id;

          return (
            <button
              key={tab.id}
              type="button"
              role="tab"
              aria-selected={isActive}
              onClick={() => setVerificationType(tab.id)}
              className={`inline-flex items-center gap-2 px-4 sm:px-5 py-2 rounded-lg text-sm font-semibold transition-colors duration-200 ${
                isActive
                  ? "bg-blue-600 text-white"
                  : darkMode
                  ? "text-slate-300 hover:bg-slate-700/60"
                  : "text-gray-600 hover:bg-white"
              }`}
            >
              <Icon className="w-4 h-4" aria-hidden="true" />
              {tab.label}
            </button>
          );
        })}
      </div>

      {/* ================================================= */}
      {/* TEXT / CLAIM VERIFICATION */}
      {/* ================================================= */}

      {verificationType === "text" && (
        <div className="mt-6">
          <label htmlFor="claim-input" className="sr-only">
            Claim to verify
          </label>

          <div className="relative">
            <textarea
              id="claim-input"
              rows={6}
              maxLength={MAX_CLAIM_LENGTH}
              value={claim}
              onChange={(e) => setClaim(e.target.value)}
              placeholder="e.g. The Great Wall of China is visible from space with the naked eye."
              className={`w-full rounded-xl p-4 pb-10 text-base resize-none outline-none transition-colors duration-200 ${
                darkMode
                  ? "bg-slate-800 border border-slate-700 text-white placeholder-slate-500"
                  : "bg-gray-50 border border-gray-200 text-gray-900 placeholder-gray-400"
              } focus:border-blue-500 focus:ring-2 focus:ring-blue-500/20`}
            />

            <span
              className={`absolute bottom-3 right-4 text-xs tabular-nums ${
                darkMode ? "text-slate-500" : "text-gray-400"
              }`}
            >
              {claim.length}/{MAX_CLAIM_LENGTH}
            </span>
          </div>

          <div className="mt-3 flex flex-col sm:flex-row sm:items-center sm:justify-between gap-3">
            <span className={`text-xs ${darkMode ? "text-slate-500" : "text-gray-500"}`}>
              Paste a statement, headline, or claim you want checked.
            </span>

            <button
              type="button"
              onClick={startListening}
              disabled={listening || loading}
              aria-label={listening ? "Listening for speech" : "Speak your claim"}
              className={`inline-flex items-center gap-2 px-3.5 py-2 rounded-lg text-sm font-medium transition-colors duration-200 ${
                listening
                  ? "bg-red-500 text-white"
                  : darkMode
                  ? "bg-slate-800 text-slate-300 border border-slate-700 hover:bg-slate-700"
                  : "bg-gray-50 text-gray-600 border border-gray-200 hover:bg-gray-100"
              } disabled:opacity-50 disabled:cursor-not-allowed`}
            >
              {listening ? (
                <Square className="w-3.5 h-3.5" aria-hidden="true" />
              ) : (
                <Mic className="w-3.5 h-3.5" aria-hidden="true" />
              )}
              {listening ? "Listening…" : "Speak"}
            </button>
          </div>

          {error && (
            <div
              role="alert"
              className={`mt-4 flex items-start gap-2 px-4 py-3 rounded-xl text-sm font-medium ${
                darkMode
                  ? "bg-red-500/10 text-red-400 border border-red-500/20"
                  : "bg-red-50 text-red-700 border border-red-100"
              }`}
            >
              <AlertTriangle className="w-4 h-4 mt-0.5 flex-shrink-0" aria-hidden="true" />
              <span>{error}</span>
            </div>
          )}

          <button
            type="button"
            onClick={handleVerify}
            disabled={loading}
            className={`w-full mt-5 inline-flex items-center justify-center gap-2 rounded-xl py-3.5 text-base font-semibold text-white transition-colors duration-200 ${
              darkMode ? "bg-blue-600 hover:bg-blue-500" : "bg-blue-600 hover:bg-blue-700"
            } disabled:opacity-60 disabled:cursor-not-allowed`}
          >
            {loading ? (
              <Loader2 className="w-4 h-4 animate-spin" aria-hidden="true" />
            ) : (
              <Search className="w-4 h-4" aria-hidden="true" />
            )}
            {loading ? "Verifying…" : "Verify Claim"}
          </button>
        </div>
      )}

      {/* ================================================= */}
      {/* URL / ARTICLE VERIFICATION */}
      {/* ================================================= */}

      {verificationType === "url" && (
        <div className="mt-6">
          <label htmlFor="url-input" className="sr-only">
            Article URL to verify
          </label>

          <input
            id="url-input"
            type="url"
            inputMode="url"
            value={url}
            onChange={(e) => setUrl(e.target.value)}
            placeholder="https://example.com/news/article"
            className={`w-full rounded-xl p-4 text-base outline-none transition-colors duration-200 ${
              darkMode
                ? "bg-slate-800 border border-slate-700 text-white placeholder-slate-500"
                : "bg-gray-50 border border-gray-200 text-gray-900 placeholder-gray-400"
            } focus:border-blue-500 focus:ring-2 focus:ring-blue-500/20`}
          />

          <p className={`mt-3 text-xs ${darkMode ? "text-slate-500" : "text-gray-500"}`}>
            We'll fetch the article, pull out its main claim, and check it against
            independent sources. Pages behind a login or paywall can't be read.
          </p>

          {urlError && (
            <div
              role="alert"
              className={`mt-4 flex items-start gap-2 px-4 py-3 rounded-xl text-sm font-medium ${
                darkMode
                  ? "bg-red-500/10 text-red-400 border border-red-500/20"
                  : "bg-red-50 text-red-700 border border-red-100"
              }`}
            >
              <AlertTriangle className="w-4 h-4 mt-0.5 flex-shrink-0" aria-hidden="true" />
              <span>{urlError}</span>
            </div>
          )}

          <button
            type="button"
            onClick={handleUrlVerify}
            disabled={urlLoading}
            className={`w-full mt-5 inline-flex items-center justify-center gap-2 rounded-xl py-3.5 text-base font-semibold text-white transition-colors duration-200 ${
              darkMode ? "bg-blue-600 hover:bg-blue-500" : "bg-blue-600 hover:bg-blue-700"
            } disabled:opacity-60 disabled:cursor-not-allowed`}
          >
            {urlLoading ? (
              <Loader2 className="w-4 h-4 animate-spin" aria-hidden="true" />
            ) : (
              <Link2 className="w-4 h-4" aria-hidden="true" />
            )}
            {urlLoading ? "Verifying…" : "Verify Article"}
          </button>
        </div>
      )}

      {/* ================================================= */}
      {/* IMAGE VERIFICATION */}
      {/* ================================================= */}

      {verificationType === "image" && (
        <div className="mt-6">
          <label
            htmlFor="image-upload"
            className={`block w-full rounded-xl border-2 border-dashed p-8 md:p-10 text-center cursor-pointer transition-colors duration-200 ${
              darkMode
                ? "bg-slate-800/50 border-slate-700 hover:border-blue-500"
                : "bg-gray-50 border-gray-300 hover:border-blue-400"
            }`}
          >
            <input
              id="image-upload"
              type="file"
              accept="image/png,image/jpeg,image/jpg,image/webp"
              onChange={handleImageChange}
              className="sr-only"
            />

            {!image ? (
              <>
                <ImagePlus
                  className={`w-8 h-8 mx-auto ${
                    darkMode ? "text-slate-500" : "text-gray-400"
                  }`}
                  aria-hidden="true"
                />

                <p
                  className={`mt-3 text-sm font-semibold ${
                    darkMode ? "text-white" : "text-gray-900"
                  }`}
                >
                  Click to upload an image
                </p>

                <p className={`mt-1 text-xs ${darkMode ? "text-slate-500" : "text-gray-400"}`}>
                  PNG, JPG, JPEG or WEBP · Max 10 MB
                </p>
              </>
            ) : (
              <>
                <CheckCircle2
                  className="w-8 h-8 mx-auto text-emerald-500"
                  aria-hidden="true"
                />

                <p
                  className={`mt-3 text-sm font-semibold break-all ${
                    darkMode ? "text-white" : "text-gray-900"
                  }`}
                >
                  {image.name}
                </p>

                <p className={`mt-1 text-xs ${darkMode ? "text-slate-500" : "text-gray-400"}`}>
                  Click to choose a different image
                </p>
              </>
            )}
          </label>

          {image && (
            <div
              className={`mt-4 rounded-xl overflow-hidden border ${
                darkMode ? "border-slate-700 bg-slate-800" : "border-gray-200 bg-gray-50"
              }`}
            >
              <img
                src={URL.createObjectURL(image)}
                alt="Selected file preview"
                className="w-full max-h-72 object-contain"
              />
            </div>
          )}

          {imageError && (
            <div
              role="alert"
              className={`mt-4 flex items-start gap-2 px-4 py-3 rounded-xl text-sm font-medium ${
                darkMode
                  ? "bg-red-500/10 text-red-400 border border-red-500/20"
                  : "bg-red-50 text-red-700 border border-red-100"
              }`}
            >
              <AlertTriangle className="w-4 h-4 mt-0.5 flex-shrink-0" aria-hidden="true" />
              <span>{imageError}</span>
            </div>
          )}

          <button
            type="button"
            onClick={handleImageVerify}
            disabled={!image || imageLoading}
            className={`w-full mt-5 inline-flex items-center justify-center gap-2 rounded-xl py-3.5 text-base font-semibold text-white transition-colors duration-200 ${
              darkMode ? "bg-blue-600 hover:bg-blue-500" : "bg-blue-600 hover:bg-blue-700"
            } disabled:opacity-60 disabled:cursor-not-allowed`}
          >
            {imageLoading ? (
              <Loader2 className="w-4 h-4 animate-spin" aria-hidden="true" />
            ) : (
              <ImagePlus className="w-4 h-4" aria-hidden="true" />
            )}
            {imageLoading ? "Analyzing…" : "Analyze Image"}
          </button>
        </div>
      )}
    </div>
  );
}

export default ClaimInput;
